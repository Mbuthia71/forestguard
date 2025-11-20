import { Leaf, Code, Lightbulb, Map, Award, Target } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import founderImage from "@/assets/founder.jpeg";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-lime-neon to-forest-deep bg-clip-text text-transparent">
              About ForestGuard
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Protecting Kenya's forests through innovative technology, community engagement, and transparent monitoring
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardContent className="pt-6">
                <Target className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                <p className="text-muted-foreground">
                  To safeguard Kenya's forest ecosystems through cutting-edge satellite monitoring, 
                  IoT sensor networks, and blockchain-verified reporting systems that empower rangers 
                  and communities to protect our natural heritage.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardContent className="pt-6">
                <Leaf className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                <p className="text-muted-foreground">
                  A future where every forest in Kenya is monitored, protected, and preserved through 
                  transparent technology that connects conservationists, stakeholders, and local communities 
                  in the fight against deforestation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardContent className="pt-6">
                <Award className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Our Values</h3>
                <p className="text-muted-foreground">
                  Transparency through blockchain verification, innovation in environmental technology, 
                  community-first conservation, and unwavering commitment to protecting whistleblowers 
                  reporting illegal deforestation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Organization Background */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-8 text-center">Our Story</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
            <p>
              ForestGuard was born from a deep concern about Kenya's rapidly disappearing forest cover 
              and the dangerous challenges faced by environmental activists reporting illegal logging, 
              encroachment, and forest degradation.
            </p>
            <p>
              Traditional forest monitoring systems rely on infrequent manual patrols and paper-based 
              reporting that can be easily tampered with or ignored. Whistleblowers who report illegal 
              activities face intimidation, corruption, and retaliation from powerful interests profiting 
              from deforestation.
            </p>
            <p>
              ForestGuard addresses these challenges by combining four revolutionary technologies: 
              <span className="text-primary font-semibold"> satellite change detection</span> using 
              Sentinel-2 and Google Earth Engine to monitor vegetation health from space, 
              <span className="text-primary font-semibold"> IoT ground sensors</span> deployed across 
              forest zones to detect fire, illegal logging, and wildlife activity in real-time, 
              <span className="text-primary font-semibold"> blockchain-verified anonymous reporting</span> 
              that protects whistleblower identities while creating immutable audit trails, and 
              <span className="text-primary font-semibold"> AI-powered analytics</span> that transform 
              complex environmental data into actionable insights for rangers and stakeholders.
            </p>
            <p>
              By providing a transparent, tamper-proof system for forest monitoring and reporting, 
              ForestGuard empowers Kenya's forest rangers, environmental organizations, and concerned 
              citizens to protect our forests with the confidence that their reports will be verified, 
              tracked, and acted upon—without fear of retaliation.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Founder */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Meet the Founder</h2>
          
          <div className="relative">
            <Card className="border-primary/30 overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Founder Photo with Illustrated Elements */}
                  <div className="relative">
                    <div className="relative w-full aspect-square max-w-md mx-auto">
                      {/* Photo */}
                      <img
                        src={founderImage}
                        alt="Founder"
                        className="rounded-2xl object-cover w-full h-full shadow-2xl"
                      />
                      
                      {/* Illustrated Elements inspired by reference */}
                      <div className="absolute -top-4 -left-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/30 rotate-[-5deg] shadow-lg">
                        <div className="flex items-center gap-2">
                          <Code className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">Developer</span>
                        </div>
                      </div>
                      
                      <div className="absolute -top-4 -right-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/30 rotate-[8deg] shadow-lg">
                        <div className="flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">Innovator</span>
                        </div>
                      </div>
                      
                      <div className="absolute -bottom-4 -left-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/30 rotate-[5deg] shadow-lg">
                        <div className="flex items-center gap-2">
                          <Map className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">GIS Engineer</span>
                        </div>
                      </div>
                      
                      <div className="absolute -bottom-4 -right-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/30 rotate-[-8deg] shadow-lg">
                        <div className="flex items-center gap-2">
                          <Leaf className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">Environmentalist</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Founder Bio */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold mb-2 text-primary">System Architect & Creator</h3>
                      <p className="text-xl text-muted-foreground mb-6">
                        Geospatial Engineering Student, Environmental Advocate
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p className="text-muted-foreground">
                          <span className="font-semibold text-foreground">Geospatial Engineering Student</span> at 
                          the Technical University of Kenya, specializing in satellite imagery analysis and 
                          environmental monitoring systems
                        </p>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p className="text-muted-foreground">
                          <span className="font-semibold text-foreground">Vice-Chair, Environmental Students</span> at 
                          the Technical University of Kenya, leading campus sustainability initiatives and 
                          environmental awareness campaigns
                        </p>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p className="text-muted-foreground">
                          <span className="font-semibold text-foreground">Full-Stack Developer & System Architect</span> with 
                          expertise in React, TypeScript, Supabase, and geospatial technologies
                        </p>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p className="text-muted-foreground">
                          <span className="font-semibold text-foreground">UI/UX Designer</span> passionate about 
                          creating beautiful, accessible interfaces that make complex environmental data 
                          understandable for all stakeholders
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <p className="text-muted-foreground italic">
                        "ForestGuard represents my commitment to protecting Kenya's forests through technology 
                        that empowers communities, protects whistleblowers, and creates transparent 
                        accountability in forest conservation."
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Join the Movement</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Whether you're a forest ranger, environmental organization, donor, or concerned citizen, 
            ForestGuard provides the tools you need to protect Kenya's forests and hold illegal 
            deforestation accountable.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/auth">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Become a Ranger
              </button>
            </a>
            <a href="#contact">
              <button className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                Contact Us
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
