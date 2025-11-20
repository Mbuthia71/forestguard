import { Satellite, Radio, Shield, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import forestRangers from "@/assets/forest-rangers.jpeg";
import forestCanopyLight from "@/assets/forest-canopy-light.png";

const HowItWorks = () => {
  const steps = [
    {
      icon: Satellite,
      title: "Satellite Change Detection",
      description: "Sentinel-2 and Google Earth Engine analyze forest cover changes every 5 days with 10m resolution. Machine learning models detect deforestation, illegal logging, and fire risks with 94% accuracy.",
      color: "text-lime-neon",
      stat: "94% accuracy",
    },
    {
      icon: Radio,
      title: "IoT Ground Sensors",
      description: "LoRaWAN acoustic and motion sensors (10km range) deployed in forests capture chainsaw sounds, vehicle movements, and environmental data 24/7. Battery life: 3+ years.",
      color: "text-lime-bright",
      stat: "10km range",
    },
    {
      icon: Shield,
      title: "Blockchain Reporting",
      description: "Anonymous community reports stored on Polygon testnet (0.001 MATIC/tx) with SHA-256 hashes and IPFS media storage. Tamper-proof evidence chain ensures transparency and protects whistleblowers.",
      color: "text-lime-neon",
      stat: "100% anonymous",
    },
    {
      icon: Bell,
      title: "Real-time AI Alerts",
      description: "TensorFlow-powered data fusion sends instant SMS/email alerts to rangers and authorities within 2 minutes of threat detection. Multi-source verification reduces false positives by 87%.",
      color: "text-lime-bright",
      stat: "<2min response",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-background via-kenya-cream to-background relative overflow-hidden">
      {/* Decorative forest canopy background */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 opacity-10">
        <img src={forestCanopyLight} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How <span className="text-primary">ForestGuard</span> Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A 4-layer architecture combining satellite imagery, IoT sensors, blockchain, and AI to protect forests 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 max-w-7xl mx-auto items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={forestRangers} 
              alt="Forest Rangers in Action" 
              className="w-full h-[500px] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 to-transparent flex items-end p-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Rangers on the Ground</h3>
                <p className="text-white/90">Real-time monitoring and rapid response in Kenyan forests</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card
                  key={index}
                  className="bg-card backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg p-6 space-y-4 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20">
                    <Icon className="text-primary w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-primary/70">Step {index + 1}</div>
                    <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                    <div className="pt-2">
                      <Badge className="bg-primary/20 text-primary border-primary/40">
                        {step.stat}
                      </Badge>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Connection Line Visual */}
        <div className="hidden lg:block relative max-w-7xl mx-auto mt-8">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-30 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
