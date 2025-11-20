import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShieldCheck, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener('beforeinstallprompt', handleBeforeInstall as any);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall as any);
    };
  }, []);

  const navLinks = [
    { href: "/", label: "Home", isRoute: true },
    { href: "/how-it-works", label: "How It Works", isRoute: true },
    { href: "/technology", label: "Technology", isRoute: true },
    { href: "/about", label: "About", isRoute: true },
    { href: "#contact", label: "Contact", isRoute: false },
  ];

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    try {
      await deferredPrompt.userChoice;
    } finally {
      setDeferredPrompt(null);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link to="/" className="text-xl font-bold text-primary hover:text-lime-neon transition-colors">
            ForestGuard
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-foreground/80 hover:text-primary transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-foreground/80 hover:text-primary transition-colors font-medium"
                >
                  {link.label}
                </a>
              )
            ))}
            <Link to="/auth">
              <Button variant="outline" className="border-primary text-primary">
                Ranger Login
              </Button>
            </Link>
            <Link to={isAdmin ? "/admin" : "/admin-auth"}>
              <Button variant="outline" className="border-primary text-primary">
                <ShieldCheck className="mr-2 h-4 w-4" /> {isAdmin ? 'Admin' : 'Admin Login'}
              </Button>
            </Link>
            {deferredPrompt && (
              <Button variant="outline" onClick={handleInstall} className="border-primary text-primary">
                <Download className="mr-2 h-4 w-4" /> Install App
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                link.isRoute ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-foreground/80 hover:text-primary transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-foreground/80 hover:text-primary transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              ))}
              <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="border-primary text-primary w-full">
                  Ranger Login
                </Button>
              </Link>
              <Link to={isAdmin ? "/admin" : "/admin-auth"} onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="border-primary text-primary w-full">
                  <ShieldCheck className="mr-2 h-4 w-4" /> {isAdmin ? 'Admin' : 'Admin Login'}
                </Button>
              </Link>
              {deferredPrompt && (
                <Button variant="outline" onClick={() => { handleInstall(); setIsMobileMenuOpen(false); }} className="border-primary text-primary w-full">
                  <Download className="mr-2 h-4 w-4" /> Install App
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
