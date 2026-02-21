import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Trash2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { QueueItemCard } from '@/components/features/dashboard/QueueItemCard';
import { QueueDetailModal } from '@/components/features/dashboard/QueueDetailModal';
import { getPublishQueue, retryPublish, cancelPublish, type QueueItem } from '@/services/analytics';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

export default function Queue() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<QueueItem | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const queryClient = useQueryClient();

  const { data: queue, isLoading, refetch } = useQuery({
    queryKey: ['queue', statusFilter],
    queryFn: () => getPublishQueue(statusFilter === 'all' ? undefined : statusFilter),
    refetchInterval: autoRefresh ? 10000 : false,
  });

  const retryMutation = useMutation({
    mutationFn: retryPublish,
    onSuccess: () => {
      toast.success('Retry initiated');
      queryClient.invalidateQueries({ queryKey: ['queue'] });
    },
    onError: () => {
      toast.error('Failed to retry');
    },
  });

  const cancelMutation = useMutation({
    mutationFn: cancelPublish,
    onSuccess: () => {
      toast.success('Publishing cancelled');
      queryClient.invalidateQueries({ queryKey: ['queue'] });
    },
    onError: () => {
      toast.error('Failed to cancel');
    },
  });

  const handleClearCompleted = () => {
    // In real app, would call API to clear completed items
    toast.success('Cleared completed items');
    refetch();
  };

  const filteredQueue = queue?.filter((item) => {
    if (statusFilter === 'all') return true;
    return item.status === statusFilter;
  });

  const statusCounts = {
    all: queue?.length || 0,
    scheduled: queue?.filter((i) => i.status === 'scheduled').length || 0,
    publishing: queue?.filter((i) => i.status === 'publishing').length || 0,
    success: queue?.filter((i) => i.status === 'success').length || 0,
    failed: queue?.filter((i) => i.status === 'failed').length || 0,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Publishing Queue</h1>
          <p className="text-muted-foreground">Monitor and manage your scheduled content</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch id="auto-refresh" checked={autoRefresh} onCheckedChange={setAutoRefresh} />
            <Label htmlFor="auto-refresh" className="text-sm text-muted-foreground">
              Auto-refresh
            </Label>
          </div>

          <Button variant="outline" onClick={handleClearCompleted}>
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Completed
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <Tabs value={statusFilter} onValueChange={setStatusFilter}>
        <TabsList className="glass">
          <TabsTrigger value="all">All ({statusCounts.all})</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled ({statusCounts.scheduled})</TabsTrigger>
          <TabsTrigger value="publishing">Publishing ({statusCounts.publishing})</TabsTrigger>
          <TabsTrigger value="success">Success ({statusCounts.success})</TabsTrigger>
          <TabsTrigger value="failed">Failed ({statusCounts.failed})</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Queue List */}
      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))
        ) : filteredQueue && filteredQueue.length > 0 ? (
          filteredQueue.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <QueueItemCard
                item={item}
                onViewDetails={() => setSelectedItem(item)}
                onEditSchedule={() => toast.info('Edit schedule coming soon')}
                onCancel={() => cancelMutation.mutate(item.id)}
                onRetry={() => retryMutation.mutate(item.id)}
              />
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <RefreshCw className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-foreground mb-2">No items in queue</h3>
            <p className="text-muted-foreground">
              {statusFilter === 'all'
                ? 'Your publishing queue is empty'
                : `No ${statusFilter} items`}
            </p>
          </motion.div>
        )}
      </div>

      {/* Detail Modal */}
      <QueueDetailModal
        item={selectedItem}
        open={!!selectedItem}
        onOpenChange={(open) => !open && setSelectedItem(null)}
        onRetry={() => {
          if (selectedItem) {
            retryMutation.mutate(selectedItem.id);
            setSelectedItem(null);
          }
        }}
      />
    </div>
  );
}
