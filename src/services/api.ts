import axios, { AxiosInstance, AxiosError } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

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

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('token');
          window.location.href = '/signin';
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

  async deleteIntegration(id: string) {
    const { data } = await this.client.delete(`/integrations/${id}`);
    return data;
  }

  async testIntegration(provider: string, credentials: any) {
    const { data } = await this.client.post('/integrations/test', {
      provider,
      credentials,
    });
    return data;
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
}

export const api = new ApiService();
