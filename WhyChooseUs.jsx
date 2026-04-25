import React from 'react';
import { motion } from 'framer-motion';
import { Shield, DollarSign, FileCheck, Headphones } from 'lucide-react';

const reasons = [
  {
    icon: Shield,
    title: 'Quality Inspected',
    desc: 'Every vehicle undergoes a thorough multi-point inspection before hitting our lot.'
  },
  {
    icon: DollarSign,
    title: 'Transparent Pricing',
    desc: 'No hidden fees, no surprises. The price you see is the price you pay.'
  },
  {
    icon: FileCheck,
    title: 'Clean History',
    desc: 'We provide full vehicle history reports so you can buy with confidence.'
  },
  {
    icon: Headphones,
    title: 'Personal Service',
    desc: 'Our team is dedicated to finding the right vehicle for your lifestyle and budget.'
  },
];

export default function WhyChooseUs({ detailImage }) {
  return (
    <section className="py-16 md:py-24 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src={detailImage}
                alt="Vehicle detail"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-primary rounded-lg" />
          </motion.div>

          {/* Content */}
          <div>
            <span className="text-xs font-mono tracking-[0.3em] text-primary uppercase">Why PR Auto Group</span>
            <h2 className="font-heading text-2xl md:text-4xl text-foreground mt-2 mb-8">THE PR DIFFERENCE</h2>
            
            <div className="space-y-6">
              {reasons.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 shrink-0 rounded-sm bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-body font-semibold text-foreground text-sm tracking-wider">{title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}