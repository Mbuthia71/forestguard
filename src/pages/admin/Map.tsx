import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// Add pulse animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
  }
  .mapboxgl-popup-content {
    border-radius: 12px !important;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15) !important;
    padding: 0 !important;
  }
  .mapboxgl-popup-tip {
    border-top-color: white !important;
  }
`;
document.head.appendChild(style);

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
        pitch: 60,
        bearing: -17.6,
        antialias: true,
      });

      mapRef.current = map;

      map.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.addControl(new mapboxgl.FullscreenControl(), 'top-right');

      map.on('load', () => {
        // Add 3D terrain
        map.addSource('mapbox-dem', {
          'type': 'raster-dem',
          'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
          'tileSize': 512,
          'maxzoom': 14
        });
        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

        // Add sky layer
        map.addLayer({
          'id': 'sky',
          'type': 'sky',
          'paint': {
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 0.0],
            'sky-atmosphere-sun-intensity': 15
          }
        });

        // Add alert markers with distinct styling
        (alertsRes.data || []).forEach((alert: any) => {
          const el = document.createElement('div');
          el.style.cssText = `
            width: 32px;
            height: 32px;
            background: #ef4444;
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s;
          `;
          el.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="none"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13" stroke="white" stroke-width="2"/><circle cx="12" cy="17" r="1" fill="white"/></svg>`;
          
          if (alert.severity === 'critical' || alert.severity === 'high') {
            el.style.animation = 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite';
          }
          
          el.addEventListener('mouseenter', () => el.style.transform = 'scale(1.2)');
          el.addEventListener('mouseleave', () => el.style.transform = 'scale(1)');
          
          new mapboxgl.Marker(el)
            .setLngLat([alert.longitude, alert.latitude])
            .setPopup(
              new mapboxgl.Popup({ offset: 35, className: 'map-popup' })
                .setHTML(`
                  <div style="padding: 12px; min-width: 200px;">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                      <span style="font-size: 18px;">🚨</span>
                      <h3 style="font-weight: 600; font-size: 14px; margin: 0;">Alert</h3>
                    </div>
                    <p style="font-size: 12px; color: #374151; margin: 4px 0;">${alert.location}</p>
                    <div style="margin-top: 8px; display: inline-block; padding: 4px 8px; background: ${alert.severity === 'critical' ? '#fee2e2' : alert.severity === 'high' ? '#fed7aa' : '#fef3c7'}; color: ${alert.severity === 'critical' ? '#991b1b' : alert.severity === 'high' ? '#c2410c' : '#92400e'}; border-radius: 4px; font-size: 11px; font-weight: 600; text-transform: uppercase;">${alert.severity}</div>
                    ${alert.description ? `<p style="font-size: 11px; color: #6b7280; margin-top: 8px;">${alert.description}</p>` : ''}
                  </div>
                `)
            )
            .addTo(map);
        });

        // Add anonymous report markers
        (reportsRes.data || []).forEach((report: any) => {
          const el = document.createElement('div');
          el.style.cssText = `
            width: 28px;
            height: 28px;
            background: #f97316;
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s;
          `;
          el.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`;
          
          el.addEventListener('mouseenter', () => el.style.transform = 'scale(1.2)');
          el.addEventListener('mouseleave', () => el.style.transform = 'scale(1)');
          
          new mapboxgl.Marker(el)
            .setLngLat([report.longitude, report.latitude])
            .setPopup(
              new mapboxgl.Popup({ offset: 30, className: 'map-popup' })
                .setHTML(`
                  <div style="padding: 12px; min-width: 200px;">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                      <span style="font-size: 18px;">📋</span>
                      <h3 style="font-weight: 600; font-size: 14px; margin: 0;">Anonymous Report</h3>
                    </div>
                    <p style="font-size: 12px; color: #374151; margin: 4px 0;">${report.location}</p>
                    <p style="font-size: 11px; color: #6b7280; margin-top: 8px;">${report.description}</p>
                    ${report.blockchain_tx_hash ? `<div style="margin-top: 8px; padding: 6px 8px; background: #f3f4f6; border-radius: 4px; font-size: 10px; color: #6b7280;">🔗 Blockchain Verified</div>` : ''}
                  </div>
                `)
            )
            .addTo(map);
        });

        // Add IoT sensor markers
        (sensorsRes.data || []).forEach((sensor: any) => {
          const el = document.createElement('div');
          const isActive = sensor.status === 'active';
          el.style.cssText = `
            width: 26px;
            height: 26px;
            background: ${isActive ? '#3b82f6' : '#94a3b8'};
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 4px 12px ${isActive ? 'rgba(59, 130, 246, 0.4)' : 'rgba(148, 163, 184, 0.3)'};
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s;
          `;
          el.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/></svg>`;
          
          if (isActive) {
            el.style.animation = 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite';
          }
          
          el.addEventListener('mouseenter', () => el.style.transform = 'scale(1.2)');
          el.addEventListener('mouseleave', () => el.style.transform = 'scale(1)');
          
          new mapboxgl.Marker(el)
            .setLngLat([sensor.longitude, sensor.latitude])
            .setPopup(
              new mapboxgl.Popup({ offset: 28, className: 'map-popup' })
                .setHTML(`
                  <div style="padding: 12px; min-width: 200px;">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                      <span style="font-size: 18px;">📡</span>
                      <h3 style="font-weight: 600; font-size: 14px; margin: 0;">IoT Sensor</h3>
                    </div>
                    <p style="font-size: 12px; color: #374151; margin: 4px 0; font-weight: 500;">${sensor.zone_name}</p>
                    <p style="font-size: 11px; color: #6b7280; margin: 2px 0;">${sensor.forest_name}</p>
                    <div style="margin-top: 8px; display: flex; gap: 8px; flex-wrap: wrap;">
                      <span style="padding: 4px 8px; background: ${isActive ? '#dbeafe' : '#f1f5f9'}; color: ${isActive ? '#1e40af' : '#64748b'}; border-radius: 4px; font-size: 10px; font-weight: 600;">${sensor.sensor_type}</span>
                      <span style="padding: 4px 8px; background: ${isActive ? '#dcfce7' : '#fef3c7'}; color: ${isActive ? '#166534' : '#92400e'}; border-radius: 4px; font-size: 10px; font-weight: 600;">${sensor.status}</span>
                    </div>
                    ${sensor.battery_level !== null ? `<div style="margin-top: 8px; font-size: 11px; color: #6b7280;">🔋 Battery: ${sensor.battery_level}%</div>` : ''}
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

      <Card className="p-6 bg-card/95 backdrop-blur-sm">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <span className="text-lg">🗺️</span>
          Map Legend
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div style={{ width: '26px', height: '26px', background: '#3b82f6', border: '3px solid white', borderRadius: '50%', boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49"/></svg>
            </div>
            <div>
              <span className="text-sm font-medium">IoT Sensors</span>
              <p className="text-xs text-muted-foreground">Active monitoring devices</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div style={{ width: '32px', height: '32px', background: '#ef4444', border: '3px solid white', borderRadius: '50%', boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>
            </div>
            <div>
              <span className="text-sm font-medium">System Alerts</span>
              <p className="text-xs text-muted-foreground">Automated threat detection</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div style={{ width: '28px', height: '28px', background: '#f97316', border: '3px solid white', borderRadius: '50%', boxShadow: '0 2px 8px rgba(249, 115, 22, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
            </div>
            <div>
              <span className="text-sm font-medium">Anonymous Reports</span>
              <p className="text-xs text-muted-foreground">Community submissions</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
