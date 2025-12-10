import { create } from 'zustand';
import { ContentSession, ContentVersion, GuardrailViolation, Platform } from '@/types/content';

interface ContentStore {
  currentSession: ContentSession | null;
  contentVersions: Record<Platform, ContentVersion | null>;
  unsavedChanges: boolean;
  isSaving: boolean;
  guardrailViolations: Record<Platform, GuardrailViolation[]>;
  activePlatform: Platform;
  
  setCurrentSession: (session: ContentSession | null) => void;
  setContentVersion: (platform: Platform, version: ContentVersion | null) => void;
  setUnsavedChanges: (value: boolean) => void;
  setIsSaving: (value: boolean) => void;
  setGuardrailViolations: (platform: Platform, violations: GuardrailViolation[]) => void;
  setActivePlatform: (platform: Platform) => void;
  updateVersionContent: (platform: Platform, content: string) => void;
  reset: () => void;
}

const initialState = {
  currentSession: null,
  contentVersions: {
    article: null,
    twitter: null,
    linkedin: null,
    reel: null,
  },
  unsavedChanges: false,
  isSaving: false,
  guardrailViolations: {
    article: [],
    twitter: [],
    linkedin: [],
    reel: [],
  },
  activePlatform: 'article' as Platform,
};

export const useContentStore = create<ContentStore>((set) => ({
  ...initialState,
  
  setCurrentSession: (session) => set({ currentSession: session }),
  
  setContentVersion: (platform, version) => 
    set((state) => ({
      contentVersions: { ...state.contentVersions, [platform]: version }
    })),
  
  setUnsavedChanges: (value) => set({ unsavedChanges: value }),
  
  setIsSaving: (value) => set({ isSaving: value }),
  
  setGuardrailViolations: (platform, violations) =>
    set((state) => ({
      guardrailViolations: { ...state.guardrailViolations, [platform]: violations }
    })),
  
  setActivePlatform: (platform) => set({ activePlatform: platform }),
  
  updateVersionContent: (platform, content) =>
    set((state) => {
      const version = state.contentVersions[platform];
      if (!version) return state;
      return {
        contentVersions: {
          ...state.contentVersions,
          [platform]: { ...version, content }
        },
        unsavedChanges: true,
      };
    }),
  
  reset: () => set(initialState),
}));
