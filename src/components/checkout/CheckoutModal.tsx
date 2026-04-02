'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, X, ShieldCheck } from 'lucide-react';
import { PRODUCTS } from '@/lib/constants';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId: 'calculator_store';
}

declare global {
  interface Window {
    Razorpay: any;
    fbq: any;
  }
}

export default function CheckoutModal({ isOpen, onClose, planId }: CheckoutModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const product = PRODUCTS[planId];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Get UTM params
      const urlParams = new URLSearchParams(window.location.search);
      const utm_source = urlParams.get('utm_source');
      const utm_medium = urlParams.get('utm_medium');
      const utm_campaign = urlParams.get('utm_campaign');

      // 1. Create Razorpay Order
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          email, 
          phone, 
          plan_id: planId,
          utm_source,
          utm_medium,
          utm_campaign
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create order');

      // 2. Open Razorpay Checkout
      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: 'PlayPro',
        description: product.name,
        order_id: data.order_id,
        handler: async (response: any) => {
          // 3. Verify Payment
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyRes.ok && verifyData.success) {
            // Track Purchase for Meta Pixel
            if (typeof window.fbq === 'function') {
              window.fbq('track', 'Purchase', { 
                value: product.price, 
                currency: 'INR',
                content_name: product.name
              });
            }
            window.location.href = verifyData.redirect;
          } else {
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name,
          email,
          contact: phone,
        },
        theme: {
          color: '#b8ff47',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      // Only close if Razorpay opened successfully
      onClose();
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-[#151A19] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>

          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-2">Secure Checkout</h2>
            <p className="text-gray-400 mb-8 border-b border-white/5 pb-8">
              Order: <span className="text-white font-semibold">{product.name} — ₹{product.price}</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-3">Full Name</label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0B0F0E] border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-[#b8ff47] transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-3">Email Address</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0B0F0E] border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-[#b8ff47] transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-3">Phone Number (Optional)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0B0F0E] border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-[#b8ff47] transition-colors"
                  placeholder="For payment updates"
                />
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="w-full bg-[#00a651] hover:bg-[#008f45] text-white font-black py-5 rounded-xl text-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Proceed to Payment"}
              </button>

              <div className="flex items-center justify-center gap-3 py-4 border-t border-white/5">
                <ShieldCheck className="w-5 h-5 text-[#b8ff47]" />
                <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Secure 256-bit SSL encrypted payment</span>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
