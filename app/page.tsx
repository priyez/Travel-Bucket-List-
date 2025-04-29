'use client';

import { MapPinned } from 'lucide-react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import MapRevealCursor from '@/components/MapRevealCursor';
import TapReveal from '@/components/TapReveal';
import Link from 'next/link';

// Lazy-load the cursor
const MapPinCursor = dynamic(() => import('@/components/MapPinCursor'), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">

     
      <MapRevealCursor />
      <TapReveal/>
      <MapPinCursor />
      <div className="absolute inset-0 z-[2] bg-black" />
      <div className="absolute md:relative z-20  flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          className="text-center space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-[#0060d1]/10 px-6 py-3 rounded-full border border-[#0060d1]/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-sm text-[#0060d1]">
            Organize your travel destinations
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-[#FFFBDB] block">
              Turn Your Travel
            </span>
            <span className="text-[#0060d1] block">
              Dreams into a Visual Journey
            </span>
          </motion.h1>

          <motion.p
            className="text-[#FFFBDB]/70 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Add, categorize, and share your travel destinations – all on an interactive map.
          </motion.p>

          <motion.div
            className="flex gap-5 flex-col"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <Link href="/dashboard" className="relative flex w-full md:px-82 flex-col justify-center group">
              <div className="relative bg-[#0060d1] text-[#FFFBDB] text-lg px-8 py-4 rounded-full flex items-center justify-center gap-2 border border-[#0060d1]/50">
                Start Planning <MapPinned />
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
