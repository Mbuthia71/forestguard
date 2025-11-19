import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, isAdmin, isRanger, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to appropriate auth page based on path
    const path = window.location.pathname;
    if (path.startsWith('/ranger')) {
      return <Navigate to="/auth" replace />;
    }
    return <Navigate to="/admin-auth" replace />;
  }

  // Admin routes require admin role
  if (requireAdmin && !isAdmin) {
    // Redirect based on actual role
    if (isRanger) {
      return <Navigate to="/ranger" replace />;
    }
    return <Navigate to="/" replace />;
  }

  // Ranger routes - allow if user is a ranger OR admin
  // Admins can access ranger views for testing/oversight
  const path = window.location.pathname;
  if (path.startsWith('/ranger') && !isRanger && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}