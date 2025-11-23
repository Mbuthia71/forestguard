import { Button } from "@/components/ui/button";
import { Download, Satellite, Radio, Shield, Brain, TrendingUp, Users, Leaf } from "lucide-react";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";

const PitchDeck = () => {
  const downloadPDF = () => {
    window.print();
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <div className="print:hidden">
          <Navigation />
        </div>
        
        <div className="container mx-auto px-4 py-24 max-w-6xl">
          {/* Download Button */}
          <div className="flex justify-end mb-6 print:hidden">
            <Button onClick={downloadPDF} size="lg" className="gap-2">
              <Download className="w-5 h-5" />
              Download PDF
            </Button>
          </div>

          {/* Pitch Deck Content */}
          <div className="bg-white p-12 rounded-lg shadow-2xl space-y-8">
            {/* Header */}
            <div className="text-center border-b-4 border-primary pb-6">
              <h1 className="text-5xl font-bold text-primary mb-2">ForestGuard</h1>
              <p className="text-2xl text-muted-foreground">AI-Powered Forest Monitoring for Kenya</p>
            </div>

            {/* The Problem & Solution */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 bg-red-50 border-red-200">
                <h3 className="text-xl font-bold text-red-800 mb-3">🔥 The Problem</h3>
                <ul className="space-y-2 text-sm text-red-700">
                  <li>• Kenya loses 5,000+ hectares of forest annually</li>
                  <li>• Illegal logging costs $20M+ per year</li>
                  <li>• Whistleblowers face threats & violence</li>
                  <li>• Government lacks real-time monitoring</li>
                </ul>
              </Card>
              
              <Card className="p-6 bg-green-50 border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-3">✅ Our Solution</h3>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• 4-layer monitoring system (Satellite + IoT + Blockchain + AI)</li>
                  <li>• Anonymous reporting with crypto protection</li>
                  <li>• Real-time alerts to rangers & government</li>
                  <li>• Community-powered forest protection</li>
                </ul>
              </Card>
            </div>

            {/* 4-Layer System Architecture */}
            <div>
              <h2 className="text-3xl font-bold text-center mb-6 text-primary">4-Layer System Architecture</h2>
              <div className="grid grid-cols-4 gap-4">
                <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                  <Satellite className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                  <h4 className="font-bold text-sm mb-2">Layer 1: Satellite</h4>
                  <p className="text-xs text-muted-foreground">Sentinel-2 imagery every 5 days detects vegetation loss</p>
                </Card>
                
                <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                  <Radio className="w-12 h-12 mx-auto mb-3 text-green-600" />
                  <h4 className="font-bold text-sm mb-2">Layer 2: IoT Sensors</h4>
                  <p className="text-xs text-muted-foreground">LoRaWAN acoustic sensors detect chainsaws & activity</p>
                </Card>
                
                <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                  <Shield className="w-12 h-12 mx-auto mb-3 text-purple-600" />
                  <h4 className="font-bold text-sm mb-2">Layer 3: Blockchain</h4>
                  <p className="text-xs text-muted-foreground">Anonymous reports stored on Polygon with zk-proofs</p>
                </Card>
                
                <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                  <Brain className="w-12 h-12 mx-auto mb-3 text-orange-600" />
                  <h4 className="font-bold text-sm mb-2">Layer 4: AI Alerts</h4>
                  <p className="text-xs text-muted-foreground">Real-time fusion & voice briefings for government</p>
                </Card>
              </div>
            </div>

            {/* 3 Standout Features */}
            <div>
              <h2 className="text-3xl font-bold text-center mb-6 text-primary">3 Standout Features</h2>
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-5 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <div className="text-4xl mb-2">🎙️</div>
                  <h4 className="font-bold text-sm mb-2">AI Voice Briefings</h4>
                  <p className="text-xs">Daily 7am WhatsApp audio summaries for Kenya Forest Service directors</p>
                </Card>
                
                <Card className="p-5 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <div className="text-4xl mb-2">🏆</div>
                  <h4 className="font-bold text-sm mb-2">Forest Health Leaderboard</h4>
                  <p className="text-xs">Public gamification showing 10 forests ranked by health score (0-100)</p>
                </Card>
                
                <Card className="p-5 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <div className="text-4xl mb-2">💰</div>
                  <h4 className="font-bold text-sm mb-2">Report & Earn Rewards</h4>
                  <p className="text-xs">Anonymous M-PESA payouts (2,000-5,000 KES) for verified reports</p>
                </Card>
              </div>
            </div>

            {/* Business Model & ROI */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-primary">Business Model</h2>
                <div className="space-y-3">
                  <Card className="p-3 bg-blue-50">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-sm">Year 1-2: Pilot</span>
                      <span className="text-sm text-muted-foreground">Grant-funded</span>
                    </div>
                  </Card>
                  <Card className="p-3 bg-green-50">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-sm">Year 3: Break-even</span>
                      <span className="text-sm text-muted-foreground">$120K revenue</span>
                    </div>
                  </Card>
                  <Card className="p-3 bg-purple-50">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-sm">Year 4-5: Scale</span>
                      <span className="text-sm text-muted-foreground">Regional expansion</span>
                    </div>
                  </Card>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4 text-primary">Return on Investment</h2>
                <Card className="p-6 bg-gradient-to-br from-green-100 to-green-200 text-center">
                  <div className="text-6xl font-bold text-green-800 mb-2">43x</div>
                  <p className="text-sm font-semibold text-green-700 mb-3">ROI for forest agencies</p>
                  <div className="text-2xl font-bold text-green-900">$1 invested</div>
                  <div className="text-xl text-green-800 mb-1">saves</div>
                  <div className="text-3xl font-bold text-green-900">$45 in losses</div>
                </Card>
              </div>
            </div>

            {/* Impact Metrics */}
            <div>
              <h2 className="text-3xl font-bold text-center mb-6 text-primary">Impact Metrics (Year 3)</h2>
              <div className="grid grid-cols-4 gap-4">
                <Card className="p-4 text-center bg-gradient-to-b from-green-50 to-white">
                  <Leaf className="w-10 h-10 mx-auto mb-2 text-green-600" />
                  <div className="text-3xl font-bold text-green-700">500</div>
                  <p className="text-xs text-muted-foreground">Hectares Protected</p>
                </Card>
                
                <Card className="p-4 text-center bg-gradient-to-b from-blue-50 to-white">
                  <Users className="w-10 h-10 mx-auto mb-2 text-blue-600" />
                  <div className="text-3xl font-bold text-blue-700">15</div>
                  <p className="text-xs text-muted-foreground">Jobs Created</p>
                </Card>
                
                <Card className="p-4 text-center bg-gradient-to-b from-purple-50 to-white">
                  <TrendingUp className="w-10 h-10 mx-auto mb-2 text-purple-600" />
                  <div className="text-3xl font-bold text-purple-700">2,847</div>
                  <p className="text-xs text-muted-foreground">Total Hectares Monitored</p>
                </Card>
                
                <Card className="p-4 text-center bg-gradient-to-b from-orange-50 to-white">
                  <Shield className="w-10 h-10 mx-auto mb-2 text-orange-600" />
                  <div className="text-3xl font-bold text-orange-700">100%</div>
                  <p className="text-xs text-muted-foreground">Anonymous Reporting</p>
                </Card>
              </div>
            </div>

            {/* Footer - Call to Action */}
            <div className="text-center pt-6 border-t-2 border-primary">
              <p className="text-xl font-bold text-primary mb-2">Protecting Kenya&apos;s Forests, One Alert at a Time</p>
              <p className="text-sm text-muted-foreground">Contact: allan@forestguard.ke | Demo: forestguard.lovable.app</p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default PitchDeck;
