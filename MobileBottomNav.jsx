import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Car, Info, Phone } from 'lucide-react';

const items = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Info, label: 'About', path: '/about' },
  { icon: Search, label: 'Search', path: '/inventory', highlight: true },
  { icon: Phone, label: 'Contact', path: '/contact' },
];

export default function MobileBottomNav() {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {items.map(item => {
          const active = location.pathname === item.path;
          const Icon = item.icon;
          
          if (item.highlight) {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center -mt-5"
              >
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-[10px] font-medium text-primary mt-1">{item.label}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center gap-0.5"
            >
              <Icon className={`w-5 h-5 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className={`text-[10px] ${active ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}