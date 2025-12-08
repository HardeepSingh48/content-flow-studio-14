import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Link2, Calendar, FileEdit, PlusCircle, Settings } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { IntegrationCard } from '@/components/dashboard/IntegrationCard';
import { Button } from '@/components/ui/button';
import { Integration, DashboardStats } from '@/types/integrations';

const mockStats: DashboardStats = {
  totalContent: 24,
  connectedPlatforms: 3,
  publishedThisMonth: 12,
  pendingDrafts: 5,
};

const defaultIntegrations: Integration[] = [
  { id: '1', provider: 'wordpress', name: 'WordPress', icon: '🌐', status: 'not_connected', category: 'social' },
  { id: '2', provider: 'twitter', name: 'Twitter / X', icon: '𝕏', status: 'not_connected', category: 'social' },
  { id: '3', provider: 'linkedin', name: 'LinkedIn', icon: '💼', status: 'not_connected', category: 'social' },
  { id: '4', provider: 'gemini', name: 'Gemini AI', icon: '✨', status: 'connected', category: 'ai' },
  { id: '5', provider: 'openai', name: 'OpenAI', icon: '🤖', status: 'connected', category: 'ai' },
  { id: '6', provider: 'elevenlabs', name: 'ElevenLabs', icon: '🎙️', status: 'not_connected', category: 'video' },
  { id: '7', provider: 'heygen', name: 'HeyGen', icon: '🎬', status: 'connected', category: 'video' },
];

const DashboardOverview = () => {
  const navigate = useNavigate();
  const [integrations] = useState<Integration[]>(defaultIntegrations);

  const connectedCount = integrations.filter((i) => i.status === 'connected').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's an overview of your content pipeline.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Content Created"
          value={mockStats.totalContent}
          icon={FileText}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Connected Platforms"
          value={connectedCount}
          icon={Link2}
        />
        <StatCard
          title="Published This Month"
          value={mockStats.publishedThisMonth}
          icon={Calendar}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Pending Drafts"
          value={mockStats.pendingDrafts}
          icon={FileEdit}
        />
      </div>

      {/* Connected Integrations */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Connected Integrations</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Manage your connected platforms and AI services
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard/configuration')}
          >
            <Settings className="h-4 w-4 mr-2" />
            Manage All
          </Button>
        </div>

        {connectedCount === 0 ? (
          <div className="glass rounded-xl p-12 text-center">
            <div className="text-4xl mb-4">🔌</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No integrations connected yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Connect your first integration to start creating content
            </p>
            <Button onClick={() => navigate('/dashboard/configuration')}>
              Connect Integration
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <IntegrationCard
                  integration={integration}
                  onConfigure={() => navigate('/dashboard/configuration')}
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Quick Actions */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            onClick={() => navigate('/dashboard/create')}
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Create New Content
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/dashboard/configuration')}
          >
            <Settings className="h-5 w-5 mr-2" />
            Configure Integrations
          </Button>
        </div>
      </motion.section>
    </div>
  );
};

export default DashboardOverview;
