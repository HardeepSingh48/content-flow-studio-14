import { ContentSession, ContentVersion, Platform, PublishOptions } from '@/types/content';
import { api } from './api';

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

/**
 * Generate content ideas based on user input
 * @param type - Input type: 'url', 'topic', 'keywords', or 'feed'
 * @param input - The input value (string or array of keywords)
 * @returns Session ID and generated ideas
 */
export const generateIdeas = async (
  type: 'url' | 'topic' | 'keywords' | 'feed',
  input: string | string[]
): Promise<IdeaResponse> => {
  try {
    const inputValue = Array.isArray(input) ? input.join(', ') : input;
    const data = await api.generateIdeas(type, inputValue);

    return {
      sessionId: data.sessionId,
      ideas: data.ideas.map((idea: any) => ({
        id: idea.id,
        title: idea.title,
        description: idea.description,
      })),
    };
  } catch (error) {
    console.error('Error generating ideas:', error);
    throw error;
  }
};

/**
 * Generate refinement questions for a selected idea
 * @param ideaId - The ID of the selected idea
 * @returns Array of questions to refine the content
 */
export const generateQuestions = async (ideaId: string): Promise<Question[]> => {
  try {
    const data = await api.generateQuestions(ideaId);

    return data.questions.map((q: any) => ({
      id: q.id,
      text: q.questionText,
      required: true,
    }));
  } catch (error) {
    console.error('Error generating questions:', error);
    throw error;
  }
};

/**
 * Generate platform-specific content drafts
 * @param sessionId - The content session ID
 * @param answers - User's answers to refinement questions
 * @param platforms - Target platforms for content generation
 * @returns Generated drafts for each platform
 */
export const generateDrafts = async (
  sessionId: string,
  answers: Record<string, string>,
  platforms: string[]
): Promise<DraftResponse> => {
  try {
    // Convert answers object to array format expected by backend
    const answersArray = Object.entries(answers).map(([questionId, answerText]) => ({
      questionId,
      answerText,
    }));

    const data = await api.generateDrafts(sessionId, answersArray, platforms);

    return {
      success: true,
      drafts: data.versions.map((version: any) => ({
        id: version.id,
        platform: version.platform,
        content: version.body,
        status: version.status,
      })),
    };
  } catch (error) {
    console.error('Error generating drafts:', error);
    throw error;
  }
};

/**
 * Get all content sessions with optional filtering
 * @param filters - Optional filters for status, platform, date range, and search
 * @returns Array of content sessions
 */
export const getContentSessions = async (filters?: {
  status?: string;
  platform?: string;
  dateRange?: string;
  search?: string;
}): Promise<ContentSession[]> => {
  try {
    const data = await api.getContentSessions({
      status: filters?.status !== 'all' ? filters?.status : undefined,
      platform: filters?.platform !== 'all' ? filters?.platform : undefined,
      search: filters?.search,
    });

    return data.sessions.map((session: any) => ({
      id: session.id,
      title: session.idea?.title || 'Untitled',
      inputType: session.inputType,
      inputValue: session.inputValue,
      status: session.status,
      currentStep: determineCurrentStep(session.status),
      selectedIdeaId: session.selectedIdeaId,
      selectedIdea: session.idea ? {
        title: session.idea.title,
        description: session.idea.description,
      } : undefined,
      answers: session.answers || {},
      platforms: session.versions?.map((v: any) => v.platform) || [],
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
    }));
  } catch (error) {
    console.error('Error fetching content sessions:', error);
    throw error;
  }
};

/**
 * Helper function to determine current step based on session status
 */
const determineCurrentStep = (status: string): number => {
  switch (status) {
    case 'IDEAS':
      return 2;
    case 'QUESTIONS':
      return 3;
    case 'DRAFTS':
    case 'READY':
      return 4;
    default:
      return 1;
  }
};

/**
 * Get detailed information about a specific content session
 * @param sessionId - The session ID
 * @returns Session details with all content versions
 */
