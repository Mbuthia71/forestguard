import { motion } from 'framer-motion';
import { Building2, Shield, Trees, Users, Leaf, DollarSign } from 'lucide-react';

const KenyaStakeholders = () => {
  const stakeholders = [
    {
      name: 'Kenya Forest Service (KFS)',
      icon: Trees,
      description: 'ForestGuard provides real-time alerts to help KFS rangers respond faster to illegal logging and encroachment',
      color: 'from-green-500 to-emerald-600',
    },
    {
      name: 'NEMA Kenya',
      icon: Shield,
      description: 'Environmental monitoring data and evidence for enforcement and compliance verification',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      name: 'Kenya Wildlife Service (KWS)',
      icon: Leaf,
      description: 'Wildlife corridor protection and human-wildlife conflict prevention through sensor networks',
      color: 'from-emerald-500 to-green-600',
    },
    {
      name: 'County Governments',
      icon: Building2,
      description: 'Kakamega, Nakuru, and Nairobi counties gain transparent forest management tools',
      color: 'from-purple-500 to-pink-600',
    },
    {
      name: 'NGOs (WWF, Nature Kenya)',
      icon: Users,
      description: 'Data-driven conservation initiatives and community engagement programs',
      color: 'from-orange-500 to-red-600',
    },
    {
      name: 'Community Engagement',
      icon: Users,
      description: 'Citizen reporting tools and educational resources for local communities',
      color: 'from-yellow-500 to-orange-600',
    },
  ];

  return (
    <section id="stakeholders" className="py-20 px-4 bg-gradient-to-b from-background/50 to-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Stakeholders in <span className="text-primary">Kenya</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            ForestGuard serves multiple stakeholders across Kenya's conservation ecosystem
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stakeholders.map((stakeholder, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-card/50 backdrop-blur-sm border border-border p-6 hover:shadow-2xl transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stakeholder.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              
              <div className="relative z-10">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${stakeholder.color} mb-4`}>
                  <stakeholder.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {stakeholder.name}
                </h3>
                
                <p className="text-foreground/70 leading-relaxed">
                  {stakeholder.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KenyaStakeholders;
