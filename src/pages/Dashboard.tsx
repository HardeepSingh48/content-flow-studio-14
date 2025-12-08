import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/dashboard/Sidebar';

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-60 min-h-screen p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
