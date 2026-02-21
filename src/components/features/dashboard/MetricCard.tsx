import { ReactNode } from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
      className="bg-white/5 border border-white/10 rounded-xl p-6 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-sm font-medium text-white/50">{title}</span>
        {icon && <div className="p-2 bg-white/5 border border-white/10 rounded-lg text-white/50">{icon}</div>}
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div className="text-3xl font-bold text-white tracking-tight">
            {value}
            {suffix && <span className="text-base font-medium text-white/50 ml-1">{suffix}</span>}
          </div>

          {change !== undefined && (
            <div className={cn(
              "flex items-center gap-1 mt-2 text-sm font-semibold",
              isPositive ? "text-emerald-400" : isNegative ? "text-error-400" : "text-white/50"
            )}>
              {isPositive && <ArrowUpRight className="size-4" />}
              {isNegative && <ArrowDownRight className="size-4" />}
              {!isPositive && !isNegative && <Minus className="size-4" />}
              <span>{isPositive ? '+' : ''}{change}%</span>
              <span className="text-xs font-normal text-white/40 ml-1">{changeLabel}</span>
            </div>
          )}
        </div>

        {chart && <div className="w-24 h-12 flex items-center justify-center">{chart}</div>}
      </div>
    </motion.div>
  );
};
