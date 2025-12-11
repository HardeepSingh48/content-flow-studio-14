import { motion } from 'framer-motion';
import { FileText, Send, Sparkles, Settings, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export interface ActivityItem {
  id: string;
  type: 'published' | 'generated' | 'created' | 'settings';
  title: string;
  timestamp: string;
  platform?: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  maxItems?: number;
}

const getActivityIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'published':
      return <Send className="w-4 h-4 text-success" />;
    case 'generated':
      return <Sparkles className="w-4 h-4 text-primary" />;
    case 'created':
      return <FileText className="w-4 h-4 text-secondary" />;
    case 'settings':
      return <Settings className="w-4 h-4 text-muted-foreground" />;
  }
};

export const ActivityFeed = ({ activities, maxItems = 5 }: ActivityFeedProps) => {
  const displayActivities = activities.slice(0, maxItems);

  return (
    <div className="space-y-3">
      {displayActivities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
        >
          <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground truncate">{activity.title}</p>
            {activity.platform && (
              <span className="text-xs text-muted-foreground">
                to {activity.platform}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
            <Clock className="w-3 h-3" />
            {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
          </div>
        </motion.div>
      ))}
      
      {activities.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No recent activity</p>
        </div>
      )}
    </div>
  );
};
