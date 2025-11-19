import { motion } from 'framer-motion';
import { TreePine, Droplets, MapPin, AlertTriangle } from 'lucide-react';
import forestWaterfall from '@/assets/forest-waterfall.jpg';
import forestPath from '@/assets/forest-path.jpeg';
import kenyaLandscape from '@/assets/kenya-landscape.jpg';
import { OptimizedImage } from './OptimizedImage';

const KenyaForestImpact = () => {
  const impacts = [
    {
      icon: TreePine,
      value: '300,000+',
      label: 'Hectares Under Threat',
      description: 'Natural forest requiring protection',
      color: 'from-green-400 to-emerald-600',
    },
    {
      icon: MapPin,
      value: 'Only 1',
      label: 'Tropical Rainforest',
      description: 'Kakamega is Kenya\'s last tropical rainforest',
      color: 'from-emerald-400 to-green-600',
    },
    {
      icon: Droplets,
      value: 'Millions',
      label: 'Water Supply',
      description: 'Mau Forest supplies water to millions',
      color: 'from-blue-400 to-cyan-600',
    },
    {
      icon: AlertTriangle,
      value: '50,000',
      label: 'Acres Lost Yearly',
      description: 'Due to illegal logging and encroachment',
      color: 'from-orange-400 to-red-600',
    },
  ];

  return (
    <section id="kenya-impact" className="py-20 px-4 bg-gradient-to-b from-kenya-cream via-background to-kenya-cream">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Kenya Forest <span className="text-primary">Impact</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Protecting Kenya's vital forest ecosystems with cutting-edge technology
          </p>
        </motion.div>

        {/* Beautiful Image Gallery */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 rounded-2xl overflow-hidden"
        >
          <div className="relative h-64 md:h-80 overflow-hidden group">
            <OptimizedImage 
              src={kenyaLandscape} 
              alt="Great Rift Valley Kenya" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 to-transparent flex items-end p-4">
              <p className="text-white font-semibold">Great Rift Valley Forests</p>
            </div>
          </div>
          <div className="relative h-64 md:h-80 overflow-hidden group">
            <OptimizedImage 
              src={forestWaterfall} 
              alt="Kakamega Forest Waterfall" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 to-transparent flex items-end p-4">
              <p className="text-white font-semibold">Kakamega Rainforest</p>
            </div>
          </div>
          <div className="relative h-64 md:h-80 overflow-hidden group">
            <OptimizedImage 
              src={forestPath} 
              alt="Forest Conservation Path" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 to-transparent flex items-end p-4">
              <p className="text-white font-semibold">Protected Forest Trails</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {impacts.map((impact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-card/50 backdrop-blur-sm border border-border p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${impact.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              
              <div className="relative z-10">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${impact.color} mb-4`}>
                  <impact.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-3xl font-bold text-foreground mb-2">
                  {impact.value}
                </h3>
                
                <p className="text-lg font-semibold text-foreground/90 mb-2">
                  {impact.label}
                </p>
                
                <p className="text-sm text-foreground/60">
                  {impact.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 bg-card/50 border border-primary/20 rounded-2xl backdrop-blur-sm"
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">Key Kenyan Forests</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-foreground/80">
            <div>
              <strong className="text-primary">Kakamega Forest:</strong> Kenya's only tropical rainforest, home to unique biodiversity
            </div>
            <div>
              <strong className="text-primary">Mau Forest Complex:</strong> East Africa's largest water tower
            </div>
            <div>
              <strong className="text-primary">Karura Forest:</strong> Nairobi's green lung, most visited urban forest
            </div>
            <div>
              <strong className="text-primary">Aberdare Forest:</strong> Critical watershed and wildlife corridor
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default KenyaForestImpact;
