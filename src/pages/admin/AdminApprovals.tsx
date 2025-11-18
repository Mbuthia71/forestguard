import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CheckCircle, XCircle, Clock, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PendingApproval {
  id: string;
  user_id: string;
  display_name: string;
  requested_at: string;
  status: string;
}

export default function AdminApprovals() {
  const [approvals, setApprovals] = useState<PendingApproval[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchApprovals();
  }, []);

  const fetchApprovals = async () => {
    const { data, error } = await supabase
      .from("pending_admin_approvals")
      .select("*")
      .eq("status", "pending")
      .order("requested_at", { ascending: false });

    if (error) {
      toast.error("Failed to load pending approvals");
      return;
    }
    setApprovals(data || []);
  };

  const handleApprove = async (approval: PendingApproval) => {
    setLoading(true);
    try {
      // Get current admin user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Update approval status
      const { error: approvalError } = await supabase
        .from("pending_admin_approvals")
        .update({ 
          status: "approved",
          approved_by: user.id,
          approved_at: new Date().toISOString()
        })
        .eq("id", approval.id);

      if (approvalError) throw approvalError;

      // Grant admin role
      const { error: roleError } = await supabase
        .from("user_roles")
        .insert({ 
          user_id: approval.user_id, 
          role: "admin" 
        });

      if (roleError) throw roleError;

      toast.success(`Approved ${approval.display_name} as admin`);
      fetchApprovals();
    } catch (e: any) {
      toast.error(e.message || "Failed to approve admin");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (approval: PendingApproval) => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("pending_admin_approvals")
        .update({ 
          status: "rejected",
          approved_by: user.id,
          approved_at: new Date().toISOString()
        })
        .eq("id", approval.id);

      if (error) throw error;

      toast.success(`Rejected admin request from ${approval.display_name}`);
      fetchApprovals();
    } catch (e: any) {
      toast.error(e.message || "Failed to reject request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Shield className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Admin Approvals</h1>
      </div>

      {approvals.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No pending admin approvals</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {approvals.map((approval) => (
            <Card key={approval.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{approval.display_name}</CardTitle>
                    <CardDescription>
                      Requested {new Date(approval.requested_at).toLocaleDateString()} at{" "}
                      {new Date(approval.requested_at).toLocaleTimeString()}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="gap-1">
                    <Clock className="h-3 w-3" />
                    Pending
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleApprove(approval)}
                    disabled={loading}
                    className="flex-1 gap-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Approve as Admin
                  </Button>
                  <Button
                    onClick={() => handleReject(approval)}
                    disabled={loading}
                    variant="destructive"
                    className="flex-1 gap-2"
                  >
                    <XCircle className="h-4 w-4" />
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
