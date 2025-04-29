'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function TapToRevealMap() {
  const [spot, setSpot] = useState<{ x: number; y: number } | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpot({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onClick={handleClick}
      className="relative z-[8] flex md:hidden w-full h-screen overflow-hidden touch-none"
    >
      {/* Map Layer */}
      <div className="absolute inset-0 z-0">
      <Image
          src="/map.jpg"
          alt="Map Preview"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 z-10 bg-black"
        style={
          spot
            ? {
                WebkitMaskImage: `radial-gradient(circle 120px at ${spot.x}px ${spot.y}px, transparent 0%, black 100%)`,
                maskImage: `radial-gradient(circle 120px at ${spot.x}px ${spot.y}px, transparent 0%, black 100%)`,
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                transition: 'mask-image 0.2s ease',
              }
            : {}
        }
      />
    </div>
  );
}
