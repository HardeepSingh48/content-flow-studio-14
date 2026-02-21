import React from 'react';
import { motion } from 'framer-motion';
import { Plus, MoreVertical, Linkedin, Twitter, MessageSquare, Clock } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ContentItem {
    id: string;
    title: string;
    excerpt: string;
    platforms: ('linkedin' | 'twitter' | 'threads')[];
    updatedAt: string;
}

interface Column {
    id: string;
    title: string;
    items: ContentItem[];
}

const mockColumns: Column[] = [
    {
        id: 'drafts',
        title: 'Drafts',
        items: [
            { id: '1', title: 'The Future of AI in Publishing', excerpt: 'Exploring how LLMs are changing the landscape for content creators...', platforms: ['linkedin', 'twitter'], updatedAt: '2h ago' },
            { id: '2', title: 'Content Distribution 101', excerpt: 'Why creating is only 20% of the battle. Here is my system...', platforms: ['linkedin'], updatedAt: '1d ago' },
        ]
    },
    {
        id: 'review',
        title: 'In Review',
        items: [
            { id: '3', title: 'Why I moved to a Pipeline flow', excerpt: 'Structured workflows are the only way to scale content without burn out...', platforms: ['linkedin', 'twitter', 'threads'], updatedAt: '3h ago' },
        ]
    },
    {
        id: 'scheduled',
        title: 'Scheduled',
        items: [
            { id: '4', title: 'The Power of Consistency', excerpt: 'Success in publishing is a marathon, not a sprint. Here is the data...', platforms: ['twitter'], updatedAt: 'Scheduled for 10 AM' },
        ]
    },
    {
        id: 'published',
        title: 'Published',
        items: [
            { id: '5', title: '10 Tips for Content Strategy', excerpt: 'My top advice for anyone starting their content journey in 2024...', platforms: ['linkedin', 'twitter'], updatedAt: 'Published 2h ago' },
            { id: '6', title: 'Developer Productivity Secrets', excerpt: 'How I use automation to reclaim 20 hours a week from my workflow...', platforms: ['linkedin'], updatedAt: 'Published Yesterday' },
        ]
    }
];

const PlatformIcon = ({ type }: { type: string }) => {
    switch (type) {
        case 'linkedin': return <div className="p-1 bg-[#0077b5]/10 rounded"><Linkedin className="size-3 text-[#0077b5]" /></div>;
        case 'twitter': return <div className="p-1 bg-black/5 rounded"><Twitter className="size-3 text-black" /></div>;
        case 'threads': return <div className="p-1 bg-neutral-900/5 rounded"><MessageSquare className="size-3 text-neutral-900" /></div>;
        default: return null;
    }
};

const PipelineCard = ({ item }: { item: ContentItem }) => (
    <motion.div
        whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(255,255,255,0.05)' }}
        className="bg-white/5 border border-white/10 rounded-xl p-4 cursor-pointer group hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
    >
        <div className="flex items-start justify-between mb-2">
            <h4 className="text-sm font-semibold text-white group-hover:text-primary-400 transition-colors uppercase tracking-tight">{item.title}</h4>
            <button className="text-white/40 hover:text-white"><MoreVertical className="size-4" /></button>
        </div>
        <p className="text-xs text-white/60 line-clamp-2 mb-4 leading-relaxed">{item.excerpt}</p>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/10">
            <div className="flex gap-1.5">
                {item.platforms.map(p => <PlatformIcon key={p} type={p} />)}
            </div>
            <div className="flex items-center gap-1 text-[10px] text-white/50 font-medium">
                <Clock className="size-3" />
                {item.updatedAt}
            </div>
        </div>
    </motion.div>
);

const PipelinePage = () => {
    return (
        <div className="h-full flex flex-col">
            <PageHeader
                title="Content Pipeline"
                subtitle="Manage your content flow across different stages of production."
                actions={
                    <Button icon={<Plus size={18} />} className="shadow-lg shadow-primary-500/15">
                        Create Content
                    </Button>
                }
                className="py-0 mb-8 border-none"
            />

            <div className="flex-1 overflow-x-auto pb-4 -mx-4 px-4 lg:-mx-10 lg:px-10">
                <div className="flex gap-6 min-h-[calc(100vh-250px)]">
                    {mockColumns.map((column) => (
                        <div key={column.id} className="w-[300px] flex-shrink-0 flex flex-col gap-4">
                            <div className="flex items-center justify-between px-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-white">{column.title}</span>
                                    <span className="bg-white/10 text-white/70 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                        {column.items.length}
                                    </span>
                                </div>
                                <button className="p-1 hover:bg-white/10 rounded transition-colors">
                                    <Plus className="size-4 text-white/50" />
                                </button>
                            </div>

                            <div className="flex-1 bg-white/5 rounded-xl p-3 flex flex-col gap-3 group/column border border-white/10 backdrop-blur-md">
                                {column.items.map((item) => (
                                    <PipelineCard key={item.id} item={item} />
                                ))}
                                <button className="w-full py-2 flex items-center justify-center gap-2 text-xs font-semibold text-white/60 hover:text-white hover:bg-white/10 rounded-xl border border-transparent transition-all">
                                    <Plus className="size-3" />
                                    Add New
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PipelinePage;
