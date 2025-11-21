import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, TreePine, Shield, Users, Target, CheckCircle2, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const { toast } = useToast();

  const donationTiers = [
    {
      amount: 500,
      title: "Forest Friend",
      icon: Leaf,
      impact: "Supports 1 IoT sensor for a month",
      perks: ["Monthly impact report", "Digital certificate"],
    },
    {
      amount: 2000,
      title: "Tree Guardian",
      icon: TreePine,
      impact: "Protects 10 hectares for a month",
      perks: ["All Forest Friend perks", "Quarterly forest health updates", "Recognition on our website"],
      popular: true,
    },
    {
      amount: 5000,
      title: "Forest Defender",
      icon: Shield,
      impact: "Funds ranger field equipment",
      perks: ["All Tree Guardian perks", "Direct ranger updates", "Annual conservation tour invitation"],
    },
    {
      amount: 10000,
      title: "Conservation Champion",
      icon: Users,
      impact: "Sponsors satellite analysis for 50 hectares",
      perks: ["All Forest Defender perks", "Personal project briefing", "VIP conservation events access"],
    },
  ];

  const impactStats = [
    { value: "2,847", label: "Hectares Protected", icon: Target },
    { value: "156", label: "Active Sensors", icon: Shield },
    { value: "43", label: "Threats Stopped", icon: CheckCircle2 },
    { value: "89", label: "Reports Verified", icon: Users },
  ];

  const handleDonate = () => {
    const amount = selectedAmount || parseFloat(customAmount);
    
    if (!amount || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please select or enter a valid donation amount.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Redirecting to Payment",
      description: `Processing donation of KES ${amount.toLocaleString()}...`,
    });

    // TODO: Integrate Paystack payment gateway
    // This will redirect to Paystack checkout
  };

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
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <Heart className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-primary">Support Forest Conservation</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Every Tree Counts.
                <span className="block text-primary mt-2">Every Contribution Matters.</span>
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Your donation powers the technology protecting Kenya's forests. From satellite monitoring to ground sensors, 
                from ranger equipment to blockchain verification—every shilling directly funds forest conservation.
              </p>

              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <Badge variant="outline" className="border-primary/50">
                  <Shield className="mr-1 h-3 w-3" /> 100% Transparent
                </Badge>
                <Badge variant="outline" className="border-primary/50">
                  <CheckCircle2 className="mr-1 h-3 w-3" /> Tax Deductible
                </Badge>
              </div>
            </motion.div>
          </section>

          {/* Impact Stats */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {impactStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                      <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Donation Tiers */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Choose Your Impact</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {donationTiers.map((tier, index) => (
                <motion.div
                  key={tier.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card 
                    className={`relative cursor-pointer transition-all hover:shadow-xl ${
                      selectedAmount === tier.amount 
                        ? 'ring-2 ring-primary shadow-lg' 
                        : ''
                    } ${tier.popular ? 'border-primary' : ''}`}
                    onClick={() => setSelectedAmount(tier.amount)}
                  >
                    {tier.popular && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                        Most Popular
                      </Badge>
                    )}
                    
                    <CardHeader className="text-center pb-4">
                      <tier.icon className="h-12 w-12 text-primary mx-auto mb-3" />
                      <CardTitle className="text-xl">{tier.title}</CardTitle>
                      <div className="text-3xl font-bold text-primary mt-2">
                        KES {tier.amount.toLocaleString()}
                      </div>
                      <CardDescription className="text-sm mt-2">
                        {tier.impact}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <ul className="space-y-2">
                        {tier.perks.map((perk, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Custom Amount */}
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Or Choose Your Own Amount</CardTitle>
                <CardDescription>
                  Every contribution helps protect our forests, no matter the size
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Input
                      type="number"
                      placeholder="Enter amount in KES"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(null);
                      }}
                      className="h-12 text-lg"
                      min="100"
                    />
                  </div>
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 sm:w-[200px]"
                    onClick={handleDonate}
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    Donate Now
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground text-center">
                  Secure payment powered by Paystack. Your donation is tax-deductible.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Why Donate Section */}
          <section className="bg-primary/5 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Where Your Money Goes</h2>
                
                <div className="space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <Shield className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">IoT Sensor Network (40%)</h3>
                          <p className="text-sm text-muted-foreground">
                            Deploying and maintaining ground sensors for acoustic monitoring, motion detection, 
                            and environmental data collection across forest zones.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <Target className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">Satellite Intelligence (30%)</h3>
                          <p className="text-sm text-muted-foreground">
                            API access to Sentinel-2 imagery, Google Earth Engine analysis, and AI-powered 
                            deforestation detection algorithms.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">Ranger Support (20%)</h3>
                          <p className="text-sm text-muted-foreground">
                            Field equipment, mobile devices, GPS units, and training for forest rangers 
                            on the ground protecting our forests daily.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <TreePine className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">Platform Development (10%)</h3>
                          <p className="text-sm text-muted-foreground">
                            Cloud infrastructure, blockchain verification, data storage, and continuous 
                            platform improvements to enhance monitoring capabilities.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonial Section */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl mx-auto text-center">
              <blockquote className="text-xl italic text-muted-foreground mb-6">
                "Until you dig a hole, you plant a tree, you water it and make it survive, 
                you haven't done a thing. You are just talking."
              </blockquote>
              <p className="font-semibold text-primary">— Wangari Maathai</p>
              <p className="text-sm text-muted-foreground mt-2">
                Nobel Peace Prize Laureate & Environmental Activist
              </p>
              
              <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-muted-foreground">
                  ForestGuard embodies Wangari Maathai's vision of practical environmental action. 
                  Your donation doesn't just talk about conservation—it actively protects forests, 
                  empowers communities, and holds corruption accountable through technology.
                </p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Donate;
