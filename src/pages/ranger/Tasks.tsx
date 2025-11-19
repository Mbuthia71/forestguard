import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, MapPin, List } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { format } from "date-fns";
import RangerNavigation from "@/components/RangerNavigation";

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
      case 'high': return 'hsl(var(--destructive))';
      case 'medium': return 'hsl(var(--accent))';
      case 'low': return 'hsl(var(--primary))';
      default: return 'hsl(var(--muted))';
    }
  };

  return (
    <div className="pb-24 lg:pt-20 min-h-screen bg-gradient-to-b from-background via-muted/5 to-background">
      <div className="p-6 max-w-2xl mx-auto space-y-6">
      <Button variant="ghost" size="lg" onClick={() => navigate("/ranger")} className="gap-2">
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </Button>

      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl flex items-center gap-2">
            <List className="w-6 h-6 text-primary" />
            My Tasks
            <Badge variant="secondary" className="ml-auto">{tasks.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-muted-foreground">Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                <List className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium text-muted-foreground">No active tasks</p>
              <p className="text-sm text-muted-foreground mt-2">Check back later for new assignments</p>
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <Card key={task.id} className="border-l-4 hover:shadow-lg transition-all duration-200" style={{ borderLeftColor: getPriorityColor(task.priority) }}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 space-y-3">
                          <h3 className="font-bold text-lg leading-tight">{task.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{task.description}</p>
                          
                          {task.location_lat && task.location_lng && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg px-3 py-2 w-fit">
                              <MapPin className="w-4 h-4 text-primary" />
                              <span className="font-mono">{task.location_lat.toFixed(4)}, {task.location_lng.toFixed(4)}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-3 flex-wrap">
                            <Badge variant="outline" className="text-xs font-semibold" style={{ borderColor: getPriorityColor(task.priority), color: getPriorityColor(task.priority) }}>
                              {task.priority.toUpperCase()}
                            </Badge>
                            {task.due_date && (
                              <span className="text-xs text-muted-foreground font-medium">
                                Due: {format(new Date(task.due_date), 'MMM d, yyyy')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => markAsComplete(task.id)}
                        className="w-full gap-2 h-12 text-base font-semibold"
                        size="lg"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Mark Complete
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
      <RangerNavigation />
    </div>
  );
}
