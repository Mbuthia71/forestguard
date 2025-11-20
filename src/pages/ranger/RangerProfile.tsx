import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { User, MapPin, Briefcase, Phone, Calendar, CheckCircle2, Clock, AlertTriangle, Camera, Upload, FileText, Target, Route } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import RangerNavigation from "@/components/RangerNavigation";
import { formatDistanceToNow } from "date-fns";

interface RangerProfile {
  id: string;
  user_id: string;
  employee_id: string | null;
  position: string | null;
  department: string | null;
  place_of_employment: string | null;
  phone: string | null;
  status: string | null;
  assigned_zones: string[] | null;
  created_at: string | null;
  photo_url: string | null;
}

interface RangerStats {
  totalReports: number;
  completedTasks: number;
  pendingTasks: number;
  activeAlerts: number;
}

interface ActivityItem {
  id: string;
  type: 'report' | 'task' | 'patrol';
  title: string;
  description: string;
  timestamp: string;
  location?: string;
}

export default function RangerProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<RangerProfile | null>(null);
  const [displayName, setDisplayName] = useState<string>("");
  const [stats, setStats] = useState<RangerStats>({
    totalReports: 0,
    completedTasks: 0,
    pendingTasks: 0,
    activeAlerts: 0
  });
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfileAndStats = async () => {
      if (!user) return;

      try {
        // Fetch ranger profile
        const { data: rangerData, error: rangerError } = await supabase
          .from("rangers")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (rangerError) throw rangerError;
        setProfile(rangerData);

        // Fetch display name from profiles
        const { data: profileData } = await supabase
          .from("profiles")
          .select("display_name")
          .eq("id", user.id)
          .single();

        setDisplayName(profileData?.display_name || user.email?.split('@')[0] || "Ranger");

        // Fetch stats
        const [reportsRes, tasksRes] = await Promise.all([
          supabase
            .from("field_reports")
            .select("id", { count: "exact" })
            .eq("ranger_id", rangerData.id),
          supabase
            .from("ranger_tasks")
            .select("status", { count: "exact" })
            .eq("assigned_to", rangerData.id)
        ]);

        const completedCount = tasksRes.data?.filter(t => t.status === "completed").length || 0;
        const pendingCount = tasksRes.data?.filter(t => t.status === "assigned" || t.status === "in_progress").length || 0;

        setStats({
          totalReports: reportsRes.count || 0,
          completedTasks: completedCount,
          pendingTasks: pendingCount,
          activeAlerts: Math.floor(Math.random() * 5) // Demo data
        });

        // Fetch recent activities
        const activityItems: ActivityItem[] = [];

        // Add field reports
        if (reportsRes.data) {
          reportsRes.data.slice(0, 5).forEach((report: any) => {
            activityItems.push({
              id: report.id,
              type: 'report',
              title: report.title || 'Field Report',
              description: report.report_type,
              timestamp: report.created_at,
              location: `${report.latitude.toFixed(4)}, ${report.longitude.toFixed(4)}`
            });
          });
        }

        // Add completed tasks
        if (tasksRes.data) {
          tasksRes.data
            .filter((t: any) => t.status === 'completed')
            .slice(0, 5)
            .forEach((task: any) => {
              activityItems.push({
                id: task.id,
                type: 'task',
                title: task.title,
                description: 'Task completed',
                timestamp: task.completed_at || task.updated_at
              });
            });
        }

        // Sort by timestamp
        activityItems.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setActivities(activityItems.slice(0, 10));

      } catch (error: any) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndStats();
  }, [user]);

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !profile) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${profile.id}-${Date.now()}.${fileExt}`;
      const filePath = `${user?.id}/${fileName}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('ranger-photos')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('ranger-photos')
        .getPublicUrl(filePath);

      // Update profile with photo URL
      const { error: updateError } = await supabase
        .from('rangers')
        .update({ photo_url: publicUrl })
        .eq('id', profile.id);

      if (updateError) throw updateError;

      setProfile({ ...profile, photo_url: publicUrl });
      toast.success('Profile photo updated successfully');
    } catch (error: any) {
      console.error('Error uploading photo:', error);
      toast.error('Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <RangerNavigation />
        <div className="container mx-auto p-6 space-y-6">
          <Skeleton className="h-64 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32" />)}
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <RangerNavigation />
        <div className="container mx-auto p-6">
          <Card className="border-destructive/50">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-destructive" />
              <p className="text-muted-foreground">No ranger profile found</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const initials = displayName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <RangerNavigation />
      
      <div className="container mx-auto p-6 space-y-6">
        {/* Profile Header Card */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5 backdrop-blur">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative group">
                <Avatar className="h-32 w-32 ring-4 ring-primary/20">
                  <AvatarImage src={profile.photo_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`} />
                  <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-0 right-0 h-10 w-10 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? (
                    <Upload className="h-4 w-4 animate-spin" />
                  ) : (
                    <Camera className="h-4 w-4" />
                  )}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </div>

              <div className="flex-1 text-center md:text-left space-y-3">
                <div>
                  <h1 className="text-3xl font-bold mb-1">{displayName}</h1>
                  <p className="text-muted-foreground">{profile.position || "Forest Ranger"}</p>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <Badge variant={profile.status === "active" ? "default" : "secondary"} className="capitalize">
                    {profile.status || "Active"}
                  </Badge>
                  {profile.employee_id && (
                    <Badge variant="outline">ID: {profile.employee_id}</Badge>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm pt-2">
                  {profile.place_of_employment && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                      <span>{profile.place_of_employment}</span>
                    </div>
                  )}
                  {profile.department && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{profile.department}</span>
                    </div>
                  )}
                  {profile.phone && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{profile.phone}</span>
                    </div>
                  )}
                  {profile.created_at && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Since {new Date(profile.created_at).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                {profile.assigned_zones && profile.assigned_zones.length > 0 && (
                  <div className="pt-2">
                    <div className="flex items-center gap-2 mb-2 text-sm font-medium">
                      <MapPin className="h-4 w-4" />
                      <span>Assigned Zones</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {profile.assigned_zones.map((zone, i) => (
                        <Badge key={i} variant="secondary">{zone}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-primary/20 bg-card/80 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Field Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{stats.totalReports}</div>
              <p className="text-xs text-muted-foreground mt-1">Total submitted</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-card/80 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Completed Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{stats.completedTasks}</div>
              <p className="text-xs text-muted-foreground mt-1">Successfully finished</p>
            </CardContent>
          </Card>

          <Card className="border-warning/20 bg-card/80 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Pending Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning">{stats.pendingTasks}</div>
              <p className="text-xs text-muted-foreground mt-1">Awaiting completion</p>
            </CardContent>
          </Card>

          <Card className="border-destructive/20 bg-card/80 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Active Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">{stats.activeAlerts}</div>
              <p className="text-xs text-muted-foreground mt-1">In your zones</p>
            </CardContent>
          </Card>
        </div>

        {/* Activity Timeline */}
        <Card className="border-primary/20 bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activities.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No recent activity</p>
            ) : (
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex gap-4 pb-4 border-b last:border-0 border-border/50">
                    <div className="flex-shrink-0 mt-1">
                      {activity.type === 'report' && (
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                      )}
                      {activity.type === 'task' && (
                        <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </div>
                      )}
                      {activity.type === 'patrol' && (
                        <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                          <Route className="h-5 w-5 text-blue-500" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      {activity.location && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          {activity.location}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
