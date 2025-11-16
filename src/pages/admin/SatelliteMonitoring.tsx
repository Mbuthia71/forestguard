import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Satellite, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

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
    fetchAlerts();
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
