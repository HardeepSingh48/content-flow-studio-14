// Content generation API service

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

export const generateIdeas = async (
  type: 'url' | 'topic' | 'keywords' | 'feed',
  input: string | string[]
): Promise<IdeaResponse> => {
  // Mock response for now - will connect to real API later
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
  // Mock response for now
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
  // Mock response for now
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
