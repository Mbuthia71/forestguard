import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import TechnologyStack from "@/components/TechnologyStack";
import Dashboard from "@/components/Dashboard";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <HowItWorks />
      <TechnologyStack />
      <Dashboard />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
