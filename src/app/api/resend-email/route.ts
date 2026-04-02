import { NextResponse } from 'next/server';
import React from 'react';
import { createAdminClient, createSessionClient } from '@/lib/supabase/server';
import { getResend, EMAIL_FROM } from '@/lib/resend';
import { PurchaseEmail } from '@/components/emails/PurchaseEmail';
import { SIGNED_URL_EXPIRY, PRODUCTS } from '@/lib/constants';

export async function POST(req: Request) {
  try {
    const { order_id } = await req.json();

    if (!order_id) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    // Verify the caller's session via cookies (admin must be logged in)
    const sessionClient = await createSessionClient();
    const { data: { user }, error: authError } = await sessionClient.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createAdminClient();

    // Fetch order details
    const { data: order, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', order_id)
      .single();

    if (fetchError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Generate signed URL
    const product = PRODUCTS[order.plan_type as keyof typeof PRODUCTS] || PRODUCTS.calculator_store;
    const { data: signedUrlData, error: storageError } = await supabase.storage
      .from('products')
      .createSignedUrl(product.file_path, SIGNED_URL_EXPIRY);

    if (storageError) {
      console.error('Storage Error in Manual Resend:', storageError);
      return NextResponse.json({ error: 'Failed to generate download link' }, { status: 500 });
    }

    // Send email via Resend
    const { error: emailError } = await getResend().emails.send({
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
      console.error('Email Resend Error:', emailError);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    // Update email_sent status
    await supabase
      .from('orders')
      .update({
        email_sent: true,
        email_sent_at: new Date().toISOString(),
      })
      .eq('id', order.id);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Resend API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
