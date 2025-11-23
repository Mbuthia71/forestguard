import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ForestHealthLeaderboard from "@/components/ForestHealthLeaderboard";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import tropicalForest from "@/assets/tropical-forest-backdrop.jpeg";
import grassOverlay from "@/assets/grass-overlay.jpeg";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
        <Hero />
        <section className="py-16 px-4 bg-muted/30 relative overflow-hidden">
          {/* Decorative tropical forest backdrop */}
          <motion.img
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 0.08, scale: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            src={tropicalForest}
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <ForestHealthLeaderboard />
          </div>
          
          {/* Grass overlay at bottom */}
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.15 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            src={grassOverlay}
            alt=""
            className="absolute bottom-0 left-0 w-full h-24 object-cover object-top pointer-events-none"
          />
        </section>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
