'use client';

import React, { useState, useEffect } from 'react';
import useDestinationStore from '../store/destinationStore';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface AddDestinationFormProps {
  initialCoordinates: [number, number] | null;
  initialName: string;
}

export default function AddDestinationForm({ initialCoordinates = null, initialName = 'New Destination' }: AddDestinationFormProps) {
  const { addDestination } = useDestinationStore();

  // Set default state values
  const [name, setName] = useState<string>(initialName || 'New Destination'); // Default name
  const [category, setCategory] = useState<'dream' | 'planned' | 'completed'>('dream'); // Default category
  const [coordinates, setCoordinates] = useState<[number, number] | null>(initialCoordinates); // Default coordinates (null if not passed)
  const [imageUrl, setImageUrl] = useState<string | null>(null); // Default imageUrl (null)

  useEffect(() => {
    if (initialCoordinates) setCoordinates(initialCoordinates);
    if (initialName) setName(initialName);
  }, [initialCoordinates, initialName]);

  useEffect(() => {
    async function fetchImage() {
      if (!name) return;
      try {
        const res = await fetch(`/api/place-image?q=${encodeURIComponent(name)}`);
        const data = await res.json();
        if (data.imageUrl) setImageUrl(data.imageUrl);
      } catch (error) {
        console.error('Failed to fetch place image:', error);
      }
    }

    fetchImage();
  }, [name]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (coordinates && name) {
      const newDestination = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        locationName: name,
        category,
        coordinates,
        imageUrl,
      };
      addDestination(newDestination);
      setName(''); // Reset name after adding
      setCategory('dream'); // Reset category to default
      setCoordinates(null); // Reset coordinates
      setImageUrl(null); // Reset image URL
    }
  };

  return (
    <Card className="w-full bg-black py-2 text-white mx-auto mt-1 rounded-2xl shadow-xl border border-border">
      <CardContent className="p-2 space-y-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className='mt-2 mb-1'>
            <div className='flex w-full'>
              <div className='w-[30%] '>
              {imageUrl &&(
                <img src={imageUrl} alt={name} className="w-24 h-24 object-cover rounded-lg mb-2" />
              )}
              </div>
              <div className='px-2 w-[70%]'>
                <h4 className='text-sm pt-2'>{name}</h4>
              </div>
            </div>
            <div>
              <Label htmlFor="category" className='text-xs my-1'>Category</Label>
              <Select value={category} onValueChange={(val: any) => setCategory(val)}>
                <SelectTrigger id="category" className='w-full'>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dream">Dream</SelectItem>
                  <SelectItem value="planned">Planned</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-1 my-0">
            <Button type="submit" className="w-full my-1 bg-white text-black">
              Add Destination
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
