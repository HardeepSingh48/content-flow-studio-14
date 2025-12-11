import { motion } from 'framer-motion';
import { Clock, Loader2, CheckCircle, XCircle, Eye, Pencil, RotateCcw, X } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { QueueItem } from '@/services/analytics';

interface QueueItemCardProps {
  item: QueueItem;
  onViewDetails: () => void;
  onEditSchedule?: () => void;
  onCancel?: () => void;
  onRetry?: () => void;
}

const statusConfig: Record<QueueItem['status'], { icon: typeof Clock; color: string; bg: string; animate?: boolean }> = {
  scheduled: { icon: Clock, color: 'text-primary', bg: 'bg-primary/10' },
  publishing: { icon: Loader2, color: 'text-warning', bg: 'bg-warning/10', animate: true },
  success: { icon: CheckCircle, color: 'text-success', bg: 'bg-success/10' },
  failed: { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10' },
};

export const QueueItemCard = ({
  item,
  onViewDetails,
  onEditSchedule,
  onCancel,
  onRetry,
}: QueueItemCardProps) => {
  const config = statusConfig[item.status];
  const StatusIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-4 flex gap-4"
    >
      <div className={`p-3 rounded-full ${config.bg} self-start`}>
        <StatusIcon 
          className={`w-5 h-5 ${config.color} ${config.animate ? 'animate-spin' : ''}`} 
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="font-medium text-foreground truncate">{item.title}</h3>
          <div className="flex gap-2 flex-shrink-0">
            {item.platforms.map((platform) => (
              <Badge key={platform} variant="secondary" className="text-xs">
                {platform}
              </Badge>
            ))}
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {item.preview}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            {item.status === 'scheduled' && (
              <span>
                Scheduled for {format(new Date(item.scheduledFor), 'MMM d, h:mm a')}
                {' · '}
                {formatDistanceToNow(new Date(item.scheduledFor), { addSuffix: true })}
              </span>
            )}
            {item.status === 'publishing' && (
              <span>Publishing now...</span>
            )}
            {item.status === 'success' && item.publishedAt && (
              <span>
                Published {formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true })}
              </span>
            )}
            {item.status === 'failed' && (
              <span className="text-destructive">
                Failed {formatDistanceToNow(new Date(item.scheduledFor), { addSuffix: true })}
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <Button size="sm" variant="ghost" onClick={onViewDetails}>
              <Eye className="w-4 h-4 mr-1" />
              Details
            </Button>
            
            {item.status === 'scheduled' && (
              <>
                <Button size="sm" variant="ghost" onClick={onEditSchedule}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={onCancel}>
                  <X className="w-4 h-4" />
                </Button>
              </>
            )}
            
            {item.status === 'failed' && (
              <Button size="sm" variant="ghost" onClick={onRetry}>
                <RotateCcw className="w-4 h-4 mr-1" />
                Retry
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
