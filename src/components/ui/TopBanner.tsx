import React from 'react';

export default function TopBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-[#0B0F0E] border-b border-white/5 py-2.5 px-4 text-center text-[9px] md:text-[10px] font-black tracking-[0.3em] uppercase text-gray-400">
      <span className="inline-flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#b8ff47] animate-pulse" />
        Launch Offer: <span className="text-white">₹499</span>
        <span className="opacity-20">|</span>
        Only <span className="text-[#b8ff47]">200 Licenses</span> Available
        <span className="opacity-20">|</span>
        <span className="text-white/80">Blueprint + Calculator Bundle</span>
      </span>
    </div>
  );
}
