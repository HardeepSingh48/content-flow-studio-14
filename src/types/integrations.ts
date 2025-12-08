export interface Integration {
  id: string;
  provider: IntegrationProvider;
  name: string;
  icon: string;
  status: 'connected' | 'not_connected';
  credentials?: Record<string, string>;
  category: 'ai' | 'social' | 'video';
}

export type IntegrationProvider = 
  | 'wordpress'
  | 'twitter'
  | 'linkedin'
  | 'gemini'
  | 'openai'
  | 'elevenlabs'
  | 'heygen';

export interface DashboardStats {
  totalContent: number;
  connectedPlatforms: number;
  publishedThisMonth: number;
  pendingDrafts: number;
}

export interface AIModelConfig {
  provider: 'gemini' | 'openai';
  apiKey: string;
  model?: string;
}

export interface SocialMediaConfig {
  provider: 'twitter' | 'linkedin' | 'wordpress';
  credentials: Record<string, string>;
}

export interface VideoConfig {
  provider: 'heygen' | 'elevenlabs';
  apiKey: string;
  voiceId?: string;
}
