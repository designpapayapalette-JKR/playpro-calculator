'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPricing = () => {
    const pricing = document.getElementById('pricing');
    if (pricing) {
      pricing.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`fixed top-[38px] left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4 glass shadow-2xl' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link 
          href="/" 
          className="flex items-center gap-2 group transition-transform active:scale-95"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase italic">
            PLAY<span className="text-[#b8ff47]">PRO</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-bold uppercase tracking-widest text-white/70 hover:text-[#b8ff47] transition-colors">Home</a>
          <a href="#showcase" className="text-sm font-bold uppercase tracking-widest text-white/70 hover:text-[#b8ff47] transition-colors">Calculator</a>
          <a href="#pricing" className="text-sm font-bold uppercase tracking-widest text-white/70 hover:text-[#b8ff47] transition-colors">Pricing</a>
        </div>

        <button 
          onClick={scrollToPricing}
          className="group relative flex items-center gap-2 bg-[#00a651] hover:bg-[#008f45] text-white font-bold py-2.5 px-6 rounded-full text-sm md:text-base transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#00a651]/20"
        >
          Book Your Calculator
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </nav>
  );
}
