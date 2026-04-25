import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, X, RefreshCcw } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function FrazerImportPreview({ vehicles, onImport, onCancel, importing }) {
  return (
    <div className="bg-card border border-primary/30 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-heading text-sm tracking-wider text-foreground">PREVIEW IMPORT</h2>
          <p className="text-xs text-muted-foreground mt-1">{vehicles.length} vehicles parsed from file</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            disabled={importing}
          >
            <X className="w-4 h-4 mr-1" /> Cancel
          </Button>
          <Button
            size="sm"
            onClick={onImport}
            disabled={importing}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {importing ? (
              <><RefreshCcw className="w-4 h-4 mr-1 animate-spin" /> Importing...</>
            ) : (
              <><Check className="w-4 h-4 mr-1" /> Import All</>
            )}
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto max-h-[400px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Year</TableHead>
              <TableHead className="text-xs">Make</TableHead>
              <TableHead className="text-xs">Model</TableHead>
              <TableHead className="text-xs">Trim</TableHead>
              <TableHead className="text-xs">Price</TableHead>
              <TableHead className="text-xs">Mileage</TableHead>
              <TableHead className="text-xs">VIN</TableHead>
              <TableHead className="text-xs">Color</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((v, i) => (
              <TableRow key={i}>
                <TableCell className="text-xs font-mono">{v.year}</TableCell>
                <TableCell className="text-xs">{v.make}</TableCell>
                <TableCell className="text-xs">{v.model}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{v.trim || '—'}</TableCell>
                <TableCell className="text-xs font-mono">${v.price?.toLocaleString() || '—'}</TableCell>
                <TableCell className="text-xs font-mono">{v.mileage?.toLocaleString() || '—'}</TableCell>
                <TableCell className="text-xs font-mono text-muted-foreground">{v.vin || '—'}</TableCell>
                <TableCell className="text-xs">{v.exterior_color || '—'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}