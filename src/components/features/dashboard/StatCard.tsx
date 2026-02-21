import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

export const StatCard = ({ label, value, change, trend }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] group backdrop-blur-sm"
    >
      <p className="text-sm text-white/50 font-medium mb-2">{label}</p>
      <p className="text-4xl font-bold text-white mb-2 leading-tight">{value}</p>
      <div className={cn(
        "flex items-center gap-1.5 text-sm font-medium",
        trend === 'up' ? "text-emerald-400" : trend === 'down' ? "text-error-400" : "text-white/50"
      )}>
        {trend === 'up' && <ArrowUpRight className="size-4" />}
        {trend === 'down' && <ArrowDownRight className="size-4" />}
        {trend === 'neutral' && <Minus className="size-4" />}
        <span>{change}</span>
      </div>
    </motion.div>
  );
};
