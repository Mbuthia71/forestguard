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
          {/* Transparent palm tree accent - top left */}
          <motion.img
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            src={tropicalForest}
            alt=""
            className="absolute top-0 left-0 w-1/4 h-auto pointer-events-none z-10"
          />
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <ForestHealthLeaderboard />
          </div>
          
          {/* Grass border at bottom */}
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            src={grassOverlay}
            alt=""
            className="absolute bottom-0 left-0 w-full h-20 object-cover object-top pointer-events-none z-20"
          />
        </section>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
