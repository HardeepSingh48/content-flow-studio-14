import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Search, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ContentSessionCard from '@/components/content/ContentSessionCard';
import ConfirmDialog from '@/components/content/ConfirmDialog';
import { ContentSession } from '@/types/content';
import { getContentSessions, deleteSession } from '@/services/content';
import { toast } from 'sonner';

const History = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<ContentSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadSessions();
  }, [statusFilter, platformFilter, dateFilter, searchQuery]);

  const loadSessions = async () => {
    setIsLoading(true);
    try {
      const data = await getContentSessions({
        status: statusFilter,
        platform: platformFilter,
        dateRange: dateFilter,
        search: searchQuery,
      });
      setSessions(data);
    } catch (error) {
      toast.error('Failed to load content sessions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = (sessionId: string, step: number) => {
    navigate(`/dashboard/create?session=${sessionId}&step=${step}`);
  };

  const handleDelete = (sessionId: string) => {
    setSessionToDelete(sessionId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!sessionToDelete) return;
    try {
      await deleteSession(sessionToDelete);
      setSessions(prev => prev.filter(s => s.id !== sessionToDelete));
      toast.success('Session deleted');
    } catch (error) {
      toast.error('Failed to delete session');
    }
    setDeleteDialogOpen(false);
    setSessionToDelete(null);
  };

  const handleViewDrafts = (sessionId: string) => {
    navigate(`/dashboard/drafts/${sessionId}`);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Your Content Pipeline</h1>
          <p className="text-muted-foreground mt-1">Manage and track your content creation</p>
        </div>
        <Button onClick={() => navigate('/dashboard/create')}>
          <Plus className="w-4 h-4 mr-2" />
          New Content
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-3"
      >
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="idea">Ideas</SelectItem>
            <SelectItem value="questions">Q&A</SelectItem>
            <SelectItem value="drafts">Drafts</SelectItem>
            <SelectItem value="ready">Ready</SelectItem>
            <SelectItem value="published">Published</SelectItem>
          </SelectContent>
        </Select>
        <Select value={platformFilter} onValueChange={setPlatformFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="article">Article</SelectItem>
            <SelectItem value="twitter">Twitter</SelectItem>
            <SelectItem value="linkedin">LinkedIn</SelectItem>
            <SelectItem value="reel">Reel Script</SelectItem>
          </SelectContent>
        </Select>
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Sessions List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 animate-pulse">
                <div className="h-6 bg-muted rounded w-1/3 mb-3" />
                <div className="h-4 bg-muted rounded w-1/4" />
              </div>
            ))}
          </div>
        ) : sessions.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-12 text-center">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No content created yet</h2>
            <p className="text-muted-foreground mb-6">Start by creating your first piece of content</p>
            <Button onClick={() => navigate('/dashboard/create')}>
              <Plus className="w-4 h-4 mr-2" />
              Create Content
            </Button>
          </div>
        ) : (
          sessions.map(session => (
            <ContentSessionCard
              key={session.id}
              session={session}
              onContinue={handleContinue}
              onDelete={handleDelete}
              onViewDrafts={handleViewDrafts}
            />
          ))
        )}
      </motion.div>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Session"
        description="Are you sure you want to delete this content session? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        variant="destructive"
      />
    </div>
  );
};

export default History;
