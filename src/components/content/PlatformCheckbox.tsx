import { motion } from 'framer-motion';
import { Check, LucideIcon } from 'lucide-react';

interface PlatformCheckboxProps {
  icon: LucideIcon;
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const PlatformCheckbox = ({ 
  icon: Icon, 
  title, 
  description, 
  checked, 
  onChange 
}: PlatformCheckboxProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onChange(!checked)}
      className={`
        w-full p-4 rounded-xl text-left transition-all duration-200
        border-2 bg-card flex items-center gap-4
        ${checked 
          ? 'border-primary shadow-lg shadow-primary/20' 
          : 'border-border hover:border-primary/50'
        }
      `}
    >
      <div className={`
        w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
        ${checked ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
      `}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className={`
        w-6 h-6 rounded border-2 flex-shrink-0 transition-all duration-200
        flex items-center justify-center
        ${checked 
          ? 'border-primary bg-primary' 
          : 'border-muted-foreground'
        }
      `}>
        {checked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <Check className="h-4 w-4 text-primary-foreground" />
          </motion.div>
        )}
      </div>
    </motion.button>
  );
};

export default PlatformCheckbox;
