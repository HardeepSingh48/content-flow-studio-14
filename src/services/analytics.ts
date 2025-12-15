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

/**
 * Get analytics overview/dashboard statistics
 * @param _dateRange - Date range filter (currently unused, backend determines range)
 * @returns Analytics overview data
 */
export const getAnalytics = async (_dateRange: string): Promise<AnalyticsOverview> => {
  try {
    const data = await api.getDashboardStats();

    // Map backend response to frontend interface
    return {
      totalContent: data.stats.totalContent || 0,
      totalContentChange: 0, // Backend doesn't provide this yet
      publishingRate: data.stats.successRate || 0,
      publishedCount: data.stats.publishedCount || 0,
      draftCount: data.stats.draftCount || 0,
      avgTimeToPublish: data.stats.avgTimeToPublish || 0,
      avgTimeToPublishChange: 0, // Backend doesn't provide this yet
      topPlatform: {
        name: 'LinkedIn', // Backend doesn't provide this yet
        percentage: 42,
      },
    };
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
};

/**
 * Get content distribution by platform
 * @param _dateRange - Date range filter
 * @returns Content counts by platform
 */
export const getContentByPlatform = async (_dateRange: string): Promise<ContentByPlatform[]> => {
  try {
    const data = await api.getContentPerformance();

    // Map backend response to platform distribution
    return data.byPlatform.map((item: any) => ({
      platform: item.platform,
      count: item.total || 0,
      published: item.published || 0,
      draft: item.draft || 0,
    }));
  } catch (error) {
    console.error('Error fetching content by platform:', error);
    throw error;
  }
};

/**
 * Get timeline data for content creation and publishing
 * @param dateRange - Date range: '7d', '30d', '90d', or '1y'
 * @returns Timeline data points
 */
export const getTimeline = async (dateRange: string): Promise<TimelineData[]> => {
  try {
    const days = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : dateRange === '90d' ? 90 : 365;
    const data = await api.getPublishingAnalytics(days);

    // Map backend timeline to frontend format
    if (data.timeline && Array.isArray(data.timeline)) {
      return data.timeline.map((item: any) => ({
        date: item.date,
        created: 0, // Backend doesn't track created separately yet
        published: (item.successful || 0) + (item.failed || 0),
      }));
    }

    // Fallback to empty array if no timeline data
    return [];
  } catch (error) {
    console.error('Error fetching timeline:', error);
    throw error;
  }
};

/**
 * Get content performance metrics
 * @param _filters - Filter options (currently unused)
 * @returns Array of content performance data
 */
export const getContentPerformance = async (_filters: Record<string, string>): Promise<ContentPerformance[]> => {
  try {
    // Get content sessions which include performance data
    const data = await api.getContentSessions();

    return data.sessions.map((session: any) => ({
      id: session.id,
      title: session.idea?.title || 'Untitled',
      platform: session.versions?.[0]?.platform || 'ARTICLE',
      publishedDate: session.status === 'READY' ? session.updatedAt : null,
      status: session.status === 'READY' ? 'published' : 'draft',
      engagement: undefined, // Backend doesn't track engagement yet
    }));
  } catch (error) {
    console.error('Error fetching content performance:', error);
    throw error;
  }
};

/**
 * Get integration health status
 * @returns Array of integration health data
 */
export const getIntegrationHealth = async (): Promise<IntegrationHealth[]> => {
  try {
    const data = await api.getIntegrationHealth();

    return data.integrations.map((integration: any) => ({
      id: integration.id,
      name: integration.provider,
      type: integration.provider.toLowerCase(),
      status: integration.status === 'HEALTHY' ? 'connected' :
        integration.status === 'WARNING' ? 'error' : 'disconnected',
      lastSync: integration.lastSuccessful,
      errorMessage: integration.status !== 'HEALTHY' ? 'Connection issue detected' : undefined,
    }));
  } catch (error) {
    console.error('Error fetching integration health:', error);
    throw error;
  }
};

/**
 * Get publishing queue items
 * @param status - Optional status filter
 * @returns Array of queue items
 */
export const getPublishQueue = async (status?: string): Promise<QueueItem[]> => {
  try {
    const data = await api.getPublishQueue(status);

    return data.jobs.map((job: any) => ({
      id: job.id,
      contentId: job.contentVersionId || job.id,
      title: job.content?.platform || 'Content',
      platforms: [job.integration?.provider || 'Unknown'],
      status: job.status.toLowerCase() as 'scheduled' | 'publishing' | 'success' | 'failed',
      scheduledFor: job.scheduledFor || job.createdAt,
      publishedAt: job.completedAt,
      preview: job.content?.body?.substring(0, 100) || 'No preview available',
      results: job.status === 'SUCCESS' || job.status === 'FAILED' ? [{
        platform: job.integration?.provider || 'Unknown',
        status: job.status === 'SUCCESS' ? 'success' : 'failed',
        remoteId: job.remoteId,
        viewUrl: job.remoteUrl,
        error: job.log?.error,
      }] : undefined,
      logs: job.log ? [{
        timestamp: job.createdAt,
        event: job.status,
        details: job.log.error || 'Job processed',
      }] : undefined,
    }));
  } catch (error) {
    console.error('Error fetching publish queue:', error);
    throw error;
  }
};

/**
 * Retry a failed publish job
 * @param jobId - The job ID to retry
 * @returns Success status
 */
export const retryPublish = async (jobId: string): Promise<{ success: boolean }> => {
  try {
    await api.retryPublish(jobId);
    return { success: true };
  } catch (error) {
    console.error('Error retrying publish:', error);
    throw error;
  }
};

/**
 * Cancel a scheduled publish job
 * @param jobId - The job ID to cancel
 * @returns Success status
 */
export const cancelPublish = async (jobId: string): Promise<{ success: boolean }> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000/api'}/publish/cancel/${jobId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to cancel publish job');
    }

    return { success: true };
  } catch (error) {
    console.error('Error cancelling publish:', error);
    throw error;
  }
};

/**
 * Update the schedule for a publish job
 * @param jobId - The job ID to update
 * @param datetime - New scheduled datetime
 * @returns Success status
 */
export const updateSchedule = async (jobId: string, datetime: string): Promise<{ success: boolean }> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000/api'}/publish/schedule/${jobId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        scheduledFor: datetime,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update schedule');
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating schedule:', error);
    throw error;
  }
};

/**
 * Test connection to an integration
 * @param integrationId - The integration ID to test
 * @returns Test result
 */
export const testConnection = async (integrationId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    // Get integration details first
    const integrations = await api.getIntegrations();
    const integration = integrations.integrations.find((i: any) => i.id === integrationId);

    if (!integration) {
      return { success: false, error: 'Integration not found' };
    }

    // Test connection using the provider and credentials
    const result = await api.testIntegration(integration.provider, {});

    return {
      success: result.success,
      error: result.message,
    };
  } catch (error: any) {
    console.error('Error testing connection:', error);
    return {
      success: false,
      error: error.message || 'Connection test failed',
    };
  }
};
