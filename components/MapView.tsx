'use client';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMapEvents } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { Link } from 'lucide-react';
import { getMarkerIcon } from '@/lib/getMarkerIcon';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import useDestinationStore from '../store/destinationStore';
import { useEffect, useState } from 'react';
import AddDestinationForm from '@/components/AddDestinationForm';
import { decodeTripData } from '@/lib/encodeTrip';
import { Toaster, toast } from "sonner";
import { useSearchParams } from 'next/navigation'; // next.js app router
import { Destination } from '@/types/types';

function MapEvents({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(event) {
      const lat = event.latlng.lat;
      const lng = event.latlng.lng;
      onMapClick(lat, lng); // Pass coordinates to parent
    }
  });

  return null; // This component doesn't render anything itself
}

export default function MapView() {
  const { destinations, setDestinations } = useDestinationStore();
  const center: LatLngExpression = [20, 0];
  const defaultZoom = 2;
  const [userLocation, setUserLocation] = useState<LatLngExpression | null>(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState<[number, number] | null>(null);
  const [selectedLocationName, setSelectedLocationName] = useState<string>('');
  const searchParams = useSearchParams();

  // Handle if page has a ?code= in URL
  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      try {
        const sharedDestinations = decodeTripData(code);
        setDestinations(sharedDestinations);
      } catch (error) {
        console.error('Failed to decode trip data', error);
      }
    }
  }, [searchParams, setDestinations]);



  const encodeTripData = (destinations: Destination[]) => {
    return btoa(JSON.stringify(destinations));
  };

  

  const handleGenerateLink = () => {
      const code = encodeTripData(destinations);
      const url = `http://localhost:3000/dashboard?code=${code}`;
      navigator.clipboard.writeText(url)
        .then(() => toast.success("Shareable link copied to clipboard!"))
        .catch((err) => console.error('Failed to copy', err));
    
  };
  

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, []);

  const handleMapClick = async (lat: number, lng: number) => {
    setSelectedCoordinates([lat, lng]); // set clicked coordinates

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await response.json();
      console.log('Location Name:', data.display_name);
      setSelectedLocationName(data.display_name || '');
      // You can store the location name somewhere if you want
    } catch (error) {
      console.error('Error fetching location name:', error);
    }
  };

  return (
    <div className="relative h-screen w-screen">
      <Toaster richColors position="top-left" />
      <MapContainer
        center={userLocation || center}
        zoom={userLocation ? 6 : defaultZoom}
        minZoom={defaultZoom}
        scrollWheelZoom={true}
        zoomControl={false}
        className="h-full w-full z-0"
        worldCopyJump={true}
        maxBounds={[[-90, -180], [90, 180]]}
      >
        <MapEvents onMapClick={handleMapClick} /> {/* Attach the MapEvents component here */}

        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />


        {destinations.map((destination) => (
          <Marker
            key={destination.id}
            position={destination.coordinates}
            icon={getMarkerIcon(destination.category)}
          >
            <Popup>
              <div className="space-y-1">
                <div className="font-bold text-white">{destination.name}</div>
                <div className="text-xs text-gray-300 capitalize">{destination.category}</div>
              </div><Popup>
                <div className="space-y-1">
                  <div className="font-bold text-white">{destination.name}</div>
                  <div className="text-xs text-gray-300 capitalize">{destination.category}</div>
                </div>
              </Popup>

            </Popup>

          </Marker>
        ))}

        <ZoomControl position="bottomright" />
      </MapContainer>
      {/* ExportTrip should probably be passed some trip data */}
      <div className="p-8 fixed z-10 right-0 bottom-12">

      </div>
      <button
        onClick={handleGenerateLink}
        className="fixed top-4 right-4 bg-white h-14 w-14 text-black px-4 py-2 rounded-full"
      >
        <Link />
      </button>

      {/* Pass selectedCoordinates to the form */}
      {selectedCoordinates && (
        <div className="fixed bottom-4 left-4 md:left-auto md:right-4 z-10 px-1 w-[350px] max-w-full">
          <AddDestinationForm
            initialCoordinates={selectedCoordinates}
            initialName={selectedLocationName}
          />
        </div>

      )}


    </div>
  );
}
