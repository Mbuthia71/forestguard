import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import forestGuardLogo from "@/assets/forestguard-logo.png";
import forestRiver from "@/assets/forest-river.jpg";
import forestStream from "@/assets/forest-stream.jpg";
import forestCenote from "@/assets/forest-cenote.jpg";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const images = [forestRiver, forestStream, forestCenote];
  const randomImage = images[Math.floor(Math.random() * images.length)];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/80 via-forest-deep/60 to-background z-0"></div>
      <img src={randomImage} alt="Forest" className="absolute inset-0 w-full h-full object-cover opacity-20" />

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
            <img
              src={forestGuardLogo}
              alt="ForestGuard"
              className="w-full max-w-3xl h-auto"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-foreground/90 max-w-3xl mx-auto leading-relaxed"
          >
            Real-time forest monitoring powered by satellite data, IoT sensors, and blockchain technology.
            <br />
            <span className="text-primary font-semibold">Protecting nature, one alert at a time.</span>
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
              onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Play className="mr-2 group-hover:scale-110 transition-transform" />
              View Dashboard
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;