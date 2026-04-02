'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, Edit3, Eye, Rocket, ChevronRight } from 'lucide-react';

const steps = [
  {
    title: "Instant Download",
    icon: <Download className="w-8 h-8" />,
    description: "Pay once. Get instant access. The complete .xlsx file lands in your inbox within seconds — no waiting, no shipping."
  },
  {
    title: "Fill Your Numbers",
    icon: <Edit3 className="w-8 h-8" />,
    description: "Enter your city, rent, court count, and team size into clearly marked input cells. Sticky notes guide you at every step."
  },
  {
    title: "See Your ROI",
    icon: <Eye className="w-8 h-8" />,
    description: "Your break-even chart, 5-year P&L, and payback period update live. See exactly when your facility turns profitable."
  },
  {
    title: "Build With Confidence",
    icon: <Rocket className="w-8 h-8" />,
    description: "Export your complete business plan. Walk into any landlord, investor, or bank meeting with the exact numbers behind you."
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 md:py-32 bg-[#0B0F0E] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00a651]/5 blur-[100px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#151A19] border border-white/5 text-[#b8ff47] text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-8"
          >
            Ready in Minutes
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-4 leading-[1.1]"
          >
            From Payment to Business Plan <br /> <span className="text-[#b8ff47]">in Under 10 Minutes.</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-[4rem] left-[10rem] right-[10rem] h-[2px] bg-gradient-to-r from-transparent via-[#00a651]/20 to-transparent z-0" />
          
          <div className="grid lg:grid-cols-4 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-32 h-32 bg-[#151A19] border-2 border-white/5 rounded-[3rem] flex items-center justify-center mb-10 shadow-3xl shadow-[#00a651]/5 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:border-[#b8ff47] text-[#b8ff47] group-hover:bg-[#b8ff47] group-hover:text-[#0B0F0E]">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tighter group-hover:text-[#b8ff47] transition-colors">{step.title}</h3>
                <p className="text-gray-400 max-w-[16rem] text-sm md:text-base font-medium leading-relaxed group-hover:text-gray-300">
                  {step.description}
                </p>
                
                {/* Connector Arrow (Desktop) */}
                {index < 3 && (
                  <div className="hidden lg:block absolute -right-[2rem] top-[4rem] -translate-y-1/2 text-[#00a651]/30 group-hover:text-[#b8ff47] transition-colors">
                    <ChevronRight className="w-8 h-8" />
                  </div>
                )}

                {/* Step badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#00a651] text-white rounded-[1.5rem] flex items-center justify-center font-black text-lg border-4 border-[#0B0F0E] shadow-2xl group-hover:bg-[#b8ff47] group-hover:text-[#0B0F0E] transition-all">
                  0{index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
