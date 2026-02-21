import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { InviteModal } from '@/components/ui/InviteModal';

const statItems = [
    { value: '10k+', label: 'Posts published' },
    { value: '500+', label: 'Teams onboard' },
    { value: '6', label: 'Platforms' },
    { value: '3×', label: 'Output increase' },
];

export const Hero = () => {
    const orbRef = useRef<HTMLDivElement>(null);
    const [inviteOpen, setInviteOpen] = useState(false);
    const { scrollY } = useScroll();
    const orbY = useTransform(scrollY, [0, 500], [0, 80]);

    return (
        <section className="relative min-h-screen bg-[#0A0E27] flex flex-col items-center justify-center overflow-hidden pt-[68px]">
            {/* Background radial gradients */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
                        radial-gradient(ellipse 800px 500px at 50% -10%, rgba(139,92,246,0.18) 0%, transparent 60%),
                        radial-gradient(ellipse 600px 400px at 80% 80%, rgba(99,102,241,0.10) 0%, transparent 55%)
                    `,
                }}
            />

            {/* Parallax orb */}
            <motion.div
                style={{ y: orbY }}
                className="absolute inset-0 pointer-events-none"
                ref={orbRef}
            >
                <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-[40px] bg-[radial-gradient(ellipse,rgba(139,92,246,0.14)_0%,transparent_65%)]" />
            </motion.div>

            {/* Fine grid texture */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
                    `,
                    backgroundSize: '72px 72px',
                }}
            />

            {/* Content */}
            <div className="relative z-10 max-w-[1280px] w-full mx-auto px-6 md:px-10 text-center">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    className="inline-flex items-center gap-2 mb-8"
                >
                    <div className="inline-flex items-center gap-2 px-[18px] py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30">
                        <Zap size={13} className="text-[#A78BFA]" />
                        <span className="text-[13px] font-medium text-white/85 tracking-[0.01em]">
                            Strategic Content Distribution
                        </span>
                        <span className="px-2 py-[2px] rounded-full bg-[#8B5CF6]/25 text-[#C4B5FD] text-[11px] font-bold tracking-[0.03em]">NEW</span>
                    </div>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
                    className="text-[44px] sm:text-[60px] md:text-[80px] font-bold leading-[1.08] tracking-[-0.03em] text-white max-w-[900px] mx-auto mb-6"
                >
                    Create content that{' '}
                    <span className="bg-gradient-to-br from-white to-[#A78BFA] text-transparent bg-clip-text">
                        moves the needle
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                    className="text-[18px] md:text-[20px] leading-[1.65] text-white/60 max-w-[660px] mx-auto mb-11"
                >
                    The unified content pipeline for creators and growth teams. Plan, repurpose, and publish to LinkedIn, Twitter, YouTube and more — in one seamless workflow.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                    className="flex items-center justify-center gap-4 flex-wrap"
                >
                    <button
                        onClick={() => setInviteOpen(true)}
                        className="inline-flex items-center gap-2 px-8 py-[14px] rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] text-white font-semibold text-[16px] shadow-[0_4px_16px_rgba(139,92,246,0.35)] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(139,92,246,0.5)]"
                    >
                        Get an Invite
                        <ArrowRight size={17} />
                    </button>
                    <Link
                        to="/features"
                        className="inline-flex items-center px-8 py-[13px] rounded-lg bg-transparent text-white/80 font-semibold text-[16px] border border-white/20 transition-all duration-200 hover:bg-white/5 hover:text-white"
                    >
                        See how it works
                    </Link>
                </motion.div>

                {/* Stats bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.45, ease: 'easeOut' }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-[1px] mt-20 max-w-[860px] mx-auto bg-white/5 rounded-2xl overflow-hidden border border-white/10 stats-grid"
                >
                    {statItems.map((s) => (
                        <div key={s.label} className="bg-[#0A0E27]/90 p-8 text-center">
                            <div className="text-[36px] md:text-[42px] font-bold leading-none tracking-[-0.03em] mb-2 bg-gradient-to-br from-white to-[#A78BFA] text-transparent bg-clip-text">
                                {s.value}
                            </div>
                            <div className="text-[13px] md:text-[14px] text-white/50 font-medium">{s.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll cue */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-[#8B5CF6]/40 animate-pulse" />
            </motion.div>

            <InviteModal isOpen={inviteOpen} onClose={() => setInviteOpen(false)} />
        </section>
    );
};

export default Hero;
