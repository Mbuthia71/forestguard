import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Phone, Briefcase, MapPin } from "lucide-react";

interface Ranger {
  id: string;
  user_id: string;
  phone: string | null;
  status: string;
  employee_id: string | null;
  department: string | null;
  position: string | null;
  place_of_employment: string | null;
  created_at: string;
  profile?: {
    display_name: string | null;
  };
}

export default function Rangers() {
  const [rangers, setRangers] = useState<Ranger[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRangers();
  }, []);

  const fetchRangers = async () => {
    setLoading(true);
    const { data: rangersData, error } = await supabase
      .from("rangers")
      .select("*, profiles:user_id(display_name)")
      .order("created_at", { ascending: false });

    if (!error && rangersData) {
      const mapped = rangersData.map((r: any) => ({
        ...r,
        profile: r.profiles,
      }));
      setRangers(mapped);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Forest Rangers</h1>
        <p className="text-muted-foreground">View and manage field ranger accounts</p>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading rangers...</div>
      ) : rangers.length === 0 ? (
        <Card className="p-12 text-center">
          <User className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No Rangers Yet</h3>
          <p className="text-muted-foreground">Rangers will appear here when they sign up at /auth</p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rangers.map((ranger) => (
            <Card key={ranger.id} className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {ranger.profile?.display_name || "Unknown Ranger"}
                    </h3>
                    <Badge variant={ranger.status === "active" ? "default" : "secondary"}>
                      {ranger.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                {ranger.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    {ranger.phone}
                  </div>
                )}
                
                {ranger.employee_id && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="w-4 h-4" />
                    ID: {ranger.employee_id}
                  </div>
                )}

                {ranger.department && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {ranger.department}
                  </div>
                )}

                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    {ranger.position || "Forest Ranger"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {ranger.place_of_employment || "Kenya Forest Service"}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
