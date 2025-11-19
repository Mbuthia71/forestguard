import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface Ranger {
  id: string;
  profile: { display_name: string | null };
}

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  due_date: string | null;
  created_at: string;
  assigned_to: string | null;
  ranger?: {
    profile: { display_name: string | null };
  };
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [rangers, setRangers] = useState<Ranger[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    assigned_to: "",
    due_date: "",
  });

  useEffect(() => {
    fetchData();
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) setUserId(user.id);
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      // Fetch tasks with ranger info
      const { data: tasksData, error: tasksError } = await supabase
        .from("ranger_tasks")
        .select("*")
        .order("created_at", { ascending: false });

      console.log("Tasks data:", tasksData, "Error:", tasksError);

      if (tasksData) {
        // Fetch ranger profiles separately
        const rangerIds = [...new Set(tasksData.map(t => t.assigned_to).filter(Boolean))];
        if (rangerIds.length > 0) {
          const { data: rangersData } = await supabase
            .from("rangers")
            .select("id, user_id")
            .in("id", rangerIds);

          if (rangersData) {
            const userIds = rangersData.map(r => r.user_id);
            const { data: profilesData } = await supabase
              .from("profiles")
              .select("id, display_name")
              .in("id", userIds);

            const profilesMap = new Map(profilesData?.map(p => [p.id, p]) || []);
            const rangersMap = new Map(
              rangersData.map(r => [r.id, { ...r, profile: profilesMap.get(r.user_id) }])
            );

            const tasksWithRangers = tasksData.map(task => ({
              ...task,
              ranger: task.assigned_to ? rangersMap.get(task.assigned_to) : null
            }));
            setTasks(tasksWithRangers as any);
          }
        } else {
          setTasks(tasksData as any);
        }
      }

      // Fetch active rangers
      const { data: activeRangers, error: rangersError } = await supabase
        .from("rangers")
        .select("id, user_id")
        .eq("status", "active");

      console.log("Rangers data:", activeRangers, "Error:", rangersError);

      if (activeRangers) {
        const userIds = activeRangers.map(r => r.user_id);
        const { data: profilesData } = await supabase
          .from("profiles")
          .select("id, display_name")
          .in("id", userIds);

        const profilesMap = new Map(profilesData?.map(p => [p.id, p]) || []);
        const rangersWithProfiles = activeRangers.map(ranger => ({
          id: ranger.id,
          profile: profilesMap.get(ranger.user_id)
        }));

        console.log("Rangers with profiles:", rangersWithProfiles);
        setRangers(rangersWithProfiles);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setLoading(false);
  };

  const handleCreateTask = async () => {
    if (!newTask.title || !newTask.assigned_to || !userId) {
      toast.error("Please fill in all required fields");
      return;
    }

    const { error } = await supabase.from("ranger_tasks").insert({
      title: newTask.title,
      description: newTask.description || null,
      priority: newTask.priority,
      assigned_to: newTask.assigned_to,
      due_date: newTask.due_date || null,
      created_by: userId,
      status: "assigned",
    });

    if (error) {
      toast.error("Failed to create task");
    } else {
      toast.success("Task assigned successfully");
      setDialogOpen(false);
      setNewTask({
        title: "",
        description: "",
        priority: "medium",
        assigned_to: "",
        due_date: "",
      });
      fetchData();
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      case "medium":
        return <Clock className="w-4 h-4 text-warning" />;
      default:
        return <CheckCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Ranger Tasks</h1>
          <p className="text-muted-foreground">Create and assign field tasks to rangers</p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Assign Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Task Title *</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Patrol sector B"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Check for illegal logging activity..."
                />
              </div>

              <div>
                <Label htmlFor="ranger">Assign to Ranger *</Label>
                <Select
                  value={newTask.assigned_to}
                  onValueChange={(value) => setNewTask({ ...newTask, assigned_to: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select ranger" />
                  </SelectTrigger>
                  <SelectContent>
                    {rangers.map((ranger) => (
                      <SelectItem key={ranger.id} value={ranger.id}>
                        {ranger.profile?.display_name || "Unknown Ranger"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="due_date">Due Date</Label>
                <Input
                  id="due_date"
                  type="date"
                  value={newTask.due_date}
                  onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
                />
              </div>

              <Button onClick={handleCreateTask} className="w-full">
                Assign Task
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <Card className="p-12 text-center">
          <Plus className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No Tasks Yet</h3>
          <p className="text-muted-foreground">Create your first task to assign to rangers</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <Card key={task.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    {getPriorityIcon(task.priority)}
                    <h3 className="font-semibold">{task.title}</h3>
                    <Badge
                      variant={
                        task.status === "completed"
                          ? "default"
                          : task.status === "in_progress"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {task.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{task.description}</p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>
                      Assigned to: {task.ranger?.profile?.display_name || "Unassigned"}
                    </span>
                    {task.due_date && (
                      <span>Due: {format(new Date(task.due_date), "MMM d, yyyy")}</span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
