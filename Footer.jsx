import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border font-body">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl text-foreground tracking-wider mb-1"><span className="text-primary">PRESTIGE</span> RIDES</h3>
            <p className="text-xs text-muted-foreground tracking-widest uppercase mb-4">PR Auto Group LLC</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Columbus, Ohio's premier destination for quality pre-owned vehicles. 
              Every vehicle inspected. Every price transparent. Every customer valued.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">Quick Links</h4>
            <div className="space-y-3">
              {[
                { label: 'Browse Inventory', path: '/inventory' },
                { label: 'About Us', path: '/about' },
                { label: 'Apply for Financing', path: '/credit-application' },
                { label: 'Contact', path: '/contact' },
              ].map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">Visit Us</h4>
            <div className="space-y-3 text-sm text-foreground/70">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                2300 E Dublin Granville Rd<br />Columbus, OH 43229
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                Mon–Sat: 9AM–7PM | Sun: Closed
              </p>
              <a href="mailto:info@prautogroup.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                info@prautogroup.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Prestige Rides – PR Auto Group LLC. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Columbus, Ohio's #1 Pre-Owned Destination
          </p>
        </div>
      </div>
    </footer>
  );
}