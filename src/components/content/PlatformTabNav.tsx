import { cn } from '@/lib/utils';
import { FileText, Twitter, Linkedin, Video } from 'lucide-react';
import { Platform } from '@/types/content';

interface PlatformTabNavProps {
  platforms: Platform[];
  activePlatform: Platform;
  onPlatformChange: (platform: Platform) => void;
}

const platformConfig = {
  article: { label: 'Article', icon: FileText },
  twitter: { label: 'Twitter', icon: Twitter },
  linkedin: { label: 'LinkedIn', icon: Linkedin },
  reel: { label: 'Reel Script', icon: Video },
};

const PlatformTabNav = ({
  platforms,
  activePlatform,
  onPlatformChange,
}: PlatformTabNavProps) => {
  return (
    <div className="flex border-b border-border">
      {platforms.map(platform => {
        const config = platformConfig[platform];
        const Icon = config.icon;
        const isActive = platform === activePlatform;
        
        return (
          <button
            key={platform}
            onClick={() => onPlatformChange(platform)}
            className={cn(
              'flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative',
              isActive
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon className="w-4 h-4" />
            {config.label}
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default PlatformTabNav;
