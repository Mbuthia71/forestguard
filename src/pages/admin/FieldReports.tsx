import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, MapPin, Calendar, User, Download } from "lucide-react";
import { format } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "sonner";

interface FieldReport {
  id: string;
  title: string;
  description: string | null;
  report_type: string;
  severity: string;
  status: string;
  latitude: number;
  longitude: number;
  tags: string[] | null;
  created_at: string;
  ranger: {
    profile: {
      display_name: string | null;
    };
  };
}

export default function FieldReports() {
  const [reports, setReports] = useState<FieldReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchReports();
  }, [filter]);

  const fetchReports = async () => {
    setLoading(true);
    console.log('Fetching field reports with filter:', filter);
    
    try {
      let query = supabase
        .from("field_reports")
        .select("*")
        .order("created_at", { ascending: false });

      if (filter !== "all") {
        query = query.eq("status", filter);
      }

      const { data: reportsData, error } = await query;
      console.log('Field reports response:', { reportsData, error });

      if (error) {
        console.error("Error fetching reports:", error);
        toast.error("Failed to load reports");
        return;
      }

      // Fetch rangers and profiles separately
      if (reportsData && reportsData.length > 0) {
        const rangerIds = [...new Set(reportsData.map(r => r.ranger_id))];
        
        const { data: rangersData } = await supabase
          .from("rangers")
          .select("id, user_id")
          .in("id", rangerIds);

        const rangerUserIds = rangersData?.map(r => r.user_id) || [];
        
        const { data: profilesData } = await supabase
          .from("profiles")
          .select("id, display_name")
          .in("id", rangerUserIds);

        const profilesMap = new Map(profilesData?.map(p => [p.id, p]) || []);
        const rangersMap = new Map(rangersData?.map(r => [r.id, { ...r, profile: profilesMap.get(r.user_id) }]) || []);

        const transformedData = reportsData.map((report: any) => ({
          ...report,
          ranger: rangersMap.get(report.ranger_id)
        }));
        
        console.log('Transformed reports:', transformedData);
        setReports(transformedData);
      } else {
        setReports([]);
      }
    } catch (error) {
      console.error("Error in fetchReports:", error);
      toast.error("Error loading reports");
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      default:
        return "secondary";
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text("Field Reports", 14, 22);
    
    doc.setFontSize(11);
    doc.text(`Generated: ${format(new Date(), "MMM d, yyyy HH:mm")}`, 14, 30);
    doc.text(`Filter: ${filter}`, 14, 36);
    
    const tableData = reports.map(report => [
      report.title,
      report.ranger?.profile?.display_name || "Unknown",
      report.report_type,
      report.severity,
      report.status,
      `${report.latitude.toFixed(4)}, ${report.longitude.toFixed(4)}`,
      format(new Date(report.created_at), "MMM d, yyyy")
    ]);
    
    autoTable(doc, {
      startY: 42,
      head: [["Title", "Ranger", "Type", "Severity", "Status", "Location", "Date"]],
      body: tableData,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [34, 197, 94] }
    });
    
    doc.save(`field-reports-${format(new Date(), "yyyy-MM-dd")}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Field Reports</h1>
          <p className="text-muted-foreground">Review reports submitted by rangers</p>
        </div>

        <div className="flex gap-2">
          {["all", "pending", "reviewed", "resolved"].map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              onClick={() => setFilter(status)}
              size="sm"
            >
              {status}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={exportToPDF}
            size="sm"
            disabled={reports.length === 0}
          >
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading reports...</div>
      ) : reports.length === 0 ? (
        <Card className="p-12 text-center">
          <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No Field Reports</h3>
          <p className="text-muted-foreground">Reports from rangers will appear here</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {reports.map((report) => (
            <Card key={report.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{report.title}</h3>
                    <Badge variant={getSeverityColor(report.severity)}>
                      {report.severity}
                    </Badge>
                    <Badge variant="outline">{report.report_type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="w-4 h-4" />
                  {report.ranger?.profile?.display_name || "Unknown"}
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(report.created_at), "MMM d, yyyy")}
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={report.status === "pending" ? "secondary" : "default"}>
                    {report.status}
                  </Badge>
                </div>
              </div>

              {report.tags && report.tags.length > 0 && (
                <div className="flex gap-2 mt-4">
                  {report.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
