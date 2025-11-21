import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShieldCheck, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import forestGuardLogo from "@/assets/forestguard-logo-new.png";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/95 backdrop-blur-md ${
        isScrolled ? "border-b border-border shadow-sm" : ""
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity">
            <img src={forestGuardLogo} alt="ForestGuard" className="h-8 sm:h-10 w-auto" />
            <span className="text-base sm:text-xl font-bold text-primary">ForestGuard</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm lg:text-base px-2"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm lg:text-base px-2"
                >
                  {link.label}
                </a>
              )
            ))}
            <Link to="/auth">
              <Button variant="outline" size="sm" className="border-primary text-primary text-xs lg:text-sm">
                Ranger
              </Button>
            </Link>
            <Link to={isAdmin ? "/admin" : "/admin-auth"}>
              <Button variant="outline" size="sm" className="border-primary text-primary text-xs lg:text-sm">
                <ShieldCheck className="mr-1 h-3 w-3 lg:h-4 lg:w-4" /> Admin
              </Button>
            </Link>
            {deferredPrompt && (
              <Button variant="outline" size="sm" onClick={handleInstall} className="border-primary text-primary text-xs lg:text-sm">
                <Download className="mr-1 h-3 w-3 lg:h-4 lg:w-4" /> Install
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
          <div className="md:hidden py-4 animate-fade-in border-t border-border mt-2">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                link.isRoute ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-foreground/80 hover:text-primary transition-colors font-medium py-2 px-2 touch-manipulation"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-foreground/80 hover:text-primary transition-colors font-medium py-2 px-2 touch-manipulation"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              ))}
              <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="border-primary text-primary w-full touch-manipulation h-11">
                  Ranger Login
                </Button>
              </Link>
              <Link to={isAdmin ? "/admin" : "/admin-auth"} onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="border-primary text-primary w-full touch-manipulation h-11">
                  <ShieldCheck className="mr-2 h-4 w-4" /> {isAdmin ? 'Admin' : 'Admin Login'}
                </Button>
              </Link>
              {deferredPrompt && (
                <Button variant="outline" onClick={() => { handleInstall(); setIsMobileMenuOpen(false); }} className="border-primary text-primary w-full touch-manipulation h-11">
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
