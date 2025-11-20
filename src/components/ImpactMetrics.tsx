import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { TreePine, AlertTriangle, Shield, Users } from 'lucide-react';
import handNature from "@/assets/hand-nature.png";

export default function ImpactMetrics() {
  const metrics = [
    {
      icon: TreePine,
      value: '12,847',
      label: 'Hectares Protected',
      color: 'text-lime-neon',
      suffix: 'in Kenya',
    },
    {
      icon: AlertTriangle,
      value: '43',
      label: 'Threats Detected',
      color: 'text-orange-400',
      suffix: 'this month',
    },
    {
      icon: Shield,
      value: '89',
      label: 'Anonymous Reports',
      color: 'text-primary',
      suffix: 'verified',
    },
    {
      icon: Users,
      value: '156',
      label: 'Active Sensors',
      color: 'text-blue-400',
      suffix: 'Kenya forests',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-forest-deep/20 to-background relative overflow-hidden">
      {/* Hand with nature decorative element */}
      <div className="absolute top-0 right-0 w-1/4 h-1/2 opacity-10">
        <img src={handNature} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Real-time <span className="text-primary">Impact</span> in Kenya
          </h2>
          <p className="text-foreground/70">Live statistics from Kakamega, Mau, Karura & Aberdare forests</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 p-6 text-center space-y-4 hover-glow">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                      <Icon className={`${metric.color} w-8 h-8`} />
                    </div>
                  </div>
                  <div>
                    <div className={`text-4xl font-bold ${metric.color} mb-1`}>
                      {metric.value}
                    </div>
                    <div className="text-sm text-foreground/60 font-medium">{metric.label}</div>
                    {metric.suffix && (
                      <div className="text-xs text-foreground/40 mt-1">{metric.suffix}</div>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-foreground/60 text-sm">
            Updated in real-time via WebSocket • Last sync: {new Date().toLocaleTimeString()}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
