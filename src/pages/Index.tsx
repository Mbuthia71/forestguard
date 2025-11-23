import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ForestHealthLeaderboard from "@/components/ForestHealthLeaderboard";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
        <Hero />
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <ForestHealthLeaderboard />
          </div>
        </section>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
