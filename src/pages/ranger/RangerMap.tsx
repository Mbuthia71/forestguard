import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, AlertTriangle, Flame, Axe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import RangerNavigation from "@/components/RangerNavigation";

interface Alert {
  id: string;
  location: string;
  severity: string;
  description: string;
  latitude: number;
  longitude: number;
  created_at: string;
}

export default function RangerMap() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNearbyAlerts();
  }, [user]);

  const fetchNearbyAlerts = async () => {
    try {
      // Fetch recent high-priority alerts
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .in('severity', ['high', 'critical'])
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setAlerts(data || []);
    } finally {
      setLoading(false);
    }
  };

  const getAlertIcon = (description: string) => {
    const lower = description?.toLowerCase() || "";
    if (lower.includes("fire") || lower.includes("smoke")) return <Flame className="w-5 h-5 text-red-500" />;
    if (lower.includes("logging") || lower.includes("tree")) return <Axe className="w-5 h-5 text-orange-500" />;
    return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="pb-20 lg:pt-20">
      <div className="p-4 max-w-4xl mx-auto space-y-4">
        <Button variant="ghost" onClick={() => navigate("/ranger")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Forest Zones & Alerts
            </CardTitle>
            <CardDescription>High-priority alerts in your patrol area</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Mock Map Container */}
            <div className="relative bg-gradient-to-br from-green-900/20 via-green-800/30 to-green-700/20 rounded-lg h-[400px] border-2 border-border mb-6">
              {/* Grid overlay for map effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
              
              {/* Mock forest zones */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-500/30 rounded-full blur-2xl" />
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-green-600/30 rounded-full blur-2xl" />
              
              {/* Mock alert markers */}
              <div className="absolute top-1/3 left-1/3 w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50">
                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping" />
              </div>
              <div className="absolute bottom-1/2 right-1/3 w-4 h-4 bg-orange-500 rounded-full animate-pulse shadow-lg shadow-orange-500/50" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center bg-card/90 backdrop-blur-sm p-6 rounded-lg border-2 border-border">
                  <MapPin className="w-12 h-12 mx-auto mb-2 text-primary" />
                  <p className="font-semibold">Forest Coverage Map</p>
                  <p className="text-sm text-muted-foreground mt-1">Interactive map integration available</p>
                </div>
              </div>
            </div>

            {/* Nearby Alerts List */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg mb-3">Nearby Alerts ({alerts.length})</h3>
              
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">Loading alerts...</div>
              ) : alerts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No high-priority alerts in your area</div>
              ) : (
                alerts.map((alert) => (
                  <Card key={alert.id} className="border-l-4 border-l-destructive hover:bg-muted/50 transition-colors">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-3 flex-1">
                          {getAlertIcon(alert.description)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant={getSeverityColor(alert.severity) as any}>
                                {alert.severity.toUpperCase()}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {new Date(alert.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm mb-2">{alert.description || 'Environmental alert detected'}</p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              {alert.location || `${alert.latitude?.toFixed(4)}, ${alert.longitude?.toFixed(4)}`}
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Navigate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Map Legend</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span>Fire/Critical</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full" />
              <span>Logging/High</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <span>Encroachment</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span>Safe Zone</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <RangerNavigation />
    </div>
  );
}
