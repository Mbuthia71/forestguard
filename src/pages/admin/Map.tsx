import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { MapPin, Settings } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [apiKey, setApiKey] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    const { data: alerts } = await supabase
      .from('alerts')
      .select('*')
      .not('latitude', 'is', null)
      .not('longitude', 'is', null);

    const { data: reports } = await supabase
      .from('blockchain_reports')
      .select('*')
      .not('latitude', 'is', null)
      .not('longitude', 'is', null);

    const { data: sensors } = await supabase
      .from('sensors_kenya')
      .select('*')
      .not('latitude', 'is', null)
      .not('longitude', 'is', null);

    setLocations([...(alerts || []), ...(reports || []), ...(sensors || [])]);
  };

  const handleConfigure = async () => {
    if (apiKey.length > 0) {
      setIsConfigured(true);
      toast.success('Mapbox API configured! Initializing Kenya forest map...');
      
      // Initialize Mapbox immediately
      setTimeout(async () => {
        if (!mapContainer.current) return;

        const mapboxgl = (await import('mapbox-gl')).default;
        await import('mapbox-gl/dist/mapbox-gl.css');
        
        mapboxgl.accessToken = apiKey;

        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [36.0, -0.5], // Center on Kenya
          zoom: 6.5,
        });

        map.on('load', () => {
          // Add markers for Kenya sensor locations
          locations.forEach((loc) => {
            if (loc.latitude && loc.longitude) {
              const el = document.createElement('div');
              el.className = 'custom-marker';
              el.style.backgroundColor = loc.verified ? '#10b981' : '#ef4444';
              el.style.width = '30px';
              el.style.height = '30px';
              el.style.borderRadius = '50%';
              el.style.border = '3px solid white';
              el.style.cursor = 'pointer';
              el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';

              new mapboxgl.Marker({ element: el, anchor: 'center' })
                .setLngLat([loc.longitude, loc.latitude])
                .setPopup(
                  new mapboxgl.Popup({ offset: 25 }).setHTML(
                    `<div style="padding: 8px;">
                      <strong style="color: #047857;">${loc.location || loc.location_name || loc.zone_name}</strong><br/>
                      <span style="font-size: 12px; color: #666;">${loc.description || loc.purpose || 'Forest monitoring point'}</span><br/>
                      <span style="font-size: 11px; color: #999;">${loc.forest_name || ''}</span>
                    </div>`
                  )
                )
                .addTo(map);
            }
          });
        });

        map.addControl(new mapboxgl.NavigationControl(), 'top-right');
        map.addControl(new mapboxgl.FullscreenControl(), 'top-right');
      }, 100);
    } else {
      toast.error('Please enter a valid API key');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Live <span className="text-primary">Map</span>
        </h1>
        <p className="text-foreground/70">
          Real-time visualization of alerts and reports
        </p>
      </div>

      {!isConfigured ? (
        <Card className="p-8 bg-card/50 backdrop-blur-sm border-border">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Configure Mapbox</h2>
          </div>
          <p className="text-foreground/70 mb-6">
            Enter your Mapbox API key to visualize forest activity on an interactive 3D globe.
          </p>
          <div className="space-y-4">
            <div>
              <Label htmlFor="mapboxKey">Mapbox API Key</Label>
              <Input
                id="mapboxKey"
                type="password"
                placeholder="pk.eyJ1..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="mt-2"
              />
            </div>
            <Button onClick={handleConfigure} className="bg-primary hover:bg-primary/90">
              Configure Map
            </Button>
          </div>
          <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <p className="text-sm text-foreground/80">
              Get your free Mapbox API key at{' '}
              <a
                href="https://mapbox.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                mapbox.com
              </a>
            </p>
          </div>
        </Card>
      ) : (
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground">Kenya Forest Monitoring Map</h2>
            <Badge variant="outline" className="bg-primary/10">
              {locations.length} tracking points
            </Badge>
          </div>
          <div 
            ref={mapContainer} 
            className="w-full h-[600px] rounded-lg overflow-hidden border border-border shadow-lg"
            style={{ minHeight: '600px' }}
          />
        </Card>
      )}

      {/* Location List */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
        <h2 className="text-2xl font-bold text-foreground mb-4">Tracked Locations</h2>
        <div className="space-y-2">
          {locations.slice(0, 10).map((loc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-background/50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-foreground">
                  {loc.location || loc.location_name || 'Unknown Location'}
                </span>
              </div>
              <span className="text-sm text-foreground/60">
                {loc.latitude?.toFixed(4)}, {loc.longitude?.toFixed(4)}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}