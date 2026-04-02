import { NextResponse } from 'next/server';
import crypto from 'crypto';
import React from 'react';
import { createAdminClient } from '@/lib/supabase/server';
import { resend, EMAIL_FROM } from '@/lib/resend';
import { PurchaseEmail } from '@/components/emails/PurchaseEmail';
import { SIGNED_URL_EXPIRY, PRODUCTS } from '@/lib/constants';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(rawBody)
      .digest('hex');

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
    }

    const body = JSON.parse(rawBody);
    const event = body.event;

    const supabase = createAdminClient();

    if (event === 'payment.captured') {
      const payment = body.payload.payment.entity;
      const orderId = payment.order_id;

      // Check if order exists and email hasn't been sent
      const { data: order, error: fetchError } = await supabase
        .from('orders')
        .select('*')
        .eq('razorpay_order_id', orderId)
        .single();

      if (fetchError || !order) {
        console.log(`Order ${orderId} not found in DB`);
        return NextResponse.json({ status: 'ok' });
      }

      if (order.email_sent) {
        console.log(`Email already sent for order ${orderId}`);
        return NextResponse.json({ status: 'ok' });
      }

      // Update order status
      await supabase
        .from('orders')
        .update({
          status: 'paid',
          razorpay_payment_id: payment.id,
        })
        .eq('razorpay_order_id', orderId);

      // Generate signed URL
      const product = PRODUCTS[order.plan_type as keyof typeof PRODUCTS] || PRODUCTS.calculator_store;
      const { data: signedUrlData, error: storageError } = await supabase.storage
        .from('products')
        .createSignedUrl(product.file_path, SIGNED_URL_EXPIRY);

      if (storageError) {
        console.error('Storage Error in Webhook:', storageError);
        return NextResponse.json({ error: 'Failed to generate download link' }, { status: 500 });
      }

      // Send email via Resend
      const { error: emailError } = await resend.emails.send({
        from: EMAIL_FROM,
        to: [order.customer_email],
        subject: `Your ${product.name} is ready! 🎉`,
        react: (
          <PurchaseEmail
            customerName={order.customer_name}
            downloadUrl={signedUrlData.signedUrl}
            orderId={order.id}
            amount={`₹${order.amount / 100}`}
          />
        ),
      });

      if (!emailError) {
        await supabase
          .from('orders')
          .update({
            email_sent: true,
            email_sent_at: new Date().toISOString(),
          })
          .eq('id', order.id);
      }
    } else if (event === 'payment.failed') {
      const payment = body.payload.payment.entity;
      const orderId = payment.order_id;
      await supabase
        .from('orders')
        .update({ status: 'failed' })
        .eq('razorpay_order_id', orderId);
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error: any) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
