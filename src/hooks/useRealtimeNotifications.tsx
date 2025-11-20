import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { FileText, ClipboardList, AlertTriangle } from 'lucide-react';

interface NotificationPreferences {
  field_reports_enabled: boolean;
  task_assignments_enabled: boolean;
  alerts_enabled: boolean;
}

export function useRealtimeNotifications() {
  const { isAdmin, user } = useAuth();
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    field_reports_enabled: true,
    task_assignments_enabled: true,
    alerts_enabled: true,
  });

  // Fetch preferences
  useEffect(() => {
    if (!user || !isAdmin) return;

    const fetchPreferences = async () => {
      const { data } = await supabase
        .from("notification_preferences")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (data) {
        setPreferences({
          field_reports_enabled: data.field_reports_enabled,
          task_assignments_enabled: data.task_assignments_enabled,
          alerts_enabled: data.alerts_enabled,
        });
      }
    };

    fetchPreferences();
  }, [user, isAdmin]);

  useEffect(() => {
    if (!isAdmin) return;

    const channel = supabase
      .channel('admin-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'field_reports'
        },
        async (payload) => {
          if (!preferences.field_reports_enabled) return;

          // Fetch ranger name for the notification
          const report = payload.new as any;
          const { data: ranger } = await supabase
            .from('rangers')
            .select('user_id')
            .eq('id', report.ranger_id)
            .single();

          let rangerName = 'Unknown Ranger';
          if (ranger) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('display_name')
              .eq('id', ranger.user_id)
              .single();
            rangerName = profile?.display_name || 'Unknown Ranger';
          }

          toast.success('New Field Report', {
            description: `${rangerName} submitted: ${report.title}`,
            icon: <FileText className="w-4 h-4" />,
            duration: 5000,
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'ranger_tasks'
        },
        async (payload) => {
          if (!preferences.task_assignments_enabled) return;

          const task = payload.new as any;
          
          // Only notify if task is assigned to someone
          if (task.assigned_to) {
            const { data: ranger } = await supabase
              .from('rangers')
              .select('user_id')
              .eq('id', task.assigned_to)
              .single();

            let rangerName = 'a ranger';
            if (ranger) {
              const { data: profile } = await supabase
                .from('profiles')
                .select('display_name')
                .eq('id', ranger.user_id)
                .single();
              rangerName = profile?.display_name || 'a ranger';
            }

            toast.info('Task Assigned', {
              description: `"${task.title}" assigned to ${rangerName}`,
              icon: <ClipboardList className="w-4 h-4" />,
              duration: 4000,
            });
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'alerts'
        },
        (payload) => {
          if (!preferences.alerts_enabled) return;

          const alert = payload.new as any;
          
          const severityColors = {
            critical: 'destructive',
            high: 'destructive',
            medium: 'default',
            low: 'secondary'
          };

          toast.error('New Alert', {
            description: `${alert.severity.toUpperCase()}: ${alert.location}`,
            icon: <AlertTriangle className="w-4 h-4" />,
            duration: 6000,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAdmin, preferences]);
}
