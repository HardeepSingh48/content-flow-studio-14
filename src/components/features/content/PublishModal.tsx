import { useState } from 'react';
import { Loader2, Calendar, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PublishOptions, Platform } from '@/types/content';

interface PublishModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  platforms: Platform[];
  connectedIntegrations: string[];
  onPublish: (options: PublishOptions) => Promise<void>;
}

const platformLabels: Record<Platform, string> = {
  article: 'WordPress',
  twitter: 'Twitter',
  linkedin: 'LinkedIn',
  reel: 'HeyGen / ElevenLabs',
};

const PublishModal = ({
  open,
  onOpenChange,
  platforms,
  connectedIntegrations,
  onPublish,
}: PublishModalProps) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Record<string, boolean>>({});
  const [schedule, setSchedule] = useState<'now' | 'later'>('now');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [wordpressStatus, setWordpressStatus] = useState<'publish' | 'draft'>('publish');

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      await onPublish({
        platforms: Object.entries(selectedPlatforms)
          .filter(([_, enabled]) => enabled)
          .map(([platform]) => ({
            platform,
            enabled: true,
            options: platform === 'article' ? { status: wordpressStatus } : undefined,
          })),
        schedule,
        scheduledAt: schedule === 'later' ? `${scheduledDate}T${scheduledTime}` : undefined,
        wordpressStatus,
      });
      onOpenChange(false);
    } finally {
      setIsPublishing(false);
    }
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => ({
      ...prev,
      [platform]: !prev[platform],
    }));
  };

  const hasSelection = Object.values(selectedPlatforms).some(v => v);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Publish Content</DialogTitle>
          <DialogDescription>
            Select where you want to publish your content.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Platform Selection */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Select Platforms
            </Label>
            <div className="space-y-3">
              {platforms.map(platform => {
                const label = platformLabels[platform];
                const integrationKey = platform === 'article' ? 'wordpress' : platform;
                const isConnected = connectedIntegrations.includes(integrationKey);

                return (
                  <div
                    key={platform}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={platform}
                        checked={selectedPlatforms[platform] || false}
                        onCheckedChange={() => togglePlatform(platform)}
                        disabled={!isConnected}
                      />
                      <Label
                        htmlFor={platform}
                        className={!isConnected ? 'text-muted-foreground' : ''}
                      >
                        {label}
                      </Label>
                    </div>
                    {!isConnected && (
                      <span className="text-xs text-muted-foreground">Not connected</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* WordPress Status */}
          {selectedPlatforms.article && (
            <div>
              <Label className="text-sm font-medium mb-3 block">
                WordPress Status
              </Label>
              <Select value={wordpressStatus} onValueChange={(v) => setWordpressStatus(v as 'publish' | 'draft')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="publish">Publish immediately</SelectItem>
                  <SelectItem value="draft">Save as draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Schedule Options */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              When to Publish
            </Label>
            <RadioGroup value={schedule} onValueChange={(v) => setSchedule(v as 'now' | 'later')}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="now" id="now" />
                <Label htmlFor="now">Publish now</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="later" id="later" />
                <Label htmlFor="later">Schedule for later</Label>
              </div>
            </RadioGroup>

            {schedule === 'later' && (
              <div className="flex gap-3 mt-3">
                <div className="flex-1">
                  <Input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handlePublish}
            disabled={isPublishing || !hasSelection}
          >
            {isPublishing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Publishing...
              </>
            ) : (
              <>
                <ExternalLink className="w-4 h-4 mr-2" />
                Confirm Publish
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PublishModal;
