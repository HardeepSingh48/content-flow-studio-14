import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface QuestionInputProps {
  id: string;
  question: string;
  required: boolean;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

const QuestionInput = ({ 
  id, 
  question, 
  required, 
  value, 
  onChange,
  maxLength = 300 
}: QuestionInputProps) => {
  const charCount = value.length;
  const isNearLimit = charCount > maxLength * 0.8;
  const isOverLimit = charCount > maxLength;

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-foreground">
        {question}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
        placeholder="Type your answer here..."
        className="bg-background min-h-[100px] resize-none"
      />
      <div className="flex justify-end">
        <span className={`text-xs ${
          isOverLimit 
            ? 'text-destructive' 
            : isNearLimit 
              ? 'text-yellow-500' 
              : 'text-muted-foreground'
        }`}>
          {charCount}/{maxLength}
        </span>
      </div>
    </div>
  );
};

export default QuestionInput;
