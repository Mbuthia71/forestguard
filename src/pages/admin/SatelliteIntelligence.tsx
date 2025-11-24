import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Satellite, Radar, TrendingDown, Flame, TreeDeciduous, Waves, Activity, AlertTriangle, Loader2 } from "lucide-react";
import { useForestSelector } from "@/hooks/useForestSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SatelliteAIVoiceover } from "@/components/SatelliteAIVoiceover";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function SatelliteIntelligence() {
  const { selectedForest } = useForestSelector();
  const { toast } = useToast();
  const [sarComparison, setSarComparison] = useState(50);
  const [opticalTimeline, setOpticalTimeline] = useState(100);
  const [selectedPolarization, setSelectedPolarization] = useState<"VV" | "VH">("VV");
  const [isLoading, setIsLoading] = useState(false);
  const [sarData, setSarData] = useState<any>(null);
  const [isDemo, setIsDemo] = useState(true);

  // Fetch real SAR data when forest changes
  useEffect(() => {
    const fetchSARData = async () => {
      setIsLoading(true);
      try {
        console.log('Fetching SAR data for:', selectedForest.name);
        
        const { data, error } = await supabase.functions.invoke('fetch-sar-data', {
          body: {
            forestId: selectedForest.id,
            forestName: selectedForest.name,
            coordinates: selectedForest.coordinates
          }
        });

        if (error) {
          console.error('Error fetching SAR data:', error);
          toast({
            title: "SAR Data Error",
            description: "Failed to fetch Sentinel-1 data. Using demo mode.",
            variant: "destructive"
          });
          return;
        }

        console.log('SAR data received:', data);
        setSarData(data.data);
        setIsDemo(data.demo || false);

        if (data.demo) {
          toast({
            title: "Demo Mode",
            description: data.data.metadata?.note || "Using simulated SAR data",
            variant: "default"
          });
        } else {
          toast({
            title: "Real Data Loaded",
            description: `Sentinel-1 data from ${data.data.metadata?.source}`,
            variant: "default"
          });
        }

      } catch (error) {
        console.error('Exception fetching SAR data:', error);
        toast({
          title: "Error",
          description: "Failed to load SAR data",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSARData();
  }, [selectedForest.id, toast]);

  // Use real data if available, otherwise use defaults
  const sarBackscatter = sarData || {
    VV: {
      denseForest: -8.5,
      moderateForest: -10.2,
      degradedForest: -12.8,
      clearedArea: -15.3,
      current: -9.1,
      baseline: -8.7,
      change: -0.4,
    },
    VH: {
      denseForest: -14.2,
      moderateForest: -16.5,
      degradedForest: -18.9,
      clearedArea: -22.1,
      current: -15.1,
      baseline: -14.5,
      change: -0.6,
    }
  };

  const sarAlerts = sarData?.alerts || [
    { 
      type: "Possible Logging Activity", 
      severity: "high", 
      area: "Northern Zone", 
      confidence: 87,
      backscatterChange: -3.2,
      method: "VV/VH Cross-polarization Analysis",
      date: "2025-01-15"
    },
    { 
      type: "Ground Disturbance Detected", 
      severity: "medium", 
      area: "Eastern Sector", 
      confidence: 72,
      backscatterChange: -1.8,
      method: "Temporal Change Detection",
      date: "2025-01-12"
    },
    { 
      type: "Canopy Structure Loss", 
      severity: "high", 
      area: "Southern Boundary", 
      confidence: 91,
      backscatterChange: -4.1,
      method: "SAR Coherence Analysis",
      date: "2025-01-10"
    },
  ];

  const forestHealth = {
    vegetationScore: selectedForest.healthIndex,
    canopyDensity: 78,
    deforestationRate: 0.3,
    lastSARUpdate: selectedForest.lastUpdate,
    lastOpticalUpdate: selectedForest.lastUpdate,
    sarRevisitDays: 6,
    cloudPenetration: true,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Satellite className="w-8 h-8 text-primary" />
            Satellite Intelligence (SAR & Optical)
            {isLoading && <Loader2 className="w-6 h-6 animate-spin text-primary" />}
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitoring {selectedForest.name} - Last updated: {selectedForest.lastUpdate}
            {isDemo && (
              <Badge variant="outline" className="ml-2 text-orange-600 border-orange-600">
                DEMO MODE
              </Badge>
            )}
          </p>
        </div>
        <Button 
          onClick={() => window.location.reload()} 
          variant="outline"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Refresh Data"}
        </Button>
      </div>

      <SatelliteAIVoiceover 
        forestName={selectedForest.name}
        satelliteData={forestHealth}
      />

      <Tabs defaultValue="sar" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sar">SAR Analysis</TabsTrigger>
          <TabsTrigger value="optical">Optical Imagery</TabsTrigger>
          <TabsTrigger value="health">Forest Health</TabsTrigger>
        </TabsList>

        <TabsContent value="sar" className="space-y-6">
          {/* SAR Technical Overview */}
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Satellite className="w-5 h-5 text-primary" />
                Sentinel-1 SAR Monitoring
              </CardTitle>
              <CardDescription>
                C-band Synthetic Aperture Radar • 5.4 GHz • 10m Resolution • All-Weather
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Sensor Type</p>
                  <p className="text-sm font-semibold">C-band SAR</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Resolution</p>
                  <p className="text-sm font-semibold">10m x 10m</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Revisit Cycle</p>
                  <p className="text-sm font-semibold">6-12 Days</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Cloud Penetration</p>
                  <p className="text-sm font-semibold text-green-600">✓ Active</p>
                </div>
              </div>
              
              {/* Data Source Info */}
              {sarData?.metadata && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Data Source</p>
                      <p className="text-sm font-semibold">{sarData.metadata.source}</p>
                      {sarData.metadata.note && (
                        <p className="text-xs text-muted-foreground mt-1">{sarData.metadata.note}</p>
                      )}
                    </div>
                    <Badge variant={isDemo ? "outline" : "default"}>
                      {isDemo ? "Demo Data" : "Live Data"}
                    </Badge>
                  </div>
                  {sarData.metadata.processed && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Processed: {new Date(sarData.metadata.processed).toLocaleString()}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Polarization Selector */}
          <div className="flex gap-2">
            <Button 
              variant={selectedPolarization === "VV" ? "default" : "outline"}
              onClick={() => setSelectedPolarization("VV")}
              className="flex-1"
            >
              <Waves className="w-4 h-4 mr-2" />
              VV Polarization
            </Button>
            <Button 
              variant={selectedPolarization === "VH" ? "default" : "outline"}
              onClick={() => setSelectedPolarization("VH")}
              className="flex-1"
            >
              <Activity className="w-4 h-4 mr-2" />
              VH Cross-Polarization
            </Button>
          </div>

          {/* Backscatter Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Radar className="w-5 h-5" />
                Backscatter Intensity Analysis ({selectedPolarization})
              </CardTitle>
              <CardDescription>
                Radar return strength in decibels (dB) - Lower values indicate forest loss
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Backscatter */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Current Backscatter</span>
                    <Badge variant="secondary">{sarBackscatter[selectedPolarization].current} dB</Badge>
                  </div>
                  <Progress 
                    value={Math.abs((sarBackscatter[selectedPolarization].current + 25) / 0.25)} 
                    className="h-3"
                  />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Baseline (Historical)</span>
                    <Badge variant="outline">{sarBackscatter[selectedPolarization].baseline} dB</Badge>
                  </div>
                  <Progress 
                    value={Math.abs((sarBackscatter[selectedPolarization].baseline + 25) / 0.25)} 
                    className="h-3"
                  />

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-medium">Change Detected</span>
                    <Badge variant={sarBackscatter[selectedPolarization].change < -1 ? "destructive" : "secondary"}>
                      {sarBackscatter[selectedPolarization].change} dB
                    </Badge>
                  </div>
                </div>

                {/* Reference Values */}
                <div className="space-y-3 bg-muted/50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold mb-3">Reference Backscatter Values</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Dense Forest</span>
                      <span className="font-mono font-semibold text-green-600">
                        {sarBackscatter[selectedPolarization].denseForest} dB
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Moderate Forest</span>
                      <span className="font-mono font-semibold text-green-600">
                        {sarBackscatter[selectedPolarization].moderateForest} dB
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Degraded Forest</span>
                      <span className="font-mono font-semibold text-orange-600">
                        {sarBackscatter[selectedPolarization].degradedForest} dB
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Cleared Area</span>
                      <span className="font-mono font-semibold text-red-600">
                        {sarBackscatter[selectedPolarization].clearedArea} dB
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    {selectedPolarization === "VV" 
                      ? "VV: Co-polarization, sensitive to volume scattering from canopy"
                      : "VH: Cross-polarization, sensitive to structural changes and biomass"}
                  </p>
                </div>
              </div>

              {/* Status Indicator */}
              {sarBackscatter[selectedPolarization].change < -1 && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <div>
                    <p className="text-sm font-semibold text-destructive">Significant Backscatter Decrease Detected</p>
                    <p className="text-xs text-muted-foreground">
                      Change of {sarBackscatter[selectedPolarization].change} dB indicates possible canopy loss or structural degradation
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* SAR Change Map */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Radar className="w-5 h-5" />
                SAR Change Detection Map
              </CardTitle>
              <CardDescription>
                Temporal comparison - Red areas show significant backscatter decrease (forest loss)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative h-96 bg-muted rounded-lg overflow-hidden border-2 border-border">
                {/* Mock SAR imagery with realistic grayscale */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700" />
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600"
                  style={{ clipPath: `inset(0 ${100 - sarComparison}% 0 0)` }}
                />
                {/* Deforestation hotspots - darker areas indicate lower backscatter */}
                <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-red-600/60 rounded-full blur-2xl animate-pulse" />
                <div className="absolute bottom-1/3 right-1/3 w-20 h-20 bg-orange-500/50 rounded-full blur-xl" />
                <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-yellow-500/40 rounded-full blur-lg" />
                
                <div className="absolute top-4 left-4 space-y-2">
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur">
                    Before: Dec 2024
                  </Badge>
                  <Badge variant="default" className="bg-background/80 backdrop-blur">
                    After: Jan 2025
                  </Badge>
                  <Badge variant="outline" className="bg-background/80 backdrop-blur">
                    {selectedPolarization} Band
                  </Badge>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur p-3 rounded-lg border space-y-1">
                  <p className="text-xs font-semibold mb-2">Change Intensity</p>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-600 rounded-full" />
                    <span className="text-xs">High Loss (&gt; -3 dB)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full" />
                    <span className="text-xs">Medium Loss (-1 to -3 dB)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <span className="text-xs">Low Loss (&lt; -1 dB)</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Timeline Slider (Before ← → After)</label>
                <Slider
                  value={[sarComparison]}
                  onValueChange={(v) => setSarComparison(v[0])}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  {sarComparison < 50 ? "Viewing: Before state" : "Viewing: After state with changes highlighted"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* SAR Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Automated SAR Detections</CardTitle>
              <CardDescription>
                Machine learning analysis of Sentinel-1 temporal signatures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {sarAlerts.map((alert, idx) => (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border-2 rounded-lg hover:bg-muted/50 transition-colors gap-3"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant={alert.severity === "high" ? "destructive" : "secondary"}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <span className="font-semibold">{alert.type}</span>
                      <Badge variant="outline" className="text-xs">
                        {alert.date}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Location: <span className="font-medium">{alert.area}</span> • 
                      Confidence: <span className="font-medium">{alert.confidence}%</span>
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant="secondary" className="font-mono">
                        Δ {alert.backscatterChange} dB
                      </Badge>
                      <span className="text-muted-foreground">{alert.method}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="md:self-start">
                    View on Map
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Why SAR Info Card */}
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-base">Why SAR for Forest Monitoring?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <p><strong>Cloud penetration:</strong> Works through clouds, rain, and smoke - ideal for tropical forests</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <p><strong>Day/night monitoring:</strong> Active sensor doesn't require sunlight</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <p><strong>Structural sensitivity:</strong> Detects canopy height, density, and biomass changes</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <p><strong>Rapid detection:</strong> 6-12 day revisit enables early warning of illegal logging</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optical" className="space-y-6">
          {/* Optical Imagery */}
          <Card>
            <CardHeader>
              <CardTitle>Optical Imagery (Sentinel-2 Style)</CardTitle>
              <CardDescription>True color and NDVI visualization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">True Color View</h4>
                  <div className="h-64 bg-gradient-to-br from-green-900 via-green-700 to-green-800 rounded-lg border-2" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">NDVI Heatmap</h4>
                  <div className="h-64 bg-gradient-to-br from-red-600 via-yellow-500 to-green-600 rounded-lg border-2" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">30-Day Timeline</label>
                <Slider
                  value={[opticalTimeline]}
                  onValueChange={(v) => setOpticalTimeline(v[0])}
                  max={30}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">Day: {opticalTimeline}/30</p>
              </div>

              <div className="flex gap-2">
                <Badge>Cloud Cover: 12%</Badge>
                <Badge variant="secondary">Quality: High</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          {/* Forest Health Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TreeDeciduous className="w-4 h-4 text-green-500" />
                  Vegetation Health Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-green-600">{forestHealth.vegetationScore}</div>
                <p className="text-xs text-muted-foreground mt-1">Out of 100</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Canopy Density Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{forestHealth.canopyDensity}%</div>
                <p className="text-xs text-muted-foreground mt-1">↓ 2% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-orange-500" />
                  Deforestation Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-orange-600">{forestHealth.deforestationRate}%</div>
                <p className="text-xs text-muted-foreground mt-1">Per year</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Last SAR Update</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{forestHealth.lastSARUpdate}</div>
                <Badge variant="secondary" className="mt-2">Cloud-free</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Last Optical Update</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{forestHealth.lastOpticalUpdate}</div>
                <Badge variant="secondary" className="mt-2">High Quality</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Flame className="w-4 h-4 text-red-500" />
                  Fire Risk
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-red-600">{selectedForest.riskScore.fire}</div>
                <p className="text-xs text-muted-foreground mt-1">Risk index</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
