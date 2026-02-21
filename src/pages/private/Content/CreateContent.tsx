import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Link2, 
  MessageSquare, 
  Hash, 
  Rss, 
  FileText, 
  Twitter, 
  Linkedin, 
  Video,
  Loader2,
  RefreshCw,
  ArrowLeft,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import StepIndicator from '@/components/features/content/StepIndicator';
import InputTypeCard from '@/components/features/content/InputTypeCard';
import TagsInput from '@/components/features/content/TagsInput';
import IdeaCard from '@/components/features/content/IdeaCard';
import QuestionInput from '@/components/features/content/QuestionInput';
import PlatformCheckbox from '@/components/features/content/PlatformCheckbox';
import { generateIdeas, generateQuestions, generateDrafts, Idea, Question } from '@/services/content';

type InputType = 'url' | 'topic' | 'keywords' | 'feed';

interface WizardState {
  currentStep: number;
  inputType: InputType;
  inputValue: string;
  keywords: string[];
  sessionId: string;
  ideas: Idea[];
  selectedIdeaId: string;
  questions: Question[];
  answers: Record<string, string>;
  selectedPlatforms: string[];
}

const STORAGE_KEY = 'content_wizard_state';

const steps = [
  { number: 1, label: 'Input' },
  { number: 2, label: 'Select Idea' },
  { number: 3, label: 'Questions' },
  { number: 4, label: 'Generate' },
];

const inputTypes = [
  { type: 'url' as InputType, icon: Link2, title: 'Analyze a URL', description: 'Extract content from any article or webpage' },
  { type: 'topic' as InputType, icon: MessageSquare, title: 'Start with a topic', description: 'Let AI generate ideas from scratch' },
  { type: 'keywords' as InputType, icon: Hash, title: 'Use keywords', description: 'Provide keywords for targeted content' },
  { type: 'feed' as InputType, icon: Rss, title: 'RSS Feed', description: 'Import content from an RSS feed' },
];

const platforms = [
  { id: 'article', icon: FileText, title: 'Article', description: 'Long-form blog post' },
  { id: 'twitter', icon: Twitter, title: 'Twitter', description: 'Thread-optimized tweets' },
  { id: 'linkedin', icon: Linkedin, title: 'LinkedIn', description: 'Professional post' },
  { id: 'reel', icon: Video, title: 'Reel Script', description: 'Short video script' },
];

const CreateContent = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<WizardState>(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Ignore parse errors
      }
    }
    return {
      currentStep: 1,
      inputType: 'topic',
      inputValue: '',
      keywords: [],
      sessionId: '',
      ideas: [],
      selectedIdeaId: '',
      questions: [],
      answers: {},
      selectedPlatforms: [],
    };
  });

  // Persist state to sessionStorage
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateState = (updates: Partial<WizardState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const getInputValue = () => {
    if (state.inputType === 'keywords') {
      return state.keywords;
    }
    return state.inputValue;
  };

  const isStep1Valid = () => {
    if (state.inputType === 'keywords') {
      return state.keywords.length > 0;
    }
    if (state.inputType === 'url' || state.inputType === 'feed') {
      try {
        new URL(state.inputValue);
        return true;
      } catch {
        return false;
      }
    }
    return state.inputValue.trim().length > 0;
  };

  const isStep2Valid = () => state.selectedIdeaId !== '';

  const isStep3Valid = () => {
    return state.questions
      .filter(q => q.required)
      .every(q => state.answers[q.id]?.trim().length > 0);
  };

  const isStep4Valid = () => state.selectedPlatforms.length >= 2;

  const handleGenerateIdeas = async () => {
    if (!isStep1Valid()) {
      toast.error('Please provide valid input');
      return;
    }

    setIsLoading(true);
    try {
      const input = getInputValue();
      const response = await generateIdeas(state.inputType, input);
      updateState({
        sessionId: response.sessionId,
        ideas: response.ideas,
        currentStep: 2,
        selectedIdeaId: '',
      });
      toast.success('Ideas generated successfully!');
    } catch (error) {
      toast.error('Failed to generate ideas. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectIdea = async () => {
    if (!isStep2Valid()) {
      toast.error('Please select an idea');
      return;
    }

    setIsLoading(true);
    try {
      const questions = await generateQuestions(state.selectedIdeaId);
      updateState({
        questions,
        currentStep: 3,
        answers: {},
      });
    } catch (error) {
      toast.error('Failed to load questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateContent = async () => {
    if (!isStep4Valid()) {
      toast.error('Please select at least 2 platforms');
      return;
    }

    setIsLoading(true);
    try {
      await generateDrafts(state.sessionId, state.answers, state.selectedPlatforms);
      sessionStorage.removeItem(STORAGE_KEY);
      toast.success('Content generated! Redirecting to drafts...');
      setTimeout(() => navigate('/dashboard/history'), 1500);
    } catch (error) {
      toast.error('Failed to generate content. Please try again.');
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (state.currentStep > 1) {
      updateState({ currentStep: state.currentStep - 1 });
    }
  };

  const handleNext = () => {
    switch (state.currentStep) {
      case 1:
        handleGenerateIdeas();
        break;
      case 2:
        handleSelectIdea();
        break;
      case 3:
        if (isStep3Valid()) {
          updateState({ currentStep: 4 });
        } else {
          toast.error('Please answer all required questions');
        }
        break;
      case 4:
        handleGenerateContent();
        break;
    }
  };

  const canProceed = () => {
    switch (state.currentStep) {
      case 1: return isStep1Valid();
      case 2: return isStep2Valid();
      case 3: return isStep3Valid();
      case 4: return isStep4Valid();
      default: return false;
    }
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          What do you want to create content about?
        </h2>
        <p className="text-muted-foreground">
          Choose how you'd like to start your content creation journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {inputTypes.map((item) => (
          <InputTypeCard
            key={item.type}
            icon={item.icon}
            title={item.title}
            description={item.description}
            selected={state.inputType === item.type}
            onClick={() => updateState({ inputType: item.type, inputValue: '', keywords: [] })}
          />
        ))}
      </div>

      <div className="max-w-xl">
        {state.inputType === 'url' && (
          <Input
            type="url"
            value={state.inputValue}
            onChange={(e) => updateState({ inputValue: e.target.value })}
            placeholder="https://example.com/article"
            className="bg-background"
          />
        )}
        {state.inputType === 'topic' && (
          <Textarea
            value={state.inputValue}
            onChange={(e) => updateState({ inputValue: e.target.value })}
            placeholder="Describe your topic in detail..."
            className="bg-background min-h-[120px]"
          />
        )}
        {state.inputType === 'keywords' && (
          <TagsInput
            tags={state.keywords}
            onChange={(keywords) => updateState({ keywords })}
          />
        )}
        {state.inputType === 'feed' && (
          <Input
            type="url"
            value={state.inputValue}
            onChange={(e) => updateState({ inputValue: e.target.value })}
            placeholder="https://example.com/feed.xml"
            className="bg-background"
          />
        )}
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Choose your content angle
          </h2>
          <p className="text-muted-foreground">
            Select the idea that best matches your vision.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleGenerateIdeas}
          disabled={isLoading}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Regenerate
        </Button>
      </div>

      <div className="space-y-4">
        {state.ideas.map((idea) => (
          <IdeaCard
            key={idea.id}
            title={idea.title}
            description={idea.description}
            selected={state.selectedIdeaId === idea.id}
            onClick={() => updateState({ selectedIdeaId: idea.id })}
          />
        ))}
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Help us refine your content
        </h2>
        <p className="text-muted-foreground">
          Answer these questions to generate personalized content.
        </p>
      </div>

      <div className="space-y-6 max-w-2xl">
        {state.questions.map((question) => (
          <QuestionInput
            key={question.id}
            id={question.id}
            question={question.text}
            required={question.required}
            value={state.answers[question.id] || ''}
            onChange={(value) => updateState({ 
              answers: { ...state.answers, [question.id]: value }
            })}
          />
        ))}
      </div>
    </motion.div>
  );

  const renderStep4 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Select content formats
        </h2>
        <p className="text-muted-foreground">
          Choose at least 2 platforms to generate content for.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
        {platforms.map((platform) => (
          <PlatformCheckbox
            key={platform.id}
            icon={platform.icon}
            title={platform.title}
            description={platform.description}
            checked={state.selectedPlatforms.includes(platform.id)}
            onChange={(checked) => {
              if (checked) {
                updateState({ selectedPlatforms: [...state.selectedPlatforms, platform.id] });
              } else {
                updateState({ 
                  selectedPlatforms: state.selectedPlatforms.filter(p => p !== platform.id) 
                });
              }
            }}
          />
        ))}
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Sparkles className="h-4 w-4 text-primary" />
        <span>
          {state.selectedPlatforms.length} of 4 platforms selected
          {state.selectedPlatforms.length < 2 && ' (minimum 2 required)'}
        </span>
      </div>
    </motion.div>
  );

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

      <StepIndicator steps={steps} currentStep={state.currentStep} />

      <div className="glass rounded-xl p-8 min-h-[400px]">
        <AnimatePresence mode="wait">
          {state.currentStep === 1 && renderStep1()}
          {state.currentStep === 2 && renderStep2()}
          {state.currentStep === 3 && renderStep3()}
          {state.currentStep === 4 && renderStep4()}
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={state.currentStep === 1 || isLoading}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <Button
          variant="gradient"
          onClick={handleNext}
          disabled={!canProceed() || isLoading}
          className="gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : state.currentStep === 4 ? (
            <>
              <Sparkles className="h-4 w-4" />
              Generate Content
            </>
          ) : (
            <>
              Next
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CreateContent;
