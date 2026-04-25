const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import VehicleCard from '../components/vehicles/VehicleCard';
import InventoryFilters from '../components/vehicles/InventoryFilters';
import { Car } from 'lucide-react';

export default function Inventory() {
  const urlParams = new URLSearchParams(window.location.search);
  const [filters, setFilters] = useState({
    make: urlParams.get('make') || '',
    body_style: urlParams.get('body_style') || '',
    year: '',
    search: '',
    max_price: urlParams.get('max_price') ? Number(urlParams.get('max_price')) : '',
  });

  const { data: vehicles = [], isLoading } = useQuery({
    queryKey: ['vehicles-all'],
    queryFn: () => db.entities.Vehicle.filter({ status: 'available' }, '-created_date', 200),
  });

  const filtered = useMemo(() => {
    return vehicles.filter(v => {
      if (filters.make && v.make !== filters.make) return false;
      if (filters.body_style && v.body_style !== filters.body_style) return false;
      if (filters.year && v.year !== filters.year) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const haystack = `${v.year} ${v.make} ${v.model} ${v.trim || ''} ${v.vin || ''} ${v.exterior_color || ''}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (filters.max_price && v.price > filters.max_price) return false;
      return true;
    });
  }, [vehicles, filters]);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-card border-b border-border py-10 md:py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-mono tracking-[0.3em] text-primary uppercase">Browse</span>
          <h1 className="font-heading text-3xl md:text-5xl text-foreground mt-2">OUR INVENTORY</h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-lg">
            Explore our full selection of quality pre-owned vehicles. Every vehicle is inspected and ready to drive.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <InventoryFilters filters={filters} setFilters={setFilters} vehicles={vehicles} />

        <div className="mt-4 mb-6 text-xs text-muted-foreground font-mono tracking-wider">
          {filtered.length} VEHICLE{filtered.length !== 1 ? 'S' : ''} FOUND
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-card border border-border rounded-lg animate-pulse">
                <div className="aspect-[4/3] bg-secondary" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-secondary rounded w-3/4" />
                  <div className="h-3 bg-secondary rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Car className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No vehicles match your search</p>
            <button
              onClick={() => setFilters({ make: '', body_style: '', year: '', search: '', max_price: '' })}
              className="text-primary text-sm mt-2 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}