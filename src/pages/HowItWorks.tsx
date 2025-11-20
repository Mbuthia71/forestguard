import Navigation from "@/components/Navigation";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const HowItWorksPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
        <HowItWorks />
        <Footer />
      </div>
    </PageTransition>
  );
};

export default HowItWorksPage;
