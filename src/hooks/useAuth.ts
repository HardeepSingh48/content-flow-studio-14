import { create } from 'zustand';
import { api } from '../services/api';
import { toast } from 'sonner';


interface User {
    id: string;
    email: string;
    name?: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
    checkAuth: () => void;
    oauthLogin: (provider: 'google' | 'github') => Promise<void>;
    setAuthFromToken: (token: string) => void;
}

export const useAuth = create<AuthState>((set) => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),

    login: async (email, password) => {
        const data = await api.login(email, password);
        set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
        });
    },

    register: async (email, password) => {
        const data = await api.register(email, password);
        // Auto-login after registration
        if (data.user) {
            const loginData = await api.login(email, password);
            set({
                user: loginData.user,
                token: loginData.token,
                isAuthenticated: true,
            });
        }
    },

    logout: () => {
        api.logout();
        set({
            user: null,
            token: null,
            isAuthenticated: false,
        });
    },

    checkAuth: () => {
        const token = localStorage.getItem('token');
        if (token) {
            api.getProfile().then((user) => {
                set({ user, isAuthenticated: true });
            }).catch(() => {
                set({ user: null, token: null, isAuthenticated: false });
                localStorage.removeItem('token');
            });
        }
    },

    oauthLogin: async (provider: 'google' | 'github') => {
        try {
            // OAuth routes are mounted at /api/oauth
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
            window.location.href = `${baseUrl}/oauth/${provider}`;
        } catch (error) {
            console.error('OAuth login error:', error);
            toast.error('Failed to initiate OAuth login');
        }
    },

    setAuthFromToken: (token: string) => {
        localStorage.setItem('token', token);

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            set({
                user: {
                    id: payload.userId, email: payload.email,
                },
                token,
                isAuthenticated: true,
            })
        } catch (error) {
            console.error('Failed to parse token:', error);
        }
    }
}));
