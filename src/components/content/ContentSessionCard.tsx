import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Play, Trash2, Link, Lightbulb, Hash, Rss } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import TimelineIndicator from './TimelineIndicator';
import { ContentSession } from '@/types/content';
import { formatDistanceToNow } from 'date-fns';
import { FileText } from 'lucide-react';

interface ContentSessionCardProps {
  session: ContentSession;
  onContinue: (sessionId: string, step: number) => void;
  onDelete: (sessionId: string) => void;
  onViewDrafts: (sessionId: string) => void;
}

const inputTypeIcons = {
  url: Link,
  topic: Lightbulb,
  keywords: Hash,
  feed: Rss,
};

const inputTypeLabels = {
  url: 'URL',
  topic: 'Topic',
  keywords: 'Keywords',
  feed: 'Feed',
};

const ContentSessionCard = ({
  session,
  onContinue,
  onDelete,
  onViewDrafts,
}: ContentSessionCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const InputIcon = inputTypeIcons[session.inputType] ?? FileText;
  const statusLower = session.status.toLowerCase();
  const isComplete = statusLower === 'draft' || statusLower === 'drafts' || statusLower === 'ready' || statusLower === 'published';

  return (
    <motion.div
      layout
      className="bg-card border border-border rounded-xl overflow-hidden"
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-foreground truncate">
                {session.title || 'Untitled Session'}
              </h3>
              <Badge variant="outline" className="flex items-center gap-1 shrink-0">
                <InputIcon className="w-3 h-3" />
                {inputTypeLabels[session.inputType]}
              </Badge>
              {session.status === 'published' && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  Published
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <span>
                Updated {formatDistanceToNow(new Date(session.updatedAt), { addSuffix: true })}
              </span>
              {session.platforms.length > 0 && (
                <span className="flex items-center gap-1">
                  {session.platforms.length} platform{session.platforms.length > 1 ? 's' : ''}
                </span>
              )}
            </div>

            <TimelineIndicator currentStep={session.currentStep} status={session.status} />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Hide
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  Details
                </>
              )}
            </Button>

            {!isComplete && (
              <Button
                size="sm"
                onClick={() => onContinue(session.id, session.currentStep)}
              >
                <Play className="w-4 h-4 mr-1" />
                Continue
              </Button>
            )}

            {isComplete && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onViewDrafts(session.id)}
              >
                View Drafts
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive"
              onClick={() => onDelete(session.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-border bg-muted/30"
          >
            <div className="p-5 space-y-4">
              {session.selectedIdea && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Selected Idea</h4>
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <p className="font-medium text-foreground mb-1">{session.selectedIdea.title}</p>
                    <p className="text-sm text-muted-foreground">{session.selectedIdea.description}</p>
                  </div>
                </div>
              )}

              {session.answers && Object.keys(session.answers).length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Your Answers</h4>
                  <div className="space-y-2">
                    {Object.entries(session.answers).slice(0, 3).map(([key, value]) => (
                      <div key={key} className="text-sm">
                        <span className="text-muted-foreground">•</span>
                        <span className="ml-2 text-foreground">{value}</span>
                      </div>
                    ))}
                    {Object.keys(session.answers).length > 3 && (
                      <p className="text-sm text-muted-foreground">
                        +{Object.keys(session.answers).length - 3} more answers
                      </p>
                    )}
                  </div>
                </div>
              )}

              {session.platforms.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Platforms</h4>
                  <div className="flex flex-wrap gap-2">
                    {session.platforms.map(platform => (
                      <Badge key={platform} variant="secondary" className="capitalize">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {(statusLower === 'draft' || statusLower === 'drafts' || statusLower === 'ready') && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => onViewDrafts(session.id)}
                >
                  Edit Drafts
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ContentSessionCard;
