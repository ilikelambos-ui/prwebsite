import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Award, Wrench } from 'lucide-react';

export default function HeroSection({ heroImage }) {
  return (
    <section className="relative min-h-[90vh] md:min-h-[85vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Premium vehicle"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-[1px] bg-primary" />
            <span className="text-xs font-mono tracking-[0.3em] text-primary uppercase">Prestige Rides · Columbus, Ohio</span>
          </div>
          
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-[0.95] tracking-tight">
            DRIVE<br />
            <span className="text-primary">PRESTIGE.</span><br />
            PAY LESS.
          </h1>

          <p className="mt-6 text-base md:text-lg text-muted-foreground font-body leading-relaxed max-w-md">
            Columbus's premier pre-owned dealership. Hand-picked inventory, 100% inspected, 
            transparent pricing — and extended warranty available on every vehicle.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to="/inventory"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-body font-semibold text-sm tracking-widest px-8 py-4 rounded-sm hover:bg-primary/90 transition-all group"
            >
              BROWSE INVENTORY
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 border border-border text-foreground font-body text-sm tracking-widest px-8 py-4 rounded-sm hover:border-primary/50 hover:text-primary transition-all"
            >
              CONTACT US
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap gap-6 md:gap-10">
            {[
              { icon: Shield, label: 'Inspected Vehicles' },
              { icon: Award, label: 'Trusted Since Day 1' },
              { icon: Wrench, label: 'Service Guarantee' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon className="w-4 h-4 text-primary/70" />
                <span className="tracking-wider">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}