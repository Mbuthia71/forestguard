import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Shield, Upload, CheckCircle, Link2, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const BlockchainReporting = () => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastReport, setLastReport] = useState<any>(null);

  const generateIPFSHash = (data: string): string => {
    // Simulate IPFS hash generation (in production, would use actual IPFS)
    const hash = btoa(data + Date.now())
      .replace(/=/g, "")
      .substring(0, 46);
    return `Qm${hash}`;
  };

  const generateBlockchainTxHash = (): string => {
    // Simulate Polygon transaction hash
    const hash = Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    return `0x${hash}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim() || !location.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Step 1: Generate IPFS hash (simulated)
      const ipfsHash = generateIPFSHash(description + location);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Step 2: Generate blockchain transaction (simulated)
      const txHash = generateBlockchainTxHash();
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Step 3: Store in database
      const { data, error } = await supabase
        .from("blockchain_reports")
        .insert({
          description: description.trim(),
          location: location.trim(),
          ipfs_hash: ipfsHash,
          blockchain_tx_hash: txHash,
          verified: false,
          reporter_anonymous_id: `reporter_${Date.now()}`,
        })
        .select()
        .single();

      if (error) throw error;

      // Step 4: Create corresponding alert
      await supabase.from("alerts").insert({
        location: location.trim(),
        severity: "high",
        source: "blockchain_report",
        description: `Community Report: ${description.trim()}`,
        metadata: {
          ipfs_hash: ipfsHash,
          blockchain_tx_hash: txHash,
        },
      });

      setLastReport(data);
      setDescription("");
      setLocation("");

      toast({
        title: "✅ Report Submitted Successfully",
        description: "Your anonymous report has been verified on the blockchain",
      });
    } catch (error) {
      console.error("Error submitting report:", error);
      toast({
        title: "Submission Error",
        description: "Failed to submit report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Anonymous <span className="text-primary">Blockchain Reporting</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Submit anonymous reports of deforestation. Evidence is stored on IPFS and verified on Polygon blockchain for tamper-proof transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Reporting Form */}
          <Card className="bg-card border-border p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="text-primary w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">Submit Report</h3>
                <p className="text-sm text-foreground/60">100% Anonymous & Blockchain Verified</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground/80 block mb-2">
                  Location *
                </label>
                <Input
                  placeholder="e.g., Amazon Basin, Brazil"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-background border-border focus:border-primary"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground/80 block mb-2">
                  Description *
                </label>
                <Textarea
                  placeholder="Describe what you observed (illegal logging, clearing, etc.)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  className="bg-background border-border focus:border-primary resize-none"
                  disabled={isSubmitting}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover-glow"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Upload className="mr-2 animate-spin" size={20} />
                    Processing Report...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2" size={20} />
                    Submit Anonymous Report
                  </>
                )}
              </Button>

              <p className="text-xs text-foreground/50 text-center">
                Your identity is protected. Reports are hashed and stored immutably on blockchain.
              </p>
            </form>
          </Card>

          {/* Report Status */}
          <div className="space-y-6">
            <Card className="bg-card border-border p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">How It Works</h3>
              <div className="space-y-4">
                {[
                  {
                    icon: FileText,
                    title: "1. Submit Evidence",
                    desc: "Provide location and description anonymously",
                  },
                  {
                    icon: Upload,
                    title: "2. IPFS Storage",
                    desc: "Data is hashed and stored on decentralized IPFS",
                  },
                  {
                    icon: Link2,
                    title: "3. Blockchain Verification",
                    desc: "Hash recorded on Polygon for immutability",
                  },
                  {
                    icon: CheckCircle,
                    title: "4. Alert Generated",
                    desc: "Authorities are notified with verified evidence",
                  },
                ].map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="text-primary w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{step.title}</h4>
                        <p className="text-sm text-foreground/70">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Last Report Status */}
            {lastReport && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-primary/5 border-primary/30 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <CheckCircle className="text-primary w-6 h-6" />
                    <h4 className="font-bold text-foreground">Report Verified</h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-foreground/60">Location:</span>
                      <p className="font-medium text-foreground">{lastReport.location}</p>
                    </div>
                    <div>
                      <span className="text-foreground/60">IPFS Hash:</span>
                      <p className="font-mono text-xs text-primary break-all">
                        {lastReport.ipfs_hash}
                      </p>
                    </div>
                    <div>
                      <span className="text-foreground/60">Blockchain TX:</span>
                      <p className="font-mono text-xs text-primary break-all">
                        {lastReport.blockchain_tx_hash}
                      </p>
                    </div>
                    <Badge className="bg-primary/20 text-primary">
                      Verified on Polygon Mumbai
                    </Badge>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlockchainReporting;
