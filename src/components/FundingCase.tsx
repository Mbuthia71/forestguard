import { motion } from 'framer-motion';
import { Target, TrendingUp, Shield, Zap, Users, Globe } from 'lucide-react';

const FundingCase = () => {
  const reasons = [
    {
      icon: Target,
      title: 'Real-Time Forest Protection',
      description: 'Immediate alerts enable rapid response to threats, preventing damage before it happens',
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: Zap,
      title: 'Affordable Kenyan-Made Tech',
      description: 'Low-cost sensors and open-source software keep operational costs minimal',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Shield,
      title: 'Helps KFS Track Encroachment',
      description: 'Provides evidence-based data for legal enforcement and boundary protection',
      color: 'from-purple-500 to-pink-600',
    },
    {
      icon: TrendingUp,
      title: 'Strengthens Carbon Markets',
      description: 'Verified forest preservation data enables carbon credit generation',
      color: 'from-yellow-500 to-orange-600',
    },
    {
      icon: Users,
      title: 'Enhances Ranger Safety',
      description: 'Remote monitoring reduces dangerous patrols and provides threat intelligence',
      color: 'from-red-500 to-pink-600',
    },
    {
      icon: Globe,
      title: 'Scalable Across East Africa',
      description: 'Proven model can expand to Tanzania, Uganda, and beyond',
      color: 'from-emerald-500 to-green-600',
    },
  ];

  return (
    <section id="funding-case" className="py-20 px-4 bg-gradient-to-b from-background/50 to-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why ForestGuard <span className="text-primary">Deserves Funding</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            A proven, scalable solution for protecting Kenya's vital forest ecosystems
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-card/50 backdrop-blur-sm border border-border p-6 hover:shadow-2xl transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              
              <div className="relative z-10">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${reason.color} mb-4`}>
                  <reason.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {reason.title}
                </h3>
                
                <p className="text-foreground/70 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary to-primary/60 rounded-2xl p-12 text-center text-white"
        >
          <h3 className="text-3xl font-bold mb-4">Investment Opportunity</h3>
          <p className="text-xl mb-6 opacity-90">
            Join us in protecting Kenya's forests and building a sustainable future
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <p className="text-4xl font-bold mb-2">$50K</p>
              <p className="text-sm opacity-80">Seed Funding Target</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <p className="text-4xl font-bold mb-2">500+</p>
              <p className="text-sm opacity-80">Sensors in Year 1</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <p className="text-4xl font-bold mb-2">5</p>
              <p className="text-sm opacity-80">Countries by Year 3</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FundingCase;
