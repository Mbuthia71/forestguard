import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Satellite, Radar, TrendingDown, Flame, TreeDeciduous } from "lucide-react";
import { useForestSelector } from "@/hooks/useForestSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SatelliteIntelligence() {
  const { selectedForest } = useForestSelector();
  const [sarComparison, setSarComparison] = useState(50);
  const [opticalTimeline, setOpticalTimeline] = useState(100);

  const sarAlerts = [
    { type: "Possible Logging", severity: "high", area: "Northern Zone", confidence: 87 },
    { type: "Ground Disturbance", severity: "medium", area: "Eastern Sector", confidence: 72 },
    { type: "Vegetation Loss Zone", severity: "high", area: "Southern Boundary", confidence: 91 },
  ];

  const forestHealth = {
    vegetationScore: selectedForest.healthIndex,
    canopyDensity: 78,
    deforestationRate: 0.3,
    lastSARUpdate: selectedForest.lastUpdate,
    lastOpticalUpdate: selectedForest.lastUpdate,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Satellite className="w-8 h-8 text-primary" />
            Satellite Intelligence (SAR & Optical)
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitoring {selectedForest.name} - Last updated: {selectedForest.lastUpdate}
          </p>
        </div>
      </div>

      <Tabs defaultValue="sar" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sar">SAR Analysis</TabsTrigger>
          <TabsTrigger value="optical">Optical Imagery</TabsTrigger>
          <TabsTrigger value="health">Forest Health</TabsTrigger>
        </TabsList>

        <TabsContent value="sar" className="space-y-6">
          {/* SAR Change Map */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Radar className="w-5 h-5" />
                SAR Change Map (Sentinel-1 Style)
              </CardTitle>
              <CardDescription>
                Compare radar backscatter before vs after - Slide to reveal changes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative h-96 bg-muted rounded-lg overflow-hidden border-2 border-border">
                {/* Mock SAR imagery */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-600" />
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-500"
                  style={{ clipPath: `inset(0 ${100 - sarComparison}% 0 0)` }}
                />
                {/* Highlight suspicious areas */}
                <div className="absolute top-1/3 left-1/4 w-20 h-20 bg-red-500/50 rounded-full blur-xl" />
                <div className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-orange-500/50 rounded-full blur-xl" />
                
                <div className="absolute top-4 left-4 space-y-2">
                  <Badge variant="secondary">Before: {selectedForest.lastUpdate}</Badge>
                  <Badge variant="default">After: 2025-01-19</Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Timeline Comparison</label>
                <Slider
                  value={[sarComparison]}
                  onValueChange={(v) => setSarComparison(v[0])}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* SAR Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>SAR-Based Alerts</CardTitle>
              <CardDescription>Automated detection from radar analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {sarAlerts.map((alert, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 border-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={alert.severity === "high" ? "destructive" : "secondary"}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <span className="font-semibold">{alert.type}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Location: {alert.area} • Confidence: {alert.confidence}%
                    </p>
                  </div>
                  <Button size="sm" variant="outline">View on Map</Button>
                </div>
              ))}
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
