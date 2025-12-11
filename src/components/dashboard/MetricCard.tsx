import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
  chart?: ReactNode;
  suffix?: string;
}

export const MetricCard = ({
  title,
  value,
  change,
  changeLabel = 'vs last period',
  icon,
  chart,
  suffix,
}: MetricCardProps) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-sm text-muted-foreground">{title}</span>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <div className="text-3xl font-bold text-foreground">
            {value}
            {suffix && <span className="text-lg text-muted-foreground ml-1">{suffix}</span>}
          </div>
          
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {isPositive && (
                <>
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-sm text-success">+{change}%</span>
                </>
              )}
              {isNegative && (
                <>
                  <TrendingDown className="w-4 h-4 text-destructive" />
                  <span className="text-sm text-destructive">{change}%</span>
                </>
              )}
              {!isPositive && !isNegative && change === 0 && (
                <span className="text-sm text-muted-foreground">0%</span>
              )}
              <span className="text-xs text-muted-foreground ml-1">{changeLabel}</span>
            </div>
          )}
        </div>
        
        {chart && <div className="w-24 h-12">{chart}</div>}
      </div>
    </motion.div>
  );
};
