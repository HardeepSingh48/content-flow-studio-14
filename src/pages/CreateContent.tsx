import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';

const CreateContent = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground">Create Content</h1>
        <p className="text-muted-foreground mt-1">
          Generate AI-powered content for multiple platforms
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-xl p-12 text-center"
      >
        <Construction className="h-16 w-16 text-primary mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Coming Soon
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          The content creation workflow will be available in the next phase.
          Configure your integrations first to prepare for content generation.
        </p>
      </motion.div>
    </div>
  );
};

export default CreateContent;
