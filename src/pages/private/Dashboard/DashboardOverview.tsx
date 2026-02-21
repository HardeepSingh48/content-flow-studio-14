import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Bell, Calendar, Linkedin, Twitter, FileEdit, CheckCircle } from 'lucide-react';
import { StatCard } from '@/components/features/dashboard/StatCard';
import { ActivityFeed } from '@/components/features/dashboard/ActivityFeed';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/card';

const recentActivity = [
  { id: '1', text: 'Published to LinkedIn: "10 Tips for Content Strategy"', timestamp: '2 hours ago', type: 'publish_linkedin' as const },
  { id: '2', text: 'Scheduled Twitter post for tomorrow at 10:00 AM', timestamp: '5 hours ago', type: 'scheduled' as const },
  { id: '3', text: 'Saved draft: "2024 Market Trends Analysis"', timestamp: 'Yesterday', type: 'draft_saved' as const },
  { id: '4', text: 'Published to Twitter: "Why focus on distribution?"', timestamp: 'Yesterday', type: 'publish_twitter' as const },
];

const DashboardOverview = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back! Here's an overview of your content pipeline and engagement."
        actions={
          <Button
            onClick={() => navigate('/dashboard/create')}
            icon={<Plus size={18} />}
            className="rounded-xl shadow-lg shadow-primary-500/20"
          >
            New Content
          </Button>
        }
        className="py-0 mb-0 border-none"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Posts"
          value="142"
          change="+12% from last month"
          trend="up"
        />
        <StatCard
          label="Connected Platforms"
          value="6"
          change="2 pending approval"
          trend="neutral"
        />
        <StatCard
          label="Total Engagement"
          value="24.5K"
          change="+8% from last month"
          trend="up"
        />
        <StatCard
          label="Scheduled Content"
          value="18"
          change="Next post in 2 hours"
          trend="neutral"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 shadow-sm Elevate-effect">
          <CardHeader className="border-b border-white/10 flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Calendar className="size-5 text-primary" />
              Recent Activity
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-white/50 hover:text-white">View All</Button>
          </CardHeader>
          <CardBody className="p-0 px-6 py-2">
            <ActivityFeed items={recentActivity} />
          </CardBody>
        </Card>

        {/* System Notifications / Quick Actions */}
        <div className="space-y-6">
          <Card className="shadow-sm bg-primary/10 border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2 text-primary-100">
                <Bell className="size-4 text-primary" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardBody className="pt-0">
              <div className="p-3 bg-white/5 border border-primary/20 rounded-lg shadow-sm backdrop-blur-sm">
                <p className="text-sm font-medium text-white">LinkedIn Token Expiring</p>
                <p className="text-xs text-white/60 mt-1">Your LinkedIn connection needs re-authentication in 3 days.</p>
                <Button variant="secondary" size="sm" className="w-full mt-3 h-8 text-xs border-white/10 text-white/80 hover:text-white">Reconnect</Button>
              </div>
            </CardBody>
          </Card>

          <Card className="shadow-sm Elevate-effect">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">Quick Links</CardTitle>
            </CardHeader>
            <CardBody className="pt-0 space-y-2">
              <Button variant="ghost" fullWidth className="justify-start text-sm hover:bg-white/5 text-white/70 hover:text-white" onClick={() => navigate('/dashboard/analytics')}>
                View Performance Reports
              </Button>
              <Button variant="ghost" fullWidth className="justify-start text-sm hover:bg-white/5 text-white/70 hover:text-white" onClick={() => navigate('/dashboard/configuration')}>
                Manage Integrations
              </Button>
              <Button variant="ghost" fullWidth className="justify-start text-sm hover:bg-white/5 text-white/70 hover:text-white" onClick={() => navigate('/dashboard/history')}>
                Audit Content Logs
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
