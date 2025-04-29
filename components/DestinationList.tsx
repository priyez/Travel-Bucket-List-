'use client';

import { useEffect } from 'react';
import useDestinationStore from '../store/destinationStore';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { DragEndEvent } from '@dnd-kit/core';
import { Destination } from '@/types/types';

function SortableItem({ destination }: { destination: Destination }) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: destination.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { removeDestination } = useDestinationStore();

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-1 px-2 border rounded-md flex justify-between items-center cursor-move bg-[#111]"
    >
      <span
        className={`px-1 py-1 rounded-full h-[10px] w-[10px] text-white text-xs ${
          destination.category === 'dream'
            ? 'bg-blue-500'
            : destination.category === 'planned'
            ? 'bg-orange-500'
            : 'bg-green-500'
        }`}
      />
      <div>
        <p className="font-light mx-2 text-xs">{destination.name}</p>
      </div>
      <button className='z-10' onClick={() => removeDestination(destination.id)}>x</button>
    </li>
  );
}

export default function DestinationList() {
  const { destinations, setDestinations } = useDestinationStore();

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
  
    if (!over) return; 
  
    if (active.id !== over.id) {
      const oldIndex = destinations.findIndex((d) => d.id === active.id);
      const newIndex = destinations.findIndex((d) => d.id === over.id);
      const reordered = arrayMove(destinations, oldIndex, newIndex);
      setDestinations(reordered);
    }
  };
  
  useEffect(() => {
    console.log(destinations);
  }, [destinations]);

  if (destinations.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No destinations added yet. Click on the map to add one!
      </div>
    );
  }

  return (
    <div className="w-[90%] md:w-[85%] max-w-2xl bg-black py-2 text-white rounded-lg shadow-xl border border-border p-4 px-1.5 mt-6">
      <h2 className="text-sm font-semibold mb-4">📍 My Destinations</h2>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={destinations.map((d) => d.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="space-y-2">
            {destinations.map((destination) => (
              <SortableItem key={destination.id} destination={destination} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}
