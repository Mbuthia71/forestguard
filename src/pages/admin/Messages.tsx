import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

interface Message {
  id: string;
  created_at: string;
  created_by: string;
  message_text: string;
  channel: string;
  profile?: {
    display_name: string | null;
  };
}

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchMessages();
    
    const channel = supabase
      .channel('admin_messages')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'admin_messages'
        },
        () => fetchMessages()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("admin_messages")
        .select(`
          *,
          profile:profiles!admin_messages_created_by_fkey(display_name)
        `)
        .eq("channel", "general")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
      } else if (data) {
        setMessages(data as any);
      }
    } catch (error) {
      console.error("Error in fetchMessages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !user) return;
    
    setSending(true);
    try {
      const { error } = await supabase
        .from("admin_messages")
        .insert({
          created_by: user.id,
          message_text: newMessage.trim(),
          channel: "general"
        });

      if (error) {
        console.error("Error sending message:", error);
        toast.error("Failed to send message");
      } else {
        setNewMessage("");
        toast.success("Message sent");
      }
    } catch (error) {
      console.error("Error in handleSend:", error);
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from("admin_messages")
        .delete()
        .eq("id", messageId);

      if (error) {
        console.error("Error deleting message:", error);
        toast.error("Failed to delete message");
      } else {
        toast.success("Message deleted");
      }
    } catch (error) {
      console.error("Error in handleDelete:", error);
      toast.error("Failed to delete message");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <MessageCircle className="w-8 h-8 text-primary" />
          Admin Messages
        </h1>
        <p className="text-muted-foreground mt-2">
          Communicate with other administrators
        </p>
      </div>

      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-sm">
            #general
          </Badge>
          <span className="text-sm text-muted-foreground">
            {messages.length} messages
          </span>
        </div>

        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading messages...
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.created_by === user?.id ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`flex-1 space-y-1 ${
                    message.created_by === user?.id ? "text-right" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">
                      {message.profile?.display_name || "Admin User"}
                    </span>
                    {message.created_by === user?.id && (
                      <Badge variant="outline" className="text-xs">You</Badge>
                    )}
                    <span className="text-muted-foreground text-xs">
                      {formatDistanceToNow(new Date(message.created_at), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <div
                    className={`inline-block px-4 py-2 rounded-lg ${
                      message.created_by === user?.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {message.message_text}
                    </p>
                  </div>
                  {message.created_by === user?.id && (
                    <button
                      onClick={() => handleDelete(message.id)}
                      className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-3 h-3 inline mr-1" />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex gap-2 pt-4 border-t">
          <Textarea
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="min-h-[80px]"
          />
          <Button
            onClick={handleSend}
            disabled={!newMessage.trim() || sending}
            className="self-end"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
