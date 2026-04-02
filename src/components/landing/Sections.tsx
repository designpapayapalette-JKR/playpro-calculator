'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Zap, Award } from 'lucide-react';

export function Numbers() {
  const stats = [
    { label: "Typical Setup Cost", value: "₹21L", sub: "Avg CAPEX — do you know yours?" },
    { label: "Monthly Burn Rate", value: "₹2.55L", sub: "Your monthly OPEX before a single booking" },
    { label: "Achievable Monthly Revenue", value: "₹5.38L", sub: "When all 10+ streams are modelled" },
    { label: "Avg Payback Period", value: "~7.2 Mo", sub: "Based on optimised facility models" }
  ];

  return (
    <section className="py-24 bg-[#151A19]/50 border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-subtle opacity-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-3">What the Numbers Say</p>
          <p className="text-2xl md:text-3xl font-black text-white">The Indian Pickleball Market — By The Numbers</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-3 group-hover:text-[#b8ff47] transition-colors">
                {stat.label}
              </div>
              <div className="text-4xl md:text-6xl font-sans font-black text-white tracking-tighter group-hover:scale-110 transition-transform duration-500">
                {stat.value}
              </div>
              <div className="mt-3 text-[10px] text-gray-600 font-medium italic">{stat.sub}</div>
              <div className="mt-4 w-12 h-1 bg-[#b8ff47] mx-auto rounded-full group-hover:w-20 transition-all" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonial() {
  return (
    <section className="py-24 md:py-40 px-6 bg-[#0B0F0E] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#00a651]/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-[#151A19] border-2 border-white/5 rounded-[4rem] p-12 md:p-24 text-center overflow-hidden shadow-3xl hover:border-[#b8ff47]/30 transition-all duration-700"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#b8ff47]/10 to-transparent blur-[50px] -z-10" />
          
          <div className="flex justify-center mb-8">
            <div className="p-5 bg-[#b8ff47]/10 rounded-[1.5rem] text-[#b8ff47]">
              <Quote className="w-10 h-10 fill-[#b8ff47]/20" />
            </div>
          </div>

          <p className="text-xl md:text-4xl font-black text-white mb-12 leading-[1.3] tracking-tight max-w-4xl mx-auto">
            "The calculator showed me I was going to overspend by <span className="text-red-400">₹6.2 Lakhs on CAPEX</span> and miss 3 revenue streams entirely. I fixed my model before signing the lease and saved the deal."
          </p>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#00a651] flex items-center justify-center text-white font-black text-xl border-4 border-[#151A19]">
                R
              </div>
              <div className="text-left">
                <div className="text-lg font-black tracking-tight">Rajesh K.</div>
                <div className="text-gray-500 text-xs font-black uppercase tracking-[0.2em]">3-Court Facility Founder, Bangalore</div>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-12 pt-10 border-t border-white/5 flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-[#b8ff47] text-[10px] font-black uppercase tracking-widest">
              <Zap className="w-4 h-4 fill-[#b8ff47]" />
              Prevented a ₹6.2L Mistake
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase tracking-widest">
              <Award className="w-4 h-4" />
              Negotiated Better Rent Terms
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
