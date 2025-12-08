// Placeholder auth utilities for future backend integration

const AUTH_TOKEN_KEY = 'cps_auth_token';
const USER_KEY = 'cps_user';

export interface User {
  id: string;
  email: string;
  name?: string;
}

export const auth = {
  getToken: (): string | null => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  setToken: (token: string): void => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  },

  removeToken: (): void => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },

  getUser: (): User | null => {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr) as User;
    } catch {
      return null;
    }
  },

  setUser: (user: User): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeUser: (): void => {
    localStorage.removeItem(USER_KEY);
  },

  isAuthenticated: (): boolean => {
    return !!auth.getToken();
  },

  logout: (): void => {
    auth.removeToken();
    auth.removeUser();
  },

  // Placeholder for actual sign in - will be replaced with backend integration
  signIn: async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Placeholder validation
    if (email && password.length >= 6) {
      const mockToken = `mock_token_${Date.now()}`;
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email,
        name: email.split('@')[0],
      };
      
      auth.setToken(mockToken);
      auth.setUser(mockUser);
      
      return { success: true };
    }
    
    return { success: false, error: 'Invalid credentials' };
  },

  // Placeholder for actual sign up - will be replaced with backend integration
  signUp: async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Placeholder validation
    if (email && password.length >= 6) {
      const mockToken = `mock_token_${Date.now()}`;
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email,
        name: email.split('@')[0],
      };
      
      auth.setToken(mockToken);
      auth.setUser(mockUser);
      
      return { success: true };
    }
    
    return { success: false, error: 'Invalid credentials' };
  },
};
