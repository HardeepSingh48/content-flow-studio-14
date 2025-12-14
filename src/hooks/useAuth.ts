import { create } from 'zustand';
import { api } from '../services/api';

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
}));
