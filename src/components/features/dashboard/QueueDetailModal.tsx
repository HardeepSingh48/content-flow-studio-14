import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { CheckCircle, XCircle, ExternalLink, ChevronDown, RotateCcw } from 'lucide-react';
import { format } from 'date-fns';
import type { QueueItem } from '@/services/analytics';
import { useState } from 'react';

interface QueueDetailModalProps {
  item: QueueItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRetry?: () => void;
}

export const QueueDetailModal = ({ item, open, onOpenChange, onRetry }: QueueDetailModalProps) => {
  const [showRawResponse, setShowRawResponse] = useState(false);

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-strong max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-foreground">{item.title}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6 pr-4">
            {/* Status Timeline */}
            {item.logs && item.logs.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Status Timeline</h4>
                <div className="space-y-3">
                  {item.logs.map((log, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{log.event}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(log.timestamp), 'MMM d, h:mm:ss a')}
                        </p>
                        {log.details && (
                          <p className="text-xs text-muted-foreground mt-1">{log.details}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Integration Results */}
            {item.results && item.results.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Integration Results</h4>
                <div className="space-y-3">
                  {item.results.map((result, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg bg-muted/50 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        {result.status === 'success' ? (
                          <CheckCircle className="w-5 h-5 text-success" />
                        ) : (
                          <XCircle className="w-5 h-5 text-destructive" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-foreground">{result.platform}</p>
                          {result.remoteId && (
                            <p className="text-xs text-muted-foreground">ID: {result.remoteId}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant={result.status === 'success' ? 'default' : 'destructive'}>
                          {result.status}
                        </Badge>
                        {result.viewUrl && (
                          <Button size="sm" variant="ghost" asChild>
                            <a href={result.viewUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Error Details */}
            {item.results?.some(r => r.error) && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Error Details</h4>
                {item.results
                  .filter(r => r.error)
                  .map((result, index) => (
                    <div key={index} className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                      <p className="text-sm font-medium text-destructive mb-1">{result.platform}</p>
                      <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
                        {result.error}
                      </pre>
                    </div>
                  ))}
              </div>
            )}

            {/* Raw Response */}
            <Collapsible open={showRawResponse} onOpenChange={setShowRawResponse}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between">
                  <span className="text-sm">Raw Response Data</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showRawResponse ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <pre className="p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground overflow-auto max-h-40">
                  {JSON.stringify(item, null, 2)}
                </pre>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          {item.status === 'failed' && onRetry && (
            <Button onClick={onRetry}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Retry Failed
            </Button>
          )}
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
