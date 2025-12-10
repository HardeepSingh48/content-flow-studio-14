import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Loader2, ChevronDown, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import PlatformTabNav from '@/components/content/PlatformTabNav';
import RichTextEditor from '@/components/content/RichTextEditor';
import TweetThreadEditor from '@/components/content/TweetThreadEditor';
import SceneCard from '@/components/content/SceneCard';
import GuardrailChecker from '@/components/content/GuardrailChecker';
import PreviewPanel from '@/components/content/PreviewPanel';
import PublishModal from '@/components/content/PublishModal';
import { useContentStore } from '@/stores/contentStore';
import { getSessionDetails, updateContentVersion, regenerateContent, autoFixViolation } from '@/services/content';
import { Platform, Scene, Tweet, ContentVersion, PublishOptions } from '@/types/content';
import { toast } from 'sonner';
import { useDebouncedCallback } from '@/hooks/useDebounce';

const DraftEditor = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  
  const {
    currentSession,
    contentVersions,
    activePlatform,
    unsavedChanges,
    isSaving,
    guardrailViolations,
    setCurrentSession,
    setContentVersion,
    setActivePlatform,
    updateVersionContent,
    setIsSaving,
    setUnsavedChanges,
  } = useContentStore();

  useEffect(() => {
    if (sessionId) loadSession();
  }, [sessionId]);

  const loadSession = async () => {
    if (!sessionId) return;
    setIsLoading(true);
    try {
      const data = await getSessionDetails(sessionId);
      if (data) {
        setCurrentSession(data.session);
        data.versions.forEach(v => setContentVersion(v.platform, v));
        if (data.versions.length > 0) {
          setActivePlatform(data.versions[0].platform);
        }
      }
    } catch (error) {
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

  useEffect(() => {
    if (unsavedChanges) debouncedSave();
  }, [unsavedChanges]);

  const handleRegenerate = async (action: string, tone?: string) => {
    const version = contentVersions[activePlatform];
    if (!version) return;
    
    setIsSaving(true);
    try {
      const result = await regenerateContent(version.id, { action, tone });
      setContentVersion(activePlatform, result);
      toast.success('Content regenerated');
    } catch (error) {
      toast.error('Failed to regenerate');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAutoFix = async (violationId: string) => {
    const version = contentVersions[activePlatform];
    if (!version) return;
    
    try {
      const result = await autoFixViolation(version.id, violationId);
      if (result.fixed) {
        updateVersionContent(activePlatform, result.newContent);
        toast.success('Issue fixed');
      }
    } catch (error) {
      toast.error('Failed to fix issue');
    }
  };

  const handlePublish = async (options: PublishOptions) => {
    toast.success(`Published to ${options.platforms.filter(p => p.enabled).map(p => p.platform).join(', ')}`);
  };

  const currentVersion = contentVersions[activePlatform];
  const availablePlatforms = currentSession?.platforms || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between pb-4 border-b border-border mb-4"
      >
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/history')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              {currentSession?.title || 'Untitled'}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline">{currentSession?.status}</Badge>
              {isSaving && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" /> Saving...
                </span>
              )}
              {unsavedChanges && !isSaving && (
                <span className="text-xs text-amber-500">Unsaved changes</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => debouncedSave()} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button onClick={() => setPublishModalOpen(true)}>Publish</Button>
        </div>
      </motion.div>

      {/* Platform Tabs */}
      {availablePlatforms.length > 0 && (
        <PlatformTabNav
          platforms={availablePlatforms}
          activePlatform={activePlatform}
          onPlatformChange={setActivePlatform}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-6 mt-4 overflow-auto">
        {/* Editor (60%) */}
        <div className="lg:col-span-3 space-y-4">
          {activePlatform === 'article' && currentVersion && (
            <RichTextEditor
              content={currentVersion.content}
              onChange={(content) => updateVersionContent('article', content)}
            />
          )}
          
          {activePlatform === 'twitter' && currentVersion?.metadata && (
            <TweetThreadEditor
              tweets={(currentVersion.metadata as { tweets: Tweet[] }).tweets || []}
              onChange={(tweets) => {
                setContentVersion('twitter', {
                  ...currentVersion,
                  metadata: { ...currentVersion.metadata, tweets } as ContentVersion['metadata'],
                });
                setUnsavedChanges(true);
              }}
              hashtags={(currentVersion.metadata as { hashtags: string[] }).hashtags || []}
            />
          )}
          
          {activePlatform === 'linkedin' && currentVersion && (
            <div className="space-y-4">
              <Textarea
                value={currentVersion.content}
                onChange={(e) => updateVersionContent('linkedin', e.target.value)}
                className="min-h-[300px]"
                maxLength={3000}
              />
              <div className="text-sm text-muted-foreground text-right">
                {currentVersion.content.length}/3000
              </div>
            </div>
          )}
          
          {activePlatform === 'reel' && currentVersion?.metadata && (
            <div className="space-y-4">
              {((currentVersion.metadata as { scenes: Scene[] }).scenes || []).map((scene, idx) => (
                <SceneCard
                  key={scene.id}
                  scene={scene}
                  onChange={(updated) => {
                    const scenes = [...(currentVersion.metadata as { scenes: Scene[] }).scenes];
                    scenes[idx] = updated;
                    setContentVersion('reel', {
                      ...currentVersion,
                      metadata: { ...currentVersion.metadata, scenes } as ContentVersion['metadata'],
                    });
                    setUnsavedChanges(true);
                  }}
                  onDelete={() => {
                    const scenes = (currentVersion.metadata as { scenes: Scene[] }).scenes.filter((_, i) => i !== idx);
                    setContentVersion('reel', {
                      ...currentVersion,
                      metadata: { ...currentVersion.metadata, scenes } as ContentVersion['metadata'],
                    });
                    setUnsavedChanges(true);
                  }}
                  canDelete={(currentVersion.metadata as { scenes: Scene[] }).scenes.length > 1}
                />
              ))}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  const scenes = (currentVersion.metadata as { scenes: Scene[] }).scenes || [];
                  const newScene: Scene = {
                    id: `scene_${Date.now()}`,
                    sceneNumber: scenes.length + 1,
                    duration: 5,
                    script: '',
                    visualNotes: '',
                  };
                  setContentVersion('reel', {
                    ...currentVersion,
                    metadata: { ...currentVersion.metadata, scenes: [...scenes, newScene] } as ContentVersion['metadata'],
                  });
                  setUnsavedChanges(true);
                }}
              >
                Add Scene
              </Button>
            </div>
          )}
        </div>

        {/* Sidebar (40%) */}
        <div className="lg:col-span-2 space-y-4">
          {currentVersion && (
            <PreviewPanel
              platform={activePlatform}
              content={currentVersion.content}
              metadata={currentVersion.metadata as Record<string, unknown>}
            />
          )}
          
          <GuardrailChecker
            violations={guardrailViolations[activePlatform]}
            onAutoFix={handleAutoFix}
          />
          
          {/* AI Assistant */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-3">AI Assistant</h3>
            <div className="space-y-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span className="flex items-center gap-2">
                      <Wand2 className="w-4 h-4" />
                      Regenerate
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem onClick={() => handleRegenerate('shorter')}>
                    Make shorter
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleRegenerate('longer')}>
                    Make longer
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleRegenerate('tone', 'professional')}>
                    Professional tone
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleRegenerate('tone', 'casual')}>
                    Casual tone
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="secondary" className="w-full" onClick={() => handleRegenerate('improve')}>
                <Wand2 className="w-4 h-4 mr-2" />
                Improve with AI
              </Button>
            </div>
          </div>
        </div>
      </div>

      <PublishModal
        open={publishModalOpen}
        onOpenChange={setPublishModalOpen}
        platforms={availablePlatforms}
        connectedIntegrations={['wordpress', 'twitter', 'linkedin']}
        onPublish={handlePublish}
      />
    </div>
  );
};

export default DraftEditor;
