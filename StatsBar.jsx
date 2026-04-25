import React from 'react';
import { motion } from 'framer-motion';

const STATS = [
  { value: '100+', label: 'Vehicles Sold' },
  { value: '5★', label: 'Customer Rating' },
  { value: 'Extended', label: 'Warranty Available' },
  { value: '100%', label: 'Inspected Vehicles' },
];

export default function StatsBar() {
  return (
    <section className="bg-primary py-10 md:py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {STATS.map(({ value, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <p className="font-heading text-3xl md:text-4xl text-primary-foreground">{value}</p>
            <p className="text-xs text-primary-foreground/75 tracking-widest uppercase mt-1 font-body">{label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}