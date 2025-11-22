import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp, Shield, Users, CheckCircle2, Satellite, Network, Blocks, FileCheck, BarChart3, Globe, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ROICalculator from "@/components/ROICalculator";

const ForOrganizations = () => {
  const partnershipTiers = [
    {
      tier: "Government Partnership",
      icon: Building2,
      price: "KES 50,000/county/year",
      description: "Full monitoring infrastructure for county-level forest management",
      features: [
        "Complete satellite monitoring coverage",
        "IoT sensor network deployment (50+ sensors)",
        "Dedicated ranger management dashboard",
        "Monthly AI-generated forest briefings",
        "Blockchain-verified incident tracking",
        "24/7 real-time alert system",
        "Quarterly stakeholder reports",
        "Custom forest zone configuration",
        "Priority technical support",
      ],
      cta: "Request Partnership Proposal",
      color: "blue",
    },
    {
      tier: "NGO & Conservation Orgs",
      icon: Users,
      price: "KES 5,000/month",
      description: "Transparency dashboard for donors and conservation partners",
      features: [
        "Read-only stakeholder dashboard access",
        "Real-time forest health metrics",
        "Monthly forest story reports (PDF)",
        "Incident explorer with verified threats",
        "Community impact statistics",
        "Downloadable data exports (CSV)",
        "Public API access for research",
        "Educational resource library",
      ],
      cta: "Start NGO Subscription",
      color: "green",
    },
    {
      tier: "Research Institutions",
      icon: BarChart3,
      price: "Custom pricing",
      description: "Anonymized forest monitoring data for academic research",
      features: [
        "Historical satellite imagery archive",
        "Sensor data time-series (2+ years)",
        "Deforestation pattern datasets",
        "Climate correlation studies",
        "Biodiversity threat analysis",
        "API access for machine learning",
        "Anonymized incident reports",
        "Co-authorship opportunities",
      ],
      cta: "Request Data Access",
      color: "purple",
    },
  ];

  const technicalCapabilities = [
    {
      title: "Satellite Intelligence",
      icon: Satellite,
      description: "Sentinel-2 optical + Sentinel-1 SAR imagery. 10m resolution, 5-day revisit. Google Earth Engine API for petabyte-scale analysis.",
    },
    {
      title: "IoT Sensor Network",
      icon: Network,
      description: "LoRaWAN-based acoustic sensors (chainsaw detection), motion sensors (intrusion), temperature/humidity (fire risk). 10km range, 3+ year battery life.",
    },
    {
      title: "Blockchain Verification",
      icon: Blocks,
      description: "Polygon zkEVM smart contracts. Zero-knowledge proofs for anonymous reporting. IPFS/Filecoin for immutable evidence storage.",
    },
    {
      title: "AI Alert Fusion",
      icon: FileCheck,
      description: "Multi-source threat detection combining satellite, IoT, and community reports. Real-time priority scoring and automated ranger dispatch.",
    },
  ];

  const businessMetrics = [
    { metric: "$6.5M", label: "5-Year Revenue Projection", icon: TrendingUp },
    { metric: "43x", label: "Investor ROI (5 years)", icon: BarChart3 },
    { metric: "$45", label: "Illegal Logging Prevented per $1", icon: Shield },
    { metric: "92%", label: "Profit Margin at Scale", icon: CheckCircle2 },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="pt-24 pb-16">
          {/* Hero Section */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <Building2 className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-primary">Enterprise Solutions</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Forest Monitoring as a Service
                <span className="block text-primary mt-2">For Governments, NGOs & Enterprises</span>
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Turnkey forest monitoring infrastructure combining satellite intelligence, IoT sensors, blockchain verification, 
                and AI analytics. From pilot deployment to nationwide scale, we provide the complete technology stack for 
                transparent, accountable forest conservation.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                <Badge variant="outline" className="border-primary/50 text-base py-2 px-4">
                  <Globe className="mr-2 h-4 w-4" /> 10 Forests Monitored
                </Badge>
                <Badge variant="outline" className="border-primary/50 text-base py-2 px-4">
                  <Shield className="mr-2 h-4 w-4" /> 43 Threats Prevented
                </Badge>
                <Badge variant="outline" className="border-primary/50 text-base py-2 px-4">
                  <CheckCircle2 className="mr-2 h-4 w-4" /> 2,847 Hectares Protected
                </Badge>
              </div>
            </motion.div>
          </section>

          {/* Business Metrics */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {businessMetrics.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="text-center hover:shadow-xl transition-all">
                    <CardContent className="pt-6">
                      <item.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                      <div className="text-4xl font-bold text-primary mb-2">{item.metric}</div>
                      <div className="text-sm text-muted-foreground">{item.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ROI Calculator */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <ROICalculator />
          </section>

          {/* Partnership Tiers */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Partnership Packages</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Scalable solutions for every organizational need—from county governments to international conservation NGOs
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {partnershipTiers.map((tier, index) => (
                <motion.div
                  key={tier.tier}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="h-full hover:shadow-2xl transition-all border-t-4 border-t-primary">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <tier.icon className="h-12 w-12 text-primary" />
                        <Badge className="bg-primary/10 text-primary border-primary/20">
                          {tier.price}
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl">{tier.tier}</CardTitle>
                      <CardDescription className="text-base mt-2">
                        {tier.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <ul className="space-y-3">
                        {tier.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        {tier.cta}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Technical Capabilities */}
          <section className="bg-muted/30 py-16 mb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Technical Architecture</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Enterprise-grade monitoring infrastructure built on proven open-source technologies
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {technicalCapabilities.map((capability, index) => (
                  <motion.div
                    key={capability.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-primary/10 p-3 rounded-lg">
                            <capability.icon className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle className="text-xl">{capability.title}</CardTitle>
                        </div>
                        <CardDescription className="text-sm leading-relaxed">
                          {capability.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link to="/technology">
                  <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                    View Full Technical Documentation
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Business Model */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl mb-4">Business Model & Revenue Streams</CardTitle>
                  <CardDescription className="text-base">
                    Sustainable financial model with proven revenue streams and clear path to profitability
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="grid sm:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-2">Year 3</div>
                      <div className="text-sm text-muted-foreground mb-1">$700K Revenue</div>
                      <div className="text-xs text-muted-foreground">B2G + NGO Partnerships</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-2">Year 4</div>
                      <div className="text-sm text-muted-foreground mb-1">$2.2M Revenue</div>
                      <div className="text-xs text-muted-foreground">Regional Expansion (4 countries)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-2">Year 5</div>
                      <div className="text-sm text-muted-foreground mb-1">$3M Revenue</div>
                      <div className="text-xs text-muted-foreground">White-Label SaaS + Impact Bonds</div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h3 className="font-bold text-lg mb-4 text-center">Operating Cost Structure</h3>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">IoT Hardware (300 sensors)</span>
                        <span className="font-semibold">$15,000 one-time</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cloud Infrastructure</span>
                        <span className="font-semibold">$6,000/year</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Satellite API Access</span>
                        <span className="font-semibold">$2,400/year</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Platform Development</span>
                        <span className="font-semibold">$30,000/year</span>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-border text-center">
                      <div className="text-3xl font-bold text-primary mb-2">92% Profit Margin</div>
                      <div className="text-sm text-muted-foreground">at full scale deployment</div>
                    </div>
                  </div>

                  <div className="text-center pt-6 border-t border-border">
                    <Link to="/business-model">
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Download Full Business Plan (PDF)
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
              <CardContent className="pt-12 pb-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Partner with ForestGuard?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Let's discuss how our monitoring platform can support your forest conservation goals. 
                  Schedule a demo or request a custom proposal tailored to your organization.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Schedule Demo Call
                  </Button>
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    Request Partnership Proposal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default ForOrganizations;
