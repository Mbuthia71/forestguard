import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { FileText, ClipboardList, AlertTriangle } from 'lucide-react';

export function useRealtimeNotifications() {
  const { isAdmin } = useAuth();

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
  }, [isAdmin]);
}
