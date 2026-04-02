'use client';

import React from 'react';
import Navbar from '@/components/ui/Navbar';
import TopBanner from '@/components/ui/TopBanner';
import Hero from '@/components/landing/Hero';
import PainPoints from '@/components/landing/PainPoints';
import ProductShowcase from '@/components/landing/ProductShowcase';
import HowItWorks from '@/components/landing/HowItWorks';
import Pricing from '@/components/landing/Pricing';
import FAQ from '@/components/landing/FAQ';
import { FinalCTA, Footer } from '@/components/landing/FinalCTA';
import { Numbers, Testimonial } from '@/components/landing/Sections';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0F0E] selection:bg-[#4ADE80] selection:text-[#0B0F0E]">
      <TopBanner />
      <Navbar />
      
      <Hero />
      <div className="bg-grid opacity-10 absolute inset-0 pointer-events-none" />
      
      <PainPoints />
      <ProductShowcase />
      <HowItWorks />
      <Numbers />
      <Testimonial />
      <Pricing />
      <FAQ />
      <FinalCTA />
      
      <Footer />
    </main>
  );
}
