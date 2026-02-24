import React from 'react';
import { motion } from 'framer-motion';
import {
    Layers, Zap, PenTool, BarChart3, Globe, Lock, Code, Cpu,
    Linkedin, Twitter, Instagram, Youtube, Facebook, MapPin, Notebook, Mail, BookOpen, Music, // Platforms
    Bot, Sparkles, MessageSquare, BrainCircuit, // Text
    Mic, AudioLines, Radio, // Audio
    Video, Film, Clapperboard, MonitorPlay, // Video
    Image as ImageIcon, Camera, Palette, Wand2 // Image
} from 'lucide-react';
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

                    {/* Massive Integrations Ecosystem Section */}
                    <div className="max-w-[1280px] mx-auto mt-32">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-[-0.02em] mb-4">
                                The Ultimate Content <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] to-white">Ecosystem</span>
                            </h2>
                            <p className="text-lg text-white/60 max-w-2xl mx-auto">
                                We integrate with over 40 of the world's most powerful AI models and social platforms, allowing you to build unprecedented content pipelines.
                            </p>
                        </div>

                        {/* Social Platforms */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-16"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">🌐</span>
                                <h3 className="text-2xl font-semibold text-white">Posting Platforms</h3>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                                {[
                                    { name: 'LinkedIn Personal', icon: Linkedin, live: true },
                                    { name: 'Twitter / X', icon: Twitter, live: true },
                                    { name: 'Instagram', icon: Instagram, live: true },
                                    { name: 'YouTube', icon: Youtube, live: false },
                                    { name: 'TikTok', icon: Music, live: false },
                                    { name: 'LinkedIn Company', icon: Linkedin, live: false },
                                    { name: 'Facebook Pages', icon: Facebook, live: false },
                                    { name: 'Pinterest', icon: MapPin, live: false },
                                    { name: 'Medium', icon: BookOpen, live: false },
                                    { name: 'Substack', icon: Mail, live: false },
                                ].map(p => (
                                    <div key={p.name} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors group">
                                        <div className="w-10 h-10 mb-3 rounded-full bg-white/5 flex items-center justify-center text-white/50 group-hover:text-white transition-colors">
                                            <p.icon size={20} />
                                        </div>
                                        <h4 className="font-medium text-white/90 mb-2">{p.name}</h4>
                                        {p.live ? (
                                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">Live</span>
                                        ) : (
                                            <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-[10px] font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity">Coming Soon</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* AI Category Grids */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                            {/* Text & Agents */}
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">📝</span>
                                    <h3 className="text-xl font-semibold text-white">Text & Agents</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { name: 'ChatGPT', icon: MessageSquare }, { name: 'Gemini', icon: Sparkles },
                                        { name: 'Claude', icon: Bot }, { name: 'Llama 3', icon: BrainCircuit },
                                        { name: 'Mistral', icon: Zap }, { name: 'Perplexity', icon: Globe },
                                        { name: 'Cohere', icon: Layers }, { name: 'Groq', icon: Cpu }
                                    ].map(model => (
                                        <div key={model.name} className="bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white/80 flex items-center gap-3 hover:text-white hover:border-[#8B5CF6]/50 transition-colors">
                                            <model.icon size={16} className="text-emerald-400/70" />
                                            {model.name}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Audio & Voice */}
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center">🎤</span>
                                    <h3 className="text-xl font-semibold text-white">Audio & Voice</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { name: 'ElevenLabs', icon: Mic }, { name: 'NotebookLM', icon: Notebook },
                                        { name: 'Seed-TTS', icon: AudioLines }, { name: 'OpenAI TTS', icon: MessageSquare },
                                        { name: 'PlayHT', icon: Radio }, { name: 'Murf.ai', icon: Mic },
                                        { name: 'Resemble AI', icon: AudioLines }, { name: 'Suno', icon: Music }
                                    ].map(model => (
                                        <div key={model.name} className="bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white/80 flex items-center gap-3 hover:text-white hover:border-[#8B5CF6]/50 transition-colors">
                                            <model.icon size={16} className="text-orange-400/70" />
                                            {model.name}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Video & Animation */}
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center">🎬</span>
                                    <h3 className="text-xl font-semibold text-white">Video & Animation</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { name: 'Veo 3', icon: Video }, { name: 'Viggle (Dance)', icon: Clapperboard },
                                        { name: 'HeyGen', icon: Video }, { name: 'Synthesia', icon: MonitorPlay },
                                        { name: 'Luma Dream Mach.', icon: Wand2 }, { name: 'Kling AI', icon: Film },
                                        { name: 'Runway Gen-3', icon: Clapperboard }, { name: 'Pika Labs', icon: Film },
                                        { name: 'Haiper', icon: Video }
                                    ].map(model => (
                                        <div key={model.name} className="bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white/80 flex items-center gap-3 hover:text-white hover:border-[#8B5CF6]/50 transition-colors">
                                            <model.icon size={16} className="text-purple-400/70" />
                                            {model.name}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Image & Vision */}
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="w-8 h-8 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center">🖼️</span>
                                    <h3 className="text-xl font-semibold text-white">Image & Vision</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { name: 'Midjourney', icon: Palette }, { name: 'DALL-E 3', icon: ImageIcon },
                                        { name: 'Stable Diffusion', icon: Wand2 }, { name: 'Leonardo.ai', icon: Camera },
                                        { name: 'Adobe Firefly', icon: Sparkles }
                                    ].map(model => (
                                        <div key={model.name} className="bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white/80 flex items-center gap-3 hover:text-white hover:border-[#8B5CF6]/50 transition-colors">
                                            <model.icon size={16} className="text-pink-400/70" />
                                            {model.name}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
            <PublicFooter />
        </div>
    );
};

export default FeaturesPage;
