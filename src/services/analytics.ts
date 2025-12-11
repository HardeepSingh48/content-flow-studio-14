import { api } from './api';

export interface AnalyticsOverview {
  totalContent: number;
  totalContentChange: number;
  publishingRate: number;
  publishedCount: number;
  draftCount: number;
  avgTimeToPublish: number;
  avgTimeToPublishChange: number;
  topPlatform: {
    name: string;
    percentage: number;
  };
}

export interface ContentByPlatform {
  platform: string;
  count: number;
  published: number;
  draft: number;
}

export interface TimelineData {
  date: string;
  created: number;
  published: number;
}

export interface ContentPerformance {
  id: string;
  title: string;
  platform: string;
  publishedDate: string | null;
  status: 'draft' | 'published' | 'scheduled';
  engagement?: number;
}

export interface IntegrationHealth {
  id: string;
  name: string;
  type: string;
  status: 'connected' | 'error' | 'disconnected';
  lastSync: string | null;
  errorMessage?: string;
}

export interface QueueItem {
  id: string;
  contentId: string;
  title: string;
  platforms: string[];
  status: 'scheduled' | 'publishing' | 'success' | 'failed';
  scheduledFor: string;
  publishedAt?: string;
  preview: string;
  results?: {
    platform: string;
    status: 'success' | 'failed';
    remoteId?: string;
    viewUrl?: string;
    error?: string;
  }[];
  logs?: {
    timestamp: string;
    event: string;
    details?: string;
  }[];
}

// Mock data generators
const generateMockAnalytics = (): AnalyticsOverview => ({
  totalContent: 47,
  totalContentChange: 12,
  publishingRate: 78,
  publishedCount: 37,
  draftCount: 10,
  avgTimeToPublish: 2.3,
  avgTimeToPublishChange: -0.5,
  topPlatform: {
    name: 'LinkedIn',
    percentage: 42,
  },
});

const generateMockPlatformData = (): ContentByPlatform[] => [
  { platform: 'Article', count: 15, published: 12, draft: 3 },
  { platform: 'Twitter', count: 22, published: 18, draft: 4 },
  { platform: 'LinkedIn', count: 28, published: 24, draft: 4 },
  { platform: 'Reel Script', count: 8, published: 5, draft: 3 },
];

const generateMockTimeline = (days: number): TimelineData[] => {
  const data: TimelineData[] = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      created: Math.floor(Math.random() * 5) + 1,
      published: Math.floor(Math.random() * 4),
    });
  }
  
  return data;
};

const generateMockPerformance = (): ContentPerformance[] => [
  { id: '1', title: 'Building a SaaS MVP in 2024', platform: 'Article', publishedDate: '2024-01-15', status: 'published', engagement: 1250 },
  { id: '2', title: '5 Tips for Better LinkedIn Posts', platform: 'LinkedIn', publishedDate: '2024-01-14', status: 'published', engagement: 892 },
  { id: '3', title: 'AI in Content Marketing Thread', platform: 'Twitter', publishedDate: '2024-01-13', status: 'published', engagement: 2340 },
  { id: '4', title: 'Product Launch Announcement', platform: 'LinkedIn', publishedDate: null, status: 'draft' },
  { id: '5', title: 'How to Scale Your Startup', platform: 'Article', publishedDate: '2024-01-10', status: 'published', engagement: 567 },
  { id: '6', title: 'Weekly Tech News Roundup', platform: 'Twitter', publishedDate: null, status: 'scheduled' },
];

const generateMockIntegrationHealth = (): IntegrationHealth[] => [
  { id: '1', name: 'WordPress', type: 'wordpress', status: 'connected', lastSync: '2024-01-15T10:30:00Z' },
  { id: '2', name: 'Twitter/X', type: 'twitter', status: 'connected', lastSync: '2024-01-15T10:25:00Z' },
  { id: '3', name: 'LinkedIn', type: 'linkedin', status: 'error', lastSync: '2024-01-14T08:00:00Z', errorMessage: 'Token expired. Please reconnect.' },
  { id: '4', name: 'HeyGen', type: 'heygen', status: 'disconnected', lastSync: null },
];

