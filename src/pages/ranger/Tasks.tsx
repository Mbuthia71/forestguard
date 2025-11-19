import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { format } from "date-fns";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date: string;
  location_lat: number;
  location_lng: number;
  created_at: string;
}

export default function Tasks() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    if (!user) return;

    try {
      const { data: ranger } = await supabase
        .from('rangers')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!ranger) return;

      const { data, error } = await supabase
        .from('ranger_tasks')
        .select('*')
        .eq('assigned_to', ranger.id)
        .in('status', ['assigned', 'in_progress'])
        .order('due_date', { ascending: true });

      if (error) throw error;
      setTasks(data || []);
    } catch (error: any) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const markAsComplete = async (taskId: string) => {
    try {
      const { error } = await supabase
        .from('ranger_tasks')
        .update({ 
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('id', taskId);

      if (error) throw error;

      toast.success("Task marked as complete");
      fetchTasks();
    } catch (error: any) {
      toast.error("Failed to update task");
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <Button variant="ghost" onClick={() => navigate("/ranger")}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>My Tasks ({tasks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No active tasks</div>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <Card key={task.id} className="border-l-4" style={{ borderLeftColor: getPriorityColor(task.priority) }}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{task.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                        
                        {task.location_lat && task.location_lng && (
                          <div className="flex items-center text-xs text-muted-foreground mb-2">
                            <MapPin className="w-3 h-3 mr-1" />
                            {task.location_lat.toFixed(4)}, {task.location_lng.toFixed(4)}
                          </div>
                        )}

                        <div className="flex gap-2 items-center">
                          <Badge variant="outline" className="text-xs">
                            {task.priority} priority
                          </Badge>
                          {task.due_date && (
                            <span className="text-xs text-muted-foreground">
                              Due: {format(new Date(task.due_date), 'PP')}
                            </span>
                          )}
                        </div>
                      </div>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markAsComplete(task.id)}
                        className="ml-4"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
