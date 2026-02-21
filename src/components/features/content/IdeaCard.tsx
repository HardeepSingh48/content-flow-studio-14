import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

interface IdeaCardProps {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

const IdeaCard = ({ title, description, selected, onClick }: IdeaCardProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={`
        w-full p-6 rounded-xl text-left transition-all duration-200
        border-2 bg-card
        ${selected 
          ? 'border-primary shadow-lg shadow-primary/20' 
          : 'border-border hover:border-primary/50'
        }
      `}
    >
      <div className="flex items-start gap-4">
        <div className={`
          w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
          ${selected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
        `}>
          <Lightbulb className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
        <div className={`
          w-5 h-5 rounded-full border-2 flex-shrink-0 transition-colors
          ${selected 
            ? 'border-primary bg-primary' 
            : 'border-muted-foreground'
          }
        `}>
          {selected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-full h-full rounded-full bg-primary flex items-center justify-center"
            >
              <div className="w-2 h-2 rounded-full bg-primary-foreground" />
            </motion.div>
          )}
        </div>
      </div>
    </motion.button>
  );
};

export default IdeaCard;
