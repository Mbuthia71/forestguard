import { Satellite, Radio, Shield, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";

const HowItWorks = () => {
  const steps = [
    {
      icon: Satellite,
      title: "Satellite Change Detection",
      description: "Sentinel-2 and Google Earth Engine analyze forest cover changes in real-time, detecting deforestation as it happens.",
      color: "text-lime-neon",
    },
    {
      icon: Radio,
      title: "IoT Ground Sensors",
      description: "LoRaWAN acoustic and motion sensors deployed in forests capture real-time environmental data and illegal activity.",
      color: "text-lime-bright",
    },
    {
      icon: Shield,
      title: "Blockchain Reporting",
      description: "Anonymous community reports stored on Polygon blockchain with IPFS, ensuring transparency and tamper-proof evidence.",
      color: "text-lime-neon",
    },
    {
      icon: Bell,
      title: "Real-time Alerts",
      description: "AI-powered data fusion sends instant alerts to rangers, authorities, and communities when threats are detected.",
      color: "text-lime-bright",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-background to-forest-deep/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How <span className="text-primary">ForestGuard</span> Works
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            A 4-layer architecture combining satellite imagery, IoT sensors, blockchain, and AI to protect forests 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover-glow p-6 space-y-4 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20">
                  <Icon className={`${step.color} w-8 h-8`} />
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-primary/70">Step {index + 1}</div>
                  <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{step.description}</p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Connection Line Visual */}
        <div className="hidden lg:block relative max-w-7xl mx-auto mt-8">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-lime-neon via-lime-bright to-lime-neon opacity-30 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
