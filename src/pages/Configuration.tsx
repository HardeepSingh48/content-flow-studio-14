import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Share2, Video } from 'lucide-react';
import { toast } from 'sonner';
import { TabNavigation } from '@/components/dashboard/TabNavigation';
import { ConfigCard } from '@/components/dashboard/ConfigCard';
import { IntegrationProvider } from '@/types/integrations';

const tabs = [
  { id: 'ai', label: 'AI Models', icon: <Bot className="h-4 w-4" /> },
  { id: 'social', label: 'Social Media', icon: <Share2 className="h-4 w-4" /> },
  { id: 'video', label: 'Video Platforms', icon: <Video className="h-4 w-4" /> },
];

// Store configs in React state (will connect to backend later)
interface ConfigState {
  [key: string]: {
    isConnected: boolean;
    credentials: Record<string, string>;
  };
}

const Configuration = () => {
  const [activeTab, setActiveTab] = useState('ai');
  const [configs, setConfigs] = useState<ConfigState>({});

  const handleSave = async (provider: IntegrationProvider, values: Record<string, string>) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setConfigs((prev) => ({
      ...prev,
      [provider]: {
        isConnected: true,
        credentials: values,
      },
    }));

    toast.success(`${provider} configuration saved successfully!`);
  };

  const handleTest = async (provider: IntegrationProvider): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const success = Math.random() > 0.3; // 70% success rate for demo
    
    if (success) {
      toast.success(`${provider} connection test successful!`);
    } else {
      toast.error(`${provider} connection test failed. Please check your credentials.`);
    }
    
    return success;
  };

  const handleOAuthConnect = (provider: IntegrationProvider) => {
    toast.info(`OAuth flow for ${provider} would start here`);
  };

  return (
    <div className="space-y-8">
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
            isConnected={configs.gemini?.isConnected}
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
          />

          <ConfigCard
            title="OpenAI"
            icon="🤖"
            isConnected={configs.openai?.isConnected}
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
            isConnected={configs.twitter?.isConnected}
            fields={[
              {
                name: 'apiKey',
                label: 'API Key',
                type: 'password',
                placeholder: 'Enter API Key',
                required: true,
              },
              {
                name: 'apiSecret',
                label: 'API Secret',
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
                name: 'accessSecret',
                label: 'Access Token Secret',
                type: 'password',
                placeholder: 'Enter Access Token Secret',
                required: true,
              },
            ]}
            onSave={(values) => handleSave('twitter', values)}
            onTest={() => handleTest('twitter')}
          />

          <ConfigCard
            title="LinkedIn"
            icon="💼"
            isConnected={configs.linkedin?.isConnected}
            fields={[]}
            showOAuth
            onOAuthConnect={() => handleOAuthConnect('linkedin')}
            onSave={async () => {}}
          />

          <ConfigCard
            title="WordPress"
            icon="🌐"
            isConnected={configs.wordpress?.isConnected}
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
            isConnected={configs.heygen?.isConnected}
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
          />

          <ConfigCard
            title="ElevenLabs"
            icon="🎙️"
            isConnected={configs.elevenlabs?.isConnected}
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
          />
        </motion.div>
      )}
    </div>
  );
};

export default Configuration;
