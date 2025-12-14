import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import { toast } from 'sonner';

export function useIntegrations() {
    const queryClient = useQueryClient();

    const { data: integrations, isLoading } = useQuery({
        queryKey: ['integrations'],
        queryFn: () => api.getIntegrations(),
    });

    const createMutation = useMutation({
        mutationFn: ({ provider, credentials, metadata }: any) =>
            api.createIntegration(provider, credentials, metadata),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['integrations'] });
            toast.success('Integration added successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Failed to add integration');
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => api.deleteIntegration(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['integrations'] });
            toast.success('Integration removed');
        },
        onError: () => {
            toast.error('Failed to remove integration');
        },
    });

    return {
        integrations: integrations?.integrations || [],
        isLoading,
        createIntegration: createMutation.mutate,
        deleteIntegration: deleteMutation.mutate,
        isCreating: createMutation.isPending,
        isDeleting: deleteMutation.isPending,
    };
}
