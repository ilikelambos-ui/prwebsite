import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from 'lucide-react';

export default function InventoryFilters({ filters, setFilters, vehicles }) {
  const makes = [...new Set(vehicles.map(v => v.make).filter(Boolean))].sort();
  const bodyStyles = [...new Set(vehicles.map(v => v.body_style).filter(Boolean))].sort();
  const years = [...new Set(vehicles.map(v => v.year).filter(Boolean))].sort((a, b) => b - a);

  const hasFilters = filters.make || filters.body_style || filters.year || filters.search;

  const clearFilters = () => {
    setFilters({ make: '', body_style: '', year: '', search: '' });
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by make, model, or keyword..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="pl-10 bg-card border-border h-12 font-body text-sm"
        />
      </div>

      {/* Filter row */}
      <div className="flex flex-wrap gap-3">
        <Select value={filters.make || "all"} onValueChange={(v) => setFilters({ ...filters, make: v === 'all' ? '' : v })}>
          <SelectTrigger className="w-full sm:w-40 bg-card border-border h-10">
            <SelectValue placeholder="All Makes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Makes</SelectItem>
            {makes.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select value={filters.body_style || "all"} onValueChange={(v) => setFilters({ ...filters, body_style: v === 'all' ? '' : v })}>
          <SelectTrigger className="w-full sm:w-40 bg-card border-border h-10">
            <SelectValue placeholder="Body Style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Styles</SelectItem>
            {bodyStyles.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select value={filters.year ? String(filters.year) : "all"} onValueChange={(v) => setFilters({ ...filters, year: v === 'all' ? '' : Number(v) })}>
          <SelectTrigger className="w-full sm:w-32 bg-card border-border h-10">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            {years.map(y => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground hover:text-foreground h-10">
            <X className="w-4 h-4 mr-1" /> Clear
          </Button>
        )}
      </div>
    </div>
  );
}