import { NextResponse } from 'next/server';
import { razorpay } from '@/lib/razorpay';
import { createAdminClient } from '@/lib/supabase/server';
import { PRODUCTS } from '@/lib/constants';

export async function POST(req: Request) {
  try {
    const { name, email, phone, utm_source, utm_medium, utm_campaign, plan_id = 'calculator_store' } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const product = PRODUCTS[plan_id as keyof typeof PRODUCTS] || PRODUCTS.calculator_store;

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: product.pricePaise,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        customer_name: name,
        customer_email: email,
        plan_id: product.id,
      },
    });

    // Save to Supabase
    const supabase = createAdminClient();
    const { error: dbError } = await supabase.from('orders').insert({
      customer_name: name,
      customer_email: email,
      customer_phone: phone || null,
      razorpay_order_id: razorpayOrder.id,
      amount: product.pricePaise,
      currency: 'INR',
      status: 'created',
      utm_source: utm_source || null,
      utm_medium: utm_medium || null,
      utm_campaign: utm_campaign || null,
      plan_type: product.id,
    });

    if (dbError) {
      console.error('Database Error:', dbError);
      return NextResponse.json({ error: 'Failed to save order' }, { status: 500 });
    }

    return NextResponse.json({
      order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (error: any) {
    console.error('Create Order Error:', error);
    return NextResponse.json({ error: error.message || 'Error creating order' }, { status: 500 });
  }
}
