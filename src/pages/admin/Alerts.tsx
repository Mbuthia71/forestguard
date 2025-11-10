import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { AlertTriangle, MapPin, Clock } from 'lucide-react';

interface Alert {
  id: string;
  location: string;
  latitude?: number;
  longitude?: number;
  severity: string;
  source: string;
  description: string;
  created_at: string;
  verified: boolean;
}

export default function AdminAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filter, setFilter] = useState<'all' | 'critical' | 'high' | 'medium'>('all');

  useEffect(() => {
    fetchAlerts();

    const channel = supabase
      .channel('alerts-admin-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'alerts' }, fetchAlerts)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchAlerts = async () => {
    const { data, error } = await supabase
      .from('alerts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setAlerts(data);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === 'all') return true;
    return alert.severity === filter;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Alert <span className="text-primary">Management</span>
        </h1>
        <p className="text-foreground/70">
          Monitor and manage environmental alerts
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition ${
            filter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-muted'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('critical')}
          className={`px-4 py-2 rounded-lg transition ${
            filter === 'critical' ? 'bg-destructive text-destructive-foreground' : 'bg-card hover:bg-muted'
          }`}
        >
          Critical
        </button>
        <button
          onClick={() => setFilter('high')}
          className={`px-4 py-2 rounded-lg transition ${
            filter === 'high' ? 'bg-destructive text-destructive-foreground' : 'bg-card hover:bg-muted'
          }`}
        >
          High
        </button>
        <button
          onClick={() => setFilter('medium')}
          className={`px-4 py-2 rounded-lg transition ${
            filter === 'medium' ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-muted'
          }`}
        >
          Medium
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <Card
            key={alert.id}
            className="p-6 bg-card/50 backdrop-blur-sm border-border hover-glow"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start space-x-4 flex-1">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    alert.severity === 'high' || alert.severity === 'critical'
                      ? 'bg-destructive/20'
                      : 'bg-primary/20'
                  }`}
                >
                  <AlertTriangle
                    className={
                      alert.severity === 'high' || alert.severity === 'critical'
                        ? 'text-destructive'
                        : 'text-primary'
                    }
                    size={24}
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={getSeverityColor(alert.severity)} className="uppercase text-xs">
                      {alert.severity}
                    </Badge>
                    <Badge variant="outline">
                      {alert.source.replace('_', ' ')}
                    </Badge>
                    {alert.verified && (
                      <Badge variant="outline" className="text-primary border-primary">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-start space-x-2 text-foreground">
                    <MapPin size={16} className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">{alert.location}</div>
                      {alert.latitude && alert.longitude && (
                        <p className="text-xs text-foreground/60">
                          {alert.latitude.toFixed(4)}, {alert.longitude.toFixed(4)}
                        </p>
                      )}
                      <p className="text-sm text-foreground/70 mt-1">{alert.description}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-foreground/60 md:flex-shrink-0">
                <Clock size={16} />
                <span>{new Date(alert.created_at).toLocaleString()}</span>
              </div>
            </div>
          </Card>
        ))}

        {filteredAlerts.length === 0 && (
          <Card className="p-12 text-center bg-card/50 backdrop-blur-sm border-border">
            <AlertTriangle className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
            <p className="text-foreground/60">No alerts found</p>
          </Card>
        )}
      </div>
    </div>
  );
}