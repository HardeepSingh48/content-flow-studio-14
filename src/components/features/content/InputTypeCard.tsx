import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface InputTypeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

const InputTypeCard = ({ icon: Icon, title, description, selected, onClick }: InputTypeCardProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        p-6 rounded-xl text-left transition-all duration-200
        border-2 bg-card
        ${selected 
          ? 'border-primary shadow-lg shadow-primary/20' 
          : 'border-border hover:border-primary/50'
        }
      `}
    >
      <div className={`
        w-12 h-12 rounded-lg flex items-center justify-center mb-4
        ${selected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
      `}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.button>
  );
};

export default InputTypeCard;