const generateMockQueue = (): QueueItem[] => [
  {
    id: 'q1',
    contentId: 'c1',
    title: 'Weekly Newsletter: Tech Trends',
    platforms: ['Article', 'LinkedIn'],
    status: 'scheduled',
    scheduledFor: new Date(Date.now() + 3600000).toISOString(),
    preview: 'This week in tech: AI continues to dominate headlines as new breakthroughs emerge...',
  },
  {
    id: 'q2',
    contentId: 'c2',
    title: 'Product Update Thread',
    platforms: ['Twitter'],
    status: 'publishing',
    scheduledFor: new Date(Date.now() - 60000).toISOString(),
    preview: '🚀 Big news! We just shipped our biggest update yet...',
  },
  {
    id: 'q3',
    contentId: 'c3',
    title: 'Q4 Results Announcement',
    platforms: ['LinkedIn', 'Twitter'],
    status: 'success',
    scheduledFor: new Date(Date.now() - 7200000).toISOString(),
    publishedAt: new Date(Date.now() - 7100000).toISOString(),
    preview: 'Excited to share our Q4 results! Revenue grew 45% YoY...',
    results: [
      { platform: 'LinkedIn', status: 'success', remoteId: 'ln_123', viewUrl: 'https://linkedin.com/post/123' },
      { platform: 'Twitter', status: 'success', remoteId: 'tw_456', viewUrl: 'https://twitter.com/post/456' },
    ],
    logs: [
      { timestamp: new Date(Date.now() - 7200000).toISOString(), event: 'Queued', details: 'Content added to publishing queue' },
      { timestamp: new Date(Date.now() - 7150000).toISOString(), event: 'Started', details: 'Publishing initiated' },
      { timestamp: new Date(Date.now() - 7100000).toISOString(), event: 'Completed', details: 'All platforms published successfully' },
    ],
  },
  {
    id: 'q4',
    contentId: 'c4',
    title: 'Case Study: Enterprise Migration',
    platforms: ['Article'],
    status: 'failed',
    scheduledFor: new Date(Date.now() - 86400000).toISOString(),
    preview: 'Learn how Company X migrated their infrastructure to the cloud...',
    results: [
      { platform: 'Article', status: 'failed', error: 'WordPress API Error: Authentication failed. Please check your credentials.' },
    ],
    logs: [
      { timestamp: new Date(Date.now() - 86400000).toISOString(), event: 'Queued', details: 'Content added to publishing queue' },
      { timestamp: new Date(Date.now() - 86350000).toISOString(), event: 'Started', details: 'Publishing initiated' },
      { timestamp: new Date(Date.now() - 86300000).toISOString(), event: 'Failed', details: 'WordPress API authentication error' },
    ],
  },
];

// API functions
export const getAnalytics = async (_dateRange: string): Promise<AnalyticsOverview> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return generateMockAnalytics();
};

export const getContentByPlatform = async (_dateRange: string): Promise<ContentByPlatform[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return generateMockPlatformData();
};

export const getTimeline = async (dateRange: string): Promise<TimelineData[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  const days = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : dateRange === '90d' ? 90 : 365;
  return generateMockTimeline(days);
};

export const getContentPerformance = async (_filters: Record<string, string>): Promise<ContentPerformance[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return generateMockPerformance();
};

export const getIntegrationHealth = async (): Promise<IntegrationHealth[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return generateMockIntegrationHealth();
};

export const getPublishQueue = async (_status?: string): Promise<QueueItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return generateMockQueue();
};

export const retryPublish = async (jobId: string): Promise<{ success: boolean }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Retrying publish for job:', jobId);
  return { success: true };
};

export const cancelPublish = async (jobId: string): Promise<{ success: boolean }> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log('Cancelling publish for job:', jobId);
  return { success: true };
};

export const updateSchedule = async (jobId: string, datetime: string): Promise<{ success: boolean }> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log('Updating schedule for job:', jobId, 'to:', datetime);
  return { success: true };
};

export const testConnection = async (integrationId: string): Promise<{ success: boolean; error?: string }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Testing connection for integration:', integrationId);
  return { success: Math.random() > 0.3 };
};
