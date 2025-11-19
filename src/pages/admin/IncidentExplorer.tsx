import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Flame, Axe, AlertTriangle, MapPin, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useForestSelector } from "@/hooks/useForestSelector";

interface Incident {
  id: string;
  type: "fire" | "logging" | "encroachment" | "unknown";
  source: "satellite" | "ranger";
  location: string;
  latitude?: number;
  longitude?: number;
  timestamp: string;
  severity: string;
  description: string;
}

export default function IncidentExplorer() {
  const { selectedForest } = useForestSelector();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIncidents();
  }, [selectedForest]);

  const fetchIncidents = async () => {
    setLoading(true);
    try {
      // Fetch satellite alerts
      const { data: alerts } = await supabase
        .from('alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      // Fetch ranger reports
      const { data: reports } = await supabase
        .from('field_reports')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      const satelliteIncidents: Incident[] = (alerts || []).map(alert => ({
        id: alert.id,
        type: inferType(alert.description),
        source: "satellite",
        location: alert.location,
        latitude: alert.latitude as number,
        longitude: alert.longitude as number,
        timestamp: alert.created_at,
        severity: alert.severity,
        description: alert.description || "Satellite detection",
      }));

      const rangerIncidents: Incident[] = (reports || []).map(report => ({
        id: report.id,
        type: inferType(report.report_type),
        source: "ranger",
        location: `${report.latitude}, ${report.longitude}`,
        latitude: report.latitude,
        longitude: report.longitude,
        timestamp: report.created_at || "",
        severity: report.severity || "medium",
        description: report.description || report.title,
      }));

      setIncidents([...satelliteIncidents, ...rangerIncidents]);
    } finally {
      setLoading(false);
    }
  };

  const inferType = (text: string): "fire" | "logging" | "encroachment" | "unknown" => {
    const lower = text?.toLowerCase() || "";
    if (lower.includes("fire") || lower.includes("smoke")) return "fire";
    if (lower.includes("logging") || lower.includes("tree")) return "logging";
    if (lower.includes("encroachment") || lower.includes("land")) return "encroachment";
    return "unknown";
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "fire": return <Flame className="w-5 h-5 text-red-500" />;
      case "logging": return <Axe className="w-5 h-5 text-orange-500" />;
      case "encroachment": return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default: return <MapPin className="w-5 h-5 text-blue-500" />;
    }
  };

  const filteredIncidents = filter === "all" 
    ? incidents 
    : incidents.filter(i => i.type === filter);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">📌 Incident Explorer</h1>
        <p className="text-muted-foreground mt-1">
          Satellite-detected and ranger-reported events in {selectedForest.name}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Incidents</SelectItem>
            <SelectItem value="fire">Fire</SelectItem>
            <SelectItem value="logging">Logging</SelectItem>
            <SelectItem value="encroachment">Encroachment</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>

        <Badge variant="secondary">
          {filteredIncidents.length} incidents found
        </Badge>
      </div>

      <div className="space-y-4">
        {loading ? (
          <p className="text-center text-muted-foreground py-8">Loading incidents...</p>
        ) : filteredIncidents.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No incidents found</p>
        ) : (
          filteredIncidents.map((incident) => (
            <Card key={incident.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getIcon(incident.type)}
                    <div>
                      <CardTitle className="text-lg capitalize">{incident.type} Event</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Badge variant={incident.source === "satellite" ? "default" : "secondary"}>
                          {incident.source}
                        </Badge>
                        <Badge variant={incident.severity === "high" || incident.severity === "critical" ? "destructive" : "outline"}>
                          {incident.severity}
                        </Badge>
                      </CardDescription>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <MapPin className="w-4 h-4 mr-2" />
                    View on Map
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">{incident.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {incident.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(incident.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
