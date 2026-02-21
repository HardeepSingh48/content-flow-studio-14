import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Save,
    Send,
    Sparkles,
    Smartphone,
    Monitor,
    CheckCircle2,
    AlertCircle,
    Eye,
    Type,
    Image as ImageIcon,
    History,
    Layout,
    Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import RichTextEditor from '../content/RichTextEditor';
import TweetThreadEditor from '../content/TweetThreadEditor';

interface ContentEditorProps {
    initialContent?: string;
    initialPlatform?: string;
    onSave?: (content: any) => void;
    onPublish?: (content: any) => void;
}

export default function ContentEditor({
    initialContent = '',
    initialPlatform = 'linkedin',
    onSave,
    onPublish
}: ContentEditorProps) {
    const [platform, setPlatform] = useState(initialPlatform);
    const [content, setContent] = useState(initialContent);
    const [tweets, setTweets] = useState([{ id: '1', content: '', order: 1 }]);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [viewDevice, setViewDevice] = useState<'mobile' | 'desktop'>('mobile');
    const [isAiOptimizing, setIsAiOptimizing] = useState(false);

    const platforms = [
        { id: 'linkedin', label: 'LinkedIn', icon: '💼', color: 'bg-blue-600' },
        { id: 'twitter', label: 'Twitter', icon: '🐦', color: 'bg-neutral-900' },
        { id: 'threads', label: 'Threads', icon: '🧵', color: 'bg-neutral-800' },
        { id: 'article', label: 'Medium', icon: '📝', color: 'bg-emerald-600' },
    ];

    const handleAiOptimize = () => {
        setIsAiOptimizing(true);
        setTimeout(() => {
            setIsAiOptimizing(false);
            // Mock AI optimization
        }, 2000);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-120px)] bg-[#0A0E27] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
            {/* Top Toolbar */}
            <header className="h-16 bg-white/5 border-b border-white/10 px-6 flex items-center justify-between z-10 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 bg-black/20 p-1 rounded-xl">
                        {platforms.map((p) => (
                            <button
                                key={p.id}
                                onClick={() => setPlatform(p.id)}
                                className={cn(
                                    "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                                    platform === p.id
                                        ? "bg-white/10 text-white shadow-sm"
                                        : "text-white/50 hover:text-white"
                                )}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>
                    <Separator orientation="vertical" className="h-6 bg-white/10" />
                    <div className="flex items-center gap-2 text-white/40 text-xs font-medium italic">
                        <History size={14} />
                        Last saved 2m ago
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-white/70 font-bold hover:bg-white/5 hover:text-white"
                        onClick={() => setIsPreviewMode(!isPreviewMode)}
                    >
                        {isPreviewMode ? <Type size={16} className="mr-2" /> : <Eye size={16} className="mr-2" />}
                        {isPreviewMode ? 'Edit Mode' : 'Preview'}
                    </Button>
                    <Separator orientation="vertical" className="h-6 bg-white/10" />
                    <Button variant="secondary" size="sm" className="font-bold border-white/10 text-white hover:bg-white/10 bg-white/5" onClick={() => onSave?.(content)}>
                        <Save size={16} className="mr-2" />
                        Save Draft
                    </Button>
                    <Button size="sm" className="font-bold shadow-lg shadow-primary-500/20 px-6" onClick={() => onPublish?.(content)}>
                        <Send size={16} className="mr-2" />
                        Publish Now
                    </Button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Main Editor Area */}
                <main className="flex-1 overflow-y-auto p-10 bg-transparent">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <AnimatePresence mode="wait">
                            {!isPreviewMode ? (
                                <motion.div
                                    key="editor"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-6"
                                >
                                    <div className="space-y-2">
                                        <h1 className="text-3xl font-bold text-white outline-none" contentEditable>
                                            Redesigning the Future of Analytics
                                        </h1>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="neutral" className="bg-white/5 text-white/50 font-bold border-none hover:bg-white/10">#Design</Badge>
                                            <Badge variant="neutral" className="bg-white/5 text-white/50 font-bold border-none hover:bg-white/10">#Analytics</Badge>
                                            <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px] text-primary hover:bg-primary/20 hover:text-primary-400">+ Add Tag</Button>
                                        </div>
                                    </div>

                                    {platform === 'twitter' || platform === 'threads' ? (
                                        <TweetThreadEditor
                                            tweets={tweets}
                                            onChange={setTweets}
                                            hashtags={['design', 'ux', 'data']}
                                        />
                                    ) : (
                                        <div className="min-h-[500px] rounded-2xl border border-white/10 shadow-inner p-2 bg-black/20 text-white">
                                            <RichTextEditor
                                                content={content}
                                                onChange={setContent}
                                                placeholder="Start writing your premium content..."
                                            />
                                        </div>
                                    )}

                                    <div className="pt-10 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <Button variant="secondary" className="rounded-xl border-white/10 bg-white/5 text-white/70 font-bold hover:bg-white/10 hover:text-white shadow-none">
                                                <ImageIcon size={16} className="mr-2" />
                                                Add Media
                                            </Button>
                                            <Button variant="secondary" className="rounded-xl border-white/10 bg-white/5 text-white/70 font-bold hover:bg-white/10 hover:text-white shadow-none">
                                                <Layout size={16} className="mr-2" />
                                                Templates
                                            </Button>
                                        </div>
                                        <div className="text-sm font-bold text-white/40">
                                            ~ 242 Words
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="preview"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    className="flex flex-col items-center justify-start min-h-full pt-4"
                                >
                                    <div className="flex gap-2 mb-8 bg-black/20 p-1 rounded-xl border border-white/5">
                                        <Button
                                            variant={viewDevice === 'mobile' ? 'primary' : 'ghost'}
                                            size="sm"
                                            className={cn("rounded-lg h-8 w-10 p-0", viewDevice !== 'mobile' && "text-white/50 hover:bg-white/5 hover:text-white")}
                                            onClick={() => setViewDevice('mobile')}
                                        >
                                            <Smartphone size={16} />
                                        </Button>
                                        <Button
                                            variant={viewDevice === 'desktop' ? 'primary' : 'ghost'}
                                            size="sm"
                                            className={cn("rounded-lg h-8 w-10 p-0", viewDevice !== 'desktop' && "text-white/50 hover:bg-white/5 hover:text-white")}
                                            onClick={() => setViewDevice('desktop')}
                                        >
                                            <Monitor size={16} />
                                        </Button>
                                    </div>

                                    {/* Platform Preview Mock */}
                                    <div className={cn(
                                        "bg-white rounded-[40px] border-[8px] border-neutral-900 shadow-2xl transition-all duration-500 overflow-hidden",
                                        viewDevice === 'mobile' ? "w-[340px] aspect-[9/18.5]" : "w-full max-w-2xl aspect-[16/10]"
                                    )}>
                                        <div className="h-full w-full bg-white flex flex-col">
                                            <div className="h-12 border-b border-neutral-100 flex items-center px-4 justify-between bg-white text-neutral-900 font-bold text-sm">
                                                <span>{platform === 'linkedin' ? 'LinkedIn' : 'Twitter'}</span>
                                                <Share2 size={14} />
                                            </div>
                                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-10 rounded-full bg-primary-100 border border-primary-200" />
                                                    <div>
                                                        <div className="h-3 w-24 bg-neutral-100 rounded-full mb-1" />
                                                        <div className="h-2 w-16 bg-neutral-50 rounded-full" />
                                                    </div>
                                                </div>
                                                <div className="prose prose-sm prose-neutral max-w-none">
                                                    <div dangerouslySetInnerHTML={{ __html: content || 'Your content preview will appear here...' }} />
                                                </div>
                                                <div className="h-40 bg-neutral-100 rounded-2xl flex items-center justify-center text-neutral-300">
                                                    <ImageIcon size={32} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </main>

                {/* Sidebar Controls */}
                <aside className="w-80 border-l border-white/10 bg-white/5 p-6 overflow-y-auto hidden xl:block backdrop-blur-sm">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest">AI Content Assistant</h3>
                            <Card className="border-primary/20 bg-primary/10 overflow-hidden group">
                                <CardBody className="p-4 space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-primary-600 rounded-lg text-white shadow-lg shadow-primary-500/20">
                                            <Sparkles size={16} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-white">Elite Optimizer</h4>
                                            <p className="text-[11px] text-white/60 mt-0.5">Refine tone and increase engagement for higher visibility.</p>
                                        </div>
                                    </div>
                                    <Button
                                        className="w-full bg-primary hover:bg-primary-600 text-white font-bold h-9 text-xs"
                                        onClick={handleAiOptimize}
                                        loading={isAiOptimizing}
                                    >
                                        Optimize Post
                                    </Button>
                                </CardBody>
                            </Card>
                        </div>

                        <Separator className="bg-white/10" />

                        <div className="space-y-6">
                            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest">Quality Audit</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-success-50 rounded-xl border border-success-100">
                                    <div className="flex items-center gap-2 text-success-700 font-bold text-xs">
                                        <CheckCircle2 size={14} />
                                        Readability
                                    </div>
                                    <span className="text-[10px] font-bold text-success-600 bg-success-bg px-2 py-0.5 rounded">High (84)</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-info-50 rounded-xl border border-info-100">
                                    <div className="flex items-center gap-2 text-info-700 font-bold text-xs">
                                        <Layout size={14} />
                                        Visual Balance
                                    </div>
                                    <span className="text-[10px] font-bold text-info-600 bg-info-bg px-2 py-0.5 rounded">Great</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-warning-50 rounded-xl border border-warning-100">
                                    <div className="flex items-center gap-2 text-warning-700 font-bold text-xs">
                                        <AlertCircle size={14} />
                                        Links
                                    </div>
                                    <span className="text-[10px] font-bold text-warning-600 bg-warning-bg px-2 py-0.5 rounded">Missing</span>
                                </div>
                            </div>
                        </div>

                        <Separator className="bg-white/10" />

                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest">Publishing Intel</h3>
                            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                                <div className="space-y-1">
                                    <div className="text-[10px] font-bold text-white/40 uppercase">Best time to post</div>
                                    <div className="text-sm font-bold text-white">Today, 2:45 PM (PT)</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-[10px] font-bold text-white/40 uppercase">Estimated reach</div>
                                    <div className="text-sm font-bold text-white">12.4k - 18.2k</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
