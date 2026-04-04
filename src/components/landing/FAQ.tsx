'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Does this work in Google Sheets, or only Excel?",
    answer: "Both. The file is built in Excel (.xlsx) and is fully compatible with Google Sheets. Just upload it to Google Drive and open — all formulas, charts, and cross-links work perfectly."
  },
  {
    question: "Can I customize the costs for my city — say, Pune vs Mumbai?",
    answer: "Yes, completely. All cost inputs are in clearly-labelled blue cells: land rent, labor, electricity rates, construction costs. Just override with your actual local numbers and everything recalculates instantly."
  },
  {
    question: "Is this a template or an actual financial model?",
    answer: "It's a fully live, cross-linked financial model. Change your court count from 2 to 4, and every CAPEX line, every OPEX row, every revenue projection, and your break-even timeline all update in real-time. Nothing is manual."
  },
  {
    question: "I have zero finance background. Will I be able to use this?",
    answer: "Absolutely. We built this for sports entrepreneurs, not accountants. Every input cell has a sticky note explaining exactly what to put there — in plain language. If you can fill a form, you can use this model."
  },
  {
    question: "Can I share this with my business partner or co-investor?",
    answer: "Yes — within your own business entity. You and your direct partners can use it for internal planning. Reselling, redistributing publicly, or sharing outside your company is not permitted."
  },
  {
    question: "What if ₹499 isn't worth it?",
    answer: "Consider this: If this model helps you avoid a ₹2L+ mistake on CAPEX, or unlocks one additional revenue stream worth ₹40,000/month — you've made 80x your investment back. The ₹499 is the smallest financial decision you'll make for your facility."
  },
  {
    question: "What is the refund policy?",
    answer: "Due to the digital and instant-delivery nature of the product, we do not offer refunds after download. However, if you face any technical issue, our priority support team responds within 24 hours — no questions asked."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 bg-[#0B0F0E] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#151A19] border border-white/5 text-[#b8ff47] text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-8"
          >
            Got Questions?
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-4 leading-[1.1]"
          >
            Everything You Need <span className="text-[#b8ff47]">To Know.</span>
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full text-left p-6 md:p-8 bg-[#151A19] border rounded-[24px] flex items-center justify-between transition-all duration-300 ${
                  openIndex === index ? 'border-[#b8ff47] bg-[#1a2e23]' : 'border-white/5 hover:border-[#b8ff47]/30'
                }`}
              >
                <span className="text-lg md:text-xl font-bold pr-8 leading-tight">
                  {faq.question}
                </span>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openIndex === index ? 'bg-[#4ADE80] text-[#0B0F0E]' : 'bg-white/5 text-gray-500'
                }`}>
                  {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-8 pb-10 text-gray-400 text-lg leading-relaxed border-x border-b border-white/5 rounded-b-[24px] -mt-6 pt-14 bg-[#151A19]/50">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
