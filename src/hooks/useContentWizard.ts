import { create } from 'zustand';
import { api } from '../services/api';

interface WizardState {
    step: number;
    sessionId: string | null;
    inputType: string;
    inputValue: string;
    ideas: any[];
    selectedIdeaId: string | null;
    questions: any[];
    answers: Record<string, string>;
    selectedPlatforms: string[];

    // Actions
    setStep: (step: number) => void;
    setInput: (type: string, value: string) => void;
    generateIdeas: () => Promise<void>;
    selectIdea: (ideaId: string) => void;
    generateQuestions: () => Promise<void>;
    setAnswer: (questionId: string, answer: string) => void;
    togglePlatform: (platform: string) => void;
    generateDrafts: () => Promise<any>;
    reset: () => void;
}

export const useContentWizard = create<WizardState>((set, get) => ({
    step: 1,
    sessionId: null,
    inputType: 'topic',
    inputValue: '',
    ideas: [],
    selectedIdeaId: null,
    questions: [],
    answers: {},
    selectedPlatforms: [],

    setStep: (step) => set({ step }),

    setInput: (type, value) => set({ inputType: type, inputValue: value }),

    generateIdeas: async () => {
        const { inputType, inputValue } = get();
        const data = await api.generateIdeas(inputType, inputValue);
        set({
            sessionId: data.sessionId,
            ideas: data.ideas,
            step: 2,
        });
    },

    selectIdea: (ideaId) => set({ selectedIdeaId: ideaId }),

    generateQuestions: async () => {
        const { selectedIdeaId } = get();
        if (!selectedIdeaId) return;

        const data = await api.generateQuestions(selectedIdeaId);
        set({
            questions: data.questions,
            step: 3,
        });
    },

    setAnswer: (questionId, answer) => {
        const { answers } = get();
        set({ answers: { ...answers, [questionId]: answer } });
    },

    togglePlatform: (platform) => {
        const { selectedPlatforms } = get();
        const isSelected = selectedPlatforms.includes(platform);
        set({
            selectedPlatforms: isSelected
                ? selectedPlatforms.filter((p) => p !== platform)
                : [...selectedPlatforms, platform],
        });
    },

    generateDrafts: async () => {
        const { sessionId, answers, questions, selectedPlatforms } = get();
        if (!sessionId) throw new Error('No session ID');

        const answersArray = questions.map((q) => ({
            questionId: q.id,
            answerText: answers[q.id] || '',
        }));

        const data = await api.generateDrafts(sessionId, answersArray, selectedPlatforms);
        set({ step: 4 });
        return data;
    },

    reset: () => set({
        step: 1,
        sessionId: null,
        inputValue: '',
        ideas: [],
        selectedIdeaId: null,
        questions: [],
        answers: {},
        selectedPlatforms: [],
    }),
}));
