'use client';
import MapView from '@/components/MapView';
import DestinationList from '@/components/DestinationList';
import { useState } from 'react';

export default function Dashboard() {
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

  const handleMapClick = (lat: number, lng: number) => {
    setCoordinates([lat, lng]); // Update the coordinates when map is clicked
  };

  return (
    <main className="h-screen">
      <MapView onMapClick={handleMapClick} />
      <div className="p-3  fixed z-10 top-1">
      <DestinationList />
      </div>
    </main>
  );
}
