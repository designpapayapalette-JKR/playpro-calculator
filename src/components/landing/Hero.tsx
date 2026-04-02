'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, TrendingUp, IndianRupee, Play } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  const scrollToPricing = () => {
    const pricing = document.getElementById('pricing');
    if (pricing) {
      pricing.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="forest-glow top-[-200px] left-[-200px]" />
      <div className="neon-glow bottom-[10%] right-[-100px] opacity-20" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#151A19] border border-white/5 text-[#b8ff47] text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-8">
            <span className="w-2 h-2 rounded-full bg-[#b8ff47] animate-pulse" />
            Trusted by 200+ Facility Owners in India
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.05] tracking-tight">
            Know Your <span className="text-[#b8ff47]">Numbers</span> Before You Spend a <span className="text-[#b8ff47]">Single Rupee.</span>
          </h1>

          <p className="max-w-xl text-lg md:text-xl text-gray-400 mb-10 leading-relaxed font-medium">
            Most pickleball investors overshoot CAPEX by ₹8–12 Lakhs and underestimate monthly burn. This calculator tells you exactly what your facility will cost, earn, and return — before you sign any lease.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <button 
              onClick={scrollToPricing}
              className="w-full sm:w-auto bg-[#00a651] hover:bg-[#008f45] text-white font-black py-4 px-10 rounded-full text-lg transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-[#00a651]/20 flex items-center justify-center gap-2 group"
            >
              Get It for ₹499 →
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => {
                const showcase = document.getElementById('showcase');
                if (showcase) showcase.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto border border-white/10 hover:border-[#b8ff47]/50 hover:bg-white/5 py-4 px-10 rounded-full text-lg font-bold transition-all flex items-center justify-center gap-2"
            >
              See What's Inside
            </button>
          </div>

          {/* Trust signals */}
          <div className="grid grid-cols-3 gap-4 max-w-lg">
            {[
              { icon: <IndianRupee className="w-4 h-4" />, label: "Avg ₹21L CAPEX Modelled" },
              { icon: <TrendingUp className="w-4 h-4" />, label: "~7.2 Mo Payback Period" },
              { icon: <ShieldCheck className="w-4 h-4" />, label: "Built for Indian Market" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-start gap-2 p-4 bg-white/[0.03] rounded-2xl border border-white/5">
                <span className="text-[#b8ff47]">{item.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 leading-tight">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Visual Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          {/* Decorative Glow behind image */}
          <div className="absolute inset-0 bg-[#b8ff47]/10 blur-[100px] rounded-full" />
          
          <div className="relative z-10 p-2 md:p-4 bg-white/5 border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#b8ff47]/10 to-transparent pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <Image 
              src="/hero-dashboard-mockup.png" 
              alt="PlayPro Pickleball Business Calculator Dashboard — Actual product preview showing CAPEX, OPEX and ROI models" 
              width={1000} 
              height={1000}
              className="rounded-[2.5rem] w-full h-auto object-cover transform transition-transform duration-[2s] group-hover:scale-110"
            />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-30">
              <button className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:scale-110 transition-all hover:bg-[#b8ff47] group/play">
                <Play className="w-8 h-8 text-white group-hover/play:text-black fill-current translate-x-1" />
              </button>
            </div>
          </div>

          {/* Floating ROI Card */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 md:-left-12 z-40 bg-[#151A19] border border-white/10 p-6 rounded-3xl shadow-2xl glass"
          >
            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Avg. Payback Period</div>
            <div className="text-3xl font-black text-[#b8ff47]">~7.2 Months</div>
            <div className="mt-2 flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[10px] font-bold text-green-500">Based on 200+ facility models</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
