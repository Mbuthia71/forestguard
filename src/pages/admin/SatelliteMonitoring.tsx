import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Satellite, Clock, Flame, CloudRain, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface NASAEvent {
  id: string;
  title: string;
  description: string;
  categories: Array<{ id: string; title: string }>;
  geometry: Array<{ date: string; coordinates: [number, number] }>;
}

const forests = {
  "Kakamega Forest": { lat: -0.290, lng: 34.856, zoom: 10 },
  "Mau Forest": { lat: -0.515, lng: 35.699, zoom: 9 },
  "Karura Forest": { lat: -1.219, lng: 36.825, zoom: 12 },
  "Aberdare Forest": { lat: -0.416, lng: 36.667, zoom: 9 },
  "Mount Kenya Forest": { lat: -0.152, lng: 37.308, zoom: 9 },
  "Arabuko-Sokoke Forest": { lat: -3.302, lng: 39.843, zoom: 11 },
  "Ngong Forest": { lat: -1.358, lng: 36.705, zoom: 12 },
  "Mt. Elgon Forest": { lat: 1.129, lng: 34.535, zoom: 9 },
  "Cherangany Forest": { lat: 1.043, lng: 35.376, zoom: 10 },
  "Ndoinet Forest": { lat: -0.533, lng: 35.419, zoom: 11 }
};

const forestTreeCover: Record<string, number> = {
  "Kakamega Forest": 78,
  "Mau Forest": 65,
  "Karura Forest": 82,
  "Aberdare Forest": 74,
  "Mount Kenya Forest": 69,
  "Arabuko-Sokoke Forest": 76,
  "Ngong Forest": 71,
  "Mt. Elgon Forest": 73,
  "Cherangany Forest": 67,
  "Ndoinet Forest": 70,
};

