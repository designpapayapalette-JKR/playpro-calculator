-- PlayPro Pickleball Calculator Store Database Schema

-- Orders table to track all purchase attempts and completions
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  razorpay_order_id TEXT UNIQUE NOT NULL,
  razorpay_payment_id TEXT UNIQUE,
  razorpay_signature TEXT,
  amount INTEGER NOT NULL, -- in paise
  currency TEXT DEFAULT 'INR' NOT NULL,
  status TEXT DEFAULT 'created' NOT NULL, -- 'created', 'paid', 'failed'
  email_sent BOOLEAN DEFAULT false,
  email_sent_at TIMESTAMPTZ,
  download_count INTEGER DEFAULT 0,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  user_agent TEXT,
  ip_address TEXT,
  plan_type TEXT DEFAULT 'calculator_only' -- 'calculator_only' or 'premium_bundle'
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_razorpay_order ON orders(razorpay_order_id);

-- Row Level Security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Service role has full access
CREATE POLICY "Service role full access" ON orders
  FOR ALL USING (auth.role() = 'service_role');

-- Authenticated admins can read all orders
CREATE POLICY "Admin read access" ON orders
  FOR SELECT USING (auth.role() = 'authenticated');

-- Daily revenue view for the dashboard
CREATE OR REPLACE VIEW daily_revenue AS
SELECT
  DATE(created_at) as date,
  COUNT(*) FILTER (WHERE status = 'paid') as total_orders,
  SUM(amount) FILTER (WHERE status = 'paid') / 100 as revenue_inr,
  COUNT(*) FILTER (WHERE status = 'failed') as failed_orders
FROM orders
GROUP BY DATE(created_at)
ORDER BY date DESC;
