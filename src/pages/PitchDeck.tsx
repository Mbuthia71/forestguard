import { motion } from "framer-motion";
import { Satellite, Radio, Shield, Brain, TrendingUp, Users, Leaf, DollarSign, Zap, CheckCircle2, Target, Rocket, Globe, BarChart3, Lock, Code, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";

const PitchDeck = () => {
  const handleDownload = () => {
    window.print();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <div className="print:hidden">
          <Navigation />
        </div>

        <div className="container mx-auto px-4 py-24 max-w-6xl print:p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 print:mb-6"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Leaf className="h-12 w-12 text-primary" />
              <h1 className="text-5xl font-bold text-primary">ForestGuard</h1>
            </div>
            <p className="text-xl text-muted-foreground mb-6">Protecting Kenya's Forests with Technology</p>
            <p className="text-sm text-muted-foreground">Built by Allan Mbuthia | WMF Hackathon 2025 | Forest Monitoring Track</p>
            <Button onClick={handleDownload} className="mt-6 print:hidden">
              Download PDF
            </Button>
          </motion.div>

          {/* Problem Statement */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-12 print:mb-6 print:break-after-page"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-foreground mb-6 text-center">
              The Problem We're Solving
            </motion.h2>
            <motion.div variants={itemVariants}>
              <Card className="p-8 bg-card border-border hover:shadow-lg transition-shadow">
                <p className="text-lg text-foreground mb-4">
                  Kenya loses <span className="font-bold text-primary">12,000 hectares of forest every year</span> to illegal logging, land grabbing, and fires.
                </p>
                <p className="text-lg text-foreground mb-4">
                  Traditional monitoring depends on infrequent patrols that arrive too late. Whistleblowers who report illegal activity face threats, corruption, and retaliation.
                </p>
                <p className="text-xl font-bold text-primary mt-6">
                  Result: Forests disappear while communities watch helplessly.
                </p>
              </Card>
            </motion.div>
          </motion.section>

          {/* Our Solution */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12 print:mb-6"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-foreground mb-6 text-center">
              Our Solution: 4-Layer Protection System
            </motion.h2>
            <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: Satellite,
                  title: "🛰️ Satellites Watch from Space",
                  status: "Coming Soon - Phase 2",
                  current: "Forest boundary visualization, custom satellite image upload support",
                  planned: "Google Earth Engine API integration for live Sentinel-2 data, NDVI vegetation health scoring (0-100 scale), Automated change detection and canopy loss alerts",
                  color: "text-blue-500"
                },
                {
                  icon: Radio,
                  title: "📡 Smart Sensors Listen on the Ground",
                  status: "Demo Mode - Pilot Q2 2025",
                  current: "IoT simulation framework with realistic sensor data generation",
                  planned: "50 LoRaWAN acoustic sensors in Karura Forest, Chainsaw/vehicle sound detection AI, Temperature/humidity monitoring for fire risk",
                  color: "text-green-500"
                },
                {
                  icon: Shield,
                  title: "🔗 Communities Report Anonymously",
                  status: "Live & Operational",
                  current: "Anonymous reporting with blockchain transaction verification working",
                  planned: "Zero-Knowledge Proofs, Polygon blockchain audit trail, IPFS/Filecoin decentralized storage, EXIF metadata stripping",
                  color: "text-purple-500"
                },
                {
                  icon: Brain,
                  title: "🤖 AI Alerts Rangers Instantly",
                  status: "Live & Operational",
                  current: "Lovable AI integration (Gemini 2.5 Flash) for automated summaries, Real-time notification system, Daily AI voice briefings",
                  planned: "SMS alerts via Africa's Talking API (requires funding)",
                  color: "text-orange-500"
                }
              ].map((layer, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="p-6 h-full bg-card border-border hover:shadow-lg hover:scale-[1.02] transition-all">
                    <layer.icon className={`h-10 w-10 ${layer.color} mb-3`} />
                    <h3 className="text-lg font-bold text-foreground mb-1">{layer.title}</h3>
                    <p className="text-xs font-semibold text-primary mb-3">{layer.status}</p>
                    <p className="text-sm text-muted-foreground mb-2"><strong>Current:</strong> {layer.current}</p>
                    <p className="text-sm text-muted-foreground"><strong>Planned:</strong> {layer.planned}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* What's Live Right Now */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12 print:mb-6 print:break-before-page"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-foreground mb-6 text-center">
              What's Live Right Now
            </motion.h2>
            <motion.div variants={itemVariants}>
              <Card className="p-8 bg-card border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Complete Platform MVP - Admin dashboard, ranger mobile app, stakeholder portal all functional",
                    "Anonymous Reporting System - Blockchain-backed reporting with cryptographic verification working",
                    "Forest Management Tools - Task assignment, field reports, real-time notifications operational",
                    "AI Summaries - Automated forest health summaries and voice briefings functional",
                    "Multi-Forest Support - 10 Kenyan forests integrated with boundary data",
                    "PWA Ready - Installable mobile app with offline support for rangers"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="text-lg font-bold text-primary mt-6 text-center">
                  📍 Current Status: Ready for pilot deployment. Awaiting partnerships for satellite API access and physical IoT sensor funding.
                </p>
              </Card>
            </motion.div>
          </motion.section>

          {/* Three Standout Features */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12 print:mb-6"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-foreground mb-6 text-center">
              Three Features That Make Us Stand Out
            </motion.h2>
            <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Zap,
                  title: "Live AI Voice Briefings for Government Officials",
                  description: "Daily 2-minute AI-generated audio summaries of overnight alerts delivered via WhatsApp/email to KFS directors at 7am",
                  impact: "Decision-makers get instant forest updates without reading dashboards",
                  color: "text-yellow-500"
                },
                {
                  icon: TrendingUp,
                  title: "Community Forest Health Score & Leaderboard",
                  description: "Public gamification showing each of 10 forests' health score (0-100) calculated from satellite NDVI, alert frequency, ranger activity",
                  impact: "Monthly badges and 'Forest Hero' awards drive community engagement",
                  color: "text-green-500"
                },
                {
                  icon: DollarSign,
                  title: "'Report & Earn' Verified Whistleblower Rewards",
                  description: "Anonymous M-PESA payouts (2,000-5,000 KES) for verified environmental reports, funded by 10% of carbon credit verification fees",
                  impact: "Financial incentive transforms communities into active forest protectors",
                  color: "text-blue-500"
                }
              ].map((feature, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="p-6 h-full bg-card border-border hover:shadow-lg hover:scale-[1.02] transition-all">
                    <feature.icon className={`h-12 w-12 ${feature.color} mb-4`} />
                    <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                    <p className="text-xs font-semibold text-primary italic">{feature.impact}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Business Model & Revenue */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12 print:mb-6 print:break-before-page"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-foreground mb-6 text-center">
              Business Model & Financial Sustainability
            </motion.h2>
            <motion.div variants={containerVariants} className="space-y-6">
              <motion.div variants={itemVariants}>
                <Card className="p-8 bg-card border-border">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Revenue Streams (5-Year Projection)</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-foreground mb-2">Year 1-2: Grant Funded Phase</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• Target: Kenya Forest Service, GEF, World Bank grants</li>
                        <li>• Focus on proof of concept and pilot deployment</li>
                        <li>• Operating cost: $3,100/year</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-2">Year 3: Pilot Partnerships</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• <strong className="text-foreground">B2G Subscriptions:</strong> KFS monitoring - $50,000/year per county → 10 counties = <strong className="text-primary">$500,000</strong></li>
                        <li>• <strong className="text-foreground">NGO Subscriptions:</strong> Conservation orgs pay for transparency dashboard → 20 NGOs × $5,000 = <strong className="text-primary">$100,000</strong></li>
                        <li>• <strong className="text-foreground">Data Licensing:</strong> Forest health data for research institutions → <strong className="text-primary">$50,000</strong></li>
                        <li className="font-bold text-primary mt-2">• Total Year 3 Revenue: $650,000</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-2">Year 4-5: Scale & Sustainability</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• <strong className="text-foreground">Regional Expansion:</strong> Uganda, Tanzania, Ethiopia forest services → <strong className="text-primary">$2M annual revenue</strong></li>
                        <li>• <strong className="text-foreground">Data-as-a-Service:</strong> Sell anonymized forest health data to researchers → <strong className="text-primary">$200,000/year</strong></li>
                        <li>• <strong className="text-foreground">Enterprise SaaS Model:</strong> White-label platform licensing → <strong className="text-primary">$500,000/year</strong></li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="p-8 bg-card border-border">
                  <h3 className="text-2xl font-bold text-foreground mb-4">ROI Calculation</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {[
                      { label: "Investment needed", value: "$150,000", subtext: "Year 1-2 development + pilot" },
                      { label: "Break-even", value: "Year 3 (Month 2)", subtext: null },
                      { label: "5-Year Revenue", value: "$6.5M", subtext: null },
                      { label: "Investor Return", value: "43x in 5 years", subtext: null },
                      { label: "Profit Margin", value: "85-90%", subtext: "after break-even" },
                      { label: "Social Impact", value: "$45 ROI per $1", subtext: "prevented logging losses" }
                    ].map((metric, index) => (
                      <div key={index} className="text-center">
                        <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                        <p className="text-2xl font-bold text-primary">{metric.value}</p>
                        {metric.subtext && <p className="text-xs text-muted-foreground mt-1">{metric.subtext}</p>}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="p-8 bg-card border-border">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Cost Structure (Transparent & Sustainable)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { item: "IoT Hardware", cost: "$50/sensor × 300 sensors = $15,000", type: "one-time" },
                      { item: "Cloud Infrastructure", cost: "$500/month = $6,000/year", type: "annual" },
                      { item: "Satellite API", cost: "$200/month = $2,400/year", type: "annual" },
                      { item: "Ranger Support", cost: "$10,000/year (training, equipment)", type: "annual" },
                      { item: "Platform Development", cost: "$30,000/year (maintenance, improvements)", type: "annual" }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-foreground">{item.item}</span>
                        <span className="text-muted-foreground">{item.cost}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xl font-bold text-primary mt-6 text-center">
                    Total Annual Operating Cost: $48,400/year
                  </p>
                </Card>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* Impact Metrics */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12 print:mb-6"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-foreground mb-6 text-center">
              Impact Metrics (Social Return)
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-center text-muted-foreground mb-8">
              For every $1 invested in ForestGuard:
            </motion.p>
            <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { icon: DollarSign, value: "$45", label: "In prevented illegal logging losses", subtext: "Kenya loses $1.2B annually to illegal logging" },
                { icon: Leaf, value: "500", label: "Hectares of forest protected", subtext: "at scale" },
                { icon: Users, value: "5", label: "Communities empowered", subtext: "through anonymous reporting" },
                { icon: TrendingUp, value: "15", label: "Jobs created", subtext: "rangers, technicians, analysts" }
              ].map((metric, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="p-6 text-center bg-card border-border hover:shadow-lg hover:scale-105 transition-all">
                    <metric.icon className="h-10 w-10 text-primary mx-auto mb-3" />
                    <p className="text-3xl font-bold text-foreground mb-1">{metric.value}</p>
                    <p className="text-sm font-semibold text-foreground mb-2">{metric.label}</p>
                    <p className="text-xs text-muted-foreground">{metric.subtext}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Technology Stack */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12 print:mb-6 print:break-before-page"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-foreground mb-6 text-center">
              Technology Stack
            </motion.h2>
            <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Code, title: "Frontend", tech: "React 18, TypeScript, Tailwind CSS, Framer Motion, Mapbox GL" },
                { icon: Globe, title: "Backend", tech: "Supabase (PostgreSQL), Edge Functions, Realtime subscriptions" },
                { icon: Satellite, title: "Monitoring", tech: "IoT simulation framework, Satellite imagery integration" },
                { icon: Lock, title: "Security", tech: "Blockchain (Polygon), WebAuthn biometric auth, IPFS, Zero-Knowledge Proofs" },
                { icon: Brain, title: "AI", tech: "Lovable AI Gateway (Gemini 2.5 Flash) for automated summaries and alerts" },
                { icon: Smartphone, title: "Mobile", tech: "PWA (Progressive Web App) with offline-first architecture" }
              ].map((stack, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="p-6 bg-card border-border hover:shadow-lg transition-shadow">
                    <stack.icon className="h-8 w-8 text-primary mb-3" />
                    <h3 className="text-lg font-bold text-foreground mb-2">{stack.title}</h3>
                    <p className="text-sm text-muted-foreground">{stack.tech}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Roadmap */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12 print:mb-6"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-foreground mb-6 text-center">
              Roadmap
            </motion.h2>
            <motion.div variants={containerVariants} className="space-y-6">
              {[
                {
                  phase: "Phase 1: Current MVP",
                  status: "Completed ✅",
                  items: [
                    "Complete platform architecture with admin, ranger, and stakeholder portals",
                    "Anonymous reporting system with blockchain verification",
                    "AI-powered forest health summaries and voice briefings",
                    "Real-time notifications and alert system",
                    "Offline-first PWA for rangers",
                    "Multi-forest support (10 Kenyan forests integrated)"
                  ]
                },
                {
                  phase: "Phase 2: Production Pilot",
                  status: "Q2 2025 - Needs Funding",
                  items: [
                    "🎯 Deploy 50 physical IoT sensors in Karura Forest (Cost: $2,500)",
                    "🎯 Integrate Google Earth Engine API for live Sentinel-2 satellite data",
                    "🎯 Partner with Kenya Forest Service for official pilot program",
                    "🎯 Train 20 rangers on system usage and field protocols",
                    "🎯 SMS alert integration via Africa's Talking"
                  ]
                },
                {
                  phase: "Phase 3: Scale & Expansion",
                  status: "Q3-Q4 2025",
                  items: [
                    "🎯 Expand to 300+ IoT sensors across 10 forests",
                    "🎯 Integrate M-PESA for anonymous whistleblower rewards",
                    "🎯 Launch public Forest Health Leaderboard with gamification",
                    "🎯 Regional expansion (Uganda, Tanzania, Ethiopia)",
                    "🎯 Enterprise API and data licensing for researchers"
                  ]
                }
              ].map((phase, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="p-6 bg-card border-border">
                    <div className="flex items-start gap-4">
                      <Rocket className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-1">{phase.phase}</h3>
                        <p className="text-sm text-primary font-semibold mb-3">{phase.status}</p>
                        <ul className="space-y-1">
                          {phase.items.map((item, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-0.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Why This Matters */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12 print:mb-6 print:break-before-page"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-foreground mb-6 text-center">
              Why This Matters
            </motion.h2>
            <motion.div variants={itemVariants}>
              <Card className="p-8 bg-card border-border text-center">
                <p className="text-lg text-foreground mb-4">
                  This isn't just about technology. It's about giving communities the power to protect their forests without fear.
                </p>
                <p className="text-lg text-foreground mb-4">
                  It's about making corruption visible. It's about using innovation to solve real problems in Kenya.
                </p>
                <p className="text-2xl font-bold text-primary mt-6">
                  Every protected tree is a step toward the future Wangari Maathai envisioned.
                </p>
              </Card>
            </motion.div>
          </motion.section>

          {/* Contact */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-foreground mb-6 text-center">
              Contact
            </motion.h2>
            <motion.div variants={itemVariants}>
              <Card className="p-8 bg-card border-border text-center">
                <h3 className="text-2xl font-bold text-foreground mb-2">Allan Mbuthia</h3>
                <p className="text-sm text-muted-foreground mb-4">Multi-disciplinary Founder</p>
                <div className="text-sm text-muted-foreground space-y-1 mb-6">
                  <p>Software Developer</p>
                  <p>Geospatial Engineering Student, Technical University of Kenya</p>
                  <p>Vice-Chair, Environmental Student Organization at TUK</p>
                  <p>System Architect & Designer</p>
                </div>
                <div className="space-y-2">
                  <p className="text-foreground">📧 allan.mbuthia@tuk.ac.ke</p>
                  <p className="text-foreground">🌐 forestguard.lovable.app</p>
                </div>
                <p className="text-sm text-muted-foreground mt-8 italic">
                  Built with ❤️ in Kenya | Protecting forests, empowering communities
                </p>
              </Card>
            </motion.div>
          </motion.section>
        </div>
      </div>
    </PageTransition>
  );
};

export default PitchDeck;
