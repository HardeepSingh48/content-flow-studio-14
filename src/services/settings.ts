import { api } from './api';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface UserPreferences {
  defaultTone: 'professional' | 'casual' | 'friendly' | 'formal';
  defaultLength: 'short' | 'medium' | 'long';
  autoFixGuardrails: boolean;
  notifications: {
    contentPublished: boolean;
    publishingFailures: boolean;
    weeklySummary: boolean;
  };
  defaultPlatforms: string[];
  aiModel: 'gpt-4' | 'gpt-3.5' | 'claude' | 'gemini';
  temperature: number;
  maxTokens: number;
}

/**
 * Get user profile information
 * @returns User profile data
 */
export const getProfile = async (): Promise<UserProfile> => {
  try {
    const data = await api.getProfile();

    return {
      id: data.id,
      name: data.name || data.email.split('@')[0],
      email: data.email,
      avatarUrl: data.avatar,
    };
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

/**
 * Update user profile information
 * @param updates - Profile fields to update
 * @returns Updated profile data
 */
export const updateProfile = async (updates: Partial<UserProfile>): Promise<UserProfile> => {
  try {
    const data = await api.updateProfile({
      name: updates.name,
      avatar: updates.avatarUrl,
    });

    return {
      id: data.id,
      name: data.name || data.email.split('@')[0],
      email: data.email,
      avatarUrl: data.avatar,
    };
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

/**
 * Get user preferences
 * @returns User preferences data
 */
export const getPreferences = async (): Promise<UserPreferences> => {
  try {
    const data = await api.getPreferences();

    // Map backend preferences to frontend format
    return {
      defaultTone: data.tone || 'professional',
      defaultLength: data.length || 'medium',
      autoFixGuardrails: data.autoFix !== false,
      notifications: {
        contentPublished: data.notifications?.contentPublished !== false,
        publishingFailures: data.notifications?.publishingFailures !== false,
        weeklySummary: data.notifications?.weeklySummary || false,
      },
      defaultPlatforms: data.platforms || ['article', 'linkedin'],
      aiModel: data.aiModel || 'gpt-4',
      temperature: data.temperature || 0.7,
      maxTokens: data.maxTokens || 2048,
    };
  } catch (error) {
    console.error('Error fetching preferences:', error);
    throw error;
  }
};

/**
 * Update user preferences
 * @param updates - Preference fields to update
 * @returns Updated preferences data
 */
export const updatePreferences = async (updates: Partial<UserPreferences>): Promise<UserPreferences> => {
  try {
    // Map frontend preferences to backend format
    const backendUpdates: any = {};

    if (updates.defaultTone) backendUpdates.tone = updates.defaultTone;
    if (updates.defaultLength) backendUpdates.length = updates.defaultLength;
    if (updates.autoFixGuardrails !== undefined) backendUpdates.autoFix = updates.autoFixGuardrails;
    if (updates.notifications) backendUpdates.notifications = updates.notifications;
    if (updates.defaultPlatforms) backendUpdates.platforms = updates.defaultPlatforms;
    if (updates.aiModel) backendUpdates.aiModel = updates.aiModel;
    if (updates.temperature !== undefined) backendUpdates.temperature = updates.temperature;
    if (updates.maxTokens !== undefined) backendUpdates.maxTokens = updates.maxTokens;

    const data = await api.updatePreferences(backendUpdates);

    return {
      defaultTone: data.tone || 'professional',
      defaultLength: data.length || 'medium',
      autoFixGuardrails: data.autoFix !== false,
      notifications: {
        contentPublished: data.notifications?.contentPublished !== false,
        publishingFailures: data.notifications?.publishingFailures !== false,
        weeklySummary: data.notifications?.weeklySummary || false,
      },
      defaultPlatforms: data.platforms || ['article', 'linkedin'],
      aiModel: data.aiModel || 'gpt-4',
      temperature: data.temperature || 0.7,
      maxTokens: data.maxTokens || 2048,
    };
  } catch (error) {
    console.error('Error updating preferences:', error);
    throw error;
  }
};

/**
 * Upload user avatar
 * NOTE: Backend endpoint not yet implemented
 * @param file - Avatar image file
 * @returns Avatar URL
 */
export const uploadAvatar = async (file: File): Promise<{ url: string }> => {
  console.warn('uploadAvatar: Backend endpoint not yet implemented');
  console.log('Uploading avatar:', file.name);

  // TODO: Implement backend endpoint POST /api/users/avatar
  // For now, create a temporary blob URL
  return { url: URL.createObjectURL(file) };
};

/**
 * Update user password
 * @param currentPassword - Current password
 * @param newPassword - New password
 * @returns Success status
 */
export const updatePassword = async (currentPassword: string, newPassword: string): Promise<{ success: boolean }> => {
  try {
    await api.updateProfile({
      currentPassword,
      newPassword,
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};
