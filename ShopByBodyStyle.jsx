import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const STYLES = [
  { label: 'SUV', icon: '🚙', value: 'SUV' },
  { label: 'Sedan', icon: '🚗', value: 'Sedan' },
  { label: 'Truck', icon: '🛻', value: 'Truck' },
  { label: 'Van', icon: '🚐', value: 'Van' },
  { label: 'Coupe', icon: '🏎️', value: 'Coupe' },
  { label: 'Hatchback', icon: '🚘', value: 'Hatchback' },
];

export default function ShopByBodyStyle() {
  const navigate = useNavigate();

  return (
    <section className="py-14 md:py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <span className="text-xs font-mono tracking-[0.3em] text-primary uppercase">Browse By Type</span>
        <h2 className="font-heading text-2xl md:text-4xl text-foreground mt-2">SHOP BY BODY STYLE</h2>
      </motion.div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 md:gap-4">
        {STYLES.map(({ label, icon, value }, i) => (
          <motion.button
            key={value}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            onClick={() => navigate(`/inventory?body_style=${value}`)}
            className="group flex flex-col items-center gap-3 bg-card border border-border rounded-lg p-4 md:p-6 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
          >
            <span className="text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300">{icon}</span>
            <span className="text-xs font-body font-semibold tracking-widest text-muted-foreground group-hover:text-primary transition-colors uppercase">
              {label}
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}