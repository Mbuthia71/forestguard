import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, MapPin, ArrowLeft, X, Upload } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import RangerNavigation from "@/components/RangerNavigation";

export default function NewReport() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reportType, setReportType] = useState("");
  const [severity, setSeverity] = useState("medium");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [photos, setPhotos] = useState<Array<{ file: File; preview: string; gps?: { lat: number; lng: number } }>>([]);
  const [offlineQueue, setOfflineQueue] = useState<any[]>([]);

  useEffect(() => {
    // Load offline queue from localStorage
    const queue = localStorage.getItem('offlineReportQueue');
    if (queue) {
      setOfflineQueue(JSON.parse(queue));
    }

    // Sync offline reports when back online
    window.addEventListener('online', syncOfflineReports);
    return () => window.removeEventListener('online', syncOfflineReports);
  }, []);

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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                setPhotos(prev => [...prev, {
                  file,
                  preview: event.target?.result as string,
                  gps: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                  }
                }]);
                toast.success(`Photo added with GPS: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
              },
              () => {
                setPhotos(prev => [...prev, {
                  file,
                  preview: event.target?.result as string,
                }]);
                toast.info("Photo added without GPS");
              }
            );
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const syncOfflineReports = async () => {
    const queue = localStorage.getItem('offlineReportQueue');
    if (!queue) return;

    const reports = JSON.parse(queue);
    const synced: string[] = [];

    for (const report of reports) {
      try {
        await supabase.from('field_reports').insert(report);
        synced.push(report.id);
        toast.success("Synced offline report");
      } catch (error) {
        console.error("Failed to sync report:", error);
      }
    }

    const remaining = reports.filter((r: any) => !synced.includes(r.id));
    localStorage.setItem('offlineReportQueue', JSON.stringify(remaining));
    setOfflineQueue(remaining);
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

      const photoData = photos.map(p => ({
        preview: p.preview,
        gps: p.gps
      }));

      const reportData = {
        ranger_id: ranger.id,
        title,
        description,
        report_type: reportType,
        severity,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        photos: photoData,
        status: 'pending',
      };

      if (navigator.onLine) {
        const { error } = await supabase.from('field_reports').insert(reportData);
        if (error) throw error;
        toast.success("Report submitted successfully");
        navigate("/ranger");
      } else {
        // Store offline
        const queue = JSON.parse(localStorage.getItem('offlineReportQueue') || '[]');
        queue.push({ ...reportData, id: Date.now().toString() });
        localStorage.setItem('offlineReportQueue', JSON.stringify(queue));
        setOfflineQueue(queue);
        toast.info("Report saved offline. Will sync when online.");
        navigate("/ranger");
      }
    } catch (error: any) {
      toast.error("Failed to submit report: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-20 lg:pt-20">
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
            <Label>Photos (with GPS tagging)</Label>
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                capture="environment"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Photos
              </Button>
              
              {photos.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border-2 border-border"
                      />
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute top-1 right-1 bg-destructive text-destructive-foreground p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      {photo.gps && (
                        <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          GPS: {photo.gps.lat.toFixed(4)}, {photo.gps.lng.toFixed(4)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
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

          {offlineQueue.length > 0 && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                📦 {offlineQueue.length} report(s) queued for sync
              </p>
            </div>
          )}

          <Button onClick={handleSubmit} disabled={loading} className="w-full" size="lg">
            <Camera className="w-4 h-4 mr-2" />
            {loading ? "Submitting..." : navigator.onLine ? "Submit Report" : "Save Offline"}
          </Button>
        </CardContent>
      </Card>
      </div>
      <RangerNavigation />
    </div>
  );
}
