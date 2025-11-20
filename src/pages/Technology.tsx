import Navigation from "@/components/Navigation";
import TechnologyStack from "@/components/TechnologyStack";
import SatelliteAnalysis from "@/components/SatelliteAnalysis";
import RealTimeDashboard from "@/components/RealTimeDashboard";
import IoTSimulator from "@/components/IoTSimulator";
import BlockchainReporting from "@/components/BlockchainReporting";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const TechnologyPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
        <TechnologyStack />
        <SatelliteAnalysis />
        <RealTimeDashboard />
        <IoTSimulator />
        <BlockchainReporting />
        <Footer />
      </div>
    </PageTransition>
  );
};

export default TechnologyPage;
