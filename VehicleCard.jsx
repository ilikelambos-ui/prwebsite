import React from 'react';
import { Link } from 'react-router-dom';
import { Gauge, Fuel, Settings2, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VehicleCard({ vehicle }) {
  const mainPhoto = vehicle.photos?.[0];
  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <Link
        to={`/vehicle/${vehicle.id}`}
        className="group block bg-card border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-500"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
          {mainPhoto ? (
            <img
              src={mainPhoto}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <Settings2 className="w-12 h-12 opacity-20" />
            </div>
          )}
          
          {/* Overlays */}
          {vehicle.just_arrived && (
            <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-sm">
              Just In
            </div>
          )}
          {vehicle.status === 'pending' && (
            <div className="absolute top-3 right-3 bg-yellow-500/90 text-black text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-sm">
              Sale Pending
            </div>
          )}
          
          {/* Price overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-10">
            <p className="font-heading text-xl text-white">
              ${vehicle.price?.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-heading text-sm tracking-wide text-foreground truncate">{title}</h3>
            {vehicle.trim && (
              <p className="text-xs text-muted-foreground mt-0.5">{vehicle.trim}</p>
            )}
          </div>
          
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {vehicle.mileage != null && (
              <span className="flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-primary/70" />
                <span className="font-mono">{vehicle.mileage.toLocaleString()} mi</span>
              </span>
            )}
            {vehicle.transmission && (
              <span className="flex items-center gap-1">
                <Settings2 className="w-3.5 h-3.5 text-primary/70" />
                {vehicle.transmission}
              </span>
            )}
            {vehicle.fuel_type && (
              <span className="flex items-center gap-1">
                <Fuel className="w-3.5 h-3.5 text-primary/70" />
                {vehicle.fuel_type}
              </span>
            )}
          </div>

          {vehicle.stock_number && (
            <p className="text-[10px] font-mono text-muted-foreground/60 tracking-wider">
              STK# {vehicle.stock_number}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}