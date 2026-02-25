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
        title: "Strategy-First Editor",
        description: "Write with context. Every brief links to a content pillar, target audience, and campaign goal. Your editor knows what the content needs to achieve before you type a word."
    },
    {
        icon: Layers,
        title: "Editorial Pipeline Board",
        description: "A visual Kanban board for your entire content operation. Custom stages, priority flags, deadline tracking, and role-based ownership — built for editorial rigour."
    },
    {
        icon: Globe,
        title: "Omnichannel Distribution",
        description: "Once strategy approves, distribute across LinkedIn, Twitter, YouTube, Instagram, and more with one click — with platform-native formatting automatically applied."
    },
    {
        icon: Zap,
        title: "Workflow Automations",
        description: "Automate the editorial handoff. Route drafts to the right reviewer, trigger approval reminders, and enforce publishing rules — all without manual intervention."
    },
    {
        icon: BarChart3,
        title: "Content Performance Intelligence",
        description: "Track which content pillars are driving audience growth, benchmark against your strategy goals, and get data-backed recommendations for your next editorial sprint."
    },
    {
        icon: Lock,
        title: "Enterprise Governance",
        description: "SSO, granular RBAC, and full audit logs ensure brand voice is protected and every piece of content is traceable back to a strategic decision."
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
                            The platform built around <span className="bg-gradient-to-r from-white to-[#A78BFA] text-transparent bg-clip-text">content strategy</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-[18px] md:text-[20px] text-white/60 leading-[1.6]"
                        >
                            Every feature in Stratiara is designed to help teams think strategically, move deliberately, and distribute at scale.
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
                                Integrations built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] to-white">strategic reach</span>
                            </h2>
                            <p className="text-lg text-white/60 max-w-2xl mx-auto">
                                Connect to 40+ platforms and AI models. Strategy drives the decisions — integrations handle the execution.
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
                                    { name: 'Facebook Pages', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg', live: false },
                                    { name: 'Facebook Profile', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg', live: false },
                                    { name: 'Instagram', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg', live: true },
                                    { name: 'LinkedIn Personal', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg', live: true },
                                    { name: 'LinkedIn Company', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg', live: false },
                                    { name: 'Twitter / X', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg', live: true, invert: true },
                                    { name: 'YouTube', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg', live: false },
                                    { name: 'TikTok', logo: 'https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg', live: false, whiteBg: true },
                                    { name: 'Pinterest', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Pinterest_Logo.svg', live: false },
                                    { name: 'Medium', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Medium_logo_Monogram.svg', live: false, invert: true },
                                    { name: 'Substack', logo: 'https://logo.clearbit.com/substack.com', live: false, whiteBg: true },
                                    { name: 'WordPress', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Wordpress-Logo.svg', live: false, whiteBg: true },
                                    { name: 'Reddit', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Reddit_logo.svg', live: false, whiteBg: true },
                                ].map(p => (
                                    <div key={p.name} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors group">
                                        <div className={`w-12 h-12 mb-3 rounded-full flex items-center justify-center overflow-hidden p-2.5 ${p.whiteBg ? 'bg-white' : 'bg-white/5'}`}>
                                            <img src={p.logo} alt={p.name} className={`w-full h-full object-contain ${p.invert ? 'invert' : ''}`} onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=2C3E50&color=fff`; }} />
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
                                        { name: 'ChatGPT', logo: 'https://cdn.simpleicons.org/openai/10a37f' },
                                        { name: 'Gemini', logo: 'https://cdn.simpleicons.org/googlegemini/8E75B2' },
                                        { name: 'Claude', logo: 'https://cdn.simpleicons.org/anthropic/D97706', whiteBg: true },
                                        { name: 'Llama 3', logo: 'https://cdn.simpleicons.org/meta/0081FB' },
                                        { name: 'Mistral', logo: 'https://cdn.simpleicons.org/mistral/FF7000' },
                                        { name: 'Perplexity', logo: 'https://cdn.simpleicons.org/perplexity/20808D' },
                                        { name: 'Cohere', logo: 'https://www.google.com/s2/favicons?domain=cohere.com&sz=128' },
                                        { name: 'Groq', logo: 'https://www.google.com/s2/favicons?domain=groq.com&sz=128' }
                                    ].map(model => (
                                        <div key={model.name} className="bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white/80 flex items-center gap-3 hover:text-white hover:border-[#8B5CF6]/50 transition-colors group">
                                            <div className={`w-5 h-5 flex-shrink-0 rounded-sm overflow-hidden flex items-center justify-center ${model.whiteBg ? 'bg-white p-0.5' : ''}`}>
                                                <img src={model.logo} alt={model.name} className="w-full h-full object-contain" onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(model.name)}&background=4B5563&color=fff&size=64`; }} />
                                            </div>
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
                                        { name: 'ElevenLabs', logo: 'https://cdn.simpleicons.org/elevenlabs/000000', whiteBg: true },
                                        { name: 'NotebookLM', logo: 'https://www.google.com/s2/favicons?domain=notebooklm.google.com&sz=128' },
                                        { name: 'Seed-TTS', logo: 'https://cdn.simpleicons.org/bytedance/FF4444' },
                                        { name: 'OpenAI TTS', logo: 'https://cdn.simpleicons.org/openai/000000', whiteBg: true },
                                        { name: 'PlayHT', logo: 'https://www.google.com/s2/favicons?domain=play.ht&sz=128' },
                                        { name: 'Murf.ai', logo: 'https://www.google.com/s2/favicons?domain=murf.ai&sz=128' },
                                        { name: 'Resemble AI', logo: 'https://www.google.com/s2/favicons?domain=resemble.ai&sz=128' },
                                        { name: 'Suno', logo: 'https://www.google.com/s2/favicons?domain=suno.com&sz=128' }
                                    ].map(model => (
                                        <div key={model.name} className="bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white/80 flex items-center gap-3 hover:text-white hover:border-[#8B5CF6]/50 transition-colors group">
                                            <div className={`w-5 h-5 flex-shrink-0 rounded-sm overflow-hidden flex items-center justify-center ${model.whiteBg ? 'bg-white p-0.5' : ''}`}>
                                                <img src={model.logo} alt={model.name} className="w-full h-full object-contain" onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(model.name)}&background=4B5563&color=fff&size=64`; }} />
                                            </div>
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
                                        { name: 'Sora', logo: 'https://cdn.simpleicons.org/openai/000000', whiteBg: true },
                                        { name: 'Veo 3', logo: 'https://cdn.simpleicons.org/google/4285F4' },
                                        { name: 'Viggle', logo: 'https://www.google.com/s2/favicons?domain=viggle.ai&sz=128' },
                                        { name: 'HeyGen', logo: 'https://www.google.com/s2/favicons?domain=heygen.com&sz=128' },
                                        { name: 'Synthesia', logo: 'https://www.google.com/s2/favicons?domain=synthesia.io&sz=128' },
                                        { name: 'Luma', logo: 'https://www.google.com/s2/favicons?domain=lumalabs.ai&sz=128' },
                                        { name: 'Kling AI', logo: 'https://www.google.com/s2/favicons?domain=klingai.com&sz=128' },
                                        { name: 'Runway Gen-3', logo: 'https://www.google.com/s2/favicons?domain=runwayml.com&sz=128' },
                                        { name: 'Pika Labs', logo: 'https://www.google.com/s2/favicons?domain=pika.art&sz=128' },
                                        { name: 'Haiper', logo: 'https://www.google.com/s2/favicons?domain=haiper.ai&sz=128' }
                                    ].map(model => (
                                        <div key={model.name} className="bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white/80 flex items-center gap-3 hover:text-white hover:border-[#8B5CF6]/50 transition-colors group">
                                            <div className={`w-5 h-5 flex-shrink-0 rounded-sm overflow-hidden flex items-center justify-center ${model.whiteBg ? 'bg-white p-0.5' : ''}`}>
                                                <img src={model.logo} alt={model.name} className="w-full h-full object-contain" onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(model.name)}&background=4B5563&color=fff&size=64`; }} />
                                            </div>
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
                                        { name: 'Midjourney', logo: 'https://www.google.com/s2/favicons?domain=midjourney.com&sz=128' },
                                        { name: 'DALL-E 3', logo: 'https://cdn.simpleicons.org/openai/000000', whiteBg: true },
                                        { name: 'Stable Diffusion', logo: 'https://cdn.simpleicons.org/stability-ai/8A2BE2' },
                                        { name: 'Leonardo.ai', logo: 'https://www.google.com/s2/favicons?domain=leonardo.ai&sz=128' },
                                        { name: 'Adobe Firefly', logo: 'https://cdn.simpleicons.org/adobe/FF0000' }
                                    ].map(model => (
                                        <div key={model.name} className="bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white/80 flex items-center gap-3 hover:text-white hover:border-[#8B5CF6]/50 transition-colors group">
                                            <div className={`w-5 h-5 flex-shrink-0 rounded-sm overflow-hidden flex items-center justify-center ${model.whiteBg ? 'bg-white p-0.5' : ''}`}>
                                                <img src={model.logo} alt={model.name} className="w-full h-full object-contain" onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(model.name)}&background=4B5563&color=fff&size=64`; }} />
                                            </div>
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
