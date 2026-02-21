import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Target, Rss, Hash } from 'lucide-react';
import { PublicNavbar } from '@/components/public-layout/PublicNavbar';
import { PublicFooter } from '@/components/public-layout/PublicFooter';

const playbooks = [
    {
        title: "The B2B Founder's LinkedIn Strategy",
        icon: Target,
        category: "Strategy",
        readTime: "8 min read",
        author: "Sarah Jenks",
        description: "How to build a personal brand that drives pipeline without being cringe. Includes 30 days of post templates."
    },
    {
        title: "Zero-Click Content Distribution",
        icon: Rss,
        category: "Distribution",
        readTime: "12 min read",
        author: "Marcus Wei",
        description: "A framework for creating native content that algorithms love. Stop linking out and start building in-feed authority."
    },
    {
        title: "Repurposing 1 Podcast into 20 Assets",
        icon: Hash,
        category: "Workflow",
        readTime: "6 min read",
        author: "Emily Chen",
        description: "The exact SOP used by top agencies to turn a simple 45-minute recording into a month's worth of social content."
    },
    {
        title: "Building a Multi-Creator Pipeline",
        icon: BookOpen,
        category: "Team Scaling",
        readTime: "15 min read",
        author: "David Park",
        description: "How to coordinate multiple executives, ghostwriters, and ghost designers in one synchronized workflow."
    }
];

const PlaybooksPage = () => {
    return (
        <div className="min-h-screen bg-[#0A0E27]">
            <PublicNavbar />
            <div className="pt-32 pb-24">
                <div className="max-w-[1280px] mx-auto px-6 md:px-10">
                    <div className="text-center max-w-[800px] mx-auto mb-20">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[40px] md:text-[56px] font-bold text-white leading-[1.1] tracking-[-0.02em] mb-6"
                        >
                            Content strategies that <span className="bg-gradient-to-r from-white to-[#A78BFA] text-transparent bg-clip-text">actually work</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-[18px] md:text-[20px] text-white/60 leading-[1.6]"
                        >
                            Tactical playbooks, templates, and guides from the world's fastest-growing creators and B2B brands.
                        </motion.p>
                    </div>

                    {/* Playbooks Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {playbooks.map((book, idx) => {
                            const Icon = book.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + (idx * 0.1) }}
                                    className="group flex flex-col justify-between bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-[#8B5CF6]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(139,92,246,0.15)] cursor-pointer relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0 group-hover:-translate-y-2">
                                        <ArrowUpRight className="text-[#A78BFA] w-6 h-6" />
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className="px-3 py-1 rounded-full bg-[#8B5CF6]/10 text-[#A78BFA] text-[11px] font-bold uppercase tracking-wider">{book.category}</span>
                                            <span className="text-white/40 text-sm font-medium">{book.readTime}</span>
                                        </div>
                                        <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center mb-5 text-white/80 group-hover:text-white transition-colors">
                                            <Icon size={20} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#A78BFA] transition-colors">{book.title}</h3>
                                        <p className="text-white/60 leading-relaxed mb-8">
                                            {book.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3 pt-6 border-t border-white/10 mt-auto">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] flex items-center justify-center text-white font-bold text-xs">
                                            {book.author.charAt(0)}
                                        </div>
                                        <span className="text-white/80 font-medium text-sm">{book.author}</span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <PublicFooter />
        </div>
    );
};

export default PlaybooksPage;
