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

    setLocations([...(alerts || []), ...(reports || [])]);
  };

  const handleConfigure = async () => {
    if (apiKey.length > 0) {
      setIsConfigured(true);
      toast.success('Mapbox API configured! Map will initialize shortly.');
      
      // Initialize Mapbox
      setTimeout(async () => {
        if (!mapContainer.current) return;

        const mapboxgl = (await import('mapbox-gl')).default;
        mapboxgl.accessToken = apiKey;

        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/satellite-streets-v12',
          center: [0, 20],
          zoom: 2,
          projection: 'globe' as any,
        });

        map.on('load', () => {
          map.setFog({
            color: 'rgb(186, 210, 235)',
            'high-color': 'rgb(36, 92, 223)',
            'horizon-blend': 0.02,
          });

          // Add markers for locations
          locations.forEach((loc) => {
            if (loc.latitude && loc.longitude) {
              new mapboxgl.Marker({ color: '#bef264' })
                .setLngLat([loc.longitude, loc.latitude])
                .setPopup(
                  new mapboxgl.Popup().setHTML(
                    `<strong>${loc.location || loc.location_name}</strong><br/>${loc.description || ''}`
                  )
                )
                .addTo(map);
            }
          });
        });

        map.addControl(new mapboxgl.NavigationControl());
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
          <div 
            ref={mapContainer} 
            className="w-full h-[600px] rounded-lg bg-background/50 flex items-center justify-center"
          >
            <div className="text-center">
              <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
              <p className="text-foreground/70">
                Map visualization will appear here once Mapbox GL is initialized
              </p>
              <Badge variant="outline" className="mt-4">
                {locations.length} locations tracked
              </Badge>
            </div>
          </div>
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