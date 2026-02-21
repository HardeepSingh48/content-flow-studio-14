import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContentStore } from '@/stores/contentStore';
import { getSessionDetails, updateContentVersion, autoFixViolation } from '@/services/content';
import { PublishOptions } from '@/types/content';
import { toast } from 'sonner';
import { useDebouncedCallback } from '@/hooks/useDebounce';
import { api } from '@/services/api';
import ContentEditor from '@/components/features/ContentEditor/ContentEditor';

const DraftEditor = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [integrations, setIntegrations] = useState<any[]>([]);

  const {
    currentSession,
    contentVersions,
    activePlatform,
    unsavedChanges,
    setCurrentSession,
    setContentVersion,
    setActivePlatform,
    updateVersionContent,
    setIsSaving,
    setUnsavedChanges,
  } = useContentStore();

  useEffect(() => {
    if (sessionId) loadSession();
    loadIntegrations();
  }, [sessionId]);

  const loadIntegrations = async () => {
    try {
      const data = await api.getIntegrations();
      setIntegrations(data.integrations || []);
    } catch (error) {
      console.error('Failed to load integrations:', error);
    }
  };

  const loadSession = async () => {
    if (!sessionId) return;
    setIsLoading(true);
    try {
      const data = await getSessionDetails(sessionId);
      if (data) {
        setCurrentSession(data.session);
        data.versions.forEach((v) => {
          setContentVersion(v.platform, v);
        });
        if (data.versions.length > 0) {
          setActivePlatform(data.versions[0].platform);
        }
      } else {
        toast.error('Session not found');
      }
    } catch (error) {
      console.error('Error loading session:', error);
      toast.error('Failed to load session');
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSave = useDebouncedCallback(async () => {
    const version = contentVersions[activePlatform];
    if (!version) return;

    setIsSaving(true);
    try {
      await updateContentVersion(version.id, version.content);
      setUnsavedChanges(false);
    } catch (error) {
      toast.error('Failed to save');
    } finally {
      setIsSaving(false);
    }
  }, 3000);

  const handlePublish = async (content: any) => {
    // In a real app, this would open a more specific publish modal or use the shared one
    toast.info('Publishing feature is being refined with the new UI...');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary-600" />
        <p className="text-neutral-500 font-medium">Loading your draft...</p>
      </div>
    );
  }

  if (!currentSession) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 text-center">
        <div className="p-4 bg-error-50 rounded-full text-error-600">
          <Loader2 className="size-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Session not found</h2>
          <p className="text-neutral-500 mt-2">The requested draft could not be retrieved.</p>
        </div>
        <Button onClick={() => navigate('/dashboard/pipeline')} variant="primary" className="px-8">
          Return to Pipeline
        </Button>
      </div>
    );
  }

  const currentVersion = contentVersions[activePlatform];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full"
    >
      <ContentEditor
        initialContent={currentVersion?.content || ''}
        initialPlatform={activePlatform}
        onSave={(newContent) => {
          updateVersionContent(activePlatform, newContent);
          setUnsavedChanges(true);
          debouncedSave();
        }}
        onPublish={handlePublish}
      />
    </motion.div>
  );
};


export default DraftEditor;
