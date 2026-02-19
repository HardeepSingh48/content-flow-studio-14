import axios, { AxiosInstance, AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Retry configuration
const RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000, // Start with 1 second
  retryCondition: (error: AxiosError) => {
    // Retry on network errors, 5xx errors, or specific 4xx errors that might be transient
    return (
      !error.response || // Network error
      error.response.status >= 500 || // Server errors
      error.response.status === 429 || // Rate limited
      error.code === 'ECONNABORTED' || // Timeout
      error.message.includes('timeout')
    );
  }
};


class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor for error handling with retry logic
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const config = error.config;

        // Check if we should retry
        if (
          config &&
          RETRY_CONFIG.retryCondition(error) &&
          (!(config as any)._retryCount || (config as any)._retryCount < RETRY_CONFIG.maxRetries)
        ) {
          (config as any)._retryCount = ((config as any)._retryCount || 0) + 1;

          // Exponential backoff
          const delay = RETRY_CONFIG.retryDelay * Math.pow(2, (config as any)._retryCount - 1);

          // Show retry toast for user feedback
          toast({
            title: "Retrying...",
            description: `Connection failed. Retrying (${(config as any)._retryCount}/${RETRY_CONFIG.maxRetries})...`,
            variant: "default",
          });

          // Wait and retry
          await new Promise(resolve => setTimeout(resolve, delay));
          return this.client(config);
        }
        const errorData = error.response?.data as any;

        // Handle specific error codes
        if (errorData?.error?.code) {
          const errorCode = errorData.error.code;
          const userMessage = errorData.error.userMessage;

          switch (errorCode) {
            case 'SESSION_EXPIRED':
            case 'INVALID_TOKEN':
              toast({
                title: "Session Expired",
                description: "Your session has expired. Redirecting to sign in...",
                variant: "destructive",
              });
              localStorage.removeItem('token');
              setTimeout(() => {
                window.location.href = '/signin';
              }, 2000);
              break;

            case 'INTEGRATION_NOT_FOUND':
              toast({
                title: "No AI Provider Connected",
                description: "No content generation API connected. Please go to Settings > Integrations and connect OpenAI or another AI provider.",
                variant: "destructive",
              });
              break;

            case 'API_KEY_INVALID':
            case 'API_KEY_EXPIRED':
              toast({
                title: "API Key Invalid",
                description: "Your API key is invalid or expired. Please update it in Settings.",
                variant: "destructive",
              });
              break;

            case 'RATE_LIMIT_EXCEEDED':
              toast({
                title: "Rate Limit Exceeded",
                description: "API rate limit exceeded. Please try again in a few minutes.",
                variant: "destructive",
              });
              break;

            case 'PLATFORM_NOT_CONNECTED':
              toast({
                title: "Platform Not Connected",
                description: `Cannot publish: No ${errorData.error.details?.platform || 'platform'} account connected. Please add one in Settings.`,
                variant: "destructive",
              });
              break;

            case 'CONTENT_TOO_LONG':
              toast({
                title: "Content Too Long",
                description: `Your content exceeds the maximum length of ${errorData.error.details?.maxLength || 'X'} characters.`,
                variant: "destructive",
              });
              break;

            case 'DRAFT_SAVE_FAILED':
              toast({
                title: "Save Failed",
                description: "Failed to save draft. Your changes may be lost.",
                variant: "destructive",
              });
              break;

            case 'OAUTH_FAILED':
              toast({
                title: "Authentication Failed",
                description: "Unable to connect with the provider. Please check your internet connection.",
                variant: "destructive",
              });
              break;

            case 'EMAIL_EXISTS':
              toast({
                title: "Account Exists",
                description: "This account is already connected to another user.",
                variant: "destructive",
              });
              break;

            case 'INTEGRATION_ENCRYPTION_FAILED':
              toast({
                title: "Encryption Failed",
                description: "Failed to save integration. Please try again.",
                variant: "destructive",
              });
              break;

            case 'INTEGRATION_DELETE_FAILED':
              toast({
                title: "Cannot Delete Integration",
                description: "Cannot delete this integration while publish jobs are pending.",
                variant: "destructive",
              });
              break;

            case 'PUBLISH_JOB_LIMIT_EXCEEDED':
              toast({
                title: "Job Limit Exceeded",
                description: `You've reached the maximum number of pending publish jobs (${errorData.error.details?.maxJobs || 'X'}/${errorData.error.details?.currentJobs || 'MAX'}).`,
                variant: "destructive",
              });
              break;

            case 'SCHEDULE_PAST_DATE':
              toast({
                title: "Invalid Schedule Date",
                description: "Cannot schedule posts in the past. Please select a future date.",
                variant: "destructive",
              });
              break;

            case 'PLATFORM_API_ERROR':
              toast({
                title: "Publishing Failed",
                description: `Publishing failed: ${errorData.error.details?.platform || 'Platform'} API error. Please check your connection.`,
                variant: "destructive",
              });
              break;

            case 'PLATFORM_TOKEN_EXPIRED':
              toast({
                title: "Token Expired",
                description: `Your ${errorData.error.details?.platform || 'platform'} access token has expired. Please reconnect in Settings.`,
                variant: "destructive",
              });
              break;

            case 'CONTENT_REJECTED':
              toast({
                title: "Content Rejected",
                description: `${errorData.error.details?.platform || 'Platform'} rejected your content. It may violate their policies.`,
                variant: "destructive",
              });
              break;

            case 'ANALYTICS_LOAD_FAILED':
              toast({
                title: "Analytics Error",
                description: "Failed to load analytics data. Please refresh the page.",
                variant: "destructive",
              });
              break;

            case 'PLATFORM_METRICS_EXPIRED':
              toast({
                title: "Metrics Unavailable",
                description: `Cannot fetch ${errorData.error.details?.platform || 'platform'} metrics: API credentials expired. Please reconnect.`,
                variant: "destructive",
              });
              break;

            case 'PLATFORM_RATE_LIMIT':
              toast({
                title: "Rate Limit",
                description: `${errorData.error.details?.platform || 'Platform'} rate limit reached. Metrics will update in ${errorData.error.details?.retryIn || 'X'} minutes.`,
                variant: "destructive",
              });
              break;

            default:
              // Generic error handling
              if (error.response?.status === 401) {
                toast({
                  title: "Session Expired",
                  description: "Your session has expired. Redirecting to sign in...",
                  variant: "destructive",
                });
                localStorage.removeItem('token');
                setTimeout(() => {
                  window.location.href = '/signin';
                }, 2000);
              } else if (error.response?.status === 429) {
                toast({
                  title: "Too Many Requests",
                  description: "API rate limit exceeded. Please try again later.",
                  variant: "destructive",
                });
              } else if (!navigator.onLine) {
                toast({
                  title: "No Internet Connection",
                  description: "No internet connection. Please check your network.",
                  variant: "destructive",
                });
              } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
                toast({
                  title: "Request Timeout",
                  description: "Request timeout. Please check your connection and try again.",
                  variant: "destructive",
                });
              } else {
                toast({
                  title: "Error",
                  description: userMessage || "An unexpected error occurred. Please try again.",
                  variant: "destructive",
                });
              }
              break;
          }
        } else {
          // Handle non-API errors (network issues, etc.)
          if (!navigator.onLine) {
            toast({
              title: "No Internet Connection",
              description: "No internet connection. Please check your network.",
              variant: "destructive",
            });
          } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
            toast({
              title: "Request Timeout",
              description: "Request timeout. Please check your connection and try again.",
              variant: "destructive",
            });
          } else if (error.response?.status >= 500) {
            toast({
              title: "Server Error",
              description: "Server is temporarily unavailable. Please try again in a few minutes.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Error",
              description: "An unexpected error occurred. Please try again.",
              variant: "destructive",
            });
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Auth
  async register(email: string, password: string) {
    const { data } = await this.client.post('/auth/register', { email, password });
    return data;
  }

  async login(email: string, password: string) {
    const { data } = await this.client.post('/auth/login', { email, password });
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  }

  logout() {
    localStorage.removeItem('token');
  }

  // Integrations
  async getIntegrationStatus() {
    const { data } = await this.client.get('/integrations/status');
    return data;
  }

  async getIntegrations() {
    const { data } = await this.client.get('/integrations');
    return data;
  }

  async createIntegration(provider: string, credentials: any, metadata?: any) {
    const { data } = await this.client.post('/integrations', {
      provider,
      credentials,
      metadata,
    });
    return data;
  }

  async connectLinkedInPages(masterIntegrationId: string, selectedPages: any[]) {
    const { data } = await this.client.post('/integrations/linkedin/pages', {
      masterIntegrationId,
      selectedPages,
    });
    return data;
  }

  async deleteIntegration(id: string) {
    const { data } = await this.client.delete(`/integrations/${id}`);
    return data;
  }

  async testIntegration(provider: string, credentials: any) {
    const { data } = await this.client.post('/integrations/test', {
      provider,
      credentials: credentials.integrationId ? undefined : credentials,
      integrationId: credentials.integrationId,
    });
    return data;
  }

  async submitIntegrationRequest(requestData: any) {
    const { data } = await this.client.post('/integration-requests', requestData);
    return data;
  }

  async sendInviteRequest(data: any) {
    const response = await this.client.post('/invite', data);
    return response.data;
  }

  // Content Generation
  async generateIdeas(type: string, input: string) {
    const { data } = await this.client.post('/content/ideas', { type, input });
    return data;
  }

  async generateQuestions(ideaId: string) {
    const { data } = await this.client.post('/content/questions', { ideaId });
    return data;
  }

  async generateDrafts(sessionId: string, answers: any[], platforms: string[]) {
    const { data } = await this.client.post('/content/drafts', {
      sessionId,
      answers,
      platforms,
    });
    return data;
  }

  // Content Management
  async getContentSessions(filters?: { status?: string; platform?: string; search?: string }) {
    const { data } = await this.client.get('/content/sessions', { params: filters });
    return data;
  }

  async getSessionDetails(sessionId: string) {
    const { data } = await this.client.get(`/content/sessions/${sessionId}`);
    return data;
  }

  async getSessionDrafts(sessionId: string) {
    const { data } = await this.client.get(`/content/sessions/${sessionId}/drafts`);
    return data;
  }

  async updateContentVersion(versionId: string, body: string, metadata?: any) {
    const { data } = await this.client.patch(`/content/versions/${versionId}`, {
      body,
      metadata,
    });
    return data;
  }

  async deleteSession(sessionId: string) {
    const { data } = await this.client.delete(`/content/sessions/${sessionId}`);
    return data;
  }

  // Publishing
  async publishContent(versionId: string, integrationIds: string[], scheduledFor?: string, metadata?: any) {
    const { data } = await this.client.post('/publish/publish', {
      versionId,
      integrationIds,
      scheduledFor,
      metadata,
    });
    return data;
  }

  async getPublishQueue(status?: string) {
    const { data } = await this.client.get('/publish/queue', { params: { status } });
    return data;
  }

  async retryPublish(jobId: string) {
    const { data } = await this.client.post(`/publish/retry/${jobId}`);
    return data;
  }

  // Analytics
  async getDashboardStats() {
    const { data } = await this.client.get('/analytics/dashboard');
    return data;
  }

  async getContentPerformance(startDate?: string, endDate?: string) {
    const { data } = await this.client.get('/analytics/content-performance', {
      params: { startDate, endDate },
    });
    return data;
  }

  async getPublishingAnalytics(days?: number) {
    const { data } = await this.client.get('/analytics/publishing', {
      params: { days },
    });
    return data;
  }

  async getIntegrationHealth() {
    const { data } = await this.client.get('/analytics/integration-health');
    return data;
  }

  // User
  async getProfile() {
    const { data } = await this.client.get('/users/profile');
    return data;
  }

  async updateProfile(updates: any) {
    const { data } = await this.client.patch('/users/profile', updates);
    return data;
  }

  async getPreferences() {
    const { data } = await this.client.get('/users/preferences');
    return data;
  }

  async updatePreferences(preferences: any) {
    const { data } = await this.client.patch('/users/preferences', preferences);
    return data;
  }

  // User Niche APIs
  async getUserProfileWithNiche() {
    const { data } = await this.client.get('/users/profile/niche');
    return data;
  }

  async updateUserNiche(niche: string, nicheDetails?: any) {
    const { data } = await this.client.put('/users/niche', { niche, nicheDetails });
    return data;
  }

  // ElevenLabs / Reel Generation
  async getVoices() {
    const { data } = await this.client.get('/reels/voices');
    return data;
  }

  async generateReelAudio(scriptText: string, voiceId: string, scriptId?: string) {
    const { data } = await this.client.post('/reels/generate-audio', {
      scriptText,
      voiceId,
      scriptId
    });
    return data;
  }

  // NEW WORKFLOW: Topic Analysis & Platform Content Generation
  async createContentSession(topic: string, inputType = 'TOPIC') {
    const { data } = await this.client.post('/content/sessions', { topic, inputType });
    return data;
  }

  async getContentSession(sessionId: string) {
    const { data } = await this.client.get(`/content/sessions/${sessionId}`);
    return data;
  }

  async getSessionStatus(sessionId: string) {
    const { data } = await this.client.get(`/content/sessions/${sessionId}/status`);
    return data;
  }

  async submitAnswers(sessionId: string, answers: Array<{ questionId: string; answer: string }>) {
    const { data } = await this.client.post(`/content/sessions/${sessionId}/answers`, { answers });
    return data;
  }

  async getGeneratedContent(sessionId: string) {
    const { data } = await this.client.get(`/content/sessions/${sessionId}/content`);
    return data;
  }

  async regeneratePlatformContent(sessionId: string, platform: string, modifications?: any) {
    const { data } = await this.client.post(`/content/sessions/${sessionId}/regenerate`, {
      platform,
      modifications,
    });
    return data;
  }

  // Admin
  async adminGetUsers() {
    const { data } = await this.client.get('/admin/users');
    return data;
  }

  async adminUpdateUserRole(userId: string, role: string) {
    const { data } = await this.client.patch(`/admin/users/${userId}/role`, { role });
    return data;
  }
}

export const api = new ApiService();
