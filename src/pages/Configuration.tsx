import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Share2, Video } from 'lucide-react';
import { toast } from 'sonner';
import { TabNavigation } from '@/components/dashboard/TabNavigation';
import { ConfigCard } from '@/components/dashboard/ConfigCard';
import { IntegrationProvider } from '@/types/integrations';
import { useIntegrations } from '@/hooks/useIntegrations';
import { api } from '@/services/api';
import { IntegrationRequestModal } from '@/components/dashboard/IntegrationRequestModal';
import { useAuth } from '@/hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';

const tabs = [
  { id: 'ai', label: 'AI Models', icon: <Bot className="h-4 w-4" /> },
  { id: 'social', label: 'Social Media', icon: <Share2 className="h-4 w-4" /> },
  { id: 'video', label: 'Video Platforms', icon: <Video className="h-4 w-4" /> },
];

const Configuration = () => {
  const [activeTab, setActiveTab] = useState('ai');
  const { integrations, isLoading, createIntegration, deleteIntegration } = useIntegrations();
  const { user } = useAuth();
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const queryClient = useQueryClient();

  // Helper function to check if an integration exists
  const isConnected = (provider: string) => {
    return integrations.some((i: any) => i.provider === provider.toUpperCase());
  };

  // Helper function to get integration ID
  const getIntegrationId = (provider: string) => {
    const integration = integrations.find((i: any) => i.provider === provider.toUpperCase());
    return integration?.id;
  };

  const handleSave = async (provider: IntegrationProvider, values: Record<string, string>) => {
    try {
      // Map frontend provider names to backend enum values
      const providerMap: Record<string, string> = {
        'gemini': 'GEMINI',
        'openai': 'OPENAI',
        'twitter': 'TWITTER',
        'linkedin': 'LINKEDIN',
        'wordpress': 'WORDPRESS',
        'heygen': 'HEYGEN',
        'elevenlabs': 'ELEVENLABS',
      };

      const backendProvider = providerMap[provider.toLowerCase()] || provider.toUpperCase();

      // Check if already connected - if so, user needs to delete and re-add
      if (isConnected(provider)) {
        toast.error(`${provider} is already connected. Delete the existing integration first to update credentials.`);
        return;
      }

      // Prepare credentials based on provider
      const credentials: Record<string, any> = {};
      const metadata: Record<string, any> = {};

      // Separate credentials from metadata
      for (const [key, value] of Object.entries(values)) {
        if (key === 'model' || key === 'voiceId') {
          metadata[key] = value;
        } else {
          credentials[key] = value;
        }
      }

      await createIntegration({
        provider: backendProvider,
        credentials,
        metadata: Object.keys(metadata).length > 0 ? metadata : undefined,
      });
    } catch (error: any) {
      console.error('Error saving integration:', error);
      // Error toast is handled by the mutation
    }
  };

  const handleTest = async (provider: IntegrationProvider): Promise<boolean> => {
    try {
      const integrationId = getIntegrationId(provider);

      if (!integrationId) {
        toast.error('Please save the integration first before testing');
        return false;
      }

      // Pass integration ID to test saved credentials
      const result = await api.testIntegration(provider.toUpperCase(), { integrationId });

      if (result.success) {
        toast.success(`${provider} connection test successful!`);
        return true;
      } else {
        toast.error(`${provider} connection test failed: ${result.message || 'Unknown error'}`);
        return false;
      }
    } catch (error: any) {
      console.error('Test error:', error);
      toast.error(`${provider} connection test failed. Please check your credentials.`);
      return false;
    }
  };

  const handleOAuthConnect = (provider: IntegrationProvider) => {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
    const token = localStorage.getItem('token');
    const oauthUrl = `${baseUrl}/oauth/${provider.toLowerCase()}/connect?token=${token}`;

    // Open OAuth popup
    const popup = window.open(
      oauthUrl,
      `${provider} OAuth`,
      'width=600,height=700,scrollbars=yes'
    );

    if (!popup) {
      toast.error('Please allow popups for OAuth authentication');
    }
  };

  // Listen for OAuth callback messages
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'oauth_success') {
        toast.success(`${event.data.provider} connected successfully!`);
        // Refresh integrations
        queryClient.invalidateQueries({ queryKey: ['integrations'] });
      } else if (event.data.type === 'oauth_error') {
        toast.error(`Failed to connect ${event.data.provider}: ${event.data.error || 'Unknown error'}`);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [queryClient]);

  const handleDisconnect = async (provider: IntegrationProvider) => {
    const integrationId = getIntegrationId(provider);
    if (integrationId) {
      await deleteIntegration(integrationId);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configuration</h1>
          <p className="text-muted-foreground mt-1">Loading integrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground">Configuration</h1>
        <p className="text-muted-foreground mt-1">
          Connect and configure your integrations
        </p>
      </motion.div>

      {/* Tabs */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* AI Models Tab */}
      {activeTab === 'ai' && (
        <motion.div
          key="ai"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <ConfigCard
            title="Gemini AI"
            icon="✨"
            isConnected={isConnected('gemini')}
            fields={[
              {
                name: 'apiKey',
                label: 'API Key',
                type: 'password',
                placeholder: 'Enter your Gemini API key',
                required: true,
              },
            ]}
            onSave={(values) => handleSave('gemini', values)}
            onDisconnect={() => handleDisconnect('gemini')}
          />

          <ConfigCard
            title="OpenAI"
            icon="🤖"
            isConnected={isConnected('openai')}
            fields={[
              {
                name: 'apiKey',
                label: 'API Key',
                type: 'password',
                placeholder: 'Enter your OpenAI API key',
                required: true,
              },
              {
                name: 'model',
                label: 'Model',
                type: 'select',
                options: [
                  { value: 'gpt-4', label: 'GPT-4' },
                  { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
                  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
                ],
              },
            ]}
            onSave={(values) => handleSave('openai', values)}
            onDisconnect={() => handleDisconnect('openai')}
          />
        </motion.div>
      )}

      {/* Social Media Tab */}
      {activeTab === 'social' && (
        <motion.div
          key="social"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <ConfigCard
            title="Twitter / X"
            icon="𝕏"
            isConnected={isConnected('twitter')}
            showOAuth={true}
            onOAuthConnect={() => handleOAuthConnect('twitter')}
            fields={[
              {
                name: 'consumerKey',
                label: 'API Key (Consumer Key)',
                type: 'password',
                placeholder: 'Enter API Key',
                required: true,
              },
              {
                name: 'consumerSecret',
                label: 'API Secret (Consumer Secret)',
                type: 'password',
                placeholder: 'Enter API Secret',
                required: true,
              },
              {
                name: 'accessToken',
                label: 'Access Token',
                type: 'password',
                placeholder: 'Enter Access Token',
                required: true,
              },
              {
                name: 'accessTokenSecret',
                label: 'Access Token Secret',
                type: 'password',
                placeholder: 'Enter Access Token Secret',
                required: true,
              },
            ]}
            onSave={(values) => handleSave('twitter', values)}
            onTest={() => handleTest('twitter')}
            onDisconnect={() => handleDisconnect('twitter')}
          />

          <ConfigCard
            title="LinkedIn"
            icon="💼"
            isConnected={isConnected('linkedin')}
            showOAuth={true}
            onOAuthConnect={() => handleOAuthConnect('linkedin')}
            fields={[
              {
                name: 'accessToken',
                label: 'Access Token',
                type: 'password',
                placeholder: 'Enter LinkedIn Access Token',
                required: true,
              },
              {
                name: 'personId',
                label: 'Person/Organization ID',
                type: 'text',
                placeholder: 'Enter Person or Organization ID',
                required: true,
              },
            ]}
            onSave={(values) => handleSave('linkedin', values)}
            onTest={() => handleTest('linkedin')}
            onDisconnect={() => handleDisconnect('linkedin')}
          />

          <ConfigCard
            title="WordPress"
            icon="🌐"
            isConnected={isConnected('wordpress')}
            fields={[
              {
                name: 'siteUrl',
                label: 'Site URL',
                type: 'text',
                placeholder: 'https://yourblog.wordpress.com',
                required: true,
              },
              {
                name: 'username',
                label: 'Username',
                type: 'text',
                placeholder: 'Enter username',
                required: true,
              },
              {
                name: 'appPassword',
                label: 'Application Password',
                type: 'password',
                placeholder: 'Enter application password',
                required: true,
              },
            ]}
            onSave={(values) => handleSave('wordpress', values)}
            onTest={() => handleTest('wordpress')}
            onDisconnect={() => handleDisconnect('wordpress')}
          />
        </motion.div>
      )}

      {/* Video Platforms Tab */}
      {activeTab === 'video' && (
        <motion.div
          key="video"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <ConfigCard
            title="HeyGen"
            icon="🎬"
            isConnected={isConnected('heygen')}
            fields={[
              {
                name: 'apiKey',
                label: 'API Key',
                type: 'password',
                placeholder: 'Enter your HeyGen API key',
                required: true,
              },
            ]}
            onSave={(values) => handleSave('heygen', values)}
            onDisconnect={() => handleDisconnect('heygen')}
          />

          <ConfigCard
            title="ElevenLabs"
            icon="🎙️"
            isConnected={isConnected('elevenlabs')}
            fields={[
              {
                name: 'apiKey',
                label: 'API Key',
                type: 'password',
                placeholder: 'Enter your ElevenLabs API key',
                required: true,
              },
              {
                name: 'voiceId',
                label: 'Voice ID',
                type: 'select',
                options: [
                  { value: 'voice_1', label: 'Rachel - Female (American)' },
                  { value: 'voice_2', label: 'Adam - Male (American)' },
                  { value: 'voice_3', label: 'Bella - Female (British)' },
                  { value: 'voice_4', label: 'Josh - Male (British)' },
                ],
              },
            ]}
            onSave={(values) => handleSave('elevenlabs', values)}
            onTest={() => handleTest('elevenlabs')}
            onDisconnect={() => handleDisconnect('elevenlabs')}
          />
        </motion.div>
      )}

      {/* Integration Request Section */}
      <div className="mt-12 flex justify-center">
        <button
          onClick={() => setIsRequestModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors shadow-lg font-medium"
        >
          <span className="text-xl">+</span>
          Request New Integration
        </button>
      </div>

      <IntegrationRequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        userEmail={user?.email}
      />
    </div>
  );
};

export default Configuration;
