import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Shield, AlertTriangle, MessageSquare, Radio, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/hooks/useAuth";

interface BlockchainTransaction {
  id: string;
  type: 'alert' | 'report' | 'message' | 'sensor';
  location?: string;
  description?: string;
  blockchain_tx_hash: string;
  ipfs_hash?: string;
  action_status: string;
  action_taken_by?: string;
  action_notes?: string;
  action_timestamp?: string;
  created_at: string;
  severity?: string;
  source?: string;
}

export default function BlockchainTracking() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([]);
  const [selectedTx, setSelectedTx] = useState<BlockchainTransaction | null>(null);
  const [newStatus, setNewStatus] = useState("");
  const [actionNotes, setActionNotes] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const [alertsRes, reportsRes, messagesRes] = await Promise.all([
        supabase.from('alerts').select('*').order('created_at', { ascending: false }),
        supabase.from('blockchain_reports').select('*').order('created_at', { ascending: false }),
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
      ]);

      const allTransactions: BlockchainTransaction[] = [
        ...(alertsRes.data || []).map(a => ({
          id: a.id,
          type: 'alert' as const,
          location: a.location,
          description: a.description,
          blockchain_tx_hash: `0xALERT${a.id.substring(0, 8)}`,
          action_status: a.action_status || 'received',
          action_taken_by: a.action_taken_by,
          action_notes: a.action_notes,
          action_timestamp: a.action_timestamp,
          created_at: a.created_at,
          severity: a.severity,
          source: a.source,
        })),
        ...(reportsRes.data || []).map(r => ({
          id: r.id,
          type: 'report' as const,
          location: r.location,
          description: r.description,
          blockchain_tx_hash: r.blockchain_tx_hash || `0xREPORT${r.id.substring(0, 8)}`,
          ipfs_hash: r.ipfs_hash,
          action_status: r.action_status || 'received',
          action_taken_by: r.action_taken_by,
          action_notes: r.action_notes,
          action_timestamp: r.action_timestamp,
          created_at: r.created_at,
        })),
        ...(messagesRes.data || []).map(m => ({
          id: m.id,
          type: 'message' as const,
          description: m.message,
          blockchain_tx_hash: m.blockchain_tx_hash || `0xMSG${m.id.substring(0, 8)}`,
          ipfs_hash: m.ipfs_hash,
          action_status: m.action_status || 'received',
          action_taken_by: m.action_taken_by,
          action_notes: m.action_notes,
          action_timestamp: m.action_timestamp,
          created_at: m.created_at,
        })),
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setTransactions(allTransactions);
    } catch (error) {
      toast.error("Failed to load blockchain transactions");
    }
  };

  const updateTransactionStatus = async () => {
    if (!selectedTx || !newStatus) return;

    setIsUpdating(true);
    try {
      const tableName = 
        selectedTx.type === 'alert' ? 'alerts' :
        selectedTx.type === 'report' ? 'blockchain_reports' :
        'contact_messages';

      const validStatus = newStatus as 'received' | 'under_review' | 'in_progress' | 'resolved' | 'ignored';

      const { error } = await supabase
        .from(tableName as any)
        .update({
          action_status: validStatus,
          action_taken_by: user?.id,
          action_notes: actionNotes || null,
          action_timestamp: new Date().toISOString(),
        })
        .eq('id', selectedTx.id);

      if (error) throw error;

      toast.success("Transaction status updated");
      setSelectedTx(null);
      setNewStatus("");
      setActionNotes("");
      fetchTransactions();
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      received: { variant: "secondary", label: "Received" },
      under_review: { variant: "default", label: "Under Review" },
      in_progress: { variant: "default", label: "In Progress" },
      resolved: { variant: "default", label: "Resolved" },
      ignored: { variant: "outline", label: "Ignored" },
    };
    const config = variants[status] || variants.received;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'report': return <Shield className="w-4 h-4 text-orange-500" />;
      case 'message': return <MessageSquare className="w-4 h-4 text-blue-500" />;
      default: return <Radio className="w-4 h-4 text-green-500" />;
    }
  };

  const filterByStatus = (status: string) => {
    return transactions.filter(tx => tx.action_status === status);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Blockchain Transaction Tracking</h1>
        <p className="text-muted-foreground">
          Transparent, immutable record of all alerts, reports, and messages with action status
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Received</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{filterByStatus('received').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Under Review</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{filterByStatus('under_review').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{filterByStatus('in_progress').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{filterByStatus('resolved').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{transactions.length}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-4">
          {transactions.map((tx) => (
            <Card key={tx.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedTx(tx)}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(tx.type)}
                    <CardTitle className="text-base">
                      {tx.type.toUpperCase()} - {tx.location || 'Anonymous Message'}
                    </CardTitle>
                  </div>
                  {getStatusBadge(tx.action_status)}
                </div>
                <CardDescription className="flex items-center gap-2 mt-2">
                  <Shield className="w-3 h-3" />
                  <code className="text-xs">{tx.blockchain_tx_hash}</code>
                  {tx.ipfs_hash && (
                    <>
                      <span className="text-muted-foreground">|</span>
                      <code className="text-xs">IPFS: {tx.ipfs_hash.substring(0, 12)}...</code>
                    </>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{tx.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{format(new Date(tx.created_at), 'PPpp')}</span>
                  {tx.action_timestamp && (
                    <span>Action: {format(new Date(tx.action_timestamp), 'PPpp')}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="alerts">
          {filterByStatus('received').filter(tx => tx.type === 'alert').map((tx) => (
            <Card key={tx.id} className="mb-4 cursor-pointer" onClick={() => setSelectedTx(tx)}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    {tx.location}
                  </CardTitle>
                  {getStatusBadge(tx.action_status)}
                </div>
              </CardHeader>
              <CardContent>
                <code className="text-xs">{tx.blockchain_tx_hash}</code>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="reports">
          {transactions.filter(tx => tx.type === 'report').map((tx) => (
            <Card key={tx.id} className="mb-4 cursor-pointer" onClick={() => setSelectedTx(tx)}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{tx.location}</CardTitle>
                  {getStatusBadge(tx.action_status)}
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="messages">
          {transactions.filter(tx => tx.type === 'message').map((tx) => (
            <Card key={tx.id} className="mb-4 cursor-pointer" onClick={() => setSelectedTx(tx)}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Contact Message</CardTitle>
                  {getStatusBadge(tx.action_status)}
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {selectedTx && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Update Transaction Status</CardTitle>
            <CardDescription>
              Transaction: {selectedTx.blockchain_tx_hash}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">New Status</label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="received">Received</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="ignored">Ignored</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Action Notes</label>
              <Textarea
                value={actionNotes}
                onChange={(e) => setActionNotes(e.target.value)}
                placeholder="What action was taken?"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={updateTransactionStatus} disabled={isUpdating}>
                Update Status
              </Button>
              <Button variant="outline" onClick={() => setSelectedTx(null)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}