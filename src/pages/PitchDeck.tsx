import { Button } from "@/components/ui/button";
import { Download, Satellite, Radio, Shield, Brain, TrendingUp, Users, Leaf } from "lucide-react";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";

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
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center border-b-4 border-primary pb-6"
            >
              <motion.h1
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-5xl font-bold text-primary mb-2"
              >
                ForestGuard
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-2xl text-muted-foreground"
              >
                AI-Powered Forest Monitoring for Kenya
              </motion.p>
            </motion.div>

            {/* The Problem & Solution */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 gap-6"
            >
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="p-6 bg-red-50 border-red-200 h-full">
                  <h3 className="text-xl font-bold text-red-800 mb-3">🔥 The Problem</h3>
                  <ul className="space-y-2 text-sm text-red-700">
                    <li>• Kenya loses 5,000+ hectares of forest annually</li>
                    <li>• Illegal logging costs $20M+ per year</li>
                    <li>• Whistleblowers face threats & violence</li>
                    <li>• Government lacks real-time monitoring</li>
                  </ul>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="p-6 bg-green-50 border-green-200 h-full">
                  <h3 className="text-xl font-bold text-green-800 mb-3">✅ Our Solution</h3>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li>• 4-layer monitoring system (Satellite + IoT + Blockchain + AI)</li>
                    <li>• Anonymous reporting with crypto protection</li>
                    <li>• Real-time alerts to rangers & government</li>
                    <li>• Community-powered forest protection</li>
                  </ul>
                </Card>
              </motion.div>
            </motion.div>

            {/* 4-Layer System Architecture */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-3xl font-bold text-center mb-6 text-primary"
              >
                4-Layer System Architecture
              </motion.h2>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { icon: Satellite, color: "text-blue-600", title: "Layer 1: Satellite", desc: "Sentinel-2 imagery every 5 days detects vegetation loss", delay: 1.3 },
                  { icon: Radio, color: "text-green-600", title: "Layer 2: IoT Sensors", desc: "LoRaWAN acoustic sensors detect chainsaws & activity", delay: 1.4 },
                  { icon: Shield, color: "text-purple-600", title: "Layer 3: Blockchain", desc: "Anonymous reports stored on Polygon with zk-proofs", delay: 1.5 },
                  { icon: Brain, color: "text-orange-600", title: "Layer 4: AI Alerts", desc: "Real-time fusion & voice briefings for government", delay: 1.6 }
                ].map((layer, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: layer.delay, duration: 0.4 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <Card className="p-4 text-center h-full">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <layer.icon className={`w-12 h-12 mx-auto mb-3 ${layer.color}`} />
                      </motion.div>
                      <h4 className="font-bold text-sm mb-2">{layer.title}</h4>
                      <p className="text-xs text-muted-foreground">{layer.desc}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 3 Standout Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 }}
                className="text-3xl font-bold text-center mb-6 text-primary"
              >
                3 Standout Features
              </motion.h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { emoji: "🎙️", title: "AI Voice Briefings", desc: "Daily 7am WhatsApp audio summaries for Kenya Forest Service directors", gradient: "from-blue-50 to-blue-100", border: "border-blue-200", delay: 2.1 },
                  { emoji: "🏆", title: "Forest Health Leaderboard", desc: "Public gamification showing 10 forests ranked by health score (0-100)", gradient: "from-green-50 to-green-100", border: "border-green-200", delay: 2.2 },
                  { emoji: "💰", title: "Report & Earn Rewards", desc: "Anonymous M-PESA payouts (2,000-5,000 KES) for verified reports", gradient: "from-purple-50 to-purple-100", border: "border-purple-200", delay: 2.3 }
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: feature.delay, duration: 0.4 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                  >
                    <Card className={`p-5 bg-gradient-to-br ${feature.gradient} ${feature.border} h-full`}>
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        className="text-4xl mb-2"
                      >
                        {feature.emoji}
                      </motion.div>
                      <h4 className="font-bold text-sm mb-2">{feature.title}</h4>
                      <p className="text-xs">{feature.desc}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Business Model & ROI */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.6 }}
              className="grid grid-cols-2 gap-6"
            >
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 2.7, duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4 text-primary">Business Model</h2>
                <div className="space-y-3">
                  {[
                    { title: "Year 1-2: Pilot", desc: "Grant-funded", bg: "bg-blue-50", delay: 2.8 },
                    { title: "Year 3: Break-even", desc: "$120K revenue", bg: "bg-green-50", delay: 2.9 },
                    { title: "Year 4-5: Scale", desc: "Regional expansion", bg: "bg-purple-50", delay: 3.0 }
                  ].map((phase, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: phase.delay, duration: 0.4 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <Card className={`p-3 ${phase.bg}`}>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-sm">{phase.title}</span>
                          <span className="text-sm text-muted-foreground">{phase.desc}</span>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 2.8, duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4 text-primary">Return on Investment</h2>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="p-6 bg-gradient-to-br from-green-100 to-green-200 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 3, duration: 0.6, type: "spring" }}
                      className="text-6xl font-bold text-green-800 mb-2"
                    >
                      43x
                    </motion.div>
                    <p className="text-sm font-semibold text-green-700 mb-3">ROI for forest agencies</p>
                    <div className="text-2xl font-bold text-green-900">$1 invested</div>
                    <div className="text-xl text-green-800 mb-1">saves</div>
                    <div className="text-3xl font-bold text-green-900">$45 in losses</div>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Impact Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2, duration: 0.6 }}
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.4 }}
                className="text-3xl font-bold text-center mb-6 text-primary"
              >
                Impact Metrics (Year 3)
              </motion.h2>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { icon: Leaf, color: "text-green-600", bgGradient: "from-green-50", value: "500", label: "Hectares Protected", delay: 3.5 },
                  { icon: Users, color: "text-blue-600", bgGradient: "from-blue-50", value: "15", label: "Jobs Created", delay: 3.6 },
                  { icon: TrendingUp, color: "text-purple-600", bgGradient: "from-purple-50", value: "2,847", label: "Total Hectares Monitored", delay: 3.7 },
                  { icon: Shield, color: "text-orange-600", bgGradient: "from-orange-50", value: "100%", label: "Anonymous Reporting", delay: 3.8 }
                ].map((metric, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: metric.delay, duration: 0.5, type: "spring" }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Card className={`p-4 text-center bg-gradient-to-b ${metric.bgGradient} to-white h-full`}>
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      >
                        <metric.icon className={`w-10 h-10 mx-auto mb-2 ${metric.color}`} />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: metric.delay + 0.2 }}
                        className={`text-3xl font-bold ${metric.color.replace('text-', 'text-')}`}
                      >
                        {metric.value}
                      </motion.div>
                      <p className="text-xs text-muted-foreground">{metric.label}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Footer - Call to Action */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4, duration: 0.8 }}
              className="text-center pt-6 border-t-2 border-primary"
            >
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 4.2 }}
                className="text-xl font-bold text-primary mb-2"
              >
                Protecting Kenya&apos;s Forests, One Alert at a Time
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4.4 }}
                className="text-sm text-muted-foreground"
              >
                Contact: allan@forestguard.ke | Demo: forestguard.lovable.app
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default PitchDeck;
