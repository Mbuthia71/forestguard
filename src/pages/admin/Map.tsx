import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    initializeMap();
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  const initializeMap = async () => {
    try {
      setIsLoading(true);
      
      // Fetch Mapbox API key
      const { data: keyData, error: keyError } = await supabase.functions.invoke('get-mapbox-key');
      
      if (keyError || !keyData?.apiKey) {
        throw new Error('Failed to fetch Mapbox API key');
      }

      // Fetch location data
      const [alertsRes, reportsRes, sensorsRes] = await Promise.all([
        supabase.from('alerts').select('*').not('latitude', 'is', null).not('longitude', 'is', null),
        supabase.from('blockchain_reports').select('*').not('latitude', 'is', null).not('longitude', 'is', null),
        supabase.from('sensors_kenya').select('*').not('latitude', 'is', null).not('longitude', 'is', null),
      ]);

      if (!mapContainer.current) return;

      // Initialize Mapbox
      const mapboxgl = (await import('mapbox-gl')).default;
      await import('mapbox-gl/dist/mapbox-gl.css');
      
      mapboxgl.accessToken = keyData.apiKey;

      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [36.0, -0.5],
        zoom: 6.5,
      });

      mapRef.current = map;

      map.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.addControl(new mapboxgl.FullscreenControl(), 'top-right');

      map.on('load', () => {
        // Add alert markers
        (alertsRes.data || []).forEach((alert: any) => {
          const el = document.createElement('div');
          el.className = 'w-3 h-3 rounded-full bg-red-500 border-2 border-white shadow-lg';
          
          new mapboxgl.Marker(el)
            .setLngLat([alert.longitude, alert.latitude])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 })
                .setHTML(`
                  <div class="p-2">
                    <h3 class="font-bold text-sm">Alert</h3>
                    <p class="text-xs">${alert.location}</p>
                    <p class="text-xs text-gray-600">${alert.severity}</p>
                  </div>
                `)
            )
            .addTo(map);
        });

        // Add report markers
        (reportsRes.data || []).forEach((report: any) => {
          const el = document.createElement('div');
          el.className = 'w-3 h-3 rounded-full bg-orange-500 border-2 border-white shadow-lg';
          
          new mapboxgl.Marker(el)
            .setLngLat([report.longitude, report.latitude])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 })
                .setHTML(`
                  <div class="p-2">
                    <h3 class="font-bold text-sm">Report</h3>
                    <p class="text-xs">${report.location}</p>
                  </div>
                `)
            )
            .addTo(map);
        });

        // Add sensor markers
        (sensorsRes.data || []).forEach((sensor: any) => {
          const el = document.createElement('div');
          el.className = 'w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow-lg';
          
          new mapboxgl.Marker(el)
            .setLngLat([sensor.longitude, sensor.latitude])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 })
                .setHTML(`
                  <div class="p-2">
                    <h3 class="font-bold text-sm">Sensor</h3>
                    <p class="text-xs">${sensor.zone_name}</p>
                    <p class="text-xs text-gray-600">${sensor.status}</p>
                  </div>
                `)
            )
            .addTo(map);
        });

        setIsLoading(false);
        toast.success('Map loaded successfully');
      });

    } catch (error) {
      console.error('Map initialization error:', error);
      toast.error('Failed to load map');
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 h-full">
      <div>
        <h1 className="text-3xl font-bold mb-2">Forest Map</h1>
        <p className="text-muted-foreground">
          Real-time location tracking for sensors, alerts, and reports
        </p>
      </div>

      <Card className="p-6 h-[calc(100vh-12rem)]">
        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}
        <div 
          ref={mapContainer} 
          className={`w-full h-full rounded-lg ${isLoading ? 'hidden' : ''}`}
        />
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Legend</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
            <span className="text-sm">IoT Sensors</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 border-2 border-white" />
            <span className="text-sm">Alerts</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500 border-2 border-white" />
            <span className="text-sm">Anonymous Reports</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
