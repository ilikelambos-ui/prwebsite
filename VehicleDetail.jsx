const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Gauge, Fuel, Settings2, Palette, Car,
  Calendar, Hash, MapPin, Phone, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function VehicleDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const vehicleId = window.location.pathname.split('/vehicle/')[1];
  const [activePhoto, setActivePhoto] = useState(0);

  const { data: vehicle, isLoading } = useQuery({
    queryKey: ['vehicle', vehicleId],
    queryFn: async () => {
      const vehicles = await db.entities.Vehicle.filter({ id: vehicleId });
      return vehicles[0];
    },
    enabled: !!vehicleId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Vehicle not found</p>
        <Link to="/inventory" className="text-primary text-sm hover:underline">Back to Inventory</Link>
      </div>
    );
  }

  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  const photos = vehicle.photos || [];

  const specs = [
    { icon: Gauge, label: 'Mileage', value: vehicle.mileage ? `${vehicle.mileage.toLocaleString()} mi` : null },
    { icon: Settings2, label: 'Transmission', value: vehicle.transmission },
    { icon: Fuel, label: 'Fuel Type', value: vehicle.fuel_type },
    { icon: Car, label: 'Drivetrain', value: vehicle.drivetrain },
    { icon: Settings2, label: 'Engine', value: vehicle.engine },
    { icon: Car, label: 'Body Style', value: vehicle.body_style },
    { icon: Palette, label: 'Exterior', value: vehicle.exterior_color },
    { icon: Palette, label: 'Interior', value: vehicle.interior_color },
    { icon: Calendar, label: 'Doors', value: vehicle.doors ? `${vehicle.doors} Door` : null },
  ].filter(s => s.value);

  const nextPhoto = () => setActivePhoto(p => (p + 1) % photos.length);
  const prevPhoto = () => setActivePhoto(p => (p - 1 + photos.length) % photos.length);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <Link to="/inventory" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Inventory
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Gallery - left 2 cols */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-[16/10] bg-card border border-border rounded-lg overflow-hidden"
            >
              {photos.length > 0 ? (
                <>
                  <img
                    src={photos[activePhoto]}
                    alt={`${title} photo ${activePhoto + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {photos.length > 1 && (
                    <>
                      <button onClick={prevPhoto} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors">
                        <ChevronLeft className="w-5 h-5 text-white" />
                      </button>
                      <button onClick={nextPhoto} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors">
                        <ChevronRight className="w-5 h-5 text-white" />
                      </button>
                      <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-mono">
                        {activePhoto + 1} / {photos.length}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <Car className="w-16 h-16 opacity-20" />
                </div>
              )}
            </motion.div>

            {/* Thumbnails */}
            {photos.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {photos.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhoto(i)}
                    className={`shrink-0 w-20 h-16 rounded overflow-hidden border-2 transition-all ${
                      i === activePhoto ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Specs grid */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-heading text-sm tracking-wider text-foreground mb-4">SPECIFICATIONS</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {specs.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon className="w-4 h-4 text-primary/70 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{label}</p>
                      <p className="text-sm text-foreground font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* VIN */}
            {vehicle.vin && (
              <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
                <Hash className="w-4 h-4 text-primary/70" />
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider">VIN</p>
                  <p className="text-sm font-mono text-foreground">{vehicle.vin}</p>
                </div>
              </div>
            )}

            {/* Description */}
            {vehicle.description && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-heading text-sm tracking-wider text-foreground mb-3">DESCRIPTION</h3>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{vehicle.description}</p>
              </div>
            )}

            {/* Features */}
            {vehicle.features && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-heading text-sm tracking-wider text-foreground mb-3">FEATURES</h3>
                <div className="flex flex-wrap gap-2">
                  {vehicle.features.split(',').map((f, i) => (
                    <span key={i} className="text-xs bg-secondary text-secondary-foreground px-3 py-1.5 rounded-sm">
                      {f.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky action column */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Price card */}
              <div className="bg-card border border-border rounded-lg p-6">
                {vehicle.trim && (
                  <p className="text-xs text-muted-foreground tracking-wider mb-1">{vehicle.trim}</p>
                )}
                <h1 className="font-heading text-xl md:text-2xl text-foreground">{title}</h1>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="font-heading text-3xl text-primary">
                    ${vehicle.price?.toLocaleString()}
                  </p>
                  {vehicle.stock_number && (
                    <p className="text-[10px] font-mono text-muted-foreground/60 tracking-wider mt-2">
                      STK# {vehicle.stock_number}
                    </p>
                  )}
                </div>

                {vehicle.status === 'pending' && (
                  <div className="mt-4 bg-yellow-500/10 border border-yellow-500/20 rounded-sm p-3 text-center">
                    <p className="text-xs font-bold text-yellow-500 tracking-widest uppercase">Sale Pending</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="bg-card border border-border rounded-lg p-6 space-y-3">
                <Link to="/contact" className="w-full">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 font-body tracking-wider text-sm">
                    SCHEDULE TEST DRIVE
                  </Button>
                </Link>
                <Link to={`/credit-application?vehicle=${encodeURIComponent(title)}`} className="w-full block">
                  <Button variant="outline" className="w-full h-12 font-body tracking-wider text-sm border-primary text-primary hover:bg-primary/10">
                    APPLY FOR FINANCING
                  </Button>
                </Link>
                <a href="tel:+16145551234" className="block">
                  <Button variant="outline" className="w-full h-12 font-body tracking-wider text-sm">
                    <Phone className="w-4 h-4 mr-2" /> CALL US
                  </Button>
                </a>
              </div>

              {/* Location */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">PR Auto Group LLC</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      2300 E Dublin Granville Rd<br />
                      Columbus, OH 43229
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}