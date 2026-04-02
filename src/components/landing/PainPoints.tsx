'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, XCircle, Trash2, TrendingDown, Clock } from 'lucide-react';

const painPoints = [
  {
    title: "Blowing CAPEX by ₹8–12 Lakhs",
    icon: <ShieldAlert className="w-6 h-6" />,
    description: "Hidden costs — drainage, lighting specs, net systems, legal permissions — catch investors off guard. Most budgets are off by 30–50% before the first court is even laid."
  },
  {
    title: "Monthly Burn Shock (OPEX)",
    icon: <Trash2 className="w-6 h-6" />,
    description: "A single court facility runs ₹2.5L+ every month — staff, electricity, AMC, maintenance. Without a model, you won't know you're bleeding until it's too late."
  },
  {
    title: "Leaving 40% Revenue On The Table",
    icon: <TrendingDown className="w-6 h-6" />,
    description: "Court bookings alone won't make you profitable. Coaching, tournaments, memberships, and F&B can double your revenue — only if you model them in advance."
  },
  {
    title: "No Break-Even Visibility",
    icon: <Clock className="w-6 h-6" />,
    description: "Are you 9 months from profit or 4 years? Without a clear P&L model, you're flying blind in a ₹20L+ investment. That's not a risk — that's recklessness."
  },
  {
    title: "Paying ₹25,000+ for a Consultant",
    icon: <XCircle className="w-6 h-6" />,
    description: "Financial consultants charge ₹25,000+ for the same analysis. This calculator gives you the exact output — built for Indian pickleball — for just ₹499."
  }
];

export default function PainPoints() {
  return (
    <section className="py-24 md:py-32 bg-[#0B0F0E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-8"
          >
            ⚠ Risk Factors: Most Investors Get These Wrong
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-4 leading-[1.1]"
          >
            These 5 Mistakes Have <br /> <span className="text-red-400">Buried</span> Pickleball Businesses.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto font-medium"
          >
            Don't guess your way through a ₹20L+ investment. The PlayPro Calculator flags every one of these before you commit.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="bg-[#151A19] border border-white/5 p-7 rounded-[2rem] hover:border-red-500/30 hover:bg-[#1f1510] transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-500 group-hover:text-white transition-all duration-500 text-red-400">
                {point.icon}
              </div>
              <h3 className="text-lg font-black mb-3 leading-tight tracking-tight group-hover:text-white transition-colors">{point.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium group-hover:text-gray-400 transition-colors">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bridge to solution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 md:p-12 bg-gradient-to-r from-[#0a1f0e] to-[#0B0F0E] border border-[#00a651]/30 rounded-[2rem] text-center"
        >
          <p className="text-2xl md:text-3xl font-black mb-2">
            The PlayPro Calculator was built to <span className="text-[#b8ff47]">fix every single one</span> of these.
          </p>
          <p className="text-gray-400 font-medium">For ₹499 — less than a single court booking — you get a complete financial plan.</p>
        </motion.div>
      </div>
    </section>
  );
}
