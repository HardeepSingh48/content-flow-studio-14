import { motion } from 'framer-motion';
import { Check, X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Integration } from '@/types/integrations';

interface IntegrationCardProps {
  integration: Integration;
  onConfigure?: () => void;
}

const iconMap: Record<string, string> = {
  wordpress: '🌐',
  twitter: '𝕏',
  linkedin: '💼',
  gemini: '✨',
  openai: '🤖',
  elevenlabs: '🎙️',
  heygen: '🎬',
};

export const IntegrationCard = ({ integration, onConfigure }: IntegrationCardProps) => {
  const isConnected = integration.status === 'connected';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-xl p-5 hover:border-primary/30 transition-all group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-3xl">{iconMap[integration.provider] || '📦'}</div>
          <div>
            <h3 className="font-semibold text-foreground">{integration.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              {isConnected ? (
                <>
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-green-400">Connected</span>
                </>
              ) : (
                <>
                  <X className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Not Connected</span>
                </>
              )}
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onConfigure}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};
