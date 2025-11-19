import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Mail, Clock, Crown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";

interface Admin {
  id: string;
  email: string;
  created_at: string;
  display_name: string | null;
  role: string;
  is_master: boolean;
}

export default function AdminDirectory() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setLoading(true);
    
    // Get all users with admin role
    const { data: adminRoles, error: rolesError } = await supabase
      .from("user_roles")
      .select("user_id, role, created_at")
      .eq("role", "admin");

    if (rolesError || !adminRoles) {
      setLoading(false);
      return;
    }

    // Get user details for each admin
    const adminPromises = adminRoles.map(async (adminRole) => {
      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", adminRole.user_id)
        .maybeSingle();

      // Check if they're master admin
      const { data: isMaster } = await supabase.rpc("is_master_admin", {
        _user_id: adminRole.user_id,
      });

      return {
        id: adminRole.user_id,
        email: "Admin User", // Email not exposed for privacy
        created_at: adminRole.created_at || new Date().toISOString(),
        display_name: profile?.display_name || null,
        role: adminRole.role,
        is_master: isMaster || false,
      };
    });

    const adminsData = await Promise.all(adminPromises);
    setAdmins(adminsData.filter((a) => a !== null) as Admin[]);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Shield className="w-8 h-8 text-primary" />
          Admin Directory
        </h1>
        <p className="text-muted-foreground mt-2">
          View all system administrators and their roles
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-muted-foreground">Loading admins...</p>
        </div>
      ) : admins.length === 0 ? (
        <Card className="p-12 text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No Admins Found</h3>
          <p className="text-muted-foreground">
            No administrators are currently in the system
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {admins.map((admin) => (
            <Card
              key={admin.id}
              className={`p-6 space-y-4 ${
                admin.id === user?.id ? "ring-2 ring-primary" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      admin.is_master
                        ? "bg-gradient-to-br from-amber-400 to-amber-600"
                        : "bg-primary/10"
                    }`}
                  >
                    {admin.is_master ? (
                      <Crown className="w-6 h-6 text-white" />
                    ) : (
                      <Shield className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {admin.display_name || "Admin User"}
                    </h3>
                    {admin.is_master && (
                      <Badge className="mt-1 bg-gradient-to-r from-amber-400 to-amber-600 text-white border-0">
                        Master Admin
                      </Badge>
                    )}
                    {admin.id === user?.id && (
                      <Badge variant="outline" className="mt-1 ml-2">
                        You
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                {admin.id === user?.id && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{user.email}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>
                    Member since{" "}
                    {formatDistanceToNow(new Date(admin.created_at), {
                      addSuffix: true,
                    })}
                  </span>
                </div>

                <div className="pt-2 border-t">
                  <Badge variant="secondary" className="capitalize">
                    {admin.role}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Card className="p-6 bg-muted/30">
        <div className="flex items-start gap-4">
          <Shield className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-semibold mb-1">About Admin Roles</h3>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Master Admin</span> has full system
              control including approving new admin signups.{" "}
              <span className="font-medium">Admin</span> can manage rangers,
              tasks, alerts, and view all system data.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
