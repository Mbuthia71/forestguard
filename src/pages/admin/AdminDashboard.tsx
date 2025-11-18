import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Users, AlertTriangle, FileText, TrendingUp, Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalRangers: 0,
    activeRangers: 0,
    pendingReports: 0,
    criticalAlerts: 0,
    activeTasks: 0,
    forestZones: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const [rangers, reports, alerts, tasks, zones] = await Promise.all([
      supabase.from('rangers').select('id, status', { count: 'exact' }),
      supabase.from('field_reports').select('id', { count: 'exact' }).eq('status', 'pending'),
      supabase.from('alerts').select('id', { count: 'exact' }).eq('severity', 'critical'),
      supabase.from('ranger_tasks').select('id', { count: 'exact' }).in('status', ['assigned', 'in_progress']),
      supabase.from('forest_zones').select('id', { count: 'exact' }),
    ]);

    setStats({
      totalRangers: rangers.count || 0,
      activeRangers: rangers.data?.filter(r => r.status === 'active').length || 0,
      pendingReports: reports.count || 0,
      criticalAlerts: alerts.count || 0,
      activeTasks: tasks.count || 0,
      forestZones: zones.count || 0,
    });
  };

  const cards = [
    {
      title: "Active Rangers",
      value: `${stats.activeRangers} / ${stats.totalRangers}`,
      description: "Rangers on duty",
      icon: Users,
      action: () => navigate('/admin/rangers'),
      color: "text-green-600 dark:text-green-400"
    },
    {
      title: "Pending Reports",
      value: stats.pendingReports,
      description: "Field reports to review",
      icon: FileText,
      action: () => navigate('/admin/field-reports'),
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Critical Alerts",
      value: stats.criticalAlerts,
      description: "Require immediate attention",
      icon: AlertTriangle,
      action: () => navigate('/admin/alerts'),
      color: "text-destructive"
    },
    {
      title: "Active Tasks",
      value: stats.activeTasks,
      description: "Ongoing missions",
      icon: Activity,
      action: () => navigate('/admin/tasks'),
      color: "text-purple-600 dark:text-purple-400"
    },
    {
      title: "Forest Zones",
      value: stats.forestZones,
      description: "Monitored areas",
      icon: MapPin,
      action: () => navigate('/admin/map'),
      color: "text-emerald-600 dark:text-emerald-400"
    },
    {
      title: "Satellite Data",
      value: "View Layers",
      description: "Monitoring imagery",
      icon: TrendingUp,
      action: () => navigate('/admin/satellite-monitoring'),
      color: "text-cyan-600 dark:text-cyan-400"
    },
  ];

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">ForestGuard Admin</h1>
        <p className="text-muted-foreground">Monitor forests, manage rangers, and respond to alerts</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card 
              key={card.title}
              className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/50"
              onClick={card.action}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{card.value}</div>
                <p className="text-xs text-muted-foreground">{card.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button onClick={() => navigate('/admin/rangers/create')}>
            <Users className="mr-2 h-4 w-4" />
            Create Ranger Account
          </Button>
          <Button variant="outline" onClick={() => navigate('/admin/tasks/create')}>
            <Activity className="mr-2 h-4 w-4" />
            Assign New Task
          </Button>
          <Button variant="outline" onClick={() => navigate('/admin/reports/generate')}>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline" onClick={() => navigate('/admin/map')}>
            <MapPin className="mr-2 h-4 w-4" />
            View Full Map
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
