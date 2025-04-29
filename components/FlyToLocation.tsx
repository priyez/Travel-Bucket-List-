'use client';

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

interface FlyToLocationProps {
  coordinates: LatLngExpression;
}

export default function FlyToLocation({ coordinates }: FlyToLocationProps) {
  const map = useMap();

  useEffect(() => {
    if (coordinates) {
      map.flyTo(coordinates, 6, { duration: 2 }); 
      // 6 = zoom level, 2 = seconds for smooth animation
    }
  }, [coordinates, map]);

  return null;
}
