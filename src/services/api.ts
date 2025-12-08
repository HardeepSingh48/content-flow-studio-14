import { Integration, IntegrationProvider } from '@/types/integrations';

const BASE_URL = 'http://localhost:4000/api';

// Create axios-like fetch wrapper with auth header
const createAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('cps_auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  async saveIntegration(
    provider: IntegrationProvider,
    credentials: Record<string, string>
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${BASE_URL}/integrations/${provider}`, {
        method: 'POST',
        headers: createAuthHeaders(),
        body: JSON.stringify({ credentials }),
      });

      if (!response.ok) {
        throw new Error('Failed to save integration');
      }

      return { success: true };
    } catch (error) {
      console.error('Error saving integration:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  },

  async getIntegrations(): Promise<Integration[]> {
    try {
      const response = await fetch(`${BASE_URL}/integrations`, {
        method: 'GET',
        headers: createAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch integrations');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching integrations:', error);
      return [];
    }
  },

  async testConnection(provider: IntegrationProvider): Promise<boolean> {
    try {
      const response = await fetch(`${BASE_URL}/integrations/${provider}/test`, {
        method: 'POST',
        headers: createAuthHeaders(),
      });

      return response.ok;
    } catch (error) {
      console.error('Error testing connection:', error);
      return false;
    }
  },
};
