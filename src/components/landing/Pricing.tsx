'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Zap } from 'lucide-react';
import { PRODUCTS } from '@/lib/constants';
import CheckoutModal from '@/components/checkout/CheckoutModal';

export default function Pricing() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const plan = {
    id: 'calculator_store' as const,
    name: PRODUCTS.calculator_store.name,
    price: PRODUCTS.calculator_store.price,
    oldPrice: PRODUCTS.calculator_store.oldPrice,
    description: PRODUCTS.calculator_store.description,
    features: [
      "Dynamic CAPEX Planner (30+ items)",
      "Operational Expense Tracker (OPEX)",
      "Revenue Model & Seasonal Projections",
      "5-Year ROI & Break-Even Analysis",
      "Bonus: Indian Vendor Directory",
      "Bonus: Investor Pitch Deck Template",
      "One-time payment. Lifetime access."
    ]
  };

  return (
    <section id="pricing" className="py-24 md:py-32 bg-[#0B0F0E] relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#00a651]/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#b8ff47]/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#151A19] border border-white/5 text-[#b8ff47] text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#b8ff47] animate-pulse" /> ⚡ Launch Pricing — Closes After 200 Sales
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-4 leading-[1.1]"
          >
            ₹499 Now. <span className="text-[#b8ff47]">₹999 After</span> 200 Sales.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto font-medium"
          >
            You're not buying a spreadsheet. You're buying <span className="text-white font-bold">the certainty that your ₹20L+ investment will pay off</span> — with the exact numbers to prove it.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 md:p-14 bg-[#151A19] border-2 border-[#b8ff47] rounded-[4rem] flex flex-col h-full transition-all duration-500 overflow-hidden group shadow-3xl shadow-[#b8ff47]/10"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#b8ff47]/10 blur-[60px] -z-10" />
            
            <div className="mb-10">
              <div className="flex items-center gap-2 text-[#b8ff47] text-xs font-black uppercase tracking-[0.4em] mb-6">
                <Zap className="w-5 h-5 fill-[#b8ff47]" />
                Launch Price — Limited to First 200 Buyers
              </div>
              <div className="flex items-baseline gap-4 mb-3">
                <span className="text-7xl font-black text-white tracking-tighter">₹{plan.price}</span>
                <div className="flex flex-col gap-1">
                  <span className="text-2xl text-gray-500 line-through font-bold">₹{plan.oldPrice}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Price goes to ₹999 soon</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm font-medium">One-time payment. Instant download. Lifetime access — including all future updates.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-14">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex gap-4 items-center group/feature">
                  <div className="mt-1 w-6 h-6 bg-[#b8ff47]/10 rounded-full flex items-center justify-center shrink-0 group-hover/feature:bg-[#b8ff47] transition-all duration-300">
                    <Check className="w-3.5 h-3.5 text-[#b8ff47] group-hover/feature:text-[#0B0F0E]" />
                  </div>
                  <span className="text-gray-300 text-base font-bold group-hover:text-white transition-colors">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-7 bg-[#00a651] hover:bg-[#008f45] text-white text-xl md:text-2xl font-black rounded-full flex items-center justify-center gap-4 transition-all hover:scale-[1.03] active:scale-[0.98] shadow-3xl shadow-[#00a651]/40"
            >
              Yes, I Want This for ₹499 →
              <ArrowRight className="w-7 h-7 transition-transform group-hover:translate-x-2" />
            </button>
            <p className="text-center text-[11px] text-gray-600 font-black uppercase tracking-widest mt-5">
              🔒 Secure Payment via Razorpay · No Subscription · Cancel Anytime
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center text-gray-600 text-xs font-black uppercase tracking-[0.2em] flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12"
        >
          <span className="flex items-center gap-2 underline underline-offset-4 decoration-[#b8ff47]">Instant Digital Access</span>
          <span className="hidden md:block opacity-30">•</span>
          <span className="flex items-center gap-2 underline underline-offset-4 decoration-[#b8ff47]">Full Ownership Rights</span>
          <span className="hidden md:block opacity-30">•</span>
          <span className="flex items-center gap-2 underline underline-offset-4 decoration-[#b8ff47]">Priority Email Support</span>
        </motion.div>
      </div>

      <CheckoutModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        planId="calculator_store"
      />
    </section>
  );
}
