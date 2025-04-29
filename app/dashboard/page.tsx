'use client';
import MapView from '@/components/MapView';
import DestinationList from '@/components/DestinationList';
import { useState } from 'react';

export default function Dashboard() {
    const [coordinates, setCoordinates] = useState<[number, number] | null>(null);


    return (
        <main className="h-screen">
            <MapView  />
            <div className="p-3  fixed z-10 top-1">
                <DestinationList />
            </div>
            {coordinates && (
                <div className="absolute bottom-4 left-4 bg-white/80 text-black px-3 py-1 rounded">
                    Lat: {coordinates[0].toFixed(4)}, Lng: {coordinates[1].toFixed(4)}
                </div>
            )}

        </main>
    );
}
