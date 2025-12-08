import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const StatCard = ({ title, value, icon: Icon, trend }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-6 hover:border-primary/30 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {trend.isPositive ? '+' : ''}{trend.value}% from last month
            </p>
          )}
        </div>
        <div className="p-3 rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </motion.div>
  );
};
