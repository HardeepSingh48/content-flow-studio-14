import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import { useWebSocket } from './useWebSocket';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function usePublishQueue(status?: string) {
    const queryClient = useQueryClient();
    const { subscribe } = useWebSocket();

    const { data, isLoading } = useQuery({
        queryKey: ['publish-queue', status],
        queryFn: () => api.getPublishQueue(status),
        refetchInterval: 10000, // Fallback polling every 10s
    });

    useEffect(() => {
        // Subscribe to real-time updates
        const unsubscribe = subscribe('PUBLISH_UPDATE', (job: any) => {
            // Update query cache
            queryClient.setQueryData(['publish-queue', status], (old: any) => {
                if (!old) return old;

                const jobs = old.jobs.map((j: any) =>
                    j.id === job.id ? job : j
                );

                return { ...old, jobs };
            });

            // Show toast notification
            if (job.status === 'SUCCESS') {
                toast.success(`Published to ${job.integration?.provider || 'platform'} successfully!`);
            } else if (job.status === 'FAILED') {
                toast.error(`Publishing to ${job.integration?.provider || 'platform'} failed`);
            } else if (job.status === 'RUNNING') {
                toast.info(`Publishing to ${job.integration?.provider || 'platform'}...`);
            }

            // Invalidate related queries
            queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
            queryClient.invalidateQueries({ queryKey: ['analytics'] });
        });

        return unsubscribe;
    }, [subscribe, status, queryClient]);

    return {
        jobs: data?.jobs || [],
        isLoading
    };
}