export default function SatelliteMonitoring() {
  const [selectedForest, setSelectedForest] = useState<string>("Kakamega Forest");
  const [realTimeLoading, setRealTimeLoading] = useState(true);
  const [historicalLoading, setHistoricalLoading] = useState(true);
  const [alertsByForest, setAlertsByForest] = useState<Record<string, { last7: number; prev7: number }>>({});
  const [nasaEvents, setNasaEvents] = useState<NASAEvent[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      const now = new Date();
      const last7 = new Date(now);
      last7.setDate(now.getDate() - 7);
      const last14 = new Date(now);
      last14.setDate(now.getDate() - 14);

      const { data } = await supabase
        .from('alerts')
        .select('id, location, created_at')
        .gte('created_at', last14.toISOString());

      const map: Record<string, { last7: number; prev7: number }> = {};
      Object.keys(forests).forEach((name) => (map[name] = { last7: 0, prev7: 0 }));

      (data || []).forEach((a: any) => {
        const loc = (a.location || '').toLowerCase();
        const created = new Date(a.created_at);
        const inLast7 = created >= last7;
        for (const name of Object.keys(forests)) {
          const key = name.toLowerCase();
          if (loc.includes(key.split(' ')[0]) || loc.includes(key.replace(' forest', ''))) {
            if (inLast7) map[name].last7 += 1; else map[name].prev7 += 1;
            break;
          }
        }
      });

      setAlertsByForest(map);
    };

    const fetchNASAEvents = async () => {
      try {
        const response = await fetch(
          'https://eonet.gsfc.nasa.gov/api/v3/events?category=wildfires,severeStorms&status=open&limit=50'
        );
        const data = await response.json();
        
        // Filter events near Kenya (approx bounds: lat -5 to 5, lng 33 to 42)
        const kenyaEvents = (data.events || []).filter((event: any) => {
          const latestGeometry = event.geometry?.[0];
          if (!latestGeometry) return false;
          const [lng, lat] = latestGeometry.coordinates;
          return lat >= -5 && lat <= 5 && lng >= 33 && lng <= 42;
        });
        
        setNasaEvents(kenyaEvents);
        if (kenyaEvents.length > 0) {
          toast.success(`Loaded ${kenyaEvents.length} active NASA events near Kenya`);
        }
      } catch (error) {
        console.error("Failed to fetch NASA EONET data:", error);
        toast.error("Could not load NASA event data");
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchAlerts();
    fetchNASAEvents();
  }, []);

  const currentForest = forests[selectedForest as keyof typeof forests];
  
  const realTimeUrl = `https://apps.sentinel-hub.com/planet-insights-browser/?lat=${currentForest.lat}&lng=${currentForest.lng}&zoom=${currentForest.zoom}`;
  const historyUrl = `https://earthengine.google.com/timelapse/embed/#v=${currentForest.lat},${currentForest.lng},${currentForest.zoom},latLng`;

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Satellite Monitoring</h1>
        <p className="text-muted-foreground">
          Real-time and historical satellite imagery for Kenyan forest regions
        </p>
      </div>

      {/* Forest Selector */}
      <Card className="border-2 border-primary/20 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Satellite className="h-5 w-5 text-primary" />
            Select Forest Region (Kenya)
          </CardTitle>
          <CardDescription>
            Choose a forest to view real-time and historical satellite data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedForest} onValueChange={setSelectedForest}>
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Select a forest" />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              {Object.keys(forests).map((forestName) => (
                <SelectItem key={forestName} value={forestName}>
                  {forestName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* NASA EONET Real-Time Events */}
      <Card className="border-2 border-destructive/30 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            NASA EONET Live Events (Kenya Region)
          </CardTitle>
          <CardDescription>
            Real-time wildfires and severe storms detected by NASA Earth Observatory Natural Event Tracker
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loadingEvents ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          ) : nasaEvents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Satellite className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No active NASA events detected in Kenya region</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nasaEvents.map((event) => {
                const category = event.categories[0]?.title || "Unknown";
                const isWildfire = category.toLowerCase().includes("wildfire");
                const latestGeometry = event.geometry[0];
                const [lng, lat] = latestGeometry.coordinates;
                
                return (
                  <div key={event.id} className="rounded-lg border-2 border-destructive/20 bg-destructive/5 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {isWildfire ? (
                          <Flame className="h-5 w-5 text-destructive" />
                        ) : (
                          <CloudRain className="h-5 w-5 text-primary" />
                        )}
                        <Badge variant={isWildfire ? "destructive" : "secondary"}>
                          {category}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(latestGeometry.date).toLocaleDateString()}
                      </div>
                    </div>
                    <h4 className="font-semibold mb-1">{event.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {event.description || "No description available"}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>📍 {lat.toFixed(3)}°, {lng.toFixed(3)}°</span>
                      <span>•</span>
                      <span>{event.geometry.length} observation{event.geometry.length > 1 ? "s" : ""}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Forest Health Metrics */}
      <Card className="border-2 border-primary/20 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle>Forest Health Metrics</CardTitle>
          <CardDescription>
            Estimated deforestation trend, tree cover, and alert activity for Kenyan forests (last 7 days vs previous 7)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!Object.keys(alertsByForest || {}).length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-28 w-full" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.keys(forests).map((name) => {
                const metrics = alertsByForest[name] || { last7: 0, prev7: 0 };
                const { last7, prev7 } = metrics;
                const changePct = prev7 === 0 ? (last7 > 0 ? 100 : 0) : Math.round(((last7 - prev7) / Math.max(prev7, 1)) * 100);
                const status = (changePct >= 50 || last7 >= 8)
                  ? 'critical'
                  : (changePct > 20 || last7 >= 3)
                    ? 'warning'
                    : 'stable';
                const badgeVariant = status === 'critical' ? 'destructive' : status === 'warning' ? 'secondary' : 'default';
                const treeCover = forestTreeCover[name] ?? 0;

                return (
                  <div key={name} className="rounded-lg border bg-card/60 p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{name}</div>
                      <Badge variant={badgeVariant} className="capitalize">{status}</Badge>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <div className="text-muted-foreground">Tree cover</div>
                        <div className="font-semibold">{treeCover}%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Alerts (7d)</div>
                        <div className="font-semibold">{last7} <span className="text-xs text-muted-foreground">vs {prev7}</span></div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Deforestation</div>
                        <div className="font-semibold">{changePct > 0 ? `+${changePct}%` : `${changePct}%`}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Real-Time Viewer */}
      <Card className="border-2 border-primary/20 overflow-hidden bg-card/50 backdrop-blur">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardTitle className="flex items-center gap-2">
            <Satellite className="h-5 w-5 text-primary" />
            Real-Time Satellite Imagery (Sentinel Hub)
          </CardTitle>
          <CardDescription>
            Current satellite view powered by Planet Insights Browser showing the latest imagery of {selectedForest}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 relative">
          {realTimeLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
              <Skeleton className="w-full h-[600px]" />
            </div>
          )}
          <iframe
            key={`realtime-${selectedForest}`}
            src={realTimeUrl}
            width="100%"
            height="600"
            className="border-none"
            onLoad={() => setRealTimeLoading(false)}
            title={`Real-time satellite view of ${selectedForest}`}
          />
        </CardContent>
      </Card>

      {/* Historical Viewer */}
      <Card className="border-2 border-primary/20 overflow-hidden bg-card/50 backdrop-blur">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Historical Forest Change (Google Earth Engine Timelapse)
          </CardTitle>
          <CardDescription>
            Track deforestation and forest changes over time in {selectedForest} using Google Earth Engine's powerful time-series data
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 relative">
          {historicalLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
              <Skeleton className="w-full h-[600px]" />
            </div>
          )}
          <iframe
            key={`history-${selectedForest}`}
            src={historyUrl}
            width="100%"
            height="600"
            className="border-none"
            onLoad={() => setHistoricalLoading(false)}
            title={`Historical satellite view of ${selectedForest}`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
