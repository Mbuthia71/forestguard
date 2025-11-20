import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useRealtimeNotifications } from '@/hooks/useRealtimeNotifications';

export default function AdminLayout() {
  useRealtimeNotifications();
  
  return (
    <div className="min-h-screen bg-background flex w-full">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64 transition-all duration-300">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}