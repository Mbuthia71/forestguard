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
import AdminRangers from "./pages/admin/Rangers";
import AdminFieldReports from "./pages/admin/FieldReports";
import AdminTasks from "./pages/admin/Tasks";
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
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin-auth" element={<AdminAuth />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="approvals" element={<AdminApprovals />} />
              <Route path="rangers" element={<AdminRangers />} />
              <Route path="field-reports" element={<AdminFieldReports />} />
              <Route path="tasks" element={<AdminTasks />} />
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
            <Route path="/ranger" element={<ProtectedRoute><RangerDashboard /></ProtectedRoute>} />
            <Route path="/ranger/report/new" element={<ProtectedRoute><NewReport /></ProtectedRoute>} />
            <Route path="/ranger/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
            <Route path="/ranger/map" element={<ProtectedRoute><RangerMap /></ProtectedRoute>} />

            {/* Stakeholder Routes */}
            <Route path="/stakeholder" element={<ProtectedRoute><StakeholderDashboard /></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
