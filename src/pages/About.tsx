import { Leaf, Code, Lightbulb, Map, Award, Target } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import founderImage from "@/assets/founder.jpeg";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";

const About = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-32 pb-16 px-4"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-lime-neon to-forest-deep bg-clip-text text-transparent">
              About ForestGuard
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Protecting Kenya's forests through innovative technology, community engagement, and transparent monitoring
            </p>
          </div>
        </div>
      </motion.section>

      {/* Mission Statement */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-16 px-4 bg-muted/30"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Our Mission",
                description: "To safeguard Kenya's forest ecosystems through cutting-edge satellite monitoring, IoT sensor networks, and blockchain-verified reporting systems that empower rangers and communities to protect our natural heritage."
              },
              {
                icon: Leaf,
                title: "Our Vision",
                description: "A future where every forest in Kenya is monitored, protected, and preserved through transparent technology that connects conservationists, stakeholders, and local communities in the fight against deforestation."
              },
              {
                icon: Award,
                title: "Our Values",
                description: "Transparency through blockchain verification, innovation in environmental technology, community-first conservation, and unwavering commitment to protecting whistleblowers reporting illegal deforestation."
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-primary/20 hover:border-primary/40 transition-all duration-300 h-full">
                  <CardContent className="pt-6">
                    <item.icon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Organization Background */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-16 px-4"
      >
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-8 text-center">Our Story</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              ForestGuard was born from a deep concern about Kenya's rapidly disappearing forest cover 
              and the dangerous challenges faced by environmental activists reporting illegal logging, 
              encroachment, and forest degradation.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Traditional forest monitoring systems rely on infrequent manual patrols and paper-based 
              reporting that can be easily tampered with or ignored. Whistleblowers who report illegal 
              activities face intimidation, corruption, and retaliation from powerful interests profiting 
              from deforestation.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              ForestGuard addresses these challenges by combining four revolutionary technologies: 
              <span className="text-primary font-semibold"> satellite change detection</span> using 
              Sentinel-2 and Google Earth Engine to monitor vegetation health from space, 
              <span className="text-primary font-semibold"> IoT ground sensors</span> deployed across 
              forest zones to detect fire, illegal logging, and wildlife activity in real-time, 
              <span className="text-primary font-semibold"> blockchain-verified anonymous reporting</span> 
              that protects whistleblower identities while creating immutable audit trails, and 
              <span className="text-primary font-semibold"> AI-powered analytics</span> that transform 
              complex environmental data into actionable insights for rangers and stakeholders.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              By providing a transparent, tamper-proof system for forest monitoring and reporting, 
              ForestGuard empowers Kenya's forest rangers, environmental organizations, and concerned 
              citizens to protect our forests with the confidence that their reports will be verified, 
              tracked, and acted upon—without fear of retaliation.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Meet the Founder */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-16 px-4 bg-muted/30"
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Meet the Founder</h2>
          
          <div className="relative">
            <Card className="border-primary/30 overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Founder Photo with Illustrated Elements */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative"
                  >
                    <div className="relative w-full aspect-square max-w-md mx-auto">
                      {/* Photo */}
                      <img
                        src={founderImage}
                        alt="Allan Mbuthia - Founder"
                        className="rounded-2xl object-cover w-full h-full shadow-2xl"
                      />
                      
                      {/* Pencil-drawn arrows */}
                      <svg className="absolute -top-8 left-12 w-24 h-24 text-primary/40" viewBox="0 0 100 100">
                        <path d="M10,50 Q30,20 60,10" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4,4" />
                        <path d="M55,8 L60,10 L58,15" fill="currentColor" />
                      </svg>
                      
                      <svg className="absolute -top-8 right-8 w-28 h-24 text-primary/40" viewBox="0 0 100 100">
                        <path d="M90,50 Q70,25 35,15" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4,4" />
                        <path d="M40,13 L35,15 L37,20" fill="currentColor" />
                      </svg>
                      
                      <svg className="absolute -bottom-8 left-8 w-24 h-28 text-primary/40" viewBox="0 0 100 100">
                        <path d="M10,10 Q30,40 60,65" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4,4" />
                        <path d="M55,67 L60,65 L58,60" fill="currentColor" />
                      </svg>
                      
                      <svg className="absolute -bottom-8 right-12 w-28 h-28 text-primary/40" viewBox="0 0 100 100">
                        <path d="M90,10 Q70,35 40,60" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4,4" />
                        <path d="M45,58 L40,60 L42,65" fill="currentColor" />
                      </svg>
                      
                      {/* Illustrated Elements */}
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="absolute -top-4 -left-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/30 rotate-[-5deg] shadow-lg"
                      >
                        <div className="flex items-center gap-2">
                          <Code className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">Developer</span>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="absolute -top-4 -right-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/30 rotate-[8deg] shadow-lg"
                      >
                        <div className="flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">Innovator</span>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="absolute -bottom-4 -left-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/30 rotate-[5deg] shadow-lg"
                      >
                        <div className="flex items-center gap-2">
                          <Map className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">GIS Engineer</span>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="absolute -bottom-4 -right-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/30 rotate-[-8deg] shadow-lg"
                      >
                        <div className="flex items-center gap-2">
                          <Leaf className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">Environmentalist</span>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Founder Bio */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-3xl font-bold mb-2 text-primary">Allan Mbuthia</h3>
                      <p className="text-xl text-muted-foreground mb-6">
                        System Architect & Creator
                      </p>
                      <p className="text-lg text-muted-foreground">
                        Geospatial Engineering Student, Environmental Advocate
                      </p>
                    </div>

                    <div className="space-y-4">
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p className="text-muted-foreground">
                          <span className="font-semibold text-foreground">Geospatial Engineering Student</span> at 
                          the Technical University of Kenya, specializing in satellite imagery analysis and 
                          environmental monitoring systems
                        </p>
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p className="text-muted-foreground">
                          <span className="font-semibold text-foreground">Vice-Chair, Environmental Students</span> at 
                          the Technical University of Kenya, leading campus sustainability initiatives and 
                          environmental awareness campaigns
                        </p>
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p className="text-muted-foreground">
                          <span className="font-semibold text-foreground">Full-Stack Developer & System Architect</span> with 
                          expertise in React, TypeScript, Supabase, and geospatial technologies
                        </p>
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.7 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p className="text-muted-foreground">
                          <span className="font-semibold text-foreground">UI/UX Designer</span> passionate about 
                          creating beautiful, accessible interfaces that make complex environmental data 
                          understandable for all stakeholders
                        </p>
                      </motion.div>
                    </div>

                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                      className="pt-4 border-t border-border"
                    >
                      <p className="text-muted-foreground italic">
                        "ForestGuard represents my commitment to protecting Kenya's forests through technology 
                        that empowers communities, protects whistleblowers, and creates transparent 
                        accountability in forest conservation."
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-16 px-4"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Join the Movement</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Whether you're a forest ranger, environmental organization, donor, or concerned citizen, 
            ForestGuard provides the tools you need to protect Kenya's forests and hold illegal 
            deforestation accountable.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.a 
              href="/auth"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Become a Ranger
              </button>
            </motion.a>
            <motion.a 
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                Contact Us
              </button>
            </motion.a>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
    </PageTransition>
  );
};

export default About;
