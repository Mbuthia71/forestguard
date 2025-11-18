import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, TrendingDown, Activity, MapPin, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export default function StakeholderDashboard() {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({
    totalAlerts: 0,
    resolvedThisMonth: 0,
    activeRangers: 0,
    forestZones: 0,
    criticalAlerts: 0,
  });

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const [alerts, resolved, rangers, zones, critical] = await Promise.all([
      supabase.from('alerts').select('id', { count: 'exact' }),
      supabase
        .from('field_reports')
        .select('id', { count: 'exact' })
        .eq('status', 'resolved')
        .gte('updated_at', startOfMonth.toISOString()),
      supabase.from('rangers').select('id', { count: 'exact' }).eq('status', 'active'),
      supabase.from('forest_zones').select('id', { count: 'exact' }),
      supabase.from('alerts').select('id', { count: 'exact' }).eq('severity', 'critical'),
    ]);

    setMetrics({
      totalAlerts: alerts.count || 0,
      resolvedThisMonth: resolved.count || 0,
      activeRangers: rangers.count || 0,
      forestZones: zones.count || 0,
      criticalAlerts: critical.count || 0,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-950 dark:to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-green-800 dark:text-green-400">ForestGuard</h1>
          <p className="text-xl text-muted-foreground">Transparency Dashboard for Stakeholders</p>
          <p className="text-sm text-muted-foreground">Real-time forest monitoring and conservation insights</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-2 border-green-200 dark:border-green-900">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Forest Zones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-600 dark:text-green-400">{metrics.forestZones}</div>
              <p className="text-xs text-muted-foreground mt-2">Under active monitoring</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 dark:border-blue-900">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Rangers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">{metrics.activeRangers}</div>
              <p className="text-xs text-muted-foreground mt-2">Field personnel on duty</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 dark:border-orange-900">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400">{metrics.totalAlerts}</div>
              <p className="text-xs text-muted-foreground mt-2">Environmental events tracked</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-emerald-200 dark:border-emerald-900">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Resolved (Month)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">{metrics.resolvedThisMonth}</div>
              <p className="text-xs text-muted-foreground mt-2">Issues addressed</p>
            </CardContent>
          </Card>
        </div>

        {/* Forest Health Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Forest Health Summary
            </CardTitle>
            <CardDescription>Overall ecosystem status based on satellite and field data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <div>
                <div className="font-semibold text-green-800 dark:text-green-400">Canopy Cover</div>
                <div className="text-sm text-muted-foreground">Stable across monitored zones</div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>

            <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
              <div>
                <div className="font-semibold text-orange-800 dark:text-orange-400">Active Threats</div>
                <div className="text-sm text-muted-foreground">{metrics.criticalAlerts} critical alerts requiring attention</div>
              </div>
              <TrendingDown className="h-8 w-8 text-orange-600" />
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <div>
                <div className="font-semibold text-blue-800 dark:text-blue-400">Ranger Coverage</div>
                <div className="text-sm text-muted-foreground">All zones have active field monitoring</div>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            size="lg" 
            className="h-16 bg-green-600 hover:bg-green-700"
            onClick={() => navigate('/stakeholder/map')}
          >
            <MapPin className="mr-2 h-5 w-5" />
            View Forest Map
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="h-16"
            onClick={() => navigate('/stakeholder/reports')}
          >
            <FileText className="mr-2 h-5 w-5" />
            Monthly Reports
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="h-16"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Summary (PDF)
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>ForestGuard • Protecting forests through technology and transparency</p>
          <p className="mt-1">Last updated: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
