import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const History = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground">History</h1>
        <p className="text-muted-foreground mt-1">
          View your content creation history
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-xl p-12 text-center"
      >
        <Clock className="h-16 w-16 text-primary mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-foreground mb-2">
          No History Yet
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Your content creation history will appear here once you start
          generating and publishing content.
        </p>
      </motion.div>
    </div>
  );
};

export default History;
