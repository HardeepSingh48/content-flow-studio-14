import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Tweet } from '@/types/content';

interface TweetThreadEditorProps {
  tweets: Tweet[];
  onChange: (tweets: Tweet[]) => void;
  hashtags: string[];
}

const MAX_TWEET_LENGTH = 280;

const TweetThreadEditor = ({ tweets, onChange, hashtags }: TweetThreadEditorProps) => {
  const updateTweet = (id: string, content: string) => {
    onChange(tweets.map(t => t.id === id ? { ...t, content } : t));
  };

  const addTweet = () => {
    const newTweet: Tweet = {
      id: `t${Date.now()}`,
      content: '',
      order: tweets.length + 1,
    };
    onChange([...tweets, newTweet]);
  };

  const removeTweet = (id: string) => {
    if (tweets.length <= 1) return;
    const updated = tweets
      .filter(t => t.id !== id)
      .map((t, i) => ({ ...t, order: i + 1 }));
    onChange(updated);
  };

  const addHashtag = (tweetId: string, hashtag: string) => {
    const tweet = tweets.find(t => t.id === tweetId);
    if (!tweet) return;
    
    const newContent = tweet.content + ' ' + hashtag;
    if (newContent.length <= MAX_TWEET_LENGTH) {
      updateTweet(tweetId, newContent);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <AnimatePresence>
          {tweets.map((tweet, index) => {
            const charCount = tweet.content.length;
            const isOverLimit = charCount > MAX_TWEET_LENGTH;
            
            return (
              <motion.div
                key={tweet.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="relative"
              >
                {/* Thread connection line */}
                {index > 0 && (
                  <div className="absolute left-6 -top-3 w-0.5 h-3 bg-border" />
                )}
                
                <div className="flex gap-3">
                  <div className="flex flex-col items-center pt-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary">
                      {tweet.order}
                    </div>
                    {index < tweets.length - 1 && (
                      <div className="w-0.5 flex-1 bg-border mt-2" />
                    )}
                  </div>
                  
                  <div className="flex-1 bg-card border border-border rounded-lg p-4">
                    <Textarea
                      value={tweet.content}
                      onChange={(e) => updateTweet(tweet.id, e.target.value)}
                      placeholder="What's happening?"
                      className={cn(
                        'min-h-[100px] resize-none border-0 p-0 focus-visible:ring-0',
                        isOverLimit && 'text-destructive'
                      )}
                    />
                    
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                      <div className="flex items-center gap-2">
                        {tweets.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-destructive"
                            onClick={() => removeTweet(tweet.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className={cn(
                        'text-sm',
                        isOverLimit ? 'text-destructive' : 'text-muted-foreground'
                      )}>
                        {charCount}/{MAX_TWEET_LENGTH}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      <Button
        variant="outline"
        onClick={addTweet}
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Tweet
      </Button>
      
      {hashtags.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-2">Suggested hashtags:</p>
          <div className="flex flex-wrap gap-2">
            {hashtags.map(hashtag => (
              <Badge
                key={hashtag}
                variant="secondary"
                className="cursor-pointer hover:bg-primary/20"
                onClick={() => {
                  const lastTweet = tweets[tweets.length - 1];
                  if (lastTweet) addHashtag(lastTweet.id, hashtag);
                }}
              >
                {hashtag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TweetThreadEditor;
