import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, ShieldCheck, Download, Home, Wrench, Cpu, Info, Heart, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import forestGuardLogo from "@/assets/forestguard-logo-new.png";

interface MobileDrawerProps {
  deferredPrompt: any;
  onInstall: () => void;
}

const MobileDrawer = ({ deferredPrompt, onInstall }: MobileDrawerProps) => {
  const { isAdmin } = useAuth();

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/how-it-works", label: "How It Works", icon: Wrench },
    { href: "/technology", label: "Technology", icon: Cpu },
    { href: "/about", label: "About", icon: Info },
    { href: "/donate", label: "Support Us", icon: Heart },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden touch-manipulation"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="left" className="w-[300px] sm:w-[350px] bg-background border-r border-border">
        <SheetHeader className="border-b border-border pb-4 mb-6">
          <SheetTitle className="flex items-center gap-2">
            <img src={forestGuardLogo} alt="ForestGuard" className="h-10 w-10" />
            <span className="text-xl font-bold text-primary">ForestGuard</span>
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col space-y-2">
          {/* Navigation Links */}
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href}>
              <Button
                variant="ghost"
                className="w-full justify-start h-12 text-base touch-manipulation hover:bg-primary/10"
              >
                <link.icon className="mr-3 h-5 w-5" />
                {link.label}
              </Button>
            </Link>
          ))}

          <div className="h-px bg-border my-4"></div>

          {/* Auth Buttons */}
          <Link to="/auth">
            <Button
              variant="outline"
              className="w-full h-12 border-primary text-primary touch-manipulation"
            >
              <LogIn className="mr-2 h-5 w-5" />
              Ranger Login
            </Button>
          </Link>

          <Link to={isAdmin ? "/admin" : "/admin-auth"}>
            <Button
              variant="outline"
              className="w-full h-12 border-primary text-primary touch-manipulation"
            >
              <ShieldCheck className="mr-2 h-5 w-5" />
              {isAdmin ? 'Admin Dashboard' : 'Admin Login'}
            </Button>
          </Link>

          {/* Install App Button */}
          {deferredPrompt && (
            <>
              <div className="h-px bg-border my-4"></div>
              <Button
                onClick={onInstall}
                className="w-full h-12 bg-primary text-primary-foreground touch-manipulation"
              >
                <Download className="mr-2 h-5 w-5" />
                Install App
              </Button>
            </>
          )}

          {/* Support Section */}
          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-sm text-muted-foreground mb-3">
              Help us protect Kenya's forests
            </p>
            <Link to="/donate">
              <Button className="w-full bg-primary text-primary-foreground touch-manipulation">
                <Heart className="mr-2 h-4 w-4" />
                Donate Now
              </Button>
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileDrawer;
