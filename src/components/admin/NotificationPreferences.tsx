import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Bell, FileText, ClipboardList, AlertTriangle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface NotificationSettings {
  field_reports_enabled: boolean;
  task_assignments_enabled: boolean;
  alerts_enabled: boolean;
}

export default function NotificationPreferences() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<NotificationSettings>({
    field_reports_enabled: true,
    task_assignments_enabled: true,
    alerts_enabled: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPreferences();
  }, [user]);

  const fetchPreferences = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("notification_preferences")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      if (data) {
        setSettings({
          field_reports_enabled: data.field_reports_enabled,
          task_assignments_enabled: data.task_assignments_enabled,
          alerts_enabled: data.alerts_enabled,
        });
      }
    } catch (error: any) {
      console.error("Failed to load preferences:", error);
    } finally {
      setLoading(false);
    }
  };

  const updatePreference = async (key: keyof NotificationSettings, value: boolean) => {
    if (!user) return;

    setSaving(true);
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);

    try {
      const { error } = await supabase
        .from("notification_preferences")
        .upsert({
          user_id: user.id,
          ...newSettings,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast.success("Notification preferences updated");
    } catch (error: any) {
      toast.error("Failed to update preferences");
      // Revert on error
      setSettings(settings);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Loading your notification settings...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Preferences
        </CardTitle>
        <CardDescription>
          Choose which types of real-time notifications you want to receive
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between space-x-4 p-4 rounded-lg border bg-card">
          <div className="flex items-center gap-3 flex-1">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-0.5">
              <Label htmlFor="field-reports" className="text-base font-medium cursor-pointer">
                Field Reports
              </Label>
              <p className="text-sm text-muted-foreground">
                Get notified when rangers submit new field reports
              </p>
            </div>
          </div>
          <Switch
            id="field-reports"
            checked={settings.field_reports_enabled}
            onCheckedChange={(checked) => updatePreference("field_reports_enabled", checked)}
            disabled={saving}
          />
        </div>

        <div className="flex items-center justify-between space-x-4 p-4 rounded-lg border bg-card">
          <div className="flex items-center gap-3 flex-1">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <ClipboardList className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-0.5">
              <Label htmlFor="task-assignments" className="text-base font-medium cursor-pointer">
                Task Assignments
              </Label>
              <p className="text-sm text-muted-foreground">
                Get notified when tasks are assigned to rangers
              </p>
            </div>
          </div>
          <Switch
            id="task-assignments"
            checked={settings.task_assignments_enabled}
            onCheckedChange={(checked) => updatePreference("task_assignments_enabled", checked)}
            disabled={saving}
          />
        </div>

        <div className="flex items-center justify-between space-x-4 p-4 rounded-lg border bg-card">
          <div className="flex items-center gap-3 flex-1">
            <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div className="space-y-0.5">
              <Label htmlFor="alerts" className="text-base font-medium cursor-pointer">
                System Alerts
              </Label>
              <p className="text-sm text-muted-foreground">
                Get notified about critical system alerts and threats
              </p>
            </div>
          </div>
          <Switch
            id="alerts"
            checked={settings.alerts_enabled}
            onCheckedChange={(checked) => updatePreference("alerts_enabled", checked)}
            disabled={saving}
          />
        </div>
      </CardContent>
    </Card>
  );
}
