import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, MapPin, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export default function NewReport() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reportType, setReportType] = useState("");
  const [severity, setSeverity] = useState("medium");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
          toast.success("Location captured");
        },
        () => {
          toast.error("Could not get location");
        }
      );
    }
  };

  const handleSubmit = async () => {
    if (!title || !reportType || !latitude || !longitude) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      // Get ranger profile
      const { data: ranger } = await supabase
        .from('rangers')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      if (!ranger) {
        toast.error("Ranger profile not found");
        return;
      }

      const { error } = await supabase.from('field_reports').insert({
        ranger_id: ranger.id,
        title,
        description,
        report_type: reportType,
        severity,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        status: 'pending',
      });

      if (error) throw error;

      toast.success("Report submitted successfully");
      navigate("/ranger");
    } catch (error: any) {
      toast.error("Failed to submit report: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <Button variant="ghost" onClick={() => navigate("/ranger")}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>New Field Report</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief description"
            />
          </div>

          <div>
            <Label>Report Type</Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fire">Fire/Smoke</SelectItem>
                <SelectItem value="logging">Illegal Logging</SelectItem>
                <SelectItem value="wildlife">Wildlife Sighting</SelectItem>
                <SelectItem value="encroachment">Land Encroachment</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Severity</Label>
            <Select value={severity} onValueChange={setSeverity}>
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
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed observations..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Latitude</Label>
              <Input
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="0.0000"
              />
            </div>
            <div>
              <Label>Longitude</Label>
              <Input
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="0.0000"
              />
            </div>
          </div>

          <Button variant="outline" onClick={getCurrentLocation} className="w-full">
            <MapPin className="w-4 h-4 mr-2" />
            Get Current Location
          </Button>

          <Button onClick={handleSubmit} disabled={loading} className="w-full" size="lg">
            <Camera className="w-4 h-4 mr-2" />
            {loading ? "Submitting..." : "Submit Report"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
