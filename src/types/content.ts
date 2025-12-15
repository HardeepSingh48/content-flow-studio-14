export type InputType = 'url' | 'topic' | 'keywords' | 'feed';
export type ContentStatus = 'idea' | 'questions' | 'drafts' | 'ready' | 'published';
export type Platform = 'article' | 'twitter' | 'linkedin' | 'reel';

export interface ContentSession {
  id: string;
  title: string;
  inputType: InputType;
  inputValue: string | string[];
  status: ContentStatus;
  currentStep: number;
  selectedIdeaId?: string;
  selectedIdea?: {
    title: string;
    description: string;
  };
  answers?: Record<string, string>;
  platforms: Platform[];
  createdAt: string;
  updatedAt: string;
}

export interface ContentVersion {
  id: string;
  sessionId: string;
  platform: Platform;
  content: string;
  metadata?: ArticleMetadata | TwitterMetadata | LinkedInMetadata | ReelMetadata;
  status: 'draft' | 'ready' | 'published';
  publishedAt?: string;
  publishedTo?: string[];
}

export interface ArticleMetadata {
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  wordCount: number;
}

export interface TwitterMetadata {
  tweets: Tweet[];
  hashtags: string[];
}

export interface Tweet {
  id: string;
  content: string;
  order: number;
}

export interface LinkedInMetadata {
  hashtags: string[];
  characterCount: number;
}

export interface ReelMetadata {
  scenes: Scene[];
  totalDuration: number;
}

export interface Scene {
  id: string;
  sceneNumber: number;
  duration: number;
  script: string;
  visualNotes: string;
}

export interface GuardrailViolation {
  id: string;
  type: 'character_limit' | 'missing_cta' | 'weak_hook' | 'no_hashtags';
  severity: 'warning' | 'error';
  message: string;
  canAutoFix: boolean;
}

export interface PublishOptions {
  platforms: {
    platform: string;
    enabled: boolean;
    integrationId?: string;
    options?: Record<string, string>;
  }[];
  schedule: 'now' | 'later';
  scheduledAt?: string;
  scheduledFor?: string;
  wordpressStatus?: 'publish' | 'draft';
  metadata?: Record<string, unknown>;
}
