import { Card, CardContent } from "@/components/ui/card";
import { Satellite, Radio, Shield, Brain } from "lucide-react";
import { motion } from "framer-motion";

const HowItWorksSimple = () => {
  const steps = [
    {
      icon: Satellite,
      title: "Satellites Watch from Space",
      description: "Every 5 days, satellites check forest health and spot illegal clearing before it spreads.",
      color: "text-blue-500"
    },
    {
      icon: Radio,
      title: "Smart Sensors Listen on the Ground",
      description: "IoT devices detect chainsaws, vehicles, and fires in real-time across forest zones.",
      color: "text-green-500"
    },
    {
      icon: Shield,
      title: "Communities Report Anonymously",
      description: "Blockchain-protected whistleblowing that can't be traced or deleted - even admins can't find reporters.",
      color: "text-amber-500"
    },
    {
      icon: Brain,
      title: "AI Alerts Rangers Instantly",
      description: "When threats are detected, field rangers get SMS alerts within 2 minutes with exact locations.",
      color: "text-primary"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How ForestGuard <span className="text-primary">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Four simple layers working together to protect Kenya's forests
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:border-primary/50 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center ${step.color}`}>
                        <step.icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4 text-center">Why This Matters</h3>
              <p className="text-muted-foreground text-center text-lg">
                Threats detected <span className="font-semibold text-foreground">before they spread</span>. 
                Communities protected from <span className="font-semibold text-foreground">retaliation</span>. 
                Kenya's forests safeguarded through <span className="font-semibold text-foreground">technology + transparency</span>.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSimple;
