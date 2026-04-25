const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useRef } from 'react';

import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { Upload, FileUp, Check, AlertCircle, Trash2, Car, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import FrazerImportPreview from '../components/admin/FrazerImportPreview';

export default function AdminUpload() {
  const [file, setFile] = useState(null);
  const [importing, setImporting] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();

  const { data: vehicles = [], isLoading } = useQuery({
    queryKey: ['admin-vehicles'],
    queryFn: () => db.entities.Vehicle.list('-created_date', 200),
  });

  const handleFileSelect = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setPreviewData(null);
  };

  const handleUploadAndParse = async () => {
    if (!file) return;
    setImporting(true);

    const { file_url } = await db.integrations.Core.UploadFile({ file });

    const result = await db.integrations.Core.ExtractDataFromUploadedFile({
      file_url,
      json_schema: {
        type: 'object',
        properties: {
          vehicles: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                year: { type: 'number' },
                make: { type: 'string' },
                model: { type: 'string' },
                trim: { type: 'string' },
                price: { type: 'number' },
                mileage: { type: 'number' },
                vin: { type: 'string' },
                stock_number: { type: 'string' },
                exterior_color: { type: 'string' },
                interior_color: { type: 'string' },
                body_style: { type: 'string' },
                transmission: { type: 'string' },
                drivetrain: { type: 'string' },
                fuel_type: { type: 'string' },
                engine: { type: 'string' },
                doors: { type: 'number' },
                description: { type: 'string' },
                features: { type: 'string' },
              }
            }
          }
        }
      }
    });

    if (result.status === 'success' && result.output?.vehicles) {
      setPreviewData(result.output.vehicles);
      toast.success(`Parsed ${result.output.vehicles.length} vehicles from file`);
    } else {
      toast.error('Failed to parse file. Make sure it\'s a valid Frazer export.');
    }
    setImporting(false);
  };

  const handleImport = async () => {
    if (!previewData?.length) return;
    setImporting(true);

    const vehicleData = previewData.map(v => ({
      ...v,
      status: 'available',
      just_arrived: true,
    }));

    await db.entities.Vehicle.bulkCreate(vehicleData);
    queryClient.invalidateQueries({ queryKey: ['admin-vehicles'] });
    queryClient.invalidateQueries({ queryKey: ['vehicles-all'] });
    queryClient.invalidateQueries({ queryKey: ['vehicles-featured'] });
    toast.success(`${vehicleData.length} vehicles imported successfully!`);
    setPreviewData(null);
    setFile(null);
    setImporting(false);
  };

  const handleDelete = async (id) => {
    await db.entities.Vehicle.delete(id);
    queryClient.invalidateQueries({ queryKey: ['admin-vehicles'] });
    queryClient.invalidateQueries({ queryKey: ['vehicles-all'] });
    queryClient.invalidateQueries({ queryKey: ['vehicles-featured'] });
    toast.success('Vehicle deleted');
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <div className="bg-card border-b border-border py-10 md:py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-mono tracking-[0.3em] text-primary uppercase">Admin</span>
          <h1 className="font-heading text-3xl md:text-5xl text-foreground mt-2">INVENTORY MANAGER</h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-lg">
            Upload your Frazer DMS export file (CSV, XLSX, or JSON) to automatically import vehicles to your inventory.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* Upload area */}
        <div className="bg-card border border-border rounded-lg p-8">
          <h2 className="font-heading text-sm tracking-wider text-foreground mb-6">FRAZER DMS IMPORT</h2>
          
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-border rounded-lg p-10 text-center cursor-pointer hover:border-primary/50 transition-colors"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls,.json,.txt"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            {file ? (
              <div>
                <p className="text-sm text-foreground font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            ) : (
              <div>
                <p className="text-sm text-foreground">Click to upload your Frazer export file</p>
                <p className="text-xs text-muted-foreground mt-1">Supports CSV, XLSX, JSON, and TXT formats</p>
              </div>
            )}
          </div>

          {file && !previewData && (
            <Button
              onClick={handleUploadAndParse}
              disabled={importing}
              className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {importing ? (
                <><RefreshCcw className="w-4 h-4 mr-2 animate-spin" /> Processing...</>
              ) : (
                <><FileUp className="w-4 h-4 mr-2" /> Upload & Parse</>
              )}
            </Button>
          )}
        </div>

        {/* Preview */}
        {previewData && (
          <FrazerImportPreview
            vehicles={previewData}
            onImport={handleImport}
            onCancel={() => setPreviewData(null)}
            importing={importing}
          />
        )}

        {/* Current inventory */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-sm tracking-wider text-foreground">
              CURRENT INVENTORY ({vehicles.length})
            </h2>
          </div>

          {isLoading ? (
            <div className="py-10 text-center text-muted-foreground text-sm">Loading...</div>
          ) : vehicles.length === 0 ? (
            <div className="py-10 text-center">
              <Car className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No vehicles in inventory yet</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {vehicles.map(v => (
                <div key={v.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-md">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-9 rounded bg-secondary shrink-0 overflow-hidden">
                      {v.photos?.[0] && (
                        <img src={v.photos[0]} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-foreground font-medium truncate">
                        {v.year} {v.make} {v.model}
                      </p>
                      <p className="text-[10px] font-mono text-muted-foreground">
                        ${v.price?.toLocaleString()} • {v.mileage?.toLocaleString()} mi
                        {v.stock_number && ` • STK# ${v.stock_number}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-sm ${
                      v.status === 'available' ? 'bg-green-500/10 text-green-400' :
                      v.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {v.status?.toUpperCase()}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleDelete(v.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}