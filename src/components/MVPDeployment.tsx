import { motion } from 'framer-motion';
import { Radio, Wifi, Cloud, Bell, Camera, Zap } from 'lucide-react';

const MVPDeployment = () => {
  const steps = [
    { icon: Radio, label: 'IoT Sensors', description: 'Acoustic, motion, smoke detectors' },
    { icon: Wifi, label: 'LoRa Gateway', description: 'Long-range data transmission' },
    { icon: Cloud, label: 'Cloud Processing', description: 'Real-time AI analysis' },
    { icon: Bell, label: 'Alert System', description: 'Instant ranger notification' },
  ];

  const costs = [
    { item: 'LoRa Sensors', price: 'KES 7,000 - 12,000', icon: Radio },
    { item: 'Acoustic Logging Detectors', price: 'KES 10,000', icon: Zap },
    { item: 'Camera Traps', price: 'KES 15,000 - 20,000', icon: Camera },
    { item: 'LoRa Gateway', price: 'KES 15,000 - 30,000', icon: Wifi },
    { item: 'Server Hosting', price: 'KES 1,200/month', icon: Cloud },
    { item: 'Satellite Data (Sentinel)', price: 'FREE', icon: Bell },
  ];

  return (
    <section id="mvp-deployment" className="py-20 px-4 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            MVP Deployment for <span className="text-primary">Kenya</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Affordable, scalable forest monitoring infrastructure
          </p>
        </motion.div>

        {/* System Flow Diagram */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">System Architecture</h3>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex items-center"
              >
                <div className="flex flex-col items-center">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-primary to-primary/60 mb-2">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-semibold text-foreground text-center">{step.label}</p>
                  <p className="text-xs text-foreground/60 text-center max-w-[120px]">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block mx-4 text-4xl text-primary">→</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Cost Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Realistic MVP Costs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {costs.map((cost, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-background/50 rounded-xl border border-border"
              >
                <div className="p-3 rounded-lg bg-primary/10">
                  <cost.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{cost.item}</p>
                  <p className={`text-sm ${cost.price === 'FREE' ? 'text-green-500 font-bold' : 'text-foreground/60'}`}>
                    {cost.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-primary/10 border border-primary/20 rounded-xl">
            <p className="text-center text-lg">
              <strong className="text-primary">Total Initial Investment:</strong>{' '}
              <span className="text-2xl font-bold text-foreground">~KES 50,000 - 75,000</span>
              <span className="text-foreground/60 block text-sm mt-2">For a 10-sensor pilot deployment</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MVPDeployment;
