import Navigation from "@/components/Navigation";
import TechnologyStack from "@/components/TechnologyStack";
import SatelliteAnalysis from "@/components/SatelliteAnalysis";
import RealTimeDashboard from "@/components/RealTimeDashboard";
import IoTSimulator from "@/components/IoTSimulator";
import BlockchainReportingEnhanced from "@/components/BlockchainReportingEnhanced";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const TechnologyPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-32 pb-16 px-4"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-lime-neon to-forest-deep bg-clip-text text-transparent">
                Technology Stack
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Choose your experience level to explore ForestGuard's technology
              </p>
              
              <Tabs defaultValue="simple" className="w-full max-w-2xl mx-auto">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="simple">Simple Explanation</TabsTrigger>
                  <TabsTrigger value="technical">Technical Deep Dive</TabsTrigger>
                </TabsList>
                
                <TabsContent value="simple" className="mt-8 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h3 className="font-bold mb-2">🛰️ Satellites Watch Forests</h3>
                      <p className="text-muted-foreground">We check satellite images every 5 days to see if trees are being cut or fires are starting.</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h3 className="font-bold mb-2">📡 Smart Sensors Listen</h3>
                      <p className="text-muted-foreground">Devices in the forest detect chainsaw sounds and temperature changes that signal danger.</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h3 className="font-bold mb-2">🔒 Blockchain Protects Whistleblowers</h3>
                      <p className="text-muted-foreground">Reports are encrypted and stored so securely that even admins can't trace who sent them.</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h3 className="font-bold mb-2">🤖 AI Sends Smart Alerts</h3>
                      <p className="text-muted-foreground">Our AI combines all data sources and sends rangers to exactly where threats are happening.</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="technical" className="mt-8 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h3 className="font-bold mb-2">Satellite Intelligence</h3>
                      <p className="text-sm text-muted-foreground mb-2">Sentinel-2 optical (10m resolution), Sentinel-1 SAR, NDVI/NBR indices, Google Earth Engine API integration</p>
                      <code className="text-xs bg-background p-2 rounded block">React 18, TypeScript, Mapbox GL JS, GeoJSON, Time-series analysis</code>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h3 className="font-bold mb-2">IoT Ground Sensors</h3>
                      <p className="text-sm text-muted-foreground mb-2">LoRaWAN acoustic sensors, temperature/humidity monitoring, motion detection, solar-powered nodes</p>
                      <code className="text-xs bg-background p-2 rounded block">PostgreSQL time-series, Supabase Realtime, Edge Functions</code>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h3 className="font-bold mb-2">Blockchain Anonymous Reporting</h3>
                      <p className="text-sm text-muted-foreground mb-2">Zero-Knowledge Proofs (zk-SNARKs), Stealth Addresses, Commit-Reveal Scheme, IPFS/Filecoin storage</p>
                      <code className="text-xs bg-background p-2 rounded block">Polygon zkEVM, EXIF stripping, Time-lock encryption, Mixnet protocol</code>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h3 className="font-bold mb-2">AI Real-Time Alerts</h3>
                      <p className="text-sm text-muted-foreground mb-2">Multi-source data fusion, Lovable AI Gateway (Gemini 2.5 Flash), SMS via Africa's Talking</p>
                      <code className="text-xs bg-background p-2 rounded block">WebSockets, TanStack Query, Framer Motion, PWA offline-first</code>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.section>

        <TechnologyStack />
        <SatelliteAnalysis />
        <RealTimeDashboard />
        <IoTSimulator />
        <BlockchainReportingEnhanced />
        <Footer />
      </div>
    </PageTransition>
  );
};

export default TechnologyPage;
