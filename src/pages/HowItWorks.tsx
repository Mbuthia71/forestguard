import Navigation from "@/components/Navigation";
import HowItWorksSimple from "@/components/HowItWorksSimple";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const HowItWorksPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
        <HowItWorksSimple />
        <Footer />
      </div>
    </PageTransition>
  );
};

export default HowItWorksPage;
