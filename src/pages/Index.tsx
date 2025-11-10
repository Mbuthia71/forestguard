import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import TechnologyStack from "@/components/TechnologyStack";
import RealTimeDashboard from "@/components/RealTimeDashboard";
import IoTSimulator from "@/components/IoTSimulator";
import BlockchainReporting from "@/components/BlockchainReporting";
import SatelliteAnalysis from "@/components/SatelliteAnalysis";
import ContactForm from "@/components/ContactForm";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <HowItWorks />
      <TechnologyStack />
      <SatelliteAnalysis />
      <RealTimeDashboard />
      <IoTSimulator />
      <BlockchainReporting />
      <ContactForm />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
