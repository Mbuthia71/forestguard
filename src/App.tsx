import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import ScrollToTop from "@/components/ScrollToTop";
import LoadingScreen from "@/components/LoadingScreen";
import { lazy, Suspense } from "react";

// Eager load critical pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AdminAuth from "./pages/AdminAuth";
import NotFound from "./pages/NotFound";

// Lazy load admin pages for better performance
const HowItWorksPage = lazy(() => import("./pages/HowItWorks"));
const TechnologyPage = lazy(() => import("./pages/Technology"));
const AboutPage = lazy(() => import("./pages/About"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const RangerDashboard = lazy(() => import("./pages/ranger/RangerDashboard"));
const StakeholderDashboard = lazy(() => import("./pages/stakeholder/StakeholderDashboard"));
const AdminMap = lazy(() => import("./pages/admin/Map"));
const AdminAlerts = lazy(() => import("./pages/admin/Alerts"));
const AdminReports = lazy(() => import("./pages/admin/Reports"));
const BlockchainTracking = lazy(() => import("./pages/admin/BlockchainTracking"));
const Messages = lazy(() => import("./pages/admin/Messages"));
const KenyaDashboard = lazy(() => import("./pages/admin/KenyaDashboard"));
const LiveSensorMap = lazy(() => import("./pages/admin/LiveSensorMap"));
const SatelliteMonitoring = lazy(() => import("./pages/admin/SatelliteMonitoring"));
const SatelliteIntelligence = lazy(() => import("./pages/admin/SatelliteIntelligence"));
const IncidentExplorer = lazy(() => import("./pages/admin/IncidentExplorer"));
const BlockchainLookup = lazy(() => import("./pages/admin/BlockchainLookup"));
const AdminApprovals = lazy(() => import("./pages/admin/AdminApprovals"));
const AdminDirectory = lazy(() => import("./pages/admin/AdminDirectory"));
const AdminRangers = lazy(() => import("./pages/admin/Rangers"));
const AdminFieldReports = lazy(() => import("./pages/admin/FieldReports"));
const AdminTasks = lazy(() => import("./pages/admin/Tasks"));
const AdminSettings = lazy(() => import("./pages/admin/Settings"));
const NewReport = lazy(() => import("./pages/ranger/NewReport"));
const Tasks = lazy(() => import("./pages/ranger/Tasks"));
const RangerMap = lazy(() => import("./pages/ranger/RangerMap"));
const RangerProfile = lazy(() => import("./pages/ranger/RangerProfile"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/technology" element={<TechnologyPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin-auth" element={<AdminAuth />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                <Route index element={<AdminDashboard />} />
                <Route path="approvals" element={<AdminApprovals />} />
                <Route path="rangers" element={<AdminRangers />} />
                <Route path="field-reports" element={<AdminFieldReports />} />
                <Route path="tasks" element={<AdminTasks />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="kenya-dashboard" element={<KenyaDashboard />} />
                <Route path="map" element={<AdminMap />} />
                <Route path="live-sensors" element={<LiveSensorMap />} />
                <Route path="satellite-monitoring" element={<SatelliteMonitoring />} />
                <Route path="satellite-intelligence" element={<SatelliteIntelligence />} />
                <Route path="incident-explorer" element={<IncidentExplorer />} />
                <Route path="blockchain-lookup" element={<BlockchainLookup />} />
                <Route path="alerts" element={<AdminAlerts />} />
                <Route path="reports" element={<AdminReports />} />
                <Route path="blockchain-tracking" element={<BlockchainTracking />} />
                <Route path="messages" element={<Messages />} />
                <Route path="directory" element={<AdminDirectory />} />
              </Route>

              {/* Ranger Routes */}
              <Route path="/ranger" element={<ProtectedRoute><RangerProfile /></ProtectedRoute>} />
              <Route path="/rangers" element={<ProtectedRoute><RangerDashboard /></ProtectedRoute>} />
              <Route path="/ranger/report/new" element={<ProtectedRoute><NewReport /></ProtectedRoute>} />
              <Route path="/ranger/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
              <Route path="/ranger/map" element={<ProtectedRoute><RangerMap /></ProtectedRoute>} />

              {/* Stakeholder Routes */}
              <Route path="/stakeholder" element={<ProtectedRoute><StakeholderDashboard /></ProtectedRoute>} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
