import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { Send, Trash2, Users, MessageSquare } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";

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
    console.log('Fetching messages...');
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("admin_messages")
        .select("*")
        .eq("channel", "general")
        .order("created_at", { ascending: true });

      console.log('Messages response:', { data, error });

      if (error) {
        console.error("Error fetching messages:", error);
        toast.error("Failed to load messages");
        return;
      }

      // Manually fetch profiles for all message creators
      if (data && data.length > 0) {
        const userIds = [...new Set(data.map(msg => msg.created_by))];
        const { data: profilesData } = await supabase
          .from("profiles")
          .select("id, display_name")
          .in("id", userIds);

        const profilesMap = new Map(
          profilesData?.map(p => [p.id, p]) || []
        );

        const messagesWithProfiles = data.map(msg => ({
          ...msg,
          profile: profilesMap.get(msg.created_by)
        }));
        
        console.log('Messages with profiles:', messagesWithProfiles);
        setMessages(messagesWithProfiles);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error("Error in fetchMessages:", error);
      toast.error("Failed to load messages");
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

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "AD";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">
                Admin Messages
              </h1>
            </div>
            <p className="text-muted-foreground ml-11">
              Team communication center
            </p>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-5 h-5" />
            <span className="text-sm">{messages.length} messages</span>
          </div>
        </div>
      </Card>

      {/* Messages Area */}
      <Card className="flex-1 flex flex-col overflow-hidden bg-card/50 backdrop-blur-sm">
        <ScrollArea className="flex-1 p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-3">
                <MessageSquare className="w-12 h-12 text-muted-foreground/50 mx-auto animate-pulse" />
                <p className="text-muted-foreground">Loading messages...</p>
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-3">
                <MessageSquare className="w-16 h-16 text-muted-foreground/30 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-foreground">No messages yet</p>
                  <p className="text-sm text-muted-foreground">
                    Start the conversation below
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => {
                const isOwnMessage = message.created_by === user?.id;
                const displayName =
                  message.profile?.display_name || "Admin User";

                return (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      isOwnMessage ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <Avatar className="w-10 h-10 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {getInitials(displayName)}
                      </AvatarFallback>
                    </Avatar>

                    <div
                      className={`flex-1 max-w-[70%] ${
                        isOwnMessage ? "items-end" : "items-start"
                      } flex flex-col gap-1`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">
                          {displayName}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(message.created_at), "HH:mm")}
                        </span>
                      </div>

                      <div
                        className={`group relative p-4 rounded-2xl ${
                          isOwnMessage
                            ? "bg-primary text-primary-foreground rounded-tr-sm"
                            : "bg-muted text-foreground rounded-tl-sm"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap break-words">
                          {message.message_text}
                        </p>

                        {isOwnMessage && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => handleDelete(message.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-background/50 backdrop-blur-sm">
          <div className="flex gap-3">
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
              className="min-h-[60px] max-h-[120px] resize-none"
              disabled={sending}
            />
            <Button
              onClick={handleSend}
              disabled={!newMessage.trim() || sending}
              size="icon"
              className="h-[60px] w-[60px] shrink-0"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Press Enter to send • Shift + Enter for new line
          </p>
        </div>
      </Card>
    </div>
  );
}
