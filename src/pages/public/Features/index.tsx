import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Zap, PenTool, BarChart3, Globe, Lock, Code, Cpu } from 'lucide-react';
import { PlatformIcons } from '@/components/ui/PlatformIcons';
import { PublicNavbar } from '@/components/public-layout/PublicNavbar';
import { PublicFooter } from '@/components/public-layout/PublicFooter';

const fullFeatures = [
    {
        icon: PenTool,
        title: "Advanced Editor",
        description: "Write and format content with a Notion-like editor tailored for social platforms. Built-in character limits and dynamic previews ensure perfect formatting."
    },
    {
        icon: Layers,
        title: "Visual Pipeline",
        description: "Track the status of every draft, review, and scheduled post with a customizable Kanban board. Create custom stages for your specific workflow."
    },
    {
        icon: Globe,
        title: "Omnichannel Publishing",
        description: "Publish simultaneously across LinkedIn, Twitter, YouTube Community, Threads, and more. Tweak content seamlessly per platform."
    },
    {
        icon: Zap,
        title: "Smart Automations",
        description: "Set up rules to automatically move posts between pipeline stages or assign reviews to specific team members based on content type."
    },
    {
        icon: BarChart3,
        title: "Executive Analytics",
        description: "Unified cross-platform reporting. See aggregated engagements, analyze top-performing times, and export presentation-ready reports."
    },
    {
        icon: Lock,
        title: "Enterprise Security",
        description: "SSO integrations, granular role-based access control (RBAC), and detailed audit logs to ensure your brand's voice is always protected."
    }
];

const FeaturesPage = () => {
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
                            Everything you need to <span className="bg-gradient-to-r from-white to-[#A78BFA] text-transparent bg-clip-text">distribute content</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-[18px] md:text-[20px] text-white/60 leading-[1.6]"
                        >
                            A powerful suite of tools designed to help creators and teams build, manage, and scale their content pipelines seamlessly.
                        </motion.p>
                    </div>

                    {/* Full Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                        {fullFeatures.map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + (idx * 0.1) }}
                                    key={idx}
                                    className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-[#8B5CF6]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(139,92,246,0.1)]"
                                >
                                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#6366F1]/20 border border-[#8B5CF6]/30 flex items-center justify-center mb-6 text-[#A78BFA] shadow-inner">
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                                    <p className="text-white/60 leading-relaxed">{feature.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Integrations Rebuilt Section */}
                    <div className="max-w-[1000px] mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-16"
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <span className="text-2xl">🤖</span>
                                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.02em]">AI Content Generation</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Gemini */}
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
                                                <Cpu size={20} />
                                            </div>
                                            <h3 className="text-xl font-semibold text-white">Google Gemini</h3>
                                        </div>
                                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">Live</span>
                                    </div>
                                    <ul className="space-y-3">
                                        {['Content generation', 'Script writing', 'Idea expansion'].map(item => (
                                            <li key={item} className="flex items-center gap-3 text-white/70">
                                                <span className="text-emerald-400">✓</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* ChatGPT */}
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                                                <Code size={20} />
                                            </div>
                                            <h3 className="text-xl font-semibold text-white">ChatGPT / OpenAI</h3>
                                        </div>
                                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">Live</span>
                                    </div>
                                    <ul className="space-y-3">
                                        {['Content generation', 'Copywriting', 'Brainstorming'].map(item => (
                                            <li key={item} className="flex items-center gap-3 text-white/70">
                                                <span className="text-emerald-400">✓</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <span className="text-2xl">📱</span>
                                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.02em]">Social Media Publishing</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* LinkedIn Personal */}
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-[#0077b5]/20 flex items-center justify-center border border-[#0077b5]/30">
                                                <div className="scale-150">
                                                    <PlatformIcons.LINKEDIN />
                                                </div>
                                            </div>
                                            <h3 className="text-lg font-semibold text-white">LinkedIn (Personal)</h3>
                                        </div>
                                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">Live</span>
                                    </div>
                                    <ul className="space-y-3">
                                        {['Text posts', 'Image posts'].map(item => (
                                            <li key={item} className="flex items-center gap-3 text-[14px] text-white/70">
                                                <span className="text-emerald-400">✓</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* LinkedIn Company */}
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors relative overflow-hidden">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-[#0077b5]/10 flex items-center justify-center border border-white/5 opacity-50">
                                                <div className="scale-150 grayscale">
                                                    <PlatformIcons.LINKEDIN />
                                                </div>
                                            </div>
                                            <h3 className="text-lg font-semibold text-white/60">LinkedIn (Company)</h3>
                                        </div>
                                    </div>
                                    <div className="absolute top-5 right-5">
                                        <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-[10px] font-bold uppercase tracking-wider border border-orange-500/20">Coming Soon</span>
                                    </div>
                                    <ul className="space-y-3">
                                        {['Company page posting', 'Multi-page management'].map(item => (
                                            <li key={item} className="flex items-center gap-3 text-[14px] text-white/40">
                                                <span className="text-white/20">✓</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Twitter */}
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
                                                <div className="scale-[1.8]">
                                                    <PlatformIcons.TWITTER />
                                                </div>
                                            </div>
                                            <h3 className="text-lg font-semibold text-white">Twitter / X</h3>
                                        </div>
                                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">Live</span>
                                    </div>
                                    <ul className="space-y-3">
                                        {['Tweets', 'Threads'].map(item => (
                                            <li key={item} className="flex items-center gap-3 text-[14px] text-white/70">
                                                <span className="text-emerald-400">✓</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            <PublicFooter />
        </div>
    );
};

export default FeaturesPage;
