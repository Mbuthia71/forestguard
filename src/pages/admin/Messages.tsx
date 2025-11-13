import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Mail, MailOpen, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  created_at: string;
  blockchain_tx_hash?: string | null;
  ipfs_hash?: string | null;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel('messages-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_messages' }, fetchMessages)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setMessages(data);
    }
  };

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('contact_messages')
      .update({ status: 'read' })
      .eq('id', id);

    if (!error) {
      toast.success('Message marked as read');
      fetchMessages();
    }
  };

  const filteredMessages = messages.filter((msg) => {
    if (filter === 'all') return true;
    return msg.status === filter;
  });

  const unreadCount = messages.filter((m) => m.status === 'unread').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Contact <span className="text-primary">Messages</span>
          </h1>
          <p className="text-foreground/70">
            Manage community messages and inquiries
          </p>
        </div>
        {unreadCount > 0 && (
          <Badge variant="destructive" className="text-lg px-4 py-2">
            {unreadCount} Unread
          </Badge>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'unread' ? 'default' : 'outline'}
          onClick={() => setFilter('unread')}
        >
          Unread
        </Button>
        <Button
          variant={filter === 'read' ? 'default' : 'outline'}
          onClick={() => setFilter('read')}
        >
          Read
        </Button>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.map((msg) => (
          <Card
            key={msg.id}
            className="p-6 bg-card/50 backdrop-blur-sm border-border hover-glow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  {msg.status === 'unread' ? (
                    <Mail className="w-5 h-5 text-primary" />
                  ) : (
                    <MailOpen className="w-5 h-5 text-foreground/50" />
                  )}
                  <div>
                    <h3 className="font-semibold text-foreground">{msg.name}</h3>
                    <p className="text-sm text-foreground/60">{msg.email}</p>
                  </div>
                  <Badge variant={msg.status === 'unread' ? 'default' : 'secondary'}>
                    {msg.status}
                  </Badge>
                </div>

                <p className="text-foreground/80 pl-8">{msg.message}</p>

                <div className="flex items-center gap-2 text-sm text-foreground/60 pl-8">
                  <Clock className="w-4 h-4" />
                  {new Date(msg.created_at).toLocaleString()}
                </div>

                {(msg.blockchain_tx_hash || msg.ipfs_hash) && (
                  <div className="pl-8 mt-2 space-y-1">
                    {msg.blockchain_tx_hash && (
                      <div className="text-xs text-foreground/70 font-mono">
                        TX: {msg.blockchain_tx_hash.slice(0, 18)}...
                      </div>
                    )}
                    {msg.ipfs_hash && (
                      <div className="text-xs text-foreground/70 font-mono">
                        IPFS: {msg.ipfs_hash.slice(0, 18)}...
                      </div>
                    )}
                  </div>
                )}
              </div>

              {msg.status === 'unread' && (
                <Button
                  onClick={() => markAsRead(msg.id)}
                  variant="outline"
                  size="sm"
                >
                  Mark as Read
                </Button>
              )}
            </div>
          </Card>
        ))}

        {filteredMessages.length === 0 && (
          <Card className="p-12 text-center bg-card/50 backdrop-blur-sm border-border">
            <Mail className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
            <p className="text-foreground/60">No messages found</p>
          </Card>
        )}
      </div>
    </div>
  );
}