export const getSessionDetails = async (sessionId: string): Promise<{
  session: ContentSession;
  versions: ContentVersion[];
} | null> => {
  try {
    const data = await api.getSessionDetails(sessionId);

    if (!data || !data.session) {
      return null;
    }

    const session: ContentSession = {
      id: data.session.id,
      title: data.session.idea?.title || 'Untitled',
      inputType: data.session.inputType,
      inputValue: data.session.inputValue,
      status: data.session.status,
      currentStep: determineCurrentStep(data.session.status),
      selectedIdeaId: data.session.selectedIdeaId,
      selectedIdea: data.session.idea ? {
        title: data.session.idea.title,
        description: data.session.idea.description,
      } : undefined,
      answers: data.session.answers || {},
      platforms: data.versions?.map((v: any) => v.platform) || [],
      createdAt: data.session.createdAt,
      updatedAt: data.session.updatedAt,
    };

    const versions: ContentVersion[] = (data.versions || []).map((version: any) => ({
      id: version.id,
      sessionId: version.sessionId,
      platform: version.platform,
      content: version.body,
      metadata: version.metadata || {},
      status: version.status,
    }));

    return { session, versions };
  } catch (error) {
    console.error('Error fetching session details:', error);
    throw error;
  }
};

/**
 * Update a content version's text and metadata
 * @param versionId - The version ID to update
 * @param content - New content text
 * @param metadata - Optional metadata updates
 * @returns Updated content version
 */
export const updateContentVersion = async (
  versionId: string,
  content: string,
  metadata?: Record<string, unknown>
): Promise<ContentVersion> => {
  try {
    const data = await api.updateContentVersion(versionId, content, metadata);

    return {
      id: data.id,
      sessionId: data.sessionId,
      platform: data.platform,
      content: data.body,
      metadata: data.metadata || {},
      status: data.status,
    };
  } catch (error) {
    console.error('Error updating content version:', error);
    throw error;
  }
};

/**
 * Delete a content session and all associated versions
 * @param sessionId - The session ID to delete
 * @returns Success status
 */
export const deleteSession = async (sessionId: string): Promise<boolean> => {
  try {
    await api.deleteSession(sessionId);
    return true;
  } catch (error) {
    console.error('Error deleting session:', error);
    throw error;
  }
};

/**
 * Publish content to selected platforms
 * @param versionId - The content version to publish
 * @param options - Publishing options including platforms and scheduling
 * @returns Publishing results
 */
export const publishContent = async (
  versionId: string,
  options: PublishOptions
): Promise<{ success: boolean; publishedTo: string[] }> => {
  try {
    const integrationIds = options.platforms
      .filter(p => p.enabled)
      .map(p => p.integrationId)
      .filter(Boolean) as string[];

    if (integrationIds.length === 0) {
      throw new Error('No platforms selected for publishing');
    }

    const data = await api.publishContent(
      versionId,
      integrationIds,
      options.scheduledFor,
      options.metadata
    );

    return {
      success: true,
      publishedTo: data.jobs?.map((job: any) => job.integration?.provider) || [],
    };
  } catch (error) {
    console.error('Error publishing content:', error);
    throw error;
  }
};

/**
 * Regenerate content with different parameters
 * NOTE: This function requires backend implementation
 * @param versionId - The version to regenerate
 * @param options - Regeneration options (action, tone, etc.)
 * @returns Regenerated content version
 */
export const regenerateContent = async (
  versionId: string,
  options: { action: string; tone?: string }
): Promise<ContentVersion> => {
  // TODO: Implement backend endpoint POST /api/content/regenerate
  console.warn('regenerateContent: Backend endpoint not yet implemented');

  // Temporary fallback - return current version
  throw new Error('Content regeneration feature requires backend implementation');
};

/**
 * Auto-fix content guardrail violations
 * NOTE: This function requires backend implementation
 * @param versionId - The version with violations
 * @param violationType - Type of violation to fix
 * @returns Fixed content
 */
export const autoFixViolation = async (
  versionId: string,
  violationType: string
): Promise<{ fixed: boolean; newContent: string }> => {
  // TODO: Implement backend endpoint POST /api/content/auto-fix
  console.warn('autoFixViolation: Backend endpoint not yet implemented');

  throw new Error('Auto-fix feature requires backend implementation');
};
