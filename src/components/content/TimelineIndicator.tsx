import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimelineIndicatorProps {
  currentStep: number;
  status: string;
}

const steps = [
  { id: 1, label: 'Input' },
  { id: 2, label: 'Idea' },
  { id: 3, label: 'Q&A' },
  { id: 4, label: 'Drafts' },
  { id: 5, label: 'Published' },
];

const TimelineIndicator = ({ currentStep, status }: TimelineIndicatorProps) => {
  const getStepStatus = (stepId: number) => {
    if (status === 'published' && stepId === 5) return 'completed';
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  return (
    <div className="flex items-center gap-1">
      {steps.map((step, index) => {
        const stepStatus = getStepStatus(step.id);
        
        return (
          <div key={step.id} className="flex items-center">
            <div
              className={cn(
                'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium transition-colors',
                stepStatus === 'completed' && 'bg-primary text-primary-foreground',
                stepStatus === 'current' && 'bg-primary/20 border-2 border-primary text-primary',
                stepStatus === 'upcoming' && 'bg-muted border border-border text-muted-foreground'
              )}
            >
              {stepStatus === 'completed' ? (
                <Check className="w-3 h-3" />
              ) : (
                step.id
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'w-4 h-0.5 mx-0.5',
                  stepStatus === 'completed' ? 'bg-primary' : 'bg-border'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TimelineIndicator;
