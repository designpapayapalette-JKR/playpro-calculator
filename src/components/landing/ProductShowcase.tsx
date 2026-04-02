'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, PieChart, CheckCircle2, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    title: "CAPEX Planner",
    badge: "Sheet 1",
    icon: <Calculator className="w-8 h-8" />,
    description: "Never get blindsided again. 30+ cost line items across 6 categories — from flooring and nets to drainage and safety lighting. Input your location, and the model auto-fills Indian benchmarks.",
    outcome: "Know your exact Day 1 investment before you sign anything."
  },
  {
    title: "OPEX Tracker",
    badge: "Sheet 2",
    icon: <TrendingUp className="w-8 h-8" />,
    description: "Model all 25+ fixed and variable monthly expenses — staff salaries, electricity, AMC, housekeeping, and more. See how costs change as you add courts or hire coaches.",
    outcome: "Know your monthly burn rate down to the last ₹1,000."
  },
  {
    title: "Revenue Model",
    badge: "Sheet 3",
    icon: <DollarSign className="w-8 h-8" />,
    description: "10+ revenue streams with peak/off-peak pricing logic, membership tiers, coaching programs, and tournament revenue. Most investors only model bookings — this models everything.",
    outcome: "Unlock 40% more revenue that most facilities leave untracked."
  },
  {
    title: "ROI & Break-Even",
    badge: "Sheet 4",
    icon: <PieChart className="w-8 h-8" />,
    description: "Automated 5-year P&L. Visual break-even charts. Month-by-month cash flow projections updated live as you tweak any variable. Walk into any investor meeting with confidence.",
    outcome: "Know exactly which month your facility turns profitable."
  }
];

export default function ProductShowcase() {
  return (
    <section id="showcase" className="py-24 md:py-32 bg-[#0B0F0E] relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#b8ff47]/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#151A19] border border-white/5 text-[#b8ff47] text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-8"
          >
            What You Get
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-4 leading-[1.1]"
          >
            4 Interconnected Sheets. <br /> <span className="text-[#b8ff47]">Zero Guesswork.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium"
          >
            Every sheet is cross-linked. Change one variable and your entire business plan updates instantly — CAPEX, OPEX, revenue, and ROI all in sync.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 md:p-10 bg-[#151A19] border border-white/5 rounded-[2.5rem] hover:bg-gradient-to-br hover:from-[#151A19] hover:to-[#1a2e23] hover:border-[#b8ff47]/30 transition-all duration-500 relative overflow-hidden flex flex-col gap-4"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#b8ff47]/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex items-start justify-between">
                <div className="p-4 bg-black/40 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-500 text-[#b8ff47] group-hover:bg-[#b8ff47] group-hover:text-[#0B0F0E]">
                  {feature.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                  {feature.badge}
                </span>
              </div>

              <h3 className="text-2xl font-black tracking-tighter group-hover:text-white transition-colors">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed font-medium group-hover:text-gray-300 transition-colors text-sm flex-1">
                {feature.description}
              </p>

              {/* Outcome */}
              <div className="flex items-start gap-3 mt-2 pt-5 border-t border-white/5">
                <CheckCircle2 className="w-4 h-4 text-[#b8ff47] mt-0.5 flex-shrink-0" />
                <p className="text-[#b8ff47] text-sm font-bold leading-snug">{feature.outcome}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature callout strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 md:p-12 bg-[#151A19] border border-white/5 rounded-[3rem] relative overflow-hidden group/card shadow-2xl"
        >
          <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none group-hover/card:opacity-20 transition-opacity" />
          
          <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-5 lg:pr-12">
              <div className="text-3xl md:text-4xl font-black mb-6 leading-tight tracking-tight">
                No Finance Background<br /><span className="text-[#b8ff47]">Required.</span>
              </div>
              <p className="text-gray-400 font-medium mb-8 leading-relaxed">
                Every input cell has a sticky note explaining exactly what to enter. Built for sports entrepreneurs — not accountants. If you can fill a form, you can use this.
              </p>
              <ul className="space-y-4">
                {[
                  "Works in Excel & Google Sheets",
                  "Fully editable — customize every variable",
                  "Guided notes on every input cell",
                  "Live P&L graphs update automatically",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-[#b8ff47] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => {
                  const pricing = document.getElementById('pricing');
                  if (pricing) pricing.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-10 inline-flex items-center gap-3 bg-[#00a651] hover:bg-[#008f45] text-white font-black px-8 py-4 rounded-full transition-all hover:scale-105 active:scale-95 text-sm"
              >
                Get the Full Blueprint for ₹499
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="lg:col-span-7">
              {/* Real Calculator Dashboard Preview */}
              <div className="relative group/preview">
                {/* Glow effect */}
                <div className="absolute -inset-2 bg-[#b8ff47]/10 blur-[40px] rounded-[2.5rem] opacity-0 group-hover/preview:opacity-100 transition-opacity duration-700" />

                {/* Browser chrome frame */}
                <div className="relative bg-[#1a1a1a] rounded-[1.5rem] border border-white/10 overflow-hidden shadow-2xl">
                  {/* Browser bar */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-[#111] border-b border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/60" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                      <div className="w-3 h-3 rounded-full bg-green-500/60" />
                    </div>
                    <div className="flex-1 mx-4 bg-white/5 rounded-md py-1 px-3 text-[10px] text-gray-500 font-mono">
                      PlayPro_Pickleball_Court_Calculator.xlsx
                    </div>
                    <div className="flex items-center gap-1 text-[#b8ff47] text-[10px] font-black uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#b8ff47] animate-pulse" />
                      Live Preview
                    </div>
                  </div>

                  {/* The actual screenshot */}
                  <div className="overflow-hidden">
                    <Image
                      src="/calculator-dashboard.png"
                      alt="PlayPro Pickleball Court Business Calculator — Dashboard"
                      width={1024}
                      height={640}
                      className="w-full h-auto object-cover transform transition-transform duration-[3s] group-hover/preview:scale-105"
                    />
                  </div>
                </div>

                {/* Annotation */}
                <div className="absolute -bottom-4 -right-4 bg-[#151A19] border border-[#b8ff47]/20 px-4 py-3 rounded-2xl shadow-xl">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#b8ff47]">✓ Real product. No mockup.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
