'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle2, Mail, ArrowLeft, Download } from 'lucide-react';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order');

  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#0B0F0E] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#4ADE80]/10 blur-[100px] rounded-full -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full text-center"
      >
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, stiffness: 200 }}
            className="w-24 h-24 bg-[#4ADE80] rounded-full flex items-center justify-center shadow-2xl shadow-[#4ADE80]/20"
          >
            <CheckCircle2 className="w-12 h-12 text-[#0B0F0E]" />
          </motion.div>
        </div>

        <h1 className="text-4xl md:text-6xl font-playfair font-black mb-6">
          Payment Successful! 🎉
        </h1>
        
        <p className="text-xl text-gray-400 mb-12 max-w-lg mx-auto leading-relaxed">
          Your PlayPro Calculator has been generated and sent to your inbox.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <div className="bg-[#151A19] border border-white/5 p-8 rounded-3xl text-left">
            <Mail className="w-6 h-6 text-[#4ADE80] mb-4" />
            <h3 className="font-bold mb-2">Check Your Email</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              We've sent the download link to your registered email address. Don't forget to check your spam folder!
            </p>
          </div>
          <div className="bg-[#151A19] border border-white/5 p-8 rounded-3xl text-left">
            <Download className="w-6 h-6 text-[#4ADE80] mb-4" />
            <h3 className="font-bold mb-2">Link Expiry</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              The download link is valid for 7 days. We recommend downloading and saving it to your cloud drive immediately.
            </p>
          </div>
        </div>

        {orderId && (
          <div className="mb-12 inline-block px-6 py-3 bg-white/5 border border-white/5 rounded-full text-sm font-mono text-gray-500">
            Order ID: <span className="text-white">{orderId}</span>
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <Link 
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="hidden md:block w-px h-4 bg-white/10" />
          
          <p className="text-sm text-gray-500">
            Need help? Contact <span className="text-[#4ADE80]">support@playpro.fit</span>
          </p>
        </div>
      </motion.div>
    </main>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0B0F0E] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#4ADE80]/20 border-t-[#4ADE80] rounded-full animate-spin" />
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
