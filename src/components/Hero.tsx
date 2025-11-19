import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import forestGuardLogo from "@/assets/forestguard-logo.png";
import heroForestPath from "@/assets/hero-forest-path.jpg";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { OptimizedImage } from "./OptimizedImage";

const Hero = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/70 via-background/80 to-background z-0"></div>
      <OptimizedImage 
        src={heroForestPath} 
        alt="Kenyan Forest" 
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        loading="eager"
      />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto space-y-8"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <OptimizedImage
              src={forestGuardLogo}
              alt="ForestGuard"
              className="w-full max-w-3xl h-auto"
              loading="eager"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-foreground/90 max-w-3xl mx-auto leading-relaxed space-y-4"
          >
            <span className="block">
              Real-time forest monitoring powered by <span className="text-primary font-semibold">satellite data</span>, 
              <span className="text-primary font-semibold"> IoT sensors</span>, and 
              <span className="text-primary font-semibold"> blockchain technology</span>.
            </span>
            <span className="block text-base md:text-lg">
              🛰️ <span className="font-semibold">Sentinel-2 Imagery</span> • 
              📡 <span className="font-semibold">LoRaWAN Sensors</span> • 
              🔗 <span className="font-semibold">Polygon Blockchain</span> • 
              🤖 <span className="font-semibold">AI-Powered Alerts</span>
            </span>
            <span className="block text-primary font-bold text-xl mt-4">
              Protecting 2,847 hectares of forest. Every second counts.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 group"
              onClick={() => (isAdmin ? navigate('/admin') : navigate('/admin-auth'))}
            >
              {isAdmin ? 'Go to Admin' : 'Admin Login'}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 group"
              onClick={() => navigate('/auth')}
            >
              <Play className="mr-2 group-hover:scale-110 transition-transform" />
              Ranger Login
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;