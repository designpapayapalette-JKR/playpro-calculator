import { NextResponse } from 'next/server';
import crypto from 'crypto';
import React from 'react';
import { createAdminClient } from '@/lib/supabase/server';
import { resend, EMAIL_FROM } from '@/lib/resend';
import { PurchaseEmail } from '@/components/emails/PurchaseEmail';
import { SIGNED_URL_EXPIRY, PRODUCTS } from '@/lib/constants';

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing payment details' }, { status: 400 });
    }

    // Verify signature
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!);
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const expectedSignature = hmac.digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Fetch order details
    const { data: order, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('razorpay_order_id', razorpay_order_id)
      .single();

    if (fetchError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Update order status
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        status: 'paid',
        razorpay_payment_id,
        razorpay_signature,
      })
      .eq('razorpay_order_id', razorpay_order_id);

    if (updateError) {
      console.error('Update Order Error:', updateError);
    }

    // Generate signed URL
    const product = PRODUCTS[order.plan_type as keyof typeof PRODUCTS] || PRODUCTS.calculator_store;
    const { data: signedUrlData, error: storageError } = await supabase.storage
      .from('products')
      .createSignedUrl(product.file_path, SIGNED_URL_EXPIRY);

    if (storageError) {
      console.error('Storage Error:', storageError);
      return NextResponse.json({ error: 'Failed to generate download link' }, { status: 500 });
    }

    // Send email via Resend
    const { error: emailError } = await resend.emails.send({
      from: EMAIL_FROM,
      to: [order.customer_email],
      subject: `Your ${product.name} is ready! 🎉`,
      react: React.createElement(PurchaseEmail, {
        customerName: order.customer_name,
        downloadUrl: signedUrlData.signedUrl,
        orderId: order.id,
        amount: `₹${order.amount / 100}`,
      }),
    });

    if (emailError) {
      console.error('Email Error:', emailError);
    } else {
      // Update email_sent status
      await supabase
        .from('orders')
        .update({
          email_sent: true,
          email_sent_at: new Date().toISOString(),
        })
        .eq('id', order.id);
    }

    return NextResponse.json({
      success: true,
      redirect: `/thank-you?order=${order.id}`,
    });
  } catch (error: any) {
    console.error('Verify Payment Error:', error);
    return NextResponse.json({ error: error.message || 'Error verifying payment' }, { status: 500 });
  }
}
