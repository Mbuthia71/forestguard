import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { AlertTriangle, FileText, MessageSquare, TrendingUp, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalAlerts: 0,
    totalReports: 0,
    totalMessages: 0,
    criticalAlerts: 0,
    unreadMessages: 0,
  });

  useEffect(() => {
    fetchStats();
    
    const channel = supabase
      .channel('admin-dashboard-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'alerts' }, fetchStats)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'blockchain_reports' }, fetchStats)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_messages' }, fetchStats)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchStats = async () => {
    const [alertsRes, reportsRes, messagesRes] = await Promise.all([
      supabase.from('alerts').select('*'),
      supabase.from('blockchain_reports').select('*'),
      supabase.from('contact_messages').select('*'),
    ]);

    const criticalCount = alertsRes.data?.filter(
      (a) => a.severity === 'critical' || a.severity === 'high'
    ).length || 0;

    const unreadCount = messagesRes.data?.filter(
      (m) => m.status === 'unread'
    ).length || 0;

    setStats({
      totalAlerts: alertsRes.data?.length || 0,
      totalReports: reportsRes.data?.length || 0,
      totalMessages: messagesRes.data?.length || 0,
      criticalAlerts: criticalCount,
      unreadMessages: unreadCount,
    });
  };

  const statCards = [
    {
      title: 'Total Alerts',
      value: stats.totalAlerts,
      icon: AlertTriangle,
      color: 'text-destructive',
      bgColor: 'bg-destructive/20',
    },
    {
      title: 'Critical Alerts',
      value: stats.criticalAlerts,
      icon: Activity,
      color: 'text-destructive',
      bgColor: 'bg-destructive/20',
    },
    {
      title: 'Blockchain Reports',
      value: stats.totalReports,
      icon: FileText,
      color: 'text-primary',
      bgColor: 'bg-primary/20',
    },
    {
      title: 'Total Messages',
      value: stats.totalMessages,
      icon: MessageSquare,
      color: 'text-primary',
      bgColor: 'bg-primary/20',
    },
    {
      title: 'Unread Messages',
      value: stats.unreadMessages,
      icon: TrendingUp,
      color: 'text-primary',
      bgColor: 'bg-primary/20',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Admin <span className="text-primary">Dashboard</span>
        </h1>
        <p className="text-foreground/70">
          Real-Time Environmental Intelligence
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border hover-glow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                {stat.title === 'Unread Messages' && stat.value > 0 && (
                  <Badge variant="destructive">{stat.value}</Badge>
                )}
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-foreground/70">{stat.title}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* System Status */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
        <h2 className="text-2xl font-bold text-foreground mb-4">System Status</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
            <span className="text-foreground/70">Real-time Monitoring</span>
            <Badge variant="outline" className="text-primary border-primary">
              Active
            </Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
            <span className="text-foreground/70">IoT Sensors</span>
            <Badge variant="outline" className="text-primary border-primary">
              Online
            </Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
            <span className="text-foreground/70">Blockchain Sync</span>
            <Badge variant="outline" className="text-primary border-primary">
              Synced
            </Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
            <span className="text-foreground/70">Database</span>
            <Badge variant="outline" className="text-primary border-primary">
              Healthy
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}