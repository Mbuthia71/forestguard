import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  BarChart3, 
  Globe, 
  Leaf,
  Users,
  Award
} from "lucide-react";

const BusinessModel = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-32 pb-16 px-4"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-lime-neon to-forest-deep bg-clip-text text-transparent">
                Business Model & Sustainability
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                ForestGuard combines environmental impact with financial sustainability through diverse revenue streams and proven ROI
              </p>
            </div>
          </div>
        </motion.section>

        {/* Problem & Market Size */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-16 px-4 bg-muted/30"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-destructive/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <TrendingUp className="w-5 h-5" />
                    Annual Loss
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-2">$1.2B</div>
                  <p className="text-sm text-muted-foreground">
                    Kenya loses to illegal logging annually
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Globe className="w-5 h-5" />
                    Market Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-2">47</div>
                  <p className="text-sm text-muted-foreground">
                    Counties need forest monitoring solutions
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-500">
                    <Leaf className="w-5 h-5" />
                    Carbon Market
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-2">$2M</div>
                  <p className="text-sm text-muted-foreground">
                    Potential in carbon credit verification
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>

        {/* Revenue Streams */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-16 px-4"
        >
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold mb-12 text-center">5-Year Revenue Projection</h2>
            
            <div className="space-y-8">
              {/* Year 1-2 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Year 1-2: Grant Funded Phase</CardTitle>
                    <Badge variant="outline">Foundation</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Focus Areas</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Kenya Forest Service partnerships</li>
                        <li>• GEF Small Grants Program</li>
                        <li>• World Bank environmental grants</li>
                        <li>• Proof of concept deployment</li>
                      </ul>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground mb-1">Revenue</div>
                      <div className="text-3xl font-bold">$0</div>
                      <div className="text-sm text-muted-foreground mt-2">Operating Cost</div>
                      <div className="text-xl font-semibold text-primary">$3,100/year</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Year 3 */}
              <Card className="border-primary/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Year 3: Pilot Partnerships</CardTitle>
                    <Badge className="bg-primary">Break-Even</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-semibold">B2G Subscriptions</div>
                        <div className="text-sm text-muted-foreground">10 counties × $50K/year</div>
                      </div>
                      <div className="text-2xl font-bold text-primary">$500K</div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-semibold">Carbon Credit Verification</div>
                        <div className="text-sm text-muted-foreground">5% fee on verified credits</div>
                      </div>
                      <div className="text-2xl font-bold text-primary">$100K</div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-semibold">NGO Subscriptions</div>
                        <div className="text-sm text-muted-foreground">20 NGOs × $5K/year</div>
                      </div>
                      <div className="text-2xl font-bold text-primary">$100K</div>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border-2 border-primary/30">
                      <div className="font-bold text-lg">Total Year 3 Revenue</div>
                      <div className="text-4xl font-bold text-primary">$700K</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Year 4-5 */}
              <Card className="border-green-500/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Year 4-5: Scale & Expansion</CardTitle>
                    <Badge className="bg-green-500">Growth</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-semibold">Regional Expansion</div>
                        <div className="text-sm text-muted-foreground">Uganda, Tanzania, Ethiopia, Rwanda</div>
                      </div>
                      <div className="text-2xl font-bold text-green-500">$2M</div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-semibold">Data-as-a-Service</div>
                        <div className="text-sm text-muted-foreground">Research institutions, universities</div>
                      </div>
                      <div className="text-2xl font-bold text-green-500">$200K</div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-semibold">Enterprise SaaS</div>
                        <div className="text-sm text-muted-foreground">White-label platform licensing</div>
                      </div>
                      <div className="text-2xl font-bold text-green-500">$500K</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>

        {/* ROI Calculation */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-16 px-4 bg-muted/30"
        >
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold mb-12 text-center">Return on Investment</h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground">Investment Needed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">$150K</div>
                  <p className="text-xs text-muted-foreground mt-2">Year 1-2 development + pilot</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground">Break-Even</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-500">Year 3</div>
                  <p className="text-xs text-muted-foreground mt-2">Month 2 of operations</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground">5-Year Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">$6.5M</div>
                  <p className="text-xs text-muted-foreground mt-2">Cumulative revenue</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary">
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground">Investor Return</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">43x</div>
                  <p className="text-xs text-muted-foreground mt-2">in 5 years (4,150% ROI)</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>

        {/* Cost Structure */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-16 px-4"
        >
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold mb-12 text-center">Transparent Cost Structure</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    One-Time Costs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">IoT Hardware (300 sensors)</span>
                    <span className="font-semibold">$15,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Smart Contract Development</span>
                    <span className="font-semibold">$2,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Initial Marketing</span>
                    <span className="font-semibold">$5,000</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t">
                    <span className="font-bold">Total One-Time</span>
                    <span className="font-bold text-primary">$22,000</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Annual Operating Costs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cloud Infrastructure</span>
                    <span className="font-semibold">$6,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Satellite API</span>
                    <span className="font-semibold">$2,400</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Blockchain Gas Fees</span>
                    <span className="font-semibold">$1,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SMS/Communication</span>
                    <span className="font-semibold">$3,600</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ranger Support</span>
                    <span className="font-semibold">$10,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Platform Maintenance</span>
                    <span className="font-semibold">$30,000</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t">
                    <span className="font-bold">Total Annual</span>
                    <span className="font-bold text-primary">$53,200</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6 border-green-500/30">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Profit Margin (Year 3+)</div>
                    <div className="text-3xl font-bold text-green-500">85-90%</div>
                  </div>
                  <Award className="w-12 h-12 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Impact Metrics */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-16 px-4 bg-muted/30"
        >
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold mb-12 text-center">Social Return on Investment</h2>
            
            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-primary mb-2">$45</div>
              <p className="text-xl text-muted-foreground">
                For every $1 invested, $45 in illegal logging losses prevented
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-green-500" />
                    Forest Protected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">500 ha</div>
                  <p className="text-sm text-muted-foreground">Per $1,000 invested at scale</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Communities Empowered
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">5</div>
                  <p className="text-sm text-muted-foreground">Per partnership established</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-amber-500" />
                    Jobs Created
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">15</div>
                  <p className="text-sm text-muted-foreground">Rangers, technicians, analysts</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default BusinessModel;
