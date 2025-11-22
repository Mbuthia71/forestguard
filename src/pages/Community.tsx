import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, GraduationCap, AlertCircle, BookOpen, Camera, TrendingUp, MessageSquare, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Community = () => {
  const userCategories = [
    {
      title: "Environmental Students",
      icon: GraduationCap,
      description: "Research tools, data access, and learning resources for university students studying environmental science, forestry, and conservation.",
      features: [
        "Access to satellite imagery datasets for research",
        "Historical deforestation pattern data",
        "IoT sensor data for climate studies",
        "Monthly forest health reports (PDF)",
        "Community research forum",
        "Field trip coordination with rangers",
      ],
      cta: "Student Research Portal",
      color: "blue",
    },
    {
      title: "Citizen Scientists",
      icon: Users,
      description: "Join the forest monitoring community. Report threats, track forest health, and contribute to conservation efforts.",
      features: [
        "Anonymous blockchain reporting system",
        "Photo evidence upload with GPS tagging",
        "Real-time forest health leaderboard",
        "Community impact dashboard",
        "Recognition for verified reports",
        "Monthly conservation updates",
      ],
      cta: "Start Reporting",
      color: "green",
    },
    {
      title: "Environmental Enthusiasts",
      icon: BookOpen,
      description: "Stay informed about Kenya's forests. Learn about conservation efforts, track progress, and engage with the community.",
      features: [
        "Weekly forest health newsletters",
        "Interactive forest map explorer",
        "Conservation success stories",
        "Educational resources library",
        "Community discussion forums",
        "Volunteer opportunity alerts",
      ],
      cta: "Join Community",
      color: "purple",
    },
    {
      title: "Content Creators",
      icon: Camera,
      description: "Document conservation efforts, share forest stories, and raise awareness through your platform.",
      features: [
        "Access to verified conservation data",
        "High-resolution satellite imagery",
        "Ranger field report stories",
        "Interview opportunities with rangers",
        "Branded content partnership",
        "Attribution and co-promotion",
      ],
      cta: "Media Partnership",
      color: "orange",
    },
  ];

  const communityFeatures = [
    {
      title: "Report Environmental Threats",
      icon: AlertCircle,
      description: "See suspicious activity? Report it anonymously through our blockchain-verified system. Your identity is protected.",
      link: "/technology#blockchain",
    },
    {
      title: "Track Forest Health",
      icon: TrendingUp,
      description: "Follow real-time health scores for 10 Kenyan forests. See which forests are improving and which need attention.",
      link: "/#leaderboard",
    },
    {
      title: "Join Discussions",
      icon: MessageSquare,
      description: "Connect with other environmental enthusiasts, students, and conservationists in our community forums.",
      link: "#forums",
    },
    {
      title: "Earn Recognition",
      icon: Award,
      description: "Get recognized for verified reports and conservation contributions. Monthly 'Forest Hero' awards for top contributors.",
      link: "#recognition",
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="pt-24 pb-16">
          {/* Hero Section */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-primary">Community Hub</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Forest Conservation
                <span className="block text-primary mt-2">For Everyone</span>
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Whether you're a university student researching climate change, a concerned citizen spotting illegal logging, 
                or an environmental enthusiast tracking forest health—ForestGuard provides tools for everyday Kenyans to 
                participate in forest conservation.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                <Badge variant="outline" className="border-primary/50 text-base py-2 px-4">
                  <Users className="mr-2 h-4 w-4" /> 100% Free for Citizens
                </Badge>
                <Badge variant="outline" className="border-primary/50 text-base py-2 px-4">
                  <AlertCircle className="mr-2 h-4 w-4" /> Anonymous Reporting
                </Badge>
                <Badge variant="outline" className="border-primary/50 text-base py-2 px-4">
                  <BookOpen className="mr-2 h-4 w-4" /> Open Data Access
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
                  <Card className="h-full hover:shadow-2xl transition-all border-t-4 border-t-primary">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className={`bg-${category.color}-500/10 p-3 rounded-lg`}>
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
                    
                    <CardContent className="space-y-6">
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
                      
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        {category.cta}
                      </Button>
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
                      Our blockchain-verified anonymous reporting system protects your identity while ensuring your 
                      report reaches the right people. Every report is encrypted, timestamped, and immutable.
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
                      Your identity is protected by zero-knowledge proofs and blockchain encryption
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
                  See real-time health scores for Kenya's protected forests. Updated daily with satellite data.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="h-20 w-20 text-primary mx-auto mb-6 opacity-50" />
                  <p className="text-muted-foreground mb-6">
                    Live forest health leaderboard with scores updated from satellite NDVI analysis, 
                    ranger activity, and verified threat reports.
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

          {/* Educational Resources */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Learn About Forest Conservation</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Free educational resources for students, teachers, and anyone interested in environmental protection
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <BookOpen className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Research Papers</CardTitle>
                  <CardDescription>
                    Access published studies on deforestation patterns, satellite monitoring, and conservation tech
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <GraduationCap className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Student Guides</CardTitle>
                  <CardDescription>
                    Step-by-step tutorials on using satellite data, understanding NDVI, and analyzing forest health
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
