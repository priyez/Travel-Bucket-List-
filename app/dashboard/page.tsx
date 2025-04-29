'use client';
export const dynamic = 'force-dynamic'; // disables prerendering
import MapView from '@/components/MapView';
import DestinationList from '@/components/DestinationList';


export default function Dashboard() {


    return (
        <main className="h-screen">
            <MapView />
            <div className="p-3  fixed z-10 top-1">
                <DestinationList />
            </div>


        </main>
    );
}
