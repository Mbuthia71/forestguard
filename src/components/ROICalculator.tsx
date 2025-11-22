import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, AlertTriangle, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ROICalculator = () => {
  const [forestArea, setForestArea] = useState(1000); // hectares
  const [threatLevel, setThreatLevel] = useState(50); // 0-100 scale
  const [showResults, setShowResults] = useState(false);

  // Kenya loses ~$1.2B annually to illegal logging across ~3.5M hectares
  // That's ~$343 per hectare per year
  const avgLossPerHectare = 343;
  
  // Threat level adjusts the loss rate (50% = average, 100% = double average)
  const threatMultiplier = threatLevel / 50;
  
  const calculations = {
    annualLossWithoutProtection: Math.round(forestArea * avgLossPerHectare * threatMultiplier),
    annualCostOfProtection: Math.round(forestArea * 50), // $50/hectare/year monitoring cost
    preventedLosses: Math.round(forestArea * avgLossPerHectare * threatMultiplier * 0.85), // 85% prevention rate
    netSavings: Math.round((forestArea * avgLossPerHectare * threatMultiplier * 0.85) - (forestArea * 50)),
    roi: Math.round(((forestArea * avgLossPerHectare * threatMultiplier * 0.85) / (forestArea * 50)) * 100),
    threatsDetected: Math.round(forestArea / 100 * (threatLevel / 50)), // Estimated incidents per year
    hectaresProtected: Math.round(forestArea * 0.95), // 95% effective coverage
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  return (
    <Card className="max-w-5xl mx-auto border-primary/20">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl mb-3">Partnership ROI Calculator</CardTitle>
        <CardDescription className="text-base">
          Calculate the cost savings and forest protection impact for your organization
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Input Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="forest-area" className="text-base font-semibold mb-2 block">
                Forest Area Under Management
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="forest-area"
                  type="number"
                  value={forestArea}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setForestArea(Math.max(100, Math.min(100000, value)));
                    setShowResults(false);
                  }}
                  min="100"
                  max="100000"
                  className="h-12 text-lg"
                />
                <Badge variant="outline" className="text-base px-3 py-2 whitespace-nowrap">
                  hectares
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Total forest area your organization manages (100 - 100,000 hectares)
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <Label htmlFor="threat-level" className="text-base font-semibold">
                  Threat Level Assessment
                </Label>
                <Badge 
                  variant={threatLevel < 30 ? "outline" : threatLevel < 70 ? "secondary" : "destructive"}
                  className="text-sm"
                >
                  {threatLevel < 30 ? "Low" : threatLevel < 70 ? "Medium" : "High"} Risk
                </Badge>
              </div>
              <Slider
                id="threat-level"
                value={[threatLevel]}
                onValueChange={([value]) => {
                  setThreatLevel(value);
                  setShowResults(false);
                }}
                min={0}
                max={100}
                step={5}
                className="my-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Minimal Threat</span>
                <span>Average Risk</span>
                <span>Critical Risk</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Current threat level from illegal logging, encroachment, and fire risk
              </p>
            </div>
          </div>

          {/* Preview Stats */}
          <div className="bg-muted/30 p-6 rounded-lg border border-border">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Current Situation Overview
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Forest Coverage:</span>
                <span className="font-semibold">{forestArea.toLocaleString()} hectares</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Risk Level:</span>
                <span className="font-semibold">{threatLevel}% Threat Score</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Est. Annual Loss (unprotected):</span>
                <span className="font-semibold text-destructive">
                  KES {(forestArea * avgLossPerHectare * (threatLevel / 50)).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
            onClick={handleCalculate}
          >
            <TrendingUp className="mr-2 h-5 w-5" />
            Calculate ROI & Impact
          </Button>
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 pt-6 border-t border-border"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Your Partnership Impact Projection</h3>
                <p className="text-muted-foreground">
                  Based on {forestArea.toLocaleString()} hectares at {threatLevel}% threat level
                </p>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                  <CardContent className="pt-6 text-center">
                    <DollarSign className="h-10 w-10 text-primary mx-auto mb-3" />
                    <div className="text-3xl font-bold text-primary mb-1">
                      {calculations.roi}%
                    </div>
                    <div className="text-sm text-muted-foreground">Return on Investment</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
                  <CardContent className="pt-6 text-center">
                    <Shield className="h-10 w-10 text-green-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      KES {(calculations.preventedLosses / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-sm text-muted-foreground">Losses Prevented Annually</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
                  <CardContent className="pt-6 text-center">
                    <TrendingUp className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      KES {(calculations.netSavings / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-sm text-muted-foreground">Net Annual Savings</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/20">
                  <CardContent className="pt-6 text-center">
                    <AlertTriangle className="h-10 w-10 text-orange-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-orange-600 mb-1">
                      {calculations.threatsDetected}
                    </div>
                    <div className="text-sm text-muted-foreground">Threats Detected/Year</div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Cost-Benefit Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span className="text-muted-foreground">Annual Monitoring Cost</span>
                      <span className="font-semibold">
                        KES {calculations.annualCostOfProtection.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span className="text-muted-foreground">Illegal Logging Prevented (85% rate)</span>
                      <span className="font-semibold text-green-600">
                        +KES {calculations.preventedLosses.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span className="text-muted-foreground">Hectares Effectively Protected</span>
                      <span className="font-semibold">
                        {calculations.hectaresProtected.toLocaleString()} ha (95%)
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-3 bg-primary/5 p-4 rounded-lg">
                      <span className="font-bold text-lg">Net Annual Benefit</span>
                      <span className="font-bold text-2xl text-primary">
                        KES {calculations.netSavings.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* What's Included */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>What This Investment Includes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start gap-2">
                      <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold mb-1">24/7 Satellite Monitoring</div>
                        <div className="text-muted-foreground">5-day revisit cycle, 10m resolution imagery</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold mb-1">IoT Ground Sensors</div>
                        <div className="text-muted-foreground">Acoustic + motion detection across zones</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold mb-1">Real-time Alert System</div>
                        <div className="text-muted-foreground">Instant threat notifications via SMS/email</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold mb-1">Ranger Management Dashboard</div>
                        <div className="text-muted-foreground">Task assignment and field report tracking</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <div className="text-center pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                  Request Partnership Proposal
                </Button>
                <p className="text-sm text-muted-foreground mt-3">
                  Get a detailed proposal customized for your {forestArea.toLocaleString()} hectare forest
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default ROICalculator;
