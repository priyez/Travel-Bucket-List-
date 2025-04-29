'use client';

import { useEffect, useState } from 'react';

export default function MapRevealCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute z-[5] w-full h-screen hidden md:flex overflow-hidden">
      {/* Map Layer */}
      <div className="absolute inset-0 z-0">
      <img
          src="/map.jpg"
          alt="Map Preview"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Black Overlay with Mask */}
      <div
        className="absolute inset-0 z-10 bg-black pointer-events-none"
        style={{
          WebkitMaskImage: `radial-gradient(circle 100px at ${pos.x}px ${pos.y}px, transparent 0%, black 100%)`,
          maskImage: `radial-gradient(circle 100px at ${pos.x}px ${pos.y}px, transparent 0%, black 100%)`,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          transition: 'mask-image 0.1s ease, -webkit-mask-image 0.1s ease',
        }}
      />
    </div>
  );
}
