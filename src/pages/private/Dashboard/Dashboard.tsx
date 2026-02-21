import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-[#0A0E27] font-primary text-white">
      <Sidebar />
      <main className="flex-1 lg:ml-64 transition-all duration-300 min-h-screen">
        <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
