import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, Copy, RefreshCw, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api } from '@/services/api';
import { toast } from '@/hooks/use-toast';

export default function ContentDisplay() {
    const { sessionId } = useParams<{ sessionId: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [regenerating, setRegenerating] = useState<string | null>(null);
    const [content, setContent] = useState<any>(null);
    const [brief, setBrief] = useState<any>(null);

    useEffect(() => {
        if (sessionId) {
            fetchContent();
        }
    }, [sessionId]);

    const fetchContent = async () => {
        try {
            const { data } = await api.getGeneratedContent(sessionId!);
            setContent(data.content);
            setBrief(data.brief);
        } catch (error) {
            console.error('Failed to fetch content:', error);
            toast({
                title: 'Load Failed',
                description: 'Could not load content. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (text: string, platform: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: 'Copied!',
            description: `${platform} content copied to clipboard`,
        });
    };

    const handleRegenerate = async (platform: string) => {
        setRegenerating(platform);
        try {
            const { data } = await api.regeneratePlatformContent(sessionId!, platform);

            // Update content for this platform
            setContent((prev: any) => ({
                ...prev,
                [platform]: data.content,
            }));

            toast({
                title: 'Regenerated!',
                description: `New ${platform} content generated successfully`,
            });
        } catch (error) {
            console.error('Regeneration failed:', error);
            toast({
                title: 'Regeneration Failed',
                description: 'Could not regenerate content. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setRegenerating(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!content) {
        return (
            <div className="container max-w-4xl mx-auto py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>No Content Found</CardTitle>
                        <CardDescription>This session doesn't have any generated content yet.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    return (
        <div className="container max-w-6xl mx-auto py-8">
            <div className="mb-6">
                <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mb-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Button>

                {brief && (
                    <div className="mb-4">
                        <h1 className="text-3xl font-bold">{brief.topicOverview?.title || 'Your Content'}</h1>
                        <p className="text-muted-foreground mt-2">{brief.topicOverview?.description}</p>
                    </div>
                )}
            </div>

            <Tabs defaultValue="linkedin" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
                    <TabsTrigger value="twitter">Twitter</TabsTrigger>
                    <TabsTrigger value="blog">Blog</TabsTrigger>
                    <TabsTrigger value="reelScript">Reel</TabsTrigger>
                </TabsList>

                {/* LinkedIn Tab */}
                <TabsContent value="linkedin" className="space-y-4">
                    {content.linkedin ? (
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>LinkedIn Post</CardTitle>
                                        <CardDescription>Professional network optimized content</CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleRegenerate('linkedin')}
                                            disabled={regenerating === 'linkedin'}
                                        >
                                            {regenerating === 'linkedin' ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <RefreshCw className="h-4 w-4" />
                                            )}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                handleCopy(
                                                    `${content.linkedin.post.hook}\n\n${content.linkedin.post.body}\n\n${content.linkedin.post.cta}\n\n${content.linkedin.post.hashtags.join(' ')}`,
                                                    'LinkedIn'
                                                )
                                            }
                                        >
                                            <Copy className="h-4 w-4 mr-2" />
                                            Copy
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="bg-muted p-4 rounded-lg whitespace-pre-wrap">
                                    <p className="font-bold mb-2">{content.linkedin.post.hook}</p>
                                    <p className="mb-2">{content.linkedin.post.body}</p>
                                    <p className="mb-2">{content.linkedin.post.cta}</p>
                                    <p className="text-primary">{content.linkedin.post.hashtags.join(' ')}</p>
                                </div>

                                {content.linkedin.variants && (
                                    <div>
                                        <h4 className="font-medium mb-2">Alternative Versions</h4>
                                        <div className="grid gap-2">
                                            {content.linkedin.variants.map((variant: any, i: number) => (
                                                <div key={i} className="border p-3 rounded text-sm">
                                                    <span className="font-medium capitalize">{variant.type}:</span> {variant.content}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ) : (
                        <Card>
                            <CardContent className="py-8 text-center text-muted-foreground">
                                No LinkedIn content available
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                {/* Twitter Tab */}
                <TabsContent value="twitter" className="space-y-4">
                    {content.twitter ? (
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Twitter Thread</CardTitle>
                                        <CardDescription>Optimized for maximum engagement</CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleRegenerate('twitter')}
                                            disabled={regenerating === 'twitter'}
                                        >
                                            {regenerating === 'twitter' ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <RefreshCw className="h-4 w-4" />
                                            )}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                handleCopy(
                                                    content.twitter.thread.map((t: any) => t.content).join('\n\n'),
                                                    'Twitter'
                                                )
                                            }
                                        >
                                            <Copy className="h-4 w-4 mr-2" />
                                            Copy Thread
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    {content.twitter.thread.map((tweet: any, i: number) => (
                                        <div key={i} className="border-l-4 border-primary pl-4 py-2">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="text-xs text-muted-foreground mb-1">Tweet {tweet.tweetNumber}</p>
                                                    <p>{tweet.content}</p>
                                                    <p className="text-xs text-muted-foreground mt-1 italic">{tweet.note}</p>
                                                </div>
                                                <span className="text-xs text-muted-foreground">{tweet.content.length}/280</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {content.twitter.hashtags && (
                                    <div>
                                        <p className="text-sm font-medium">Suggested hashtags:</p>
                                        <p className="text-primary">{content.twitter.hashtags.join(' ')}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ) : (
                        <Card>
                            <CardContent className="py-8 text-center text-muted-foreground">
                                No Twitter content available
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                {/* Blog Tab */}
                <TabsContent value="blog" className="space-y-4">
                    {content.blog ? (
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Blog Article</CardTitle>
                                        <CardDescription>SEO-optimized long-form content</CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleRegenerate('blog')}
                                            disabled={regenerating === 'blog'}
                                        >
                                            {regenerating === 'blog' ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <RefreshCw className="h-4 w-4" />
                                            )}
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleCopy(content.blog.article.title + '\n\n' + content.blog.article.introduction, 'Blog')}>
                                            <Copy className="h-4 w-4 mr-2" />
                                            Copy
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">{content.blog.article.title}</h2>
                                    <p className="text-sm text-muted-foreground">{content.blog.article.metaDescription}</p>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-2">Introduction</h3>
                                    <p className="text-sm whitespace-pre-wrap">{content.blog.article.introduction}</p>
                                </div>

                                {content.blog.article.sections && (
                                    <div className="space-y-4">
                                        {content.blog.article.sections.map((section: any, i: number) => (
                                            <div key={i} className="border-l-2 border-muted pl-4">
                                                <h4 className="font-medium mb-2">{section.heading}</h4>
                                                <p className="text-sm text-muted-foreground mb-1">{section.content}</p>
                                                <p className="text-xs text-primary">Key: {section.keyTakeaway}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {content.blog.seoMetadata && (
                                    <div className="bg-muted p-4 rounded-lg">
                                        <h4 className="font-medium mb-2">SEO Metadata</h4>
                                        <div className="text-sm space-y-1">
                                            <p>
                                                <span className="font-medium">Focus Keyword:</span> {content.blog.seoMetadata.focusKeyword}
                                            </p>
                                            <p>
                                                <span className="font-medium">Keywords:</span> {content.blog.seoMetadata.keywords.join(', ')}
                                            </p>
                                            <p>
                                                <span className="font-medium">Slug:</span> {content.blog.seoMetadata.slug}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ) : (
                        <Card>
                            <CardContent className="py-8 text-center text-muted-foreground">
                                No blog content available
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                {/* Reel Script Tab */}
                <TabsContent value="reelScript" className="space-y-4">
                    {content.reelScript ? (
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Reel/Short Video Script</CardTitle>
                                        <CardDescription>30-60 second video content</CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleRegenerate('reel')}
                                            disabled={regenerating === 'reel'}
                                        >
                                            {regenerating === 'reel' ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <RefreshCw className="h-4 w-4" />
                                            )}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                handleCopy(
                                                    `Hook: ${content.reelScript.script.hook}\n\n${content.reelScript.script.body.map((s: any) => `Scene ${s.scene}: ${s.voiceover}`).join('\n')}\n\nCTA: ${content.reelScript.script.cta}`,
                                                    'Reel'
                                                )
                                            }
                                        >
                                            <Copy className="h-4 w-4 mr-2" />
                                            Copy
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded">
                                    <p className="font-bold text-sm">🎬 Hook (0-2s)</p>
                                    <p className="text-sm">{content.reelScript.script.hook}</p>
                                </div>

                                <div className="space-y-3">
                                    {content.reelScript.script.body.map((scene: any, i: number) => (
                                        <div key={i} className="border p-3 rounded">
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="font-medium text-sm">Scene {scene.scene}</p>
                                                <span className="text-xs text-muted-foreground">{scene.duration}</span>
                                            </div>
                                            <div className="text-sm space-y-1">
                                                <p>
                                                    <span className="font-medium">Visual:</span> {scene.visual}
                                                </p>
                                                <p>
                                                    <span className="font-medium">Voiceover:</span> {scene.voiceover}
                                                </p>
                                                <p className="text-primary">
                                                    <span className="font-medium">Text:</span> {scene.onScreenText}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-green-50 border border-green-200 p-3 rounded">
                                    <p className="font-bold text-sm mb-1">Call to Action</p>
                                    <p className="text-sm">{content.reelScript.script.cta}</p>
                                </div>

                                {content.reelScript.production && (
                                    <div className="bg-muted p-4 rounded-lg text-sm">
                                        <h4 className="font-medium mb-2">Production Notes</h4>
                                        <p>
                                            <span className="font-medium">Duration:</span> {content.reelScript.production.totalDuration}
                                        </p>
                                        <p>
                                            <span className="font-medium">Music:</span> {content.reelScript.production.suggestedMusic}
                                        </p>
                                        <p>
                                            <span className="font-medium">Style:</span> {content.reelScript.production.visualStyle}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ) : (
                        <Card>
                            <CardContent className="py-8 text-center text-muted-foreground">
                                No reel script available
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
