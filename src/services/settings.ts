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

const mockProfile: UserProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatarUrl: undefined,
};

const mockPreferences: UserPreferences = {
  defaultTone: 'professional',
  defaultLength: 'medium',
  autoFixGuardrails: true,
  notifications: {
    contentPublished: true,
    publishingFailures: true,
    weeklySummary: false,
  },
  defaultPlatforms: ['article', 'linkedin'],
  aiModel: 'gpt-4',
  temperature: 0.7,
  maxTokens: 2048,
};

export const getProfile = async (): Promise<UserProfile> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockProfile;
};

export const updateProfile = async (data: Partial<UserProfile>): Promise<UserProfile> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log('Updating profile:', data);
  return { ...mockProfile, ...data };
};

export const getPreferences = async (): Promise<UserPreferences> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockPreferences;
};

export const updatePreferences = async (data: Partial<UserPreferences>): Promise<UserPreferences> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log('Updating preferences:', data);
  return { ...mockPreferences, ...data };
};

export const uploadAvatar = async (file: File): Promise<{ url: string }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Uploading avatar:', file.name);
  return { url: URL.createObjectURL(file) };
};

export const updatePassword = async (currentPassword: string, newPassword: string): Promise<{ success: boolean }> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log('Updating password');
  return { success: true };
};
