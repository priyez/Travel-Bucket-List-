'use client';
export const dynamic = 'force-dynamic'; // this is fine as a local export

import dynamicImport from 'next/dynamic';
// import DestinationList from '@/components/DestinationList';

const MapView = dynamicImport(() => import('@/components/MapView'), {
  ssr: false,
});
const DestinationList = dynamicImport(() => import('@/components/DestinationList'), {
    ssr: false,
  });

export default function Dashboard() {
  return (
    <main className="h-screen">
      <MapView />
      <div className="p-3 fixed z-60 top-1">
        <DestinationList />
      </div>
    </main>
  );
}
