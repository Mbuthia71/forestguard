import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { FileText, MapPin, Clock, Shield, ExternalLink } from 'lucide-react';

interface Report {
  id: string;
  location: string;
  location_name?: string;
  latitude?: number;
  longitude?: number;
  description: string;
  reporter_anonymous_id: string | null;
  evidence_url: string | null;
  ipfs_hash: string | null;
  blockchain_tx_hash: string | null;
  verified: boolean;
  created_at: string;
}

export default function AdminReports() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    fetchReports();

    const channel = supabase
      .channel('reports-admin-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'blockchain_reports' }, fetchReports)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchReports = async () => {
    console.log('Fetching blockchain reports...');
    const { data, error } = await supabase
      .from('blockchain_reports')
      .select('*')
      .order('created_at', { ascending: false });

    console.log('Blockchain reports response:', { data, error });

    if (error) {
      console.error('Error fetching blockchain reports:', error);
    } else if (data) {
      console.log('Successfully fetched', data.length, 'reports');
      setReports(data);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Blockchain <span className="text-primary">Reports</span>
        </h1>
        <p className="text-foreground/70">
          Verified community reports stored on blockchain
        </p>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report) => (
          <Card
            key={report.id}
            className="p-6 bg-card/50 backdrop-blur-sm border-border hover-glow"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <FileText className="text-primary" size={24} />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {report.verified && (
                        <Badge variant="outline" className="text-primary border-primary">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      {report.blockchain_tx_hash && (
                        <Badge variant="outline">
                          Blockchain Verified
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-start space-x-2 text-foreground">
                      <MapPin size={16} className="text-primary mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">
                          {report.location_name || report.location}
                        </div>
                        {report.latitude && report.longitude && (
                          <p className="text-xs text-foreground/60">
                            {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}
                          </p>
                        )}
                      </div>
                    </div>

                    <p className="text-foreground/80">{report.description}</p>

                    {/* Blockchain Details */}
                    {(report.ipfs_hash || report.blockchain_tx_hash) && (
                      <div className="mt-3 p-3 bg-background/50 rounded-lg space-y-2 text-sm">
                        {report.ipfs_hash && (
                          <div className="flex items-center gap-2 text-foreground/70">
                            <ExternalLink className="w-3 h-3" />
                            <span className="font-mono text-xs">IPFS: {report.ipfs_hash.substring(0, 20)}...</span>
                          </div>
                        )}
                        {report.blockchain_tx_hash && (
                          <div className="flex items-center gap-2 text-foreground/70">
                            <ExternalLink className="w-3 h-3" />
                            <span className="font-mono text-xs">TX: {report.blockchain_tx_hash.substring(0, 20)}...</span>
                          </div>
                        )}
                      </div>
                    )}

                    {report.reporter_anonymous_id && (
                      <p className="text-xs text-foreground/60">
                        Reporter ID: {report.reporter_anonymous_id.substring(0, 8)}...
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-foreground/60">
                  <Clock size={16} />
                  <span>{new Date(report.created_at).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {reports.length === 0 && (
          <Card className="p-12 text-center bg-card/50 backdrop-blur-sm border-border">
            <FileText className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
            <p className="text-foreground/60">No reports found</p>
          </Card>
        )}
      </div>
    </div>
  );
}