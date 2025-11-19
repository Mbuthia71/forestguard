import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, Camera, List, MapPin, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Dashboard', href: '/ranger', icon: Home },
  { name: 'New Report', href: '/ranger/report/new', icon: Camera },
  { name: 'Tasks', href: '/ranger/tasks', icon: List },
  { name: 'Map', href: '/ranger/map', icon: MapPin },
];

export default function RangerNavigation() {
  const location = useLocation();
  const { signOut } = useAuth();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 lg:top-0 lg:bottom-auto">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all",
                  isActive
                    ? "bg-primary/20 text-primary"
                    : "text-foreground/70 hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}
          <Button
            onClick={signOut}
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 px-3 py-2"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-xs font-medium">Logout</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
