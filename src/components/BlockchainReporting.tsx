import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Shield, MapPin, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";

const BlockchainReporting = () => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toFixed(6));
          setLongitude(position.coords.longitude.toFixed(6));
          toast.success('Location captured!');
        },
        () => toast.error('Could not get location')
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const ipfsHash = `Qm${Math.random().toString(36).substring(2, 15)}`;
      const txHash = `0x${Math.random().toString(16).substring(2, 15)}`;

      await supabase.from("blockchain_reports").insert([{
        location,
        description,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        ipfs_hash: ipfsHash,
        blockchain_tx_hash: txHash,
        reporter_anonymous_id: `anon-${Date.now()}`,
      }]);

      toast.success("Report submitted!");
      setLocation("");
      setDescription("");
      setLatitude("");
      setLongitude("");
    } catch {
      toast.error("Failed to submit");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="text-primary">Blockchain</span> Reporting
        </h2>
        <Card className="max-w-2xl mx-auto p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
            </div>
            <div className="flex gap-2">
              <Input placeholder="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
              <Input placeholder="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
              <Button type="button" onClick={getCurrentLocation}><MapPin /></Button>
            </div>
            <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <Button type="submit" disabled={isSubmitting} className="w-full">{isSubmitting ? 'Submitting...' : 'Submit Report'}</Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default BlockchainReporting;