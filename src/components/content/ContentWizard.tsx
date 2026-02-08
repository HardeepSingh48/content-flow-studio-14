import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Sparkles, MessageSquare, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { api } from '@/services/api';
import { toast } from '@/hooks/use-toast';

type SessionStatus = 'ANALYZING' | 'BRIEF_READY' | 'QNA' | 'GENERATING' | 'READY' | 'FAILED';

interface Question {
    id: string;
    questionText: string;
    category?: string;
    purpose?: string;
}

interface Brief {
    topicOverview: {
        title: string;
        description: string;
        trendingStatus: string;
    };
    audienceInsights: {
        primaryAudience: string;
        painPoints: string[];
    };
    keyMessages: string[];
}

export default function ContentWizard() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [topic, setTopic] = useState('');
    const [sessionId, setSessionId] = useState('');
    const [status, setStatus] = useState<SessionStatus>('ANALYZING');
    const [brief, setBrief] = useState<Brief | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);

    // Cleanup polling on unmount
    useEffect(() => {
        return () => {
            if (pollingInterval) {
                clearInterval(pollingInterval);
            }
        };
    }, [pollingInterval]);

    // Start polling when session is created
    useEffect(() => {
        if (sessionId && (status === 'ANALYZING' || status === 'BRIEF_READY' || status === 'GENERATING')) {
            const interval = setInterval(async () => {
                try {
                    const { data } = await api.getSessionStatus(sessionId);
                    setStatus(data.status);

                    if (data.status === 'QNA') {
                        // Fetch session details with brief and questions
                        const sessionData = await api.getContentSession(sessionId);
                        setBrief(sessionData.data.brief);
                        setQuestions(sessionData.data.questions);
                        setStep(2);
                        clearInterval(interval);
                    } else if (data.status === 'READY') {
                        // Content is ready
                        clearInterval(interval);
                        setStep(3);
                    } else if (data.status === 'FAILED') {
                        clearInterval(interval);
                        toast({
                            title: 'Analysis Failed',
                            description: data.error || 'Something went wrong. Please try again.',
                            variant: 'destructive',
                        });
                    }
                } catch (error) {
                    console.error('Polling error:', error);
                }
            }, 3000); // Poll every 3 seconds

            setPollingInterval(interval);

            return () => clearInterval(interval);
        }
    }, [sessionId, status]);

    const handleCreateSession = async () => {
        if (!topic.trim()) {
            toast({
                title: 'Topic Required',
                description: 'Please enter a topic to analyze',
                variant: 'destructive',
            });
            return;
        }

        setLoading(true);
        try {
            const { data } = await api.createContentSession(topic);
            setSessionId(data.sessionId);
            setStatus(data.status);

            toast({
                title: 'Analysis Started!',
                description: 'Analyzing your topic... This may take 30-60 seconds.',
            });
        } catch (error) {
            console.error('Failed to create session:', error);
            toast({
                title: 'Failed to Start',
                description: 'Could not start topic analysis. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitAnswers = async () => {
        const answersArray = questions.map((q) => ({
            questionId: q.id,
            answer: answers[q.id] || '',
        }));

        // Check if at least some questions are answered
        const answeredCount = answersArray.filter((a) => a.answer.trim()).length;
        if (answeredCount === 0) {
            toast({
                title: 'Please Answer Questions',
                description: 'Answer at least one question to personalize your content',
                variant: 'destructive',
            });
            return;
        }

        setLoading(true);
        try {
            await api.submitAnswers(sessionId, answersArray);
            setStatus('GENERATING');

            toast({
                title: 'Generating Content!',
                description: 'Creating personalized content for all platforms...',
            });
        } catch (error) {
            console.error('Failed to submit answers:', error);
            toast({
                title: 'Submission Failed',
                description: 'Could not submit answers. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleViewContent = () => {
        navigate(`/content/${sessionId}`);
    };

    const getProgressValue = () => {
        if (status === 'ANALYZING' || status === 'BRIEF_READY') return 33;
        if (status === 'QNA') return 66;
        if (status === 'GENERATING') return 85;
        if (status === 'READY') return 100;
        return 0;
    };

    const getStatusMessage = () => {
        switch (status) {
            case 'ANALYZING':
                return 'Analyzing topic from Reddit, Google Trends, and Search...';
            case 'BRIEF_READY':
                return 'Generating personalized questions...';
            case 'QNA':
                return 'Ready for your input!';
            case 'GENERATING':
                return 'Creating content for LinkedIn, Twitter, Blog, and Reels...';
            case 'READY':
                return 'Content is ready!';
            case 'FAILED':
                return 'Analysis failed. Please try again.';
            default:
                return '';
        }
    };

    return (
        <div className="container max-w-4xl mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Create Content</h1>
                <p className="text-muted-foreground">
                    AI-powered content generation for multiple platforms
                </p>
            </div>

            {/* Progress Bar */}
            {sessionId && (
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-muted-foreground">{Math.round(getProgressValue())}%</span>
                    </div>
                    <Progress value={getProgressValue()} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-2">{getStatusMessage()}</p>
                </div>
            )}

            {/* Step 1: Topic Input */}
            {step === 1 && (
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-primary" />
                            <CardTitle>What would you like to create content about?</CardTitle>
                        </div>
                        <CardDescription>
                            Enter a topic and we'll analyze it using AI and web research
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                placeholder="e.g., AI automation in healthcare, Sustainable fashion trends"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleCreateSession()}
                                disabled={loading || !!sessionId}
                                className="text-lg"
                            />
                            <p className="text-sm text-muted-foreground">
                                Be specific! Better topics lead to better content.
                            </p>
                        </div>

                        {sessionId && (status === 'ANALYZING' || status === 'BRIEF_READY') ? (
                            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                <div>
                                    <p className="font-medium">Analyzing your topic...</p>
                                    <p className="text-sm text-muted-foreground">
                                        This may take 30-60 seconds. We're researching Reddit, Google Trends, and Search.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <Button
                                onClick={handleCreateSession}
                                disabled={loading || !topic.trim() || !!sessionId}
                                className="w-full"
                                size="lg"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Starting Analysis...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-2 h-4 w-4" />
                                        Analyze Topic
                                    </>
                                )}
                            </Button>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Step 2: Brief & Questions */}
            {step === 2 && brief && (
                <div className="space-y-6">
                    {/* Brief Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{brief.topicOverview.title}</CardTitle>
                            <CardDescription>{brief.topicOverview.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="font-medium mb-2">Target Audience</h4>
                                <p className="text-sm text-muted-foreground">{brief.audienceInsights.primaryAudience}</p>
                            </div>

                            <div>
                                <h4 className="font-medium mb-2">Key Pain Points</h4>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                    {brief.audienceInsights.painPoints.slice(0, 3).map((point, i) => (
                                        <li key={i}>• {point}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-medium mb-2">Key Messages</h4>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                    {brief.keyMessages.slice(0, 3).map((msg, i) => (
                                        <li key={i}>• {msg}</li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Questions */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <MessageSquare className="h-5 w-5 text-primary" />
                                <CardTitle>Tell us more to personalize your content</CardTitle>
                            </div>
                            <CardDescription>
                                Answer these questions to help us create better content for you
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {questions.map((question, index) => (
                                <div key={question.id} className="space-y-2">
                                    <label className="text-sm font-medium">
                                        {index + 1}. {question.questionText}
                                    </label>
                                    {question.purpose && (
                                        <p className="text-xs text-muted-foreground">{question.purpose}</p>
                                    )}
                                    <Textarea
                                        placeholder="Your answer..."
                                        value={answers[question.id] || ''}
                                        onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                                        rows={3}
                                    />
                                </div>
                            ))}

                            <Button
                                onClick={handleSubmitAnswers}
                                disabled={loading || status === 'GENERATING'}
                                className="w-full"
                                size="lg"
                            >
                                {loading || status === 'GENERATING' ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Generating Content...
                                    </>
                                ) : (
                                    'Generate Content'
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Step 3: Content Ready */}
            {step === 3 && status === 'READY' && (
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <CardTitle>Your content is ready!</CardTitle>
                        </div>
                        <CardDescription>
                            We've created personalized content for LinkedIn, Twitter, Blog, and Reels
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm text-green-800">
                                ✓ Content generated for 4 platforms<br />
                                ✓ Personalized for your industry<br />
                                ✓ Ready to review and publish
                            </p>
                        </div>

                        <Button onClick={handleViewContent} className="w-full" size="lg">
                            View Your Content
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
