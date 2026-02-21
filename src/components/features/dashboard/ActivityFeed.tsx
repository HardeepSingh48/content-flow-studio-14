import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Linkedin, Twitter, FileEdit, CheckCircle } from 'lucide-react';

interface ActivityItem {
  id: string;
  text: string;
  timestamp: string;
  type: 'publish_linkedin' | 'publish_twitter' | 'scheduled' | 'draft_saved';
}

interface ActivityFeedProps {
  items: ActivityItem[];
}

const getIcon = (type: string) => {
  switch (type) {
    case 'publish_linkedin': return <Linkedin className="size-4 text-[#0077b5]" />;
    case 'publish_twitter': return <Twitter className="size-4 text-[#1DA1F2]" />;
    case 'scheduled': return <CheckCircle className="size-4 text-primary-600" />;
    case 'draft_saved': return <FileEdit className="size-4 text-neutral-500" />;
    default: return null;
  }
};

export const ActivityFeed = ({ items }: ActivityFeedProps) => {
  return (
    <ul className="divide-y divide-neutral-200">
      {items.map((item, index) => (
        <motion.li
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="flex items-start gap-4 py-4 first:pt-0 last:pb-0"
        >
          <div className="w-8 h-8 flex items-center justify-center bg-neutral-100 rounded-full shrink-0">
            {getIcon(item.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-neutral-900 truncate">
              {item.text}
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">
              {item.timestamp}
            </p>
          </div>
        </motion.li>
      ))}
    </ul>
  );
};
