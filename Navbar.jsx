import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Inventory', path: '/inventory' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Financing', path: '/credit-application' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Top bar */}
      <div className="hidden md:flex items-center justify-between px-8 py-2 bg-secondary/50 border-b border-border text-xs font-body text-muted-foreground">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-primary" />
            2300 E Dublin Granville Rd, Columbus, OH 43229
          </span>
        </div>
        <a href="tel:+16145551234" className="flex items-center gap-1.5 hover:text-primary transition-colors">
          <Phone className="w-3 h-3 text-primary" />
          Call Us Today
        </a>
      </div>

      {/* Main nav */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-1">
            <span className="font-heading text-lg md:text-xl text-primary tracking-wider">PRESTIGE</span>
            <span className="font-heading text-lg md:text-xl text-foreground tracking-wider ml-1">RIDES</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-body text-sm tracking-widest uppercase transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/inventory"
              className="bg-primary text-primary-foreground font-body text-sm font-semibold tracking-wider px-6 py-2.5 rounded-sm hover:bg-primary/90 transition-all"
            >
              VIEW INVENTORY
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-foreground p-2"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`block font-body text-lg tracking-wider ${
                      location.pathname === link.path ? 'text-primary' : 'text-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/inventory"
                  onClick={() => setMobileOpen(false)}
                  className="block bg-primary text-primary-foreground text-center font-body font-semibold tracking-wider px-6 py-3 rounded-sm"
                >
                  VIEW INVENTORY
                </Link>
                <div className="pt-4 border-t border-border text-sm text-muted-foreground space-y-2">
                  <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> 2300 E Dublin Granville Rd, Columbus, OH 43229</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}