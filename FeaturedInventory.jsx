import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import VehicleCard from '../vehicles/VehicleCard';

export default function FeaturedInventory({ vehicles, isLoading }) {
  if (isLoading) {
    return (
      <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-card border border-border rounded-lg animate-pulse">
              <div className="aspect-[4/3] bg-secondary" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-secondary rounded w-3/4" />
                <div className="h-3 bg-secondary rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  const featured = vehicles.slice(0, 6);

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10"
      >
        <div>
          <span className="text-xs font-mono tracking-[0.3em] text-primary uppercase">Our Selection</span>
          <h2 className="font-heading text-2xl md:text-4xl text-foreground mt-2">LATEST ARRIVALS</h2>
        </div>
        <Link
          to="/inventory"
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-body tracking-wider"
        >
          VIEW ALL <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>

      {featured.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg">Inventory coming soon</p>
          <p className="text-sm mt-2">Check back for our latest vehicles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </section>
  );
}