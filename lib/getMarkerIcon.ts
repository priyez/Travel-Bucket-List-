// lib/getMarkerIcon.ts
import L from 'leaflet';

export const getMarkerIcon = (category: string) => {
  let color;

  switch (category) {
    case 'dream':
      color = 'blue';
      break;
    case 'planned':
      color = 'orange';
      break;
    case 'completed':
      color = 'green';
      break;
    default:
      color = 'gray';
  }

  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%;"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

