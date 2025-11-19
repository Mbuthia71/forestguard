import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AdminAuth from "./pages/AdminAuth";
import NotFound from "./pages/NotFound";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import RangerDashboard from "./pages/ranger/RangerDashboard";
import StakeholderDashboard from "./pages/stakeholder/StakeholderDashboard";
import AdminMap from "./pages/admin/Map";
import AdminAlerts from "./pages/admin/Alerts";
import AdminReports from "./pages/admin/Reports";
import BlockchainTracking from "./pages/admin/BlockchainTracking";
import AdminMessages from "./pages/admin/Messages";
import KenyaDashboard from "./pages/admin/KenyaDashboard";
import LiveSensorMap from "./pages/admin/LiveSensorMap";
import SatelliteMonitoring from "./pages/admin/SatelliteMonitoring";
import SatelliteIntelligence from "./pages/admin/SatelliteIntelligence";
import IncidentExplorer from "./pages/admin/IncidentExplorer";
import BlockchainLookup from "./pages/admin/BlockchainLookup";
import AdminForum from "./pages/admin/Forum";
import AdminApprovals from "./pages/admin/AdminApprovals";
import NewReport from "./pages/ranger/NewReport";
import Tasks from "./pages/ranger/Tasks";
import RangerMap from "./pages/ranger/RangerMap";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin-auth" element={<AdminAuth />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="approvals" element={<AdminApprovals />} />
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
              <Route path="messages" element={<AdminMessages />} />
              <Route path="forum" element={<AdminForum />} />
            </Route>

            {/* Ranger Routes */}
            <Route path="/ranger" element={<RangerDashboard />} />
            <Route path="/ranger/report/new" element={<NewReport />} />
            <Route path="/ranger/tasks" element={<Tasks />} />
            <Route path="/ranger/map" element={<RangerMap />} />

            {/* Stakeholder Routes */}
            <Route path="/stakeholder" element={<StakeholderDashboard />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
