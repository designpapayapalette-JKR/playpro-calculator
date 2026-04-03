import { NextResponse } from 'next/server';
import React from 'react';
import { render } from '@react-email/render';
import { createAdminClient } from '@/lib/supabase/server';
import { getResend, EMAIL_FROM } from '@/lib/resend';
import { PurchaseEmail } from '@/components/emails/PurchaseEmail';
import { SIGNED_URL_EXPIRY, PRODUCTS } from '@/lib/constants';

export async function POST(req: Request) {
  try {
    const { name, email, phone, plan_id, utm_source, utm_medium, utm_campaign } = await req.json();

    if (!name || !email || !plan_id) {
      return NextResponse.json({ error: 'Name, email and plan are required' }, { status: 400 });
    }

    const product = PRODUCTS[plan_id as keyof typeof PRODUCTS];
    if (!product) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Create order in Supabase
    const { data: order, error: insertError } = await supabase
      .from('orders')
      .insert({
        customer_name: name,
        customer_email: email,
        customer_phone: phone || null,
        amount: product.price * 100, // in paise
        currency: 'INR',
        status: 'paid',
        plan_type: plan_id,
        utm_source: utm_source || null,
        utm_medium: utm_medium || null,
        utm_campaign: utm_campaign || null,
      })
      .select()
      .single();

    if (insertError || !order) {
      console.error('Supabase insert error:', insertError);
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    // Generate signed download URL from Supabase Storage
    const { data: signedUrlData, error: storageError } = await supabase.storage
      .from('products')
      .createSignedUrl(product.file_path, SIGNED_URL_EXPIRY);

    if (storageError || !signedUrlData) {
      console.error('Storage error:', storageError);
      return NextResponse.json({ error: 'Failed to generate download link' }, { status: 500 });
    }

    // Render email to HTML
    const html = await render(React.createElement(PurchaseEmail, {
      customerName: name,
      downloadUrl: signedUrlData.signedUrl,
      orderId: order.id,
      amount: `₹${product.price}`,
    }));

    // Send email with download link
    const { error: emailError } = await getResend().emails.send({
      from: EMAIL_FROM,
      to: [email],
      subject: `Your ${product.name} is ready! 🎉`,
      html,
    });

    if (emailError) {
      console.error('Email error:', emailError);
      // Order is created — don't fail the request, admin can resend manually
    }

    // Mark email as sent
    if (!emailError) {
      await supabase
        .from('orders')
        .update({ email_sent: true, email_sent_at: new Date().toISOString() })
        .eq('id', order.id);
    }

    return NextResponse.json({ success: true, order_id: order.id });
  } catch (error: any) {
    console.error('Create order error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
