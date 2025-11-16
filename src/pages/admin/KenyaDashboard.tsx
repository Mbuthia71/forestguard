import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Activity, AlertTriangle, Satellite, TreePine } from 'lucide-react';

export default function KenyaDashboard() {
  const [stats, setStats] = useState({
    totalSensors: 0,
    activeSensors: 0,
    alertsThisWeek: 0,
    forestHealthScore: 87,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { data: sensors } = await supabase.from('sensors_kenya').select('*');
    const { data: alerts } = await supabase
      .from('forest_alerts_kenya')
      .select('*')
      .gte('timestamp', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

    setStats({
      totalSensors: sensors?.length || 0,
      activeSensors: sensors?.filter((s) => s.status === 'active').length || 0,
      alertsThisWeek: alerts?.length || 0,
      forestHealthScore: 87,
    });
  };

  const statCards = [
    {
      title: 'Total Sensors in Kenya',
      value: stats.totalSensors,
      icon: Activity,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Active Sensors',
      value: stats.activeSensors,
      icon: TreePine,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Alerts This Week',
      value: stats.alertsThisWeek,
      icon: AlertTriangle,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      title: 'Forest Health Score (Kakamega)',
      value: `${stats.forestHealthScore}%`,
      icon: Satellite,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">
          ForestGuard <span className="text-primary">Kenya Dashboard</span>
        </h1>
        <p className="text-foreground/70">
          Real-time monitoring of Kakamega, Mau, Karura, and Aberdare forests
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card
            key={index}
            className="p-6 bg-card/50 backdrop-blur-sm border-border hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-foreground/60">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Satellite Observation */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
        <div className="flex items-center gap-3 mb-4">
          <Satellite className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Recent Satellite Observation (Kenya)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-background/50 rounded-lg">
            <p className="text-sm text-foreground/60 mb-1">Kakamega Forest</p>
            <p className="text-lg font-semibold text-foreground">Tree Cover: 92.3%</p>
            <Badge className="mt-2 bg-green-500/20 text-green-400">Stable</Badge>
          </div>
          <div className="p-4 bg-background/50 rounded-lg">
            <p className="text-sm text-foreground/60 mb-1">Mau Forest Complex</p>
            <p className="text-lg font-semibold text-foreground">Tree Cover: 78.5%</p>
            <Badge className="mt-2 bg-orange-500/20 text-orange-400">At Risk</Badge>
          </div>
          <div className="p-4 bg-background/50 rounded-lg">
            <p className="text-sm text-foreground/60 mb-1">Karura Forest</p>
            <p className="text-lg font-semibold text-foreground">Tree Cover: 95.1%</p>
            <Badge className="mt-2 bg-green-500/20 text-green-400">Healthy</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
