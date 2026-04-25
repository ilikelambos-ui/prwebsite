import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const MAKES = ['Acura','BMW','Buick','Cadillac','Chevrolet','Chrysler','Dodge','Ford','GMC','Honda','Hyundai','Jeep','Kia','Lexus','Mazda','Mercedes-Benz','Nissan','RAM','Subaru','Toyota','Volkswagen'];
const BODY_STYLES = ['Sedan','SUV','Truck','Coupe','Van','Convertible','Wagon','Hatchback'];
const MAX_PRICES = [5000,8000,10000,12000,15000,20000,25000,30000,40000,50000];

export default function HeroSearchBar() {
  const navigate = useNavigate();
  const [make, setMake] = useState('');
  const [bodyStyle, setBodyStyle] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (make) params.set('make', make);
    if (bodyStyle) params.set('body_style', bodyStyle);
    if (maxPrice) params.set('max_price', maxPrice);
    navigate(`/inventory?${params.toString()}`);
  };

  return (
    <div className="relative z-20 -mt-8 mx-4 md:mx-8 lg:mx-auto lg:max-w-5xl">
      <div className="bg-card border border-border rounded-lg shadow-2xl p-5 md:p-6">
        <p className="text-xs font-mono tracking-[0.25em] text-primary uppercase mb-4">Search Our Inventory</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Select value={make || 'all'} onValueChange={v => setMake(v === 'all' ? '' : v)}>
            <SelectTrigger className="bg-secondary border-border h-11">
              <SelectValue placeholder="Any Make" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Make</SelectItem>
              {MAKES.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
            </SelectContent>
          </Select>

          <Select value={bodyStyle || 'all'} onValueChange={v => setBodyStyle(v === 'all' ? '' : v)}>
            <SelectTrigger className="bg-secondary border-border h-11">
              <SelectValue placeholder="Any Body Style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Body Style</SelectItem>
              {BODY_STYLES.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
            </SelectContent>
          </Select>

          <Select value={maxPrice || 'all'} onValueChange={v => setMaxPrice(v === 'all' ? '' : v)}>
            <SelectTrigger className="bg-secondary border-border h-11">
              <SelectValue placeholder="Max Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Price</SelectItem>
              {MAX_PRICES.map(p => (
                <SelectItem key={p} value={String(p)}>Under ${p.toLocaleString()}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={handleSearch}
            className="h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-body tracking-widest text-sm"
          >
            <Search className="w-4 h-4 mr-2" /> SEARCH
          </Button>
        </div>
      </div>
    </div>
  );
}