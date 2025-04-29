'use client';

import { useEffect, useState } from 'react';
import { MapPinned } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MapPinCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-50 transition-transform duration-100 ease-out lg:block hidden"
      style={{
        top: position.y - 12,
        left: position.x - 12,
      }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.2 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <MapPinned className="text-[#0060d1] w-6 h-6 drop-shadow-lg animate-bounce" />
      </motion.div>
    </div>
  );  
}
