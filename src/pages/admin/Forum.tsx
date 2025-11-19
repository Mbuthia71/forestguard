import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MessageSquare, Plus, Send } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Thread {
  id: string;
  title: string;
  description: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  profile?: {
    display_name: string | null;
  };
  is_admin?: boolean;
}

interface Comment {
  id: string;
  thread_id: string;
  comment_text: string;
  created_by: string;
  created_at: string;
  profile?: {
    display_name: string | null;
  };
  is_admin?: boolean;
}

export default function AdminForum() {
  const { user } = useAuth();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [newThreadDesc, setNewThreadDesc] = useState("");
  const [newComment, setNewComment] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = async () => {
    const { data, error } = await supabase
      .from("admin_forum_threads")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      toast.error("Failed to load threads");
      return;
    }

    if (!data || data.length === 0) {
      setThreads([]);
      return;
    }

    // Fetch profiles and roles for all creators
    const creatorIds = [...new Set(data.map(t => t.created_by))];
    
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, display_name")
      .in("id", creatorIds);

    const { data: roles } = await supabase
      .from("user_roles")
      .select("user_id, role")
      .in("user_id", creatorIds);

    const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);
    const adminMap = new Map(roles?.filter(r => r.role === 'admin').map(r => [r.user_id, true]) || []);
    
    const mapped = data.map((t: any) => ({
      ...t,
      profile: profileMap.get(t.created_by) || { display_name: 'Unknown Admin' },
      is_admin: adminMap.get(t.created_by) || false,
    }));
    setThreads(mapped);
  };

  const fetchComments = async (threadId: string) => {
    const { data, error } = await supabase
      .from("admin_forum_comments")
      .select("*")
      .eq("thread_id", threadId)
      .order("created_at", { ascending: true });

    if (error) {
      toast.error("Failed to load comments");
      return;
    }

    if (!data || data.length === 0) {
      setComments((prev) => ({ ...prev, [threadId]: [] }));
      return;
    }

    // Fetch profiles and roles for all commenters
    const creatorIds = [...new Set(data.map(c => c.created_by))];
    
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, display_name")
      .in("id", creatorIds);

    const { data: roles } = await supabase
      .from("user_roles")
      .select("user_id, role")
      .in("user_id", creatorIds);

    const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);
    const adminMap = new Map(roles?.filter(r => r.role === 'admin').map(r => [r.user_id, true]) || []);
    
    const mapped = data.map((c: any) => ({
      ...c,
      profile: profileMap.get(c.created_by) || { display_name: 'Unknown Admin' },
      is_admin: adminMap.get(c.created_by) || false,
    }));
    setComments((prev) => ({ ...prev, [threadId]: mapped }));
  };

  const handleCreateThread = async () => {
    if (!newThreadTitle.trim()) {
      toast.error("Please enter a thread title");
      return;
    }

    const { error } = await supabase
      .from("admin_forum_threads")
      .insert({
        title: newThreadTitle.trim(),
        description: newThreadDesc.trim() || null,
        created_by: user!.id,
      });

    if (error) {
      toast.error("Failed to create thread");
    } else {
      toast.success("Thread created");
      setNewThreadTitle("");
      setNewThreadDesc("");
      setDialogOpen(false);
      fetchThreads();
    }
  };

  const handlePostComment = async (threadId: string) => {
    if (!newComment.trim()) return;

    const { error } = await supabase
      .from("admin_forum_comments")
      .insert({
        thread_id: threadId,
        comment_text: newComment.trim(),
        created_by: user!.id,
      });

    if (error) {
      toast.error("Failed to post comment");
    } else {
      setNewComment("");
      fetchComments(threadId);
      // Update thread updated_at
      await supabase.from("admin_forum_threads").update({ updated_at: new Date().toISOString() }).eq("id", threadId);
      fetchThreads();
    }
  };

  const openThread = (threadId: string) => {
    setSelectedThread(threadId);
    fetchComments(threadId);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Admin Forum</h1>
          <p className="text-muted-foreground">Collaborate and discuss forest monitoring solutions</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Thread
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Thread</DialogTitle>
              <DialogDescription>Start a new discussion topic for the admin team</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Thread title"
                  value={newThreadTitle}
                  onChange={(e) => setNewThreadTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description"
                  value={newThreadDesc}
                  onChange={(e) => setNewThreadDesc(e.target.value)}
                />
              </div>
              <Button onClick={handleCreateThread} className="w-full">
                Create Thread
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Thread List */}
        <Card className="md:col-span-1 border-2 border-primary/20 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Discussion Threads
            </CardTitle>
            <CardDescription>{threads.length} active threads</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {threads.length === 0 && <p className="text-sm text-muted-foreground">No threads yet. Start a discussion!</p>}
            {threads.map((thread) => (
              <button
                key={thread.id}
                onClick={() => openThread(thread.id)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedThread === thread.id ? "bg-primary/10 border-primary" : "bg-card/60 border-border hover:bg-card"
                }`}
              >
                <div className="font-medium">{thread.title}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {thread.profile?.display_name || "Forest Guardian"}
                  </span>
                  {thread.is_admin && (
                    <span className="px-1.5 py-0.5 text-[10px] font-medium bg-primary/10 text-primary rounded-full">
                      Admin
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">
                    • {new Date(thread.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Thread View */}
        <Card className="md:col-span-2 border-2 border-primary/20 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>
              {selectedThread ? threads.find((t) => t.id === selectedThread)?.title : "Select a thread"}
            </CardTitle>
            {selectedThread && (
              <CardDescription>
                {threads.find((t) => t.id === selectedThread)?.description || "No description"}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {!selectedThread && (
              <div className="text-center py-12 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Select a thread to view the discussion</p>
              </div>
            )}

            {selectedThread && (
              <div className="space-y-4">
                {/* Comments */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {(comments[selectedThread] || []).length === 0 && (
                    <p className="text-sm text-muted-foreground">No comments yet. Be the first to comment!</p>
                  )}
                  {(comments[selectedThread] || []).map((comment) => (
                    <div key={comment.id} className="rounded-lg bg-card/60 border p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-muted-foreground">
                          {comment.profile?.display_name || "Forest Guardian"}
                        </span>
                        {comment.is_admin && (
                          <span className="px-1.5 py-0.5 text-[10px] font-medium bg-primary/10 text-primary rounded-full">
                            Admin
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground">
                          • {new Date(comment.created_at).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm">{comment.comment_text}</div>
                    </div>
                  ))}
                </div>

                {/* Post Comment */}
                <div className="flex gap-2 pt-3 border-t">
                  <Input
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handlePostComment(selectedThread);
                      }
                    }}
                  />
                  <Button onClick={() => handlePostComment(selectedThread)} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
