import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { MapPin, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    initializeMap();
  }, []);

  const initializeMap = async () => {
    try {
      setIsLoading(true);
      
      // Fetch Mapbox API key from edge function
      const { data: keyData, error: keyError } = await supabase.functions.invoke('get-mapbox-key');
      
      if (keyError || !keyData?.apiKey) {
        throw new Error('Failed to fetch Mapbox API key');
      }

      // Fetch all location data
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

      const { data: sensorData } = await supabase
        .from('sensor_data')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      const allLocations = [
        ...(alerts || []).map(a => ({ ...a, type: 'alert', source: a.source })),
        ...(reports || []).map(r => ({ ...r, type: 'report' })),
        ...(sensors || []).map(s => ({ ...s, type: 'sensor' })),
      ];
      
      setLocations(allLocations);

      // Initialize Mapbox
      if (!mapContainer.current) return;

      const mapboxgl = (await import('mapbox-gl')).default;
      await import('mapbox-gl/dist/mapbox-gl.css');
      
      mapboxgl.accessToken = keyData.apiKey;

      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [36.0, -0.5],
        zoom: 6.5,
      });

      map.on('load', () => {
        // Prepare heatmap data
        const heatmapFeatures = allLocations
          .filter(loc => loc.latitude && loc.longitude)
          .map(loc => ({
            type: 'Feature',
            properties: { 
              weight: loc.type === 'alert' ? 2 : 1 
            },
            geometry: {
              type: 'Point',
              coordinates: [loc.longitude, loc.latitude]
            }
          }));

        // Add heatmap source
        map.addSource('heatmap', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: heatmapFeatures as any
          }
        });

        // Add heatmap layer
        map.addLayer({
          id: 'heatmap-layer',
          type: 'heatmap',
          source: 'heatmap',
          paint: {
            'heatmap-weight': ['get', 'weight'],
            'heatmap-intensity': 1,
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0, 'rgba(33,102,172,0)',
              0.2, 'rgb(103,169,207)',
              0.4, 'rgb(209,229,240)',
              0.6, 'rgb(253,219,199)',
              0.8, 'rgb(239,138,98)',
              1, 'rgb(178,24,43)'
            ],
            'heatmap-radius': 30,
            'heatmap-opacity': 0.7
          }
        });

        // Add markers with different colors
        allLocations.forEach((loc) => {
          if (loc.latitude && loc.longitude) {
            const el = document.createElement('div');
            el.className = 'custom-marker';
            
            // Color coding: IoT sensors (blue), alerts (red), anonymous reports (green), regular sensors (purple)
            let color = '#8b5cf6'; // purple - default sensors
            const source = 'source' in loc ? loc.source : undefined;
            if (loc.type === 'alert' && source === 'iot_sensor') {
              color = '#3b82f6'; // blue - IoT simulation
            } else if (loc.type === 'alert') {
              color = '#ef4444'; // red - other alerts
            } else if (loc.type === 'report') {
              color = '#10b981'; // green - anonymous reports
            }
            
            el.style.backgroundColor = color;
            el.style.width = '24px';
            el.style.height = '24px';
            el.style.borderRadius = '50%';
            el.style.border = '3px solid white';
            el.style.cursor = 'pointer';
            el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.5)';

            const locationName = 'location' in loc ? loc.location : 
                                'location_name' in loc ? loc.location_name : 
                                'zone_name' in loc ? loc.zone_name : 'Unknown';
            const description = 'description' in loc ? loc.description : 
                               'purpose' in loc ? loc.purpose : 'Monitoring point';

            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<div style="padding: 8px;">
                <strong style="color: ${color};">${locationName}</strong><br/>
                <span style="font-size: 12px; color: #666;">${description}</span><br/>
                <span style="font-size: 11px; color: #999;">Type: ${
                  loc.type === 'alert' && source === 'iot_sensor' ? 'IoT Sensor' :
                  loc.type === 'alert' ? 'Sensor Alert' :
                  loc.type === 'report' ? 'Anonymous Report' : 'Forest Sensor'
                }</span>
              </div>`
            );

            new mapboxgl.Marker({ element: el, anchor: 'center' })
              .setLngLat([loc.longitude, loc.latitude])
              .setPopup(popup)
              .addTo(map);
          }
        });
      });

      map.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.addControl(new mapboxgl.FullscreenControl(), 'top-right');
      
      toast.success('Map initialized with Kenya forest data');
      setIsLoading(false);
    } catch (error) {
      console.error('Map initialization error:', error);
      toast.error('Failed to initialize map. Please check your connection.');
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Live <span className="text-primary">Map</span> - Kenya Forests
        </h1>
        <p className="text-foreground/70">
          Real-time heatmap visualization of sensors, IoT alerts, and anonymous reports
        </p>
      </div>

      {isLoading ? (
        <Card className="p-12 bg-card/50 backdrop-blur-sm border-border">
          <div className="flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-foreground/70">Loading Kenya forest map...</p>
          </div>
        </Card>
      ) : (
        <>
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <h2 className="text-2xl font-bold text-foreground">Kenya Forest Monitoring Map</h2>
              <div className="flex gap-3 flex-wrap">
                <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                  IoT Sensors
                </Badge>
                <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                  Sensor Alerts
                </Badge>
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                  Anonymous Reports
                </Badge>
                <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-2" />
                  Forest Sensors
                </Badge>
              </div>
            </div>
            <div 
              ref={mapContainer} 
              className="w-full h-[600px] rounded-lg overflow-hidden border border-border shadow-lg"
              style={{ minHeight: '600px' }}
            />
          </Card>
        </>
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