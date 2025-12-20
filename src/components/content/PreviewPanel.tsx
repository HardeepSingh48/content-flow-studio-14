import { Platform, Tweet } from '@/types/content';
import { Twitter, Linkedin, FileText, Video, Heart, MessageCircle, Repeat2, Share } from 'lucide-react';
import { marked } from 'marked';
import { useEffect, useState } from 'react';

interface PreviewPanelProps {
  platform: Platform;
  content: string;
  metadata?: Record<string, unknown>;
}

/**
 * Detect if content is markdown
 */
const isMarkdown = (content: string): boolean => {
  const markdownPatterns = [
    /^#{1,6}\s/m,
    /\*\*[^*]+\*\*/,
    /\*[^*]+\*/,
    /^\* /m,
    /^\d+\.\s/m,
  ];
  return markdownPatterns.some(pattern => pattern.test(content));
};

const PreviewPanel = ({ platform, content, metadata }: PreviewPanelProps) => {
  switch (platform) {
    case 'twitter':
      return <TwitterPreview tweets={(metadata?.tweets as Tweet[]) || []} />;
    case 'linkedin':
      return <LinkedInPreview content={content} />;
    case 'article':
      return <ArticlePreview content={content} metadata={metadata} />;
    case 'reel':
      return <ReelPreview metadata={metadata} />;
    default:
      return null;
  }
};

const TwitterPreview = ({ tweets }: { tweets: Tweet[] }) => {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-muted-foreground mb-3">Twitter Preview</h4>
      {tweets.map((tweet, index) => (
        <div key={tweet.id} className="bg-card border border-border rounded-xl p-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Twitter className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-foreground">Your Name</span>
                <span className="text-muted-foreground text-sm">@yourhandle · Now</span>
              </div>
              <p className="text-foreground whitespace-pre-wrap">{tweet.content}</p>
              <div className="flex items-center gap-6 mt-3 text-muted-foreground">
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-xs">0</span>
                </button>
                <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
                  <Repeat2 className="w-4 h-4" />
                  <span className="text-xs">0</span>
                </button>
                <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span className="text-xs">0</span>
                </button>
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  <Share className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          {index < tweets.length - 1 && (
            <div className="ml-5 mt-2 text-xs text-muted-foreground">Show this thread</div>
          )}
        </div>
      ))}
    </div>
  );
};

const LinkedInPreview = ({ content }: { content: string }) => {
  return (
    <div>
      <h4 className="text-sm font-medium text-muted-foreground mb-3">LinkedIn Preview</h4>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Linkedin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Your Name</p>
              <p className="text-sm text-muted-foreground">Your Title</p>
              <p className="text-xs text-muted-foreground">Just now · 🌐</p>
            </div>
          </div>
          <p className="text-foreground whitespace-pre-wrap text-sm leading-relaxed">
            {content}
          </p>
        </div>
        <div className="border-t border-border px-4 py-2 flex items-center justify-around text-muted-foreground text-sm">
          <button className="flex items-center gap-1 hover:text-primary">
            <Heart className="w-4 h-4" /> Like
          </button>
          <button className="flex items-center gap-1 hover:text-primary">
            <MessageCircle className="w-4 h-4" /> Comment
          </button>
          <button className="flex items-center gap-1 hover:text-primary">
            <Share className="w-4 h-4" /> Share
          </button>
        </div>
      </div>
    </div>
  );
};

const ArticlePreview = ({ content, metadata }: { content: string; metadata?: Record<string, unknown> }) => {
  const [htmlContent, setHtmlContent] = useState(content);

  useEffect(() => {
    if (isMarkdown(content)) {
      const html = marked.parse(content) as string;
      setHtmlContent(html);
    } else {
      setHtmlContent(content);
    }
  }, [content]);

  return (
    <div>
      <h4 className="text-sm font-medium text-muted-foreground mb-3">Article Preview</h4>
      <div className="bg-card border border-border rounded-lg p-6 prose prose-invert prose-sm max-w-none">
        {metadata?.metaTitle && (
          <h1 className="text-xl font-bold text-foreground mb-4">
            {metadata.metaTitle as string}
          </h1>
        )}
        <div
          className="text-foreground/90"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
};

const ReelPreview = ({ metadata }: { metadata?: Record<string, unknown> }) => {
  const scenes = (metadata?.scenes || []) as { sceneNumber: number; duration: number; script: string }[];
  const totalDuration = scenes.reduce((acc, s) => acc + (s.duration || 0), 0);

  return (
    <div>
      <h4 className="text-sm font-medium text-muted-foreground mb-3">Script Timeline</h4>
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-primary" />
            <span className="font-medium text-foreground">Reel Script</span>
          </div>
          <span className="text-sm text-muted-foreground">
            Total: {Math.floor(totalDuration / 60)}:{(totalDuration % 60).toString().padStart(2, '0')}
          </span>
        </div>

        <div className="space-y-2">
          {scenes.map((scene, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-2 bg-muted/50 rounded"
            >
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary">
                {scene.sceneNumber}
              </div>
              <div className="flex-1 text-sm text-foreground truncate">
                {scene.script.substring(0, 50)}...
              </div>
              <span className="text-xs text-muted-foreground">{scene.duration}s</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
