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
  updateCategory: (id: string, newCategory: Destination['category']) => void; // Ensure 'id' is typed as string
  removeDestination: (id: string) => void; // Ensure 'id' is typed as string
  setClickedCoordinates: (coordinates: [number, number]) => void;
  setDestinations: (destinations: Destination[]) => void;
}

const useDestinationStore = create<DestinationStore>((set) => {
  // Load destinations from localStorage
  const savedDestinations = localStorage.getItem('destinations');
  const destinations = savedDestinations ? JSON.parse(savedDestinations) : [];

  return {
    destinations,
    clickedCoordinates: null, 
    addDestination: (destination) => {
      set((state) => {
        const updatedDestinations = [...state.destinations, destination];
        // Save to localStorage
        localStorage.setItem('destinations', JSON.stringify(updatedDestinations));
        return { destinations: updatedDestinations };
      });
    },
    updateCategory: (id: string, newCategory: Destination['category']) => {
      set((state) => {
        const updatedDestinations = state.destinations.map((dest) =>
          dest.id === id ? { ...dest, category: newCategory } : dest
        );
        // Save to localStorage
        localStorage.setItem('destinations', JSON.stringify(updatedDestinations));
        return { destinations: updatedDestinations };
      });
    },
    removeDestination: (id: string) => { // Ensure 'id' is typed as string
      set((state) => {
        const updatedDestinations = state.destinations.filter((dest) => dest.id !== id);
        // Save to localStorage
        localStorage.setItem('destinations', JSON.stringify(updatedDestinations));
        return { destinations: updatedDestinations };
      });
    },
    setClickedCoordinates: (coordinates) => set({ clickedCoordinates: coordinates }),
    setDestinations: (destinations) => {
      set({ destinations });
      // Save to localStorage
      localStorage.setItem('destinations', JSON.stringify(destinations));
    },
  };
});

export default useDestinationStore;
