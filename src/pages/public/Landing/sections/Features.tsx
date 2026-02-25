import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, BarChart3, Repeat2, Users, MessageSquare } from 'lucide-react';
import { PlatformIcons } from '@/components/ui/PlatformIcons';

const features = [
    {
        icon: Zap,
        title: 'Editorial Planning Board',
        description: 'Map your entire content calendar on a visual Kanban board. Track briefs, drafts, reviews, and approvals — all in one strategic command center.',
    },
    {
        icon: () => (
            <div className="flex -space-x-1.5 opacity-90">
                <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center border border-white/20 shadow-md transform -rotate-6"><div className="scale-75"><PlatformIcons.LINKEDIN /></div></div>
                <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center border border-white/20 shadow-md z-10"><div className="scale-90"><PlatformIcons.TWITTER /></div></div>
                <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center border border-white/20 shadow-md transform rotate-6 z-20"><div className="scale-75"><PlatformIcons.THREADS /></div></div>
            </div>
        ),
        title: 'Narrative Architecture',
        description: 'Design your content strategy around themes, pillars, and audience segments. Every post has a purpose — not just a publish date.',
    },
    {
        icon: Repeat2,
        title: 'Content Intelligence',
        description: 'Understand what resonates before you write. Data-driven topic scoring, pillar analysis, and competitive gap insights built in.',
    },
    {
        icon: BarChart3,
        title: 'Audience Timing Engine',
        description: 'Publish when your audience is most engaged. AI-powered timing recommendations backed by platform-specific behavioural signals.',
    },
    {
        icon: Users,
        title: 'Strategy Review Workflows',
        description: 'Align writers, editors, and stakeholders around a shared editorial vision. Role-based approval flows ensure brand voice consistency at every stage.',
    },
    {
        icon: MessageSquare,
        title: 'Omnichannel Distribution',
        description: 'When strategy says go, push content across LinkedIn, Twitter, Instagram, YouTube, and more — simultaneously, with platform-native formatting.',
    },
];

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

const cardVariant = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export const Features = () => {
    const headerRef = useRef(null);
    const gridRef = useRef(null);
    const headerInView = useInView(headerRef, { once: true });
    const gridInView = useInView(gridRef, { once: true, margin: '-60px' });

    return (
        <section className="relative w-full bg-[#0A0E27] py-32 overflow-hidden border-t border-white/5">
            <div className="max-w-[1280px] mx-auto px-10">
                {/* Header */}
                <div ref={headerRef} className="text-center max-w-[640px] mx-auto mb-[72px]">
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                        className="text-[32px] md:text-[48px] font-bold leading-[1.15] tracking-[-0.025em] text-white mb-5"
                    >
                        Everything your content workflow needs
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.55, delay: 0.18, ease: 'easeOut' }}
                        className="text-[18px] leading-[1.65] text-white/55"
                    >
                        From idea to published post — manage every stage with tools built for strategic distribution.
                    </motion.p>
                </div>

                {/* Grid */}
                <motion.div
                    ref={gridRef}
                    variants={container}
                    initial="hidden"
                    animate={gridInView ? 'show' : 'hidden'}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.title}
                                variants={cardVariant}
                                className="group relative bg-white/5 border border-white/10 rounded-[16px] p-8 overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-[#8B5CF6]/30 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(139,92,246,0.1)]"
                            >
                                {/* Top gradient line on hover */}
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6]/20 to-[#6366F1]/20 border border-[#8B5CF6]/30 rounded-xl flex items-center justify-center mb-5 text-[#A78BFA]">
                                    {typeof Icon === 'function' ? <Icon size={24} /> : <Icon />}
                                </div>
                                <h3 className="text-[20px] font-semibold text-white mb-3 tracking-[-0.01em]">
                                    {feature.title}
                                </h3>
                                <p className="text-[15px] leading-[1.6] text-white/60">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            <style>{`
        @media (max-width: 1024px) { .features-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { .features-grid { grid-template-columns: 1fr !important; } }
      `}</style>
        </section>
    );
};

export default Features;
