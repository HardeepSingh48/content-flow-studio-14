import { NavLink, useNavigate } from 'react-router-dom';
import { Home, PlusCircle, Settings, Clock, LogOut, Zap, BarChart3, ListTodo, Cog } from 'lucide-react';
import { motion } from 'framer-motion';
import { auth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/dashboard', icon: Home, label: 'Dashboard', end: true },
  { to: '/dashboard/create', icon: PlusCircle, label: 'Create Content' },
  { to: '/dashboard/history', icon: Clock, label: 'History' },
  { to: '/dashboard/queue', icon: ListTodo, label: 'Queue' },
  { to: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/dashboard/configuration', icon: Settings, label: 'Integrations' },
  { to: '/dashboard/settings', icon: Cog, label: 'Settings' },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const user = auth.getUser();

  const handleSignOut = () => {
    auth.logout();
    navigate('/signin');
  };

  return (
    <motion.aside
      initial={{ x: -240 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-screen w-60 glass-strong border-r border-border/50 flex flex-col z-50"
    >
      {/* Logo */}
      <div className="p-6 border-b border-border/50">
        <NavLink to="/dashboard" className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg gradient-text">CPS</span>
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
                'hover:bg-primary/10 hover:text-primary',
                isActive
                  ? 'bg-primary/15 text-primary border border-primary/20'
                  : 'text-muted-foreground'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">{user?.name || 'User'}</p>
            <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </motion.aside>
  );
};
