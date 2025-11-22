import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, GraduationCap, AlertCircle, BookOpen, Camera, TrendingUp, MessageSquare, Award, Download, FileText, Code } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import kenyaLandscape from "@/assets/kenya-landscape.jpg";
import mtKenya from "@/assets/mt-kenya.jpeg";
import gediForest from "@/assets/gedi-forest.jpeg";
import savannaSunset from "@/assets/savanna-sunset.jpeg";
import masaiMaraSunrise from "@/assets/masai-mara-sunrise.jpg";

const Community = () => {
  const userCategories = [
    {
      title: "Students & Researchers",
      icon: GraduationCap,
      description: "Access research tools, forest data, and resources built for environmental science students and conservation researchers.",
      features: [
        "Download forest health datasets for your research",
        "Historical deforestation trend data",
        "IoT sensor readings for climate studies",
        "Monthly forest health reports (PDF exports)",
        "Student research collaboration portal",
        "Coordinate field visits with forest rangers",
      ],
      cta: "Open Research Portal",
      color: "blue",
      link: "#research-portal",
      bgImage: mtKenya,
    },
    {
      title: "Wananchi Wajuzi (Citizen Scientists)",
      icon: Users,
      description: "Join the forest monitoring community. Report threats, track forest health, na contribute to conservation efforts.",
      features: [
        "Anonymous blockchain-verified reporting",
        "Upload photos with automatic GPS tagging",
        "Real-time forest health leaderboard",
        "Community impact dashboard",
        "Recognition for verified reports",
        "Monthly conservation updates",
      ],
      cta: "Start Reporting Now",
      color: "green",
      link: "/technology#blockchain",
      bgImage: gediForest,
    },
    {
      title: "Environmental Enthusiasts",
      icon: BookOpen,
      description: "Stay updated on Kenya's forests. Learn about conservation efforts, track progress, na join the movement.",
      features: [
        "Weekly forest health email updates",
        "Interactive forest maps",
        "Conservation success stories",
        "Educational resource library",
        "Community discussion forums",
        "Volunteer opportunity alerts",
      ],
      cta: "Join the Community",
      color: "purple",
      link: "#join-community",
      bgImage: savannaSunset,
    },
    {
      title: "Content Creators & Media",
      icon: Camera,
      description: "Document conservation efforts, share forest stories, na amplify awareness through your platform.",
      features: [
        "Access verified conservation data",
        "High-resolution forest imagery",
        "Exclusive ranger field report stories",
        "Interview opportunities with forest rangers",
        "Branded content collaborations",
        "Recognition and co-promotion",
      ],
      cta: "Media Partnership",
      color: "orange",
      link: "#media-partnership",
      bgImage: masaiMaraSunrise,
    },
  ];

  const communityFeatures = [
    {
      title: "Report Environmental Threats",
      icon: AlertCircle,
      description: "Unaona something fishy? Report anonymously through our blockchain system. Your identity is protected kabisa.",
      link: "/technology#blockchain",
    },
    {
      title: "Track Forest Health",
      icon: TrendingUp,
      description: "Follow health scores for 10 Kenyan forests in real-time. See which forests are thriving na which ones need help.",
      link: "/#leaderboard",
    },
    {
      title: "Join the Conversation",
      icon: MessageSquare,
      description: "Connect with fellow environmental enthusiasts, students, na conservation experts on our forums.",
      link: "#join-community",
    },
    {
      title: "Get Recognition",
      icon: Award,
      description: "Earn recognition for verified reports and conservation contributions. Monthly 'Forest Hero' awards.",
      link: "#recognition",
    },
  ];

  const researchResources = [
    {
      title: "Forest Health Datasets",
      icon: Download,
      description: "Download historical forest health data, deforestation patterns, and vegetation trends for your research projects.",
      downloadLink: "#download-forest-data",
    },
    {
      title: "IoT Sensor Readings",
      icon: FileText,
      description: "Access real-time and historical sensor data: temperature, humidity, acoustic signatures, motion detection logs.",
      downloadLink: "#download-iot",
    },
    {
      title: "API Documentation",
      icon: Code,
      description: "RESTful API access for developers. Build applications using ForestGuard data with complete documentation.",
      downloadLink: "#api-docs",
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="pt-24 pb-16">
          {/* Hero Section with Kenyan Background */}
          <section 
            className="relative container mx-auto px-4 sm:px-6 lg:px-8 mb-16 py-20 rounded-2xl overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${kenyaLandscape})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto relative z-10"
            >
              <div className="inline-flex items-center gap-2 bg-background/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                <Users className="h-5 w-5 text-white" />
                <span className="text-sm font-semibold text-white">Forest Guardian Community</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
                Forest Conservation
                <span className="block text-white/90 mt-2">For Everyone</span>
              </h1>
              
              <p className="text-lg text-white/90 leading-relaxed mb-8">
                Whether you're a university student researching climate change, a concerned citizen spotting illegal logging, 
                or an environmental enthusiast tracking forest health—ForestGuard provides tools for everyday Kenyans to participate 
                in forest conservation. Tuko pamoja in protecting our forests.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                <Badge variant="outline" className="border-white/50 text-white text-base py-2 px-4 bg-background/10 backdrop-blur-sm">
                  <Users className="mr-2 h-4 w-4" /> Free for All Citizens
                </Badge>
                <Badge variant="outline" className="border-white/50 text-white text-base py-2 px-4 bg-background/10 backdrop-blur-sm">
                  <AlertCircle className="mr-2 h-4 w-4" /> Anonymous Reporting
                </Badge>
                <Badge variant="outline" className="border-white/50 text-white text-base py-2 px-4 bg-background/10 backdrop-blur-sm">
                  <BookOpen className="mr-2 h-4 w-4" /> Open Data
                </Badge>
              </div>
            </motion.div>
          </section>

          {/* Quick Actions */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {communityFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all cursor-pointer group">
                    <CardHeader className="text-center">
                      <div className="bg-primary/10 p-4 rounded-lg w-fit mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                        <feature.icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <a href={feature.link}>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                          Learn More →
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* User Categories */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Who Can Use ForestGuard?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tools and resources tailored for different community members
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {userCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card 
                    className="h-full hover:shadow-2xl transition-all border-t-4 border-t-primary overflow-hidden group"
                  >
                    <div 
                      className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
                      style={{
                        backgroundImage: `url(${category.bgImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <CardHeader className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="bg-primary/10 p-3 rounded-lg backdrop-blur-sm">
                          <category.icon className="h-8 w-8 text-primary" />
                        </div>
                        <Badge className="bg-primary/10 text-primary border-primary/20">
                          Free Access
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl">{category.title}</CardTitle>
                      <CardDescription className="text-base mt-2">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-6 relative z-10">
                      <div>
                        <h4 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
                          What You Get:
                        </h4>
                        <ul className="space-y-2">
                          {category.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                                <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                              </div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <a href={category.link}>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                          {category.cta}
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Student Research Portal */}
          <section id="research-portal" className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Student Research Portal</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Download forest health datasets, sensor readings, na historical data for your research projects
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {researchResources.map((resource, index) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <div className="bg-primary/10 p-4 rounded-lg w-fit mx-auto mb-3">
                        <resource.icon className="h-10 w-10 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{resource.title}</CardTitle>
                      <CardDescription className="text-sm mt-2">
                        {resource.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <a href={resource.downloadLink}>
                        <Button className="w-full" variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download Dataset
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Anonymous Reporting CTA */}
          <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <Card className="border-primary/20">
                  <CardContent className="pt-12 pb-12 text-center">
                    <AlertCircle className="h-16 w-16 text-primary mx-auto mb-6" />
                    <h2 className="text-3xl font-bold mb-4">See Something? Say Something.</h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                      Our blockchain-verified anonymous reporting system protects your identity while ensuring your report reaches 
                      the right people. Every report is encrypted, timestamped, na cannot be tampered with.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link to="/technology#blockchain">
                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                          <AlertCircle className="mr-2 h-5 w-5" />
                          Submit Anonymous Report
                        </Button>
                      </Link>
                      <Link to="/technology">
                        <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                          How It Works
                        </Button>
                      </Link>
                    </div>
                    <p className="text-xs text-muted-foreground mt-6">
                      Your identity protected by zero-knowledge proofs and blockchain encryption
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Forest Health Leaderboard Preview */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <Card className="border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl mb-3">Track Forest Health Live</CardTitle>
                <CardDescription className="text-base">
                  See real-time health scores for Kenya's protected forests. Updated daily from ground sensors na ranger reports.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="h-20 w-20 text-primary mx-auto mb-6 opacity-50" />
                  <p className="text-muted-foreground mb-6">
                    Live forest health leaderboard with scores calculated from ranger activity, verified threat reports, na ground sensor data.
                  </p>
                  <Link to="/#leaderboard">
                    <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                      View Full Leaderboard
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Community Engagement Sections */}
          <section id="join-community" className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <Card className="border-primary/20 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div 
                  className="h-64 md:h-auto"
                  style={{
                    backgroundImage: `url(${gediForest})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold mb-4">Join Our Community</h3>
                  <p className="text-muted-foreground mb-6">
                    Connect with fellow environmental enthusiasts, students, and conservation experts. 
                    Share experiences, learn from others, na contribute to Kenya's forest conservation efforts. Tuko pamoja!
                  </p>
                  <Button size="lg" className="w-full md:w-auto">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Join the Conversation
                  </Button>
                </CardContent>
              </div>
            </Card>
          </section>

          <section id="media-partnership" className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <Card className="border-primary/20 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <CardContent className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
                  <h3 className="text-3xl font-bold mb-4">Media Partnership</h3>
                  <p className="text-muted-foreground mb-6">
                    Content creators and journalists—access verified conservation data, forest imagery, 
                    na exclusive ranger field stories. Let's partner to amplify forest conservation messaging.
                  </p>
                  <Button size="lg" variant="outline" className="w-full md:w-auto border-primary text-primary">
                    <Camera className="mr-2 h-5 w-5" />
                    Start Partnership
                  </Button>
                </CardContent>
                <div 
                  className="h-64 md:h-auto order-1 md:order-2"
                  style={{
                    backgroundImage: `url(${masaiMaraSunrise})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </div>
            </Card>
          </section>

          {/* Educational Resources */}
          <section id="recognition" className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Learn About Forest Conservation</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Free educational resources for students, teachers, na anyone passionate about environmental protection
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <BookOpen className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Research Papers</CardTitle>
                  <CardDescription>
                    Access published studies on deforestation patterns, monitoring technology, and conservation strategies
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <GraduationCap className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Student Guide</CardTitle>
                  <CardDescription>
                    Step-by-step tutorials on using forest data, understanding health metrics, and analyzing vegetation trends
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Camera className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Field Reports</CardTitle>
                  <CardDescription>
                    Real ranger reports from the field, documenting conservation efforts and threat responses
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Community;
