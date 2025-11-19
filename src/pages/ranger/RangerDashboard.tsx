import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, MapPin, CheckCircle, AlertTriangle, List } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import RangerNavigation from "@/components/RangerNavigation";

export default function RangerDashboard() {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [ranger, setRanger] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    assignedTasks: 0,
    completedToday: 0,
    pendingReports: 0,
  });

  useEffect(() => {
    if (user) {
      fetchRangerData();
    }
  }, [user]);

  const fetchRangerData = async () => {
    if (!user) return;
    
    setLoading(true);

    // Get ranger profile
    const { data: rangerData } = await supabase
      .from('rangers')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    setRanger(rangerData);
    setLoading(false);

    if (rangerData) {
      // Get stats
      const [tasks, completedToday, reports] = await Promise.all([
        supabase
          .from('ranger_tasks')
          .select('id', { count: 'exact' })
          .eq('assigned_to', rangerData.id)
          .in('status', ['assigned', 'in_progress']),
        supabase
          .from('ranger_tasks')
          .select('id', { count: 'exact' })
          .eq('assigned_to', rangerData.id)
          .eq('status', 'completed')
          .gte('completed_at', new Date().toISOString().split('T')[0]),
        supabase
          .from('field_reports')
          .select('id', { count: 'exact' })
          .eq('ranger_id', rangerData.id)
          .eq('status', 'pending'),
      ]);

      setStats({
        assignedTasks: tasks.count || 0,
        completedToday: completedToday.count || 0,
        pendingReports: reports.count || 0,
      });
    }
  };

  const quickActions = [
    {
      title: "New Report",
      description: "Log a field observation",
      icon: Camera,
      color: "bg-primary hover:bg-primary/90",
      action: () => navigate('/ranger/report/new'),
    },
    {
      title: "My Tasks",
      description: `${stats.assignedTasks} active`,
      icon: List,
      color: "bg-secondary hover:bg-secondary/90",
      action: () => navigate('/ranger/tasks'),
    },
    {
      title: "Map View",
      description: "See forest zones",
      icon: MapPin,
      color: "bg-accent hover:bg-accent/90",
      action: () => navigate('/ranger/map'),
    },
  ];

  // Fallback UI for admin users without ranger profile
  if (!loading && !ranger && isAdmin) {
    return (
      <div className="pb-20 lg:pt-20">
        <div className="p-4 space-y-6 max-w-2xl mx-auto">
          <Card className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/10 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Admin Preview Mode</h2>
            <p className="text-muted-foreground mb-6">
              You're viewing the Ranger Dashboard as an admin without a ranger profile.
              This is the interface rangers see when managing field operations.
            </p>
            <div className="space-y-2">
              <Button onClick={() => navigate('/admin')} className="w-full">
                Return to Admin Dashboard
              </Button>
              <Button onClick={() => navigate('/admin/rangers')} variant="outline" className="w-full">
                Manage Rangers
              </Button>
            </div>
          </Card>
        </div>
        <RangerNavigation />
      </div>
    );
  }

  return (
    <div className="pb-24 lg:pt-20 min-h-screen bg-gradient-to-b from-background via-muted/5 to-background">
      <div className="p-6 space-y-8 max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-3 pt-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-2">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            Field Operations
          </h1>
          {ranger && (
            <p className="text-lg text-muted-foreground">
              Welcome back, Ranger
            </p>
          )}
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center p-6 hover:shadow-lg hover:scale-105 transition-all duration-200 border-primary/20">
            <div className="text-4xl font-bold text-primary mb-2">{stats.assignedTasks}</div>
            <div className="text-sm font-medium text-muted-foreground">Active Tasks</div>
          </Card>
          <Card className="text-center p-6 hover:shadow-lg hover:scale-105 transition-all duration-200 border-primary/20">
            <CheckCircle className="w-6 h-6 mx-auto mb-2 text-primary" />
            <div className="text-3xl font-bold mb-2">{stats.completedToday}</div>
            <div className="text-sm font-medium text-muted-foreground">Completed</div>
          </Card>
          <Card className="text-center p-6 hover:shadow-lg hover:scale-105 transition-all duration-200 border-primary/20">
            <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-accent" />
            <div className="text-3xl font-bold mb-2">{stats.pendingReports}</div>
            <div className="text-sm font-medium text-muted-foreground">Pending</div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold px-1">Quick Actions</h2>
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`w-full group ${action.color} text-primary-foreground rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden`}
            >
              <div className="p-6 flex items-center gap-5">
                <div className="w-16 h-16 rounded-xl bg-background/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <action.icon className="w-8 h-8" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-xl font-bold mb-1">{action.title}</div>
                  <div className="text-sm opacity-90 font-medium">{action.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                {
                  action: "Completed patrol",
                  location: "North Zone A",
                  time: "2 hours ago",
                  icon: CheckCircle,
                  color: "bg-primary/10 text-primary",
                },
                {
                  action: "Submitted report",
                  location: "Central Trail",
                  time: "5 hours ago",
                  icon: Camera,
                  color: "bg-secondary/10 text-secondary-foreground",
                },
                {
                  action: "Updated task status",
                  location: "East Boundary",
                  time: "1 day ago",
                  icon: AlertTriangle,
                  color: "bg-accent/10 text-accent-foreground",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-border"
                >
                  <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold mb-1">{item.action}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <RangerNavigation />
    </div>
  );
}
