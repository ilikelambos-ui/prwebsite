import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Marcus T.',
    rating: 5,
    date: 'March 2024',
    text: "Easiest car buying experience I've ever had. No pressure, honest pricing, and the car was in perfect condition. Prestige Rides is the real deal!",
  },
  {
    name: 'Latoya W.',
    rating: 5,
    date: 'January 2024',
    text: "I was nervous about buying a used car but the team here made me feel completely comfortable. They walked me through everything and I drove off same day. 10/10 recommend.",
  },
  {
    name: 'Derek S.',
    rating: 5,
    date: 'November 2023',
    text: "Great selection, great prices, and zero hidden fees. They even helped me find financing. Will be sending all my friends and family here.",
  },
  {
    name: 'Amanda R.',
    rating: 5,
    date: 'February 2024',
    text: "Bought my SUV from Prestige Rides and couldn't be happier. The staff was professional and knowledgeable. The extended warranty option gave me real peace of mind.",
  },
  {
    name: 'James O.',
    rating: 5,
    date: 'December 2023',
    text: "Transparent pricing, clean vehicles, no games. I've bought from big dealerships before and this was by far the best experience. Highly recommend!",
  },
  {
    name: 'Priya M.',
    rating: 5,
    date: 'April 2024',
    text: "Found exactly what I was looking for at the right price. The team was friendly and made the whole process smooth and stress-free. Love my new car!",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-xs font-mono tracking-[0.3em] text-primary uppercase">What Our Customers Say</span>
        <h2 className="font-heading text-2xl md:text-4xl text-foreground mt-2">GOOGLE REVIEWS</h2>
        <div className="flex items-center justify-center gap-1 mt-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-primary text-primary" />
          ))}
          <span className="ml-2 text-sm text-muted-foreground font-mono">5.0 · Rated on Google</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {REVIEWS.map(({ name, rating, date, text }, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-card border border-border rounded-lg p-6 flex flex-col gap-4 hover:border-primary/30 transition-colors"
          >
            <Quote className="w-6 h-6 text-primary/30" />
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">"{text}"</p>
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div>
                <p className="text-sm font-semibold text-foreground">{name}</p>
                <p className="text-[11px] text-muted-foreground font-mono">{date}</p>
              </div>
              <div className="flex gap-0.5">
                {[...Array(rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}