import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Join the <span className="text-primary">Movement</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Get in touch to learn more, contribute, or partner with ForestGuard.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-card border-border p-8 space-y-6 animate-fade-in-up">
            <h3 className="text-2xl font-bold text-foreground">Send us a message</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-foreground/80 block mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Your name"
                  className="bg-background border-border focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium text-foreground/80 block mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="bg-background border-border focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium text-foreground/80 block mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your interest in ForestGuard..."
                  rows={5}
                  className="bg-background border-border focus:border-primary"
                />
              </div>
              <Button className="w-full bg-primary text-primary-foreground hover-glow">
                Send Message
              </Button>
            </form>
          </Card>

          {/* About & Social */}
          <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <Card className="bg-card border-border p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">About ForestGuard</h3>
              <p className="text-foreground/70 leading-relaxed mb-6">
                ForestGuard is a real-time forest monitoring platform built by hackathon innovators passionate
                about protecting nature through technology. We combine satellite data, IoT sensors, and blockchain
                to detect and prevent deforestation as it happens.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-foreground/60">Built with:</span>
                  <span className="text-primary font-semibold">AI + Blockchain</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Status:</span>
                  <span className="text-primary font-semibold">Hackathon Ready</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">License:</span>
                  <span className="text-primary font-semibold">Open Source</span>
                </div>
              </div>
            </Card>

            <Card className="bg-card border-border p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">Connect with us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors hover-glow"
                >
                  <Github className="w-5 h-5 text-primary" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors hover-glow"
                >
                  <Linkedin className="w-5 h-5 text-primary" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors hover-glow"
                >
                  <Twitter className="w-5 h-5 text-primary" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors hover-glow"
                >
                  <Instagram className="w-5 h-5 text-primary" />
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
