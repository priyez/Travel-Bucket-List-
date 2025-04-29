'use client'; // This makes sure this file is client-only

import { create } from 'zustand';

interface Destination {
  id: string;
  name: string;
  coordinates: [number, number];
  locationName: string;
  category: 'dream' | 'planned' | 'completed';
  imageUrl?: string | null;
}

interface DestinationStore {
  destinations: Destination[];
  clickedCoordinates: [number, number] | null;
  addDestination: (destination: Destination) => void;
  updateCategory: (id: string, newCategory: Destination['category']) => void;
  removeDestination: (id: string) => void;
  setClickedCoordinates: (coordinates: [number, number]) => void;
  setDestinations: (destinations: Destination[]) => void;
}

const useDestinationStore = create<DestinationStore>((set) => {
  return {
    destinations: [],
    clickedCoordinates: null,
    addDestination: (destination) => {
      set((state) => {
        const updated = [...state.destinations, destination];
        if (typeof window !== 'undefined') {
          localStorage.setItem('destinations', JSON.stringify(updated));
        }
        return { destinations: updated };
      });
    },
    updateCategory: (id, newCategory) => {
      set((state) => {
        const updated = state.destinations.map((dest) =>
          dest.id === id ? { ...dest, category: newCategory } : dest
        );
        if (typeof window !== 'undefined') {
          localStorage.setItem('destinations', JSON.stringify(updated));
        }
        return { destinations: updated };
      });
    },
    removeDestination: (id) => {
      set((state) => {
        const updated = state.destinations.filter((dest) => dest.id !== id);
        if (typeof window !== 'undefined') {
          localStorage.setItem('destinations', JSON.stringify(updated));
        }
        return { destinations: updated };
      });
    },
    setClickedCoordinates: (coordinates) => set({ clickedCoordinates: coordinates }),
    setDestinations: (destinations) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('destinations', JSON.stringify(destinations));
      }
      set({ destinations });
    },
  };
});

// Hydrate from localStorage only on the client
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('destinations');
  if (saved) {
    useDestinationStore.getState().setDestinations(JSON.parse(saved));
  }
}

export default useDestinationStore;
