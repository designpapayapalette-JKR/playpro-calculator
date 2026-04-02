'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';

export function FinalCTA() {
  const scrollToPricing = () => {
    const pricing = document.getElementById('pricing');
    if (pricing) {
      pricing.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 md:py-48 px-6 bg-[#0B0F0E] relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[#00a651]/10 blur-[150px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden p-12 md:p-32 bg-[#151A19] border-2 border-white/5 rounded-[4rem] text-center shadow-3xl hover:border-[#b8ff47]/30 transition-all duration-700"
        >
          {/* Decorative Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#b8ff47]/5 blur-[80px] -z-10" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00a651]/5 blur-[80px] -z-10" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#b8ff47]/10 border border-[#b8ff47]/20 text-[#b8ff47] text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-12"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#b8ff47] animate-pulse" />
            Price Increases After 200 Sales — {200} Spots Left
          </motion.div>

          <h2 className="text-4xl md:text-7xl font-black text-white mb-8 leading-[1] tracking-tighter">
            Your Facility Is a <span className="text-[#b8ff47]">₹20L+</span> <br /> Commitment. <br /> Know Your Numbers.
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-400 font-medium mb-16 max-w-2xl mx-auto leading-relaxed">
            For ₹499 — less than a dinner out — you get the complete financial intelligence to build a profitable pickleball facility. <span className="text-white font-bold">Every rupee you invest after this will thank you.</span>
          </p>

          <button 
            onClick={scrollToPricing}
            className="group relative inline-flex items-center gap-4 bg-[#00a651] hover:bg-[#008f45] text-white font-black py-6 px-16 rounded-full text-xl md:text-2xl transition-all hover:scale-110 active:scale-[0.98] shadow-3xl shadow-[#00a651]/30"
          >
            Get for ₹499 Before Price Rises
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="mt-12 flex items-center justify-center gap-4 text-gray-600 text-xs font-black uppercase tracking-[0.2em]">
            <span>✓ Instant Digital Access</span>
            <span className="opacity-30">•</span>
            <span>✓ Secure Razorpay Checkout</span>
            <span className="opacity-30">•</span>
            <span>✓ One-Time Payment, Lifetime Access</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="py-24 border-t border-white/5 bg-[#0B0F0E] relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-16 mb-24 text-center md:text-left transition-all">
          <div className="flex flex-col gap-8 items-center md:items-start max-w-sm">
            <span className="text-3xl font-black tracking-tighter text-white uppercase italic">
              PLAY<span className="text-[#b8ff47]">PRO</span>
            </span>
            <p className="text-gray-500 text-sm font-bold leading-relaxed uppercase tracking-wider">
              India's #1 Pickleball Business Infrastructure Partner. Build with data, not guesswork.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-gray-500">
            <div className="flex flex-col gap-5">
              <span className="text-white opacity-20">Legal</span>
              <a href="#" className="hover:text-[#b8ff47] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#b8ff47] transition-colors">Terms of Service</a>
            </div>
            <div className="flex flex-col gap-5">
              <span className="text-white opacity-20">Support</span>
              <a href="#" className="hover:text-[#b8ff47] transition-colors">Contact Expert</a>
              <a href="#" className="hover:text-[#b8ff47] transition-colors">Help Center</a>
            </div>
            <div className="flex flex-col gap-5">
              <span className="text-white opacity-20">Social</span>
              <a href="#" className="hover:text-[#b8ff47] transition-colors">Instagram</a>
              <a href="#" className="hover:text-[#b8ff47] transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/10 opacity-30">
          <p className="text-[10px] font-black uppercase tracking-widest">
            © {new Date().getFullYear()} PlayPro Infrastructure. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest italic">
            Developed with <Heart className="w-3 h-3 text-[#b8ff47] fill-[#b8ff47]" /> by PlayPro Dev
          </div>
        </div>
      </div>
    </footer>
  );
}
