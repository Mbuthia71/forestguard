import { Card } from "@/components/ui/card";
import { Database, Waves, Link2, Cpu, Satellite, Radio } from "lucide-react";

const TechnologyStack = () => {
  const technologies = [
    {
      icon: Satellite,
      name: "Google Earth Engine",
      category: "Satellite Analysis",
      description: "Sentinel-2 multispectral data (13 bands, 10m resolution)",
      details: "NDVI, EVI change detection",
    },
    {
      icon: Radio,
      name: "LoRaWAN Network",
      category: "IoT Protocol",
      description: "868/915 MHz ISM band, 10km range, <50mA consumption",
      details: "TTN/ChirpStack gateway",
    },
    {
      icon: Link2,
      name: "Polygon + IPFS",
      category: "Blockchain Layer",
      description: "Testnet deployment (Mumbai), decentralized file storage",
      details: "0.001 MATIC per tx",
    },
    {
      icon: Waves,
      name: "Apache Kafka",
      category: "Event Streaming",
      description: "Real-time data pipelines, 100k+ msgs/sec throughput",
      details: "Zookeeper coordination",
    },
    {
      icon: Database,
      name: "FastAPI + PostgreSQL",
      category: "Backend Stack",
      description: "Python async API (Pydantic validation) + PostGIS extension",
      details: "REST + WebSocket APIs",
    },
    {
      icon: Cpu,
      name: "TensorFlow 2.x",
      category: "AI/ML Framework",
      description: "CNN-based change detection, LSTM time-series prediction",
      details: "GPU-accelerated inference",
    },
  ];

  return (
    <section id="technology" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Technology <span className="text-primary">Stack</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Built on cutting-edge technologies for maximum reliability, scalability, and real-time performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <Card
                key={index}
                className="group bg-card border-border hover:border-primary transition-all duration-300 hover-glow p-6 cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="text-xs font-semibold text-primary/70 uppercase tracking-wide">
                      {tech.category}
                    </div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {tech.name}
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">{tech.description}</p>
                    <p className="text-xs text-foreground/50 font-mono">{tech.details}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Additional Tech Info */}
        <div className="mt-16 text-center">
          <Card className="inline-block bg-primary/5 border-primary/20 px-8 py-4">
            <p className="text-sm text-foreground/80">
              <span className="font-bold text-primary">Open Source</span> • Built with React, TypeScript & Tailwind CSS
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TechnologyStack;
