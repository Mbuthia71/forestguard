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
      title: "Wanafunzi wa Mazingira (Environmental Students)",
      icon: GraduationCap,
      description: "Zana za utafiti, data ya misitu, na rasilimali za kujifunza kwa wanafunzi wa sayansi ya mazingira, misitu, na uhifadhi.",
      features: [
        "Picha za satellite kwa ajili ya utafiti wako",
        "Data ya historia ya ukataji misitu",
        "Takwimu za sensors za IoT kwa masomo ya hali ya hewa",
        "Ripoti za kila mwezi za afya ya misitu (PDF)",
        "Jukwaa la wanafunzi wa utafiti",
        "Uratibu wa ziara za shambani na walinzi wa misitu",
      ],
      cta: "Fungua Research Portal",
      color: "blue",
      link: "#research-portal",
      bgImage: mtKenya,
    },
    {
      title: "Wananchi Wajuzi (Citizen Scientists)",
      icon: Users,
      description: "Jiunge na jamii ya ufuatiliaji misitu. Ripoti vitisho, fuatilia afya ya misitu, na changia juhudi za uhifadhi.",
      features: [
        "Mfumo wa ripoti za siri kwa blockchain",
        "Pakia picha zenye GPS coordinates",
        "Leaderboard ya afya ya misitu kwa wakati halisi",
        "Dashboard ya athari ya jamii",
        "Utambuzi kwa ripoti zilizohakikiwa",
        "Taarifa za uhifadhi kila mwezi",
      ],
      cta: "Anza Kuripoti Sasa",
      color: "green",
      link: "/technology#blockchain",
      bgImage: gediForest,
    },
    {
      title: "Wapenda Mazingira (Environmental Enthusiasts)",
      icon: BookOpen,
      description: "Baki umejua kuhusu misitu ya Kenya. Jifunze kuhusu juhudi za uhifadhi, fuatilia maendeleo, na jiunge na jamii.",
      features: [
        "Barua pepe za kila wiki za afya ya misitu",
        "Ramani ya misitu ya kuingiliana",
        "Hadithi za mafanikio ya uhifadhi",
        "Maktaba ya rasilimali za elimu",
        "Majukwaa ya majadiliano ya jamii",
        "Arifa za fursa za kujitolea",
      ],
      cta: "Jiunge na Jamii",
      color: "purple",
      link: "#join-community",
      bgImage: savannaSunset,
    },
    {
      title: "Wabunifu wa Maudhui (Content Creators)",
      icon: Camera,
      description: "Rekodi juhudi za uhifadhi, shiriki hadithi za misitu, na ongeza uelewa kupitia jukwaa lako.",
      features: [
        "Fikia data za uhifadhi zilizohakikiwa",
        "Picha za satellite za ubora wa juu",
        "Hadithi za ripoti za walinzi shambani",
        "Fursa za mahojiano na walinzi wa misitu",
        "Ushirikiano wa maudhui yenye nembo",
        "Utambuzi na kueneza pamoja",
      ],
      cta: "Ushirikiano wa Vyombo vya Habari",
      color: "orange",
      link: "#media-partnership",
      bgImage: masaiMaraSunrise,
    },
  ];

  const communityFeatures = [
    {
      title: "Ripoti Vitisho vya Mazingira",
      icon: AlertCircle,
      description: "Unaona jambo geni? Ripoti kwa siri kupitia mfumo wetu wa blockchain. Utambulisho wako unalindwa.",
      link: "/technology#blockchain",
    },
    {
      title: "Fuatilia Afya ya Misitu",
      icon: TrendingUp,
      description: "Fuata alama za afya za misitu 10 za Kenya kwa wakati halisi. Tazama misitu inayoboresha na ile inayohitaji msaada.",
      link: "/#leaderboard",
    },
    {
      title: "Jiunge na Majadiliano",
      icon: MessageSquare,
      description: "Unganisha na wapenda mazingira wengine, wanafunzi, na wanataaluma wa uhifadhi kwenye majukwaa yetu.",
      link: "#join-community",
    },
    {
      title: "Pata Utambuzi",
      icon: Award,
      description: "Pata utambuzi kwa ripoti zilizohakikiwa na mchango wa uhifadhi. Tuzo za 'Shujaa wa Msitu' kila mwezi.",
      link: "#recognition",
    },
  ];

  const researchResources = [
    {
      title: "Satellite Data Archive",
      icon: Download,
      description: "Download Sentinel-2 imagery, NDVI datasets, and historical vegetation health data for your research projects.",
      downloadLink: "#download-satellite",
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
                <span className="text-sm font-semibold text-white">Jumuiya ya Walinzi wa Misitu</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
                Uhifadhi wa Misitu
                <span className="block text-white/90 mt-2">Kwa Kila Mtu</span>
              </h1>
              
              <p className="text-lg text-white/90 leading-relaxed mb-8">
                Wewe ni mwanafunzi wa chuo kikuu unayefanya utafiti wa mabadiliko ya hali ya hewa, mwananchi mwenye wasiwasi 
                anayeona ukataji haramu wa misitu, au mpenda mazingira anayefuatilia afya ya misitu—ForestGuard inatoa zana 
                kwa Wakenya wa kawaida kushiriki katika uhifadhi wa misitu.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                <Badge variant="outline" className="border-white/50 text-white text-base py-2 px-4 bg-background/10 backdrop-blur-sm">
                  <Users className="mr-2 h-4 w-4" /> Bure Kabisa kwa Wananchi
                </Badge>
                <Badge variant="outline" className="border-white/50 text-white text-base py-2 px-4 bg-background/10 backdrop-blur-sm">
                  <AlertCircle className="mr-2 h-4 w-4" /> Ripoti za Siri
                </Badge>
                <Badge variant="outline" className="border-white/50 text-white text-base py-2 px-4 bg-background/10 backdrop-blur-sm">
                  <BookOpen className="mr-2 h-4 w-4" /> Data Wazi
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
                          Bure Kabisa
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
                          Unachopata:
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
              <h2 className="text-3xl font-bold mb-4">Hifadhi ya Data kwa Wanafunzi (Student Research Portal)</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Pakua datasets za satellite, takwimu za sensors, na data ya historia kwa miradi yako ya utafiti
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
                    <h2 className="text-3xl font-bold mb-4">Unaona Kitu? Sema Kitu.</h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                      Mfumo wetu wa ripoti za siri uliothibitishwa na blockchain unalinda utambulisho wako wakati 
                      ripoti yako inafika kwa watu sahihi. Kila ripoti imefungwa, imewekwa muda, na haiwezi kubadilishwa.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link to="/technology#blockchain">
                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                          <AlertCircle className="mr-2 h-5 w-5" />
                          Tuma Ripoti ya Siri
                        </Button>
                      </Link>
                      <Link to="/technology">
                        <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                          Jinsi Inavyofanya Kazi
                        </Button>
                      </Link>
                    </div>
                    <p className="text-xs text-muted-foreground mt-6">
                      Utambulisho wako unalindwa na zero-knowledge proofs na usimbaji wa blockchain
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
                  <h3 className="text-3xl font-bold mb-4">Jiunge na Jamii Yetu</h3>
                  <p className="text-muted-foreground mb-6">
                    Unganisha na wapenda mazingira wengine, wanafunzi, na wanataaluma wa uhifadhi. 
                    Shiriki uzoefu, jifunze kutoka kwa wengine, na changia katika juhudi za uhifadhi wa misitu ya Kenya.
                  </p>
                  <Button size="lg" className="w-full md:w-auto">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Jiunge na Mazungumzo
                  </Button>
                </CardContent>
              </div>
            </Card>
          </section>

          <section id="media-partnership" className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <Card className="border-primary/20 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <CardContent className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
                  <h3 className="text-3xl font-bold mb-4">Ushirikiano wa Vyombo vya Habari</h3>
                  <p className="text-muted-foreground mb-6">
                    Wabunifu wa maudhui na waandishi wa habari—fikia data zilizohakikiwa za uhifadhi, picha za satellite, 
                    na hadithi za walinzi shambani. Tuungane kueneza ujumbe wa uhifadhi wa misitu.
                  </p>
                  <Button size="lg" variant="outline" className="w-full md:w-auto border-primary text-primary">
                    <Camera className="mr-2 h-5 w-5" />
                    Anza Ushirikiano
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
              <h2 className="text-3xl font-bold mb-4">Jifunze Kuhusu Uhifadhi wa Misitu</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Rasilimali za elimu bila malipo kwa wanafunzi, walimu, na yeyote anayependezwa na ulinzi wa mazingira
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <BookOpen className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Maandiko ya Utafiti</CardTitle>
                  <CardDescription>
                    Fikia masomo yaliyochapishwa kuhusu mifumo ya ukataji misitu, ufuatiliaji wa satellite, na teknolojia ya uhifadhi
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <GraduationCap className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Mwongozo wa Wanafunzi</CardTitle>
                  <CardDescription>
                    Mafunzo ya hatua kwa hatua kuhusu kutumia data za satellite, kuelewa NDVI, na kuchambua afya ya misitu
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Camera className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Ripoti za Shambani</CardTitle>
                  <CardDescription>
                    Ripoti halisi za walinzi kutoka shambani, zikirekodi juhudi za uhifadhi na majibu ya vitisho
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
