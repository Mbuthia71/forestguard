import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import forestGuardLogo from "@/assets/forestguard-logo-new.png";
import heroForestPath from "@/assets/hero-forest-path.jpg";
import mountainLandscape from "@/assets/mountain-landscape.png";
import tropicalForest from "@/assets/tropical-forest-backdrop.jpeg";
import palmTree from "@/assets/palm-tree.png";
import grassOverlay from "@/assets/grass-overlay.jpeg";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <section id="home" className="relative min-h-screen bg-background overflow-hidden pt-20 md:pt-24">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10"></div>
      
      {/* Decorative transparent nature overlays */}
      {/* Tropical forest - top right corner accent */}
      <motion.img
        initial={{ opacity: 0, x: 100, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        src={tropicalForest}
        alt=""
        className="absolute top-0 right-0 w-2/5 md:w-1/3 h-auto pointer-events-none z-10"
      />
      
      {/* Mountain landscape - bottom as footer accent */}
      <motion.img
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, delay: 0.8 }}
        src={mountainLandscape}
        alt=""
        className="absolute bottom-0 left-0 right-0 w-full h-auto pointer-events-none z-5"
      />
      
      {/* Palm tree - left corner decorative */}
      <motion.img
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2, delay: 1 }}
        src={palmTree}
        alt=""
        className="absolute top-1/4 left-0 w-32 md:w-48 h-auto pointer-events-none z-10"
      />
      
      {/* Grass overlay - bottom natural border */}
      <motion.img
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1.2 }}
        src={grassOverlay}
        alt=""
        className="absolute bottom-0 left-0 w-full h-24 md:h-32 object-cover object-top pointer-events-none z-20"
      />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-6rem)] flex items-center py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 w-full items-center">
          
          {/* Left side - Vertical text like bonsai design */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:flex lg:col-span-2 items-center"
          >
            <div className="flex flex-col items-start gap-4">
              <div className="writing-mode-vertical text-7xl font-light tracking-widest text-muted-foreground/40 rotate-180">
                forestguard
              </div>
              <div className="w-px h-32 bg-border"></div>
            </div>
          </motion.div>

          {/* Center content */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8 md:space-y-12 text-center lg:text-left">
            
            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4 md:space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
                <motion.img
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 1, delay: 0.5, type: "spring" }}
                  src={forestGuardLogo}
                  alt="ForestGuard Logo"
                  className="w-16 h-16 sm:w-20 sm:h-20"
                />
                <div className="hidden sm:block h-12 sm:h-16 w-px bg-border"></div>
                <h1 className="responsive-text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light tracking-tight">
                  THE FUTURE
                  <span className="block responsive-text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-primary via-accent to-forest-deep bg-clip-text text-transparent mt-1 sm:mt-2">
                    OF FOREST
                  </span>
                  <span className="block responsive-text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-light tracking-wide mt-1 sm:mt-2">
                    MONITORING
                  </span>
                </h1>
              </div>

              <div className="h-px w-20 sm:w-32 bg-border mx-auto lg:mx-0"></div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="responsive-text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed mx-auto lg:mx-0"
              >
                Real-time forest monitoring powered by <span className="text-primary font-semibold">satellite data</span>, 
                <span className="text-primary font-semibold"> IoT sensors</span>, and 
                <span className="text-primary font-semibold"> blockchain technology</span>.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-muted-foreground justify-center lg:justify-start"
              >
                <span className="whitespace-nowrap">🛰️ Sentinel-2</span>
                <span className="whitespace-nowrap">📡 LoRaWAN</span>
                <span className="whitespace-nowrap">🔗 Blockchain</span>
                <span className="whitespace-nowrap">🤖 AI Alerts</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="pt-2 sm:pt-4"
              >
                <p className="text-primary font-bold responsive-text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 md:mb-8">
                  Protecting 2,847 hectares. Every second counts.
                </p>
              </motion.div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 group w-full sm:w-auto sm:min-w-[180px] touch-manipulation"
                onClick={() => (isAdmin ? navigate('/admin') : navigate('/admin-auth'))}
              >
                {isAdmin ? 'Go to Admin' : 'Admin Login'}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary/10 group w-full sm:w-auto sm:min-w-[180px] touch-manipulation"
                onClick={() => navigate('/auth')}
              >
                <Play className="mr-2 group-hover:scale-110 transition-transform" />
                Ranger Login
              </Button>
            </motion.div>

            {/* Geometric element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="hidden lg:flex items-center gap-4 pt-8"
            >
              <div className="w-24 h-24 border-2 border-primary/20 relative">
                <div className="absolute inset-2 bg-primary/5"></div>
              </div>
              <div className="w-16 h-16 border-2 border-primary/30"></div>
            </motion.div>
          </div>

          {/* Right side - Large hero tree image */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="hidden lg:flex lg:col-span-2 items-center justify-center relative"
          >
            <div className="relative">
              {/* Circular platform like bonsai design */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-2 border-2 border-primary/30 rounded-full"></div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-1 bg-primary/20 rounded-full"></div>
              
              {/* Large number like the reference */}
              <div className="text-[200px] font-bold text-primary/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none">
                01
              </div>

              {/* Tree icon as centerpiece */}
              <motion.img
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                src={forestGuardLogo}
                alt="Forest Icon"
                className="w-40 h-40 relative z-10 drop-shadow-2xl"
              />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ duration: 1.5, delay: 1.8 }}
          className="h-px bg-gradient-to-r from-transparent via-primary to-transparent"
        ></motion.div>
      </div>
    </section>
  );
};

export default Hero;