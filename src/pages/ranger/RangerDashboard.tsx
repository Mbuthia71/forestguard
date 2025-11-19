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
      color: "bg-green-500 hover:bg-green-600",
      action: () => navigate('/ranger/report/new'),
    },
    {
      title: "My Tasks",
      description: `${stats.assignedTasks} active`,
      icon: List,
      color: "bg-blue-500 hover:bg-blue-600",
      action: () => navigate('/ranger/tasks'),
    },
    {
      title: "Map View",
      description: "See forest zones",
      icon: MapPin,
      color: "bg-purple-500 hover:bg-purple-600",
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
    <div className="pb-20 lg:pt-20">
      <div className="p-4 space-y-6 max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">🌲 Ranger Field Mode</h1>
          <p className="text-muted-foreground">Welcome back, {ranger?.user_id || 'Ranger'}</p>
          {!navigator.onLine && (
            <Badge variant="secondary" className="mt-2">
              📡 Offline Mode - Data will sync when online
            </Badge>
          )}
        </div>

      {/* Status Cards */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.assignedTasks}</div>
            <div className="text-xs text-muted-foreground mt-1">Active Tasks</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completedToday}</div>
            <div className="text-xs text-muted-foreground mt-1">Done Today</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.pendingReports}</div>
            <div className="text-xs text-muted-foreground mt-1">Pending</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions - Large Buttons */}
      <div className="space-y-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.title}
              onClick={action.action}
              className={`w-full h-24 text-lg ${action.color} text-white`}
              size="lg"
            >
              <div className="flex items-center gap-4">
                <Icon className="h-8 w-8" />
                <div className="text-left">
                  <div className="font-bold">{action.title}</div>
                  <div className="text-sm opacity-90">{action.description}</div>
                </div>
              </div>
            </Button>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <div className="flex-1">
              <div className="text-sm font-medium">Task completed</div>
              <div className="text-xs text-muted-foreground">Patrol Zone A - 2h ago</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <div className="flex-1">
              <div className="text-sm font-medium">Report submitted</div>
              <div className="text-xs text-muted-foreground">Possible logging - 5h ago</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Offline Indicator */}
      <div className="text-center text-xs text-muted-foreground">
        {navigator.onLine ? (
          <span className="text-green-600 dark:text-green-400">● Online</span>
        ) : (
          <span className="text-orange-600 dark:text-orange-400">● Offline - Data will sync when connected</span>
        )}
      </div>
      </div>
      <RangerNavigation />
    </div>
  );
}
