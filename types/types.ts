
export type Destination = {
    id: string;
    name: string;
    locationName: string;
    category: 'dream' | 'planned' | 'completed';
    coordinates: [number, number];
    imageUrl?: string | null;
  };
  