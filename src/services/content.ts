import { ContentSession, ContentVersion, Platform, PublishOptions } from '@/types/content';

export interface IdeaResponse {
  sessionId: string;
  ideas: Idea[];
}

export interface Idea {
  id: string;
  title: string;
  description: string;
}

export interface Question {
  id: string;
  text: string;
  required: boolean;
}

export interface DraftResponse {
  success: boolean;
  drafts: Draft[];
}

export interface Draft {
  id: string;
  platform: string;
  content: string;
  status: 'draft' | 'published';
}

// Mock data for content sessions
const mockSessions: ContentSession[] = [
  {
    id: 'session_1',
    title: 'The Future of AI in Content Creation',
    inputType: 'topic',
    inputValue: 'AI content creation tools',
    status: 'drafts',
    currentStep: 4,
    selectedIdeaId: '1',
    selectedIdea: {
      title: 'The Future of AI in Content Creation',
      description: 'Explore how artificial intelligence is revolutionizing the way we create, distribute, and consume content across digital platforms.',
    },
    answers: {
      q1: 'Educate content creators about AI tools',
      q2: 'Marketing professionals and content creators',
      q3: 'Efficiency, quality, cost savings',
      q4: 'Professional',
      q5: 'ChatGPT, Jasper AI examples',
    },
    platforms: ['article', 'twitter', 'linkedin'],
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:45:00Z',
  },
  {
    id: 'session_2',
    title: 'Building a Multi-Platform Content Strategy',
    inputType: 'url',
    inputValue: 'https://example.com/content-strategy',
    status: 'questions',
    currentStep: 3,
    selectedIdeaId: '2',
    selectedIdea: {
      title: 'Building a Multi-Platform Content Strategy',
      description: 'Learn how to create cohesive content that works across all your marketing channels.',
    },
    platforms: [],
    createdAt: '2024-01-14T09:00:00Z',
    updatedAt: '2024-01-14T09:30:00Z',
  },
  {
    id: 'session_3',
    title: 'SEO Best Practices 2024',
    inputType: 'keywords',
    inputValue: ['SEO', 'search optimization', 'Google ranking', 'content marketing'],
    status: 'published',
    currentStep: 4,
    selectedIdeaId: '3',
    selectedIdea: {
      title: 'SEO Best Practices for 2024',
      description: 'Stay ahead of the curve with the latest SEO strategies and techniques.',
    },
    answers: {
      q1: 'Rank higher on Google',
      q2: 'Small business owners',
      q3: 'Technical SEO, content optimization',
      q4: 'Educational',
      q5: 'Real case studies from clients',
    },
    platforms: ['article', 'linkedin'],
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-12T16:00:00Z',
  },
];

const mockVersions: Record<string, ContentVersion[]> = {
  session_1: [
    {
      id: 'version_1_article',
      sessionId: 'session_1',
      platform: 'article',
      content: `# The Future of AI in Content Creation

Artificial intelligence is fundamentally transforming how we create, distribute, and consume content. From automated writing assistants to sophisticated image generation, AI tools are becoming indispensable for modern content creators.

## The Rise of AI Writing Tools

Content creators now have access to powerful AI assistants that can help with everything from brainstorming ideas to polishing final drafts. Tools like ChatGPT and Jasper AI have demonstrated that AI can produce high-quality written content at scale.

## Key Benefits for Content Creators

1. **Increased Efficiency** - AI can help you create content 10x faster
2. **Consistent Quality** - Maintain your brand voice across all content
3. **Cost Savings** - Reduce the need for large content teams

## Looking Ahead

The future of content creation will be a collaboration between human creativity and AI capabilities. Those who embrace these tools will have a significant competitive advantage.`,
      metadata: {
        metaTitle: 'The Future of AI in Content Creation | 2024 Guide',
        metaDescription: 'Discover how AI is revolutionizing content creation. Learn about the tools, benefits, and strategies for leveraging AI in your content workflow.',
        focusKeyword: 'AI content creation',
        wordCount: 180,
      },
      status: 'draft',
    },
    {
      id: 'version_1_twitter',
      sessionId: 'session_1',
      platform: 'twitter',
      content: '',
      metadata: {
        tweets: [
          { id: 't1', content: '🚀 AI is revolutionizing content creation. Here\'s what you need to know (thread) 🧵', order: 1 },
          { id: 't2', content: 'First, the numbers: Content creators using AI tools report 10x faster production times. That\'s not a typo.', order: 2 },
          { id: 't3', content: 'But it\'s not about replacing humans. It\'s about augmenting creativity. The best content still needs human insight and emotion.', order: 3 },
          { id: 't4', content: 'Key tools to explore:\n\n• ChatGPT for ideation\n• Jasper for long-form\n• Midjourney for visuals\n\nThe stack matters.', order: 4 },
          { id: 't5', content: 'My prediction: In 2025, every successful content creator will have AI in their workflow. The question is HOW you use it. 💡', order: 5 },
        ],
        hashtags: ['#AI', '#ContentCreation', '#MarketingTips'],
      },
      status: 'draft',
    },
    {
      id: 'version_1_linkedin',
      sessionId: 'session_1',
      platform: 'linkedin',
      content: `I've been experimenting with AI content tools for the past 6 months, and here's what I've learned:

The future of content creation isn't AI OR humans. It's AI AND humans.

Here's my workflow:
1️⃣ Use AI for research and ideation
2️⃣ Add human insight and experience
3️⃣ Polish with AI assistance
4️⃣ Final human review for authenticity

The result? 3x more content, higher engagement, and more time for strategy.

If you're not exploring AI tools yet, you're falling behind.

What's your experience with AI in content creation?

#ContentMarketing #AI #FutureOfWork`,
      metadata: {
        hashtags: ['#ContentMarketing', '#AI', '#FutureOfWork'],
        characterCount: 587,
      },
      status: 'draft',
    },
  ],
};

export const generateIdeas = async (
  type: 'url' | 'topic' | 'keywords' | 'feed',
  input: string | string[]
): Promise<IdeaResponse> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const mockIdeas: Idea[] = [
    {
      id: '1',
      title: 'The Future of AI in Content Creation',
      description: 'Explore how artificial intelligence is revolutionizing the way we create, distribute, and consume content across digital platforms.',
    },
    {
      id: '2',
      title: 'Maximizing Engagement Through Data-Driven Content',
      description: 'Learn strategies for using analytics and user behavior data to craft content that resonates with your target audience.',
    },
    {
      id: '3',
      title: 'Building a Multi-Platform Content Strategy',
      description: 'Discover how to repurpose and adapt your content for different platforms while maintaining brand consistency.',
    },
  ];

  return {
    sessionId: `session_${Date.now()}`,
    ideas: mockIdeas,
  };
};

export const generateQuestions = async (ideaId: string): Promise<Question[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    { id: 'q1', text: 'What is the primary goal of this content?', required: true },
    { id: 'q2', text: 'Who is your target audience?', required: true },
    { id: 'q3', text: 'What key points should be emphasized?', required: true },
    { id: 'q4', text: 'What tone do you prefer? (Professional, Casual, Educational)', required: true },
    { id: 'q5', text: 'Any specific examples or case studies to include?', required: false },
  ];
};

export const generateDrafts = async (
  sessionId: string,
  answers: Record<string, string>,
  platforms: string[]
): Promise<DraftResponse> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const drafts: Draft[] = platforms.map(platform => ({
    id: `draft_${platform}_${Date.now()}`,
    platform,
    content: `Generated ${platform} content for session ${sessionId}`,
    status: 'draft',
  }));

  return {
    success: true,
    drafts,
  };
};

export const getContentSessions = async (filters?: {
  status?: string;
  platform?: string;
  dateRange?: string;
  search?: string;
}): Promise<ContentSession[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  let sessions = [...mockSessions];
  
  if (filters?.status && filters.status !== 'all') {
    sessions = sessions.filter(s => s.status === filters.status);
  }
  
  if (filters?.platform && filters.platform !== 'all') {
    sessions = sessions.filter(s => s.platforms.includes(filters.platform as Platform));
  }
  
  if (filters?.search) {
    const search = filters.search.toLowerCase();
    sessions = sessions.filter(s => s.title.toLowerCase().includes(search));
  }
  
  return sessions;
};

export const getSessionDetails = async (sessionId: string): Promise<{
  session: ContentSession;
  versions: ContentVersion[];
} | null> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const session = mockSessions.find(s => s.id === sessionId);
  if (!session) return null;
  
  const versions = mockVersions[sessionId] || [];
  
  return { session, versions };
};

export const updateContentVersion = async (
  versionId: string,
  content: string,
  metadata?: Record<string, unknown>
): Promise<ContentVersion> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id: versionId,
    sessionId: 'session_1',
    platform: 'article',
    content,
    metadata: metadata as unknown as ContentVersion['metadata'],
    status: 'draft',
  };
};

export const deleteSession = async (sessionId: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
};

export const publishContent = async (
  versionId: string,
  options: PublishOptions
): Promise<{ success: boolean; publishedTo: string[] }> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const publishedTo = options.platforms
    .filter(p => p.enabled)
    .map(p => p.platform);
  
  return { success: true, publishedTo };
};

export const regenerateContent = async (
  versionId: string,
  options: { action: string; tone?: string }
): Promise<ContentVersion> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    id: versionId,
    sessionId: 'session_1',
    platform: 'article',
    content: 'Regenerated content based on your preferences...',
    status: 'draft',
  };
};

export const autoFixViolation = async (
  versionId: string,
  violationType: string
): Promise<{ fixed: boolean; newContent: string }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    fixed: true,
    newContent: 'Content with fixed violation...',
  };
};
