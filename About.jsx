const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Users, Target, Handshake } from 'lucide-react';

const DEALERSHIP_IMAGE = 'https://media.db.com/images/public/69e94e22c4b00238d47c4152/51b6b1e7c_generated_140843b8.png';
const LOGO_IMAGE = 'https://media.db.com/images/public/69e94e22c4b00238d47c4152/1cda19710_IMG_0091.png';
const MAPS_URL = 'https://maps.google.com/?q=2300+E+Dublin+Granville+Rd,+Columbus,+OH+43229';

export default function About() {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Header */}
      <div className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={DEALERSHIP_IMAGE} alt="PR Auto Group Dealership" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <span className="text-xs font-mono tracking-[0.3em] text-primary uppercase">About Us</span>
            <h1 className="font-heading text-3xl md:text-5xl text-foreground mt-2">WHO WE ARE</h1>
            <p className="text-sm text-primary font-mono tracking-widest mt-1 uppercase">Prestige Rides – PR Auto Group LLC</p>
          </div>
          <img src={LOGO_IMAGE} alt="Prestige Rides Logo" className="w-40 md:w-56 object-contain drop-shadow-2xl" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-xl md:text-2xl text-foreground mb-6">OUR STORY</h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Prestige Rides – PR Auto Group LLC was founded with a simple mission: make buying a quality 
                pre-owned vehicle an experience you actually enjoy. Located on East Dublin Granville Road 
                in Columbus, Ohio, we serve drivers across the greater Columbus area and beyond.
              </p>
              <p>
                We hand-select every vehicle on our lot, putting each through a comprehensive inspection 
                process. We believe transparency builds trust, which is why we offer honest pricing on 
                every car we sell — no hidden fees, no games.
              </p>
              <p>
                Whether you're looking for a reliable daily driver or a weekend cruiser, our team is here 
                to help you find the perfect match without the typical dealership pressure.
              </p>
            </div>
          </motion.div>

          {/* Values */}
          <div className="space-y-6">
            {[
              { icon: Target, title: 'Our Mission', desc: 'To provide Columbus with access to quality pre-owned vehicles at transparent prices, backed by genuine customer service.' },
              { icon: Users, title: 'Our Team', desc: 'A small, dedicated crew of car enthusiasts who treat every customer like family. No high-pressure sales, just honest guidance.' },
              { icon: Handshake, title: 'Our Promise', desc: 'Every vehicle inspected. Every price fair. Every customer valued. That\u2019s the PR Auto Group way.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading text-sm tracking-wider text-foreground">{title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-card border border-border rounded-lg p-8 md:p-12 text-center"
        >
          <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
          
          <h3 className="font-heading text-xl text-foreground mb-2">VISIT OUR LOT</h3>
          <p className="text-sm font-mono text-primary tracking-wider mb-2">Prestige Rides – PR Auto Group</p>
          <p className="text-sm text-muted-foreground mb-4">
            2300 E Dublin Granville Rd, Columbus, OH 43229<br />
            Mon–Sat: 9AM–7PM | Sunday: Closed
          </p>

          {/* GPS pin link — works on both iOS (Apple Maps) and Android (Google Maps) */}
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mb-6 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-primary" />
            Tap to open in Maps
          </a>

          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <Link
              to="/inventory"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-body text-sm tracking-wider px-8 py-3 rounded-sm hover:bg-primary/90 transition-all"
            >
              BROWSE INVENTORY <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-primary text-primary font-body text-sm tracking-wider px-8 py-3 rounded-sm hover:bg-primary/10 transition-all"
            >
              <MapPin className="w-4 h-4" /> GET DIRECTIONS
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 border border-border text-foreground font-body text-sm tracking-wider px-8 py-3 rounded-sm hover:border-primary/50 transition-all"
            >
              CONTACT US
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}