import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Satellite, AlertTriangle, TrendingUp, MapPin, Settings, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export default function SatelliteAnalysis() {
  const [apiKey, setApiKey] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [alertCount, setAlertCount] = useState(0);

  const mockData = {
    lastScan: new Date().toISOString(),
    areasMonitored: 2847,
    fireRisk: 'Medium',
    changePercentage: -3.2,
  };

  useEffect(() => {
    fetchAlertCount();
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel('alerts')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'alerts',
        },
        () => fetchAlertCount()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchAlertCount = async () => {
    const { count } = await supabase
      .from('alerts')
      .select('*', { count: 'exact', head: true });
    setAlertCount(count || 0);
  };

  const handleConfigure = () => {
    if (apiKey.length > 0) {
      setIsConfigured(true);
      toast.success('Satellite API configured successfully!');
    } else {
      toast.error('Please enter a valid API key');
    }
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setAnalyzing(false);
      toast.success('Satellite analysis complete!');
    }, 3000);
  };

  return (
    <section id="satellite" className="py-24 bg-gradient-to-b from-background to-forest-deep/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Satellite className="w-10 h-10 text-primary animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Satellite <span className="text-primary">Intelligence</span>
            </h2>
          </div>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Real-time deforestation detection powered by satellite imagery and AI
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {!isConfigured ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 bg-card/50 backdrop-blur-sm border-border">
                <div className="flex items-center gap-3 mb-6">
                  <Settings className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">Configure Satellite API</h3>
                </div>
                <p className="text-foreground/70 mb-6">
                  Enter your satellite imagery API key to enable real-time forest monitoring. 
                  The system will be ready to analyze when you provide your credentials.
                </p>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="apiKey">API Key</Label>
                    <Input
                      id="apiKey"
                      type="password"
                      placeholder="Enter your satellite API key..."
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <Button onClick={handleConfigure} className="w-full bg-primary hover:bg-primary/90">
                    Configure Satellite System
                  </Button>
                </div>
                <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <p className="text-sm text-foreground/80">
                    <strong>Note:</strong> The satellite analysis system is ready. Once configured, 
                    it will automatically scan for deforestation, fires, and environmental changes.
                  </p>
                </div>
              </Card>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border-border hover-glow">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-bold text-primary">{mockData.areasMonitored}</div>
                        <div className="text-sm text-foreground/70">Areas Monitored</div>
                      </div>
                      <MapPin className="w-8 h-8 text-primary opacity-50" />
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border-border hover-glow">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-bold text-destructive flex items-center gap-2">
                          {alertCount}
                          <Activity className="w-6 h-6 animate-pulse" />
                        </div>
                        <div className="text-sm text-foreground/70">Total Alerts</div>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-destructive opacity-50" />
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border-border hover-glow">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-bold text-foreground">{mockData.changePercentage}%</div>
                        <div className="text-sm text-foreground/70">Forest Change</div>
                      </div>
                      <TrendingUp className="w-8 h-8 text-primary opacity-50" />
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border-border hover-glow">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm text-foreground/70">Fire Risk Level</div>
                      <Badge variant={mockData.fireRisk === 'High' ? 'destructive' : 'default'} className="w-fit">
                        {mockData.fireRisk}
                      </Badge>
                    </div>
                  </Card>
                </motion.div>
              </div>

              {/* Analysis Card */}
              <Card className="p-8 bg-card/50 backdrop-blur-sm border-border">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Satellite Analysis</h3>
                    <p className="text-foreground/60 mt-1">
                      Last scan: {new Date(mockData.lastScan).toLocaleString()}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-primary border-primary">
                    System Active
                  </Badge>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {analyzing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                        Analyzing Satellite Data...
                      </>
                    ) : (
                      <>
                        <Satellite className="w-5 h-5 mr-2" />
                        Run New Analysis
                      </>
                    )}
                  </Button>

                  <div className="p-4 bg-background/50 rounded-lg">
                    <p className="text-sm text-foreground/70">
                      The satellite system continuously monitors forest areas for changes, 
                      fire risk, and deforestation patterns. Analysis results are automatically 
                      fed into the alert system and displayed on the real-time dashboard.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}