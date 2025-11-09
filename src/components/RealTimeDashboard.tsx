import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, MapPin, Clock, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

interface Alert {
  id: string;
  location: string;
  severity: string;
  source: string;
  description: string;
  created_at: string;
}

interface Stats {
  totalAlerts: number;
  recentAlerts: number;
  criticalAlerts: number;
}

const RealTimeDashboard = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalAlerts: 0,
    recentAlerts: 0,
    criticalAlerts: 0,
  });

  const fetchAlerts = async () => {
    const { data, error } = await supabase
      .from("alerts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (!error && data) {
      setAlerts(data);
    }
  };

  const fetchStats = async () => {
    const { data: allAlerts } = await supabase.from("alerts").select("*");
    
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    const recentCount =
      allAlerts?.filter(
        (a) => new Date(a.created_at) > oneHourAgo
      ).length || 0;

    const criticalCount =
      allAlerts?.filter((a) => a.severity === "critical" || a.severity === "high")
        .length || 0;

    setStats({
      totalAlerts: allAlerts?.length || 0,
      recentAlerts: recentCount,
      criticalAlerts: criticalCount,
    });
  };

  useEffect(() => {
    fetchAlerts();
    fetchStats();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("alerts-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "alerts",
        },
        () => {
          fetchAlerts();
          fetchStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive";
      case "high":
        return "destructive";
      case "medium":
        return "default";
      default:
        return "secondary";
    }
  };

  const getSourceIcon = (source: string) => {
    return source === "satellite" ? "🛰️" : source === "iot_sensor" ? "📡" : "🔗";
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <section id="dashboard" className="py-24 bg-gradient-to-b from-forest-deep/50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Real-Time <span className="text-primary">Alert Dashboard</span>
            </h2>
          </div>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Live monitoring from satellite imagery, IoT sensors, and blockchain-verified community reports
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border p-6 hover-glow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-primary">{stats.totalAlerts}</div>
                  <div className="text-sm text-foreground/70">Total Alerts</div>
                </div>
                <TrendingUp className="text-primary w-8 h-8 opacity-50" />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border p-6 hover-glow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-primary">{stats.recentAlerts}</div>
                  <div className="text-sm text-foreground/70">Last Hour</div>
                </div>
                <Clock className="text-primary w-8 h-8 opacity-50" />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border p-6 hover-glow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-destructive">{stats.criticalAlerts}</div>
                  <div className="text-sm text-foreground/70">Critical/High</div>
                </div>
                <AlertTriangle className="text-destructive w-8 h-8 opacity-50" />
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Recent Alerts */}
        <div className="max-w-4xl mx-auto space-y-4">
          <h3 className="text-2xl font-bold text-foreground mb-6">Live Alert Stream</h3>
          <AnimatePresence mode="popLayout">
            {alerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                layout
              >
                <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 p-6 hover-glow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start space-x-4 flex-1">
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                          alert.severity === "high" || alert.severity === "critical"
                            ? "bg-destructive/20"
                            : "bg-primary/20"
                        }`}
                      >
                        <AlertTriangle
                          className={
                            alert.severity === "high" || alert.severity === "critical"
                              ? "text-destructive"
                              : "text-primary"
                          }
                          size={24}
                        />
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant={getSeverityColor(alert.severity)} className="uppercase text-xs">
                            {alert.severity}
                          </Badge>
                          <span className="text-xs text-foreground/60">
                            {getSourceIcon(alert.source)} {alert.source.replace("_", " ")}
                          </span>
                        </div>
                        <div className="flex items-start space-x-2 text-foreground">
                          <MapPin size={16} className="text-primary mt-1 flex-shrink-0" />
                          <div>
                            <div className="font-semibold">{alert.location}</div>
                            <p className="text-sm text-foreground/70 mt-1">{alert.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-foreground/60 md:flex-shrink-0">
                      <Clock size={16} />
                      <span>{formatTimeAgo(alert.created_at)}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {alerts.length === 0 && (
            <Card className="bg-card/50 border-border p-12 text-center">
              <p className="text-foreground/60">No alerts yet. Monitoring systems active...</p>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default RealTimeDashboard;
