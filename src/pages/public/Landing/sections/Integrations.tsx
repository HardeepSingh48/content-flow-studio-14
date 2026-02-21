import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PlatformIcons } from '@/components/ui/PlatformIcons';

const integrations = [
    { name: 'LinkedIn', icon: PlatformIcons.LINKEDIN, status: 'live', desc: 'Professional posts, articles & newsletters' },
    { name: 'Twitter / X', icon: PlatformIcons.TWITTER, status: 'live', desc: 'Threads, tweets & viral chains' },
    { name: 'Threads', icon: PlatformIcons.THREADS, status: 'live', desc: 'Long-form conversations & community' },
    { name: 'Medium', icon: () => <span className="text-[20px] font-bold tracking-tighter text-white">M</span>, status: 'live', desc: 'In-depth articles & opinion pieces' },
    { name: 'Instagram', icon: () => <div className="w-5 h-5 rounded-md border border-white/80 flex items-center justify-center"><div className="w-2 h-2 rounded-full border border-white/80" /></div>, status: 'soon', desc: 'Carousels, stories & reels' },
    { name: 'YouTube', icon: PlatformIcons.YOUTUBE, status: 'soon', desc: 'Video scripts & descriptions' },
];

const stats = [
    { value: '6', label: 'Live integrations' },
    { value: '1-click', label: 'OAuth setup' },
    { value: '2+', label: 'Coming soon' },
];

export const Integrations = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    return (
        <section className="bg-[#0A0E27] py-24 md:py-32 relative">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/5" />

            <div className="max-w-[1280px] mx-auto px-6 md:px-10" ref={ref}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-start">

                    {/* Left */}
                    <div className="md:sticky top-28">
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            className="text-[13px] font-bold text-[#8B5CF6] tracking-[0.12em] uppercase mb-4"
                        >
                            Integrations
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 24 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                            className="text-[32px] md:text-[44px] font-bold leading-[1.18] tracking-[-0.025em] text-white mb-5"
                        >
                            A unified hub for
                            <br /><span className="bg-gradient-to-br from-white to-[#A78BFA] text-transparent bg-clip-text">every platform</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.55, delay: 0.18, ease: 'easeOut' }}
                            className="text-[16px] leading-[1.7] text-white/55 mb-10"
                        >
                            Connect your entire content stack in minutes. ContentPipeline integrates natively with the platforms your audience lives on — and the tools your team already loves.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-8 md:gap-10"
                        >
                            {stats.map((s, i) => (
                                <div key={i}>
                                    <div className="text-[32px] font-bold tracking-[-0.03em] text-white">{s.value}</div>
                                    <div className="text-[13px] text-white/40 mt-1">{s.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right: Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {integrations.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.45, delay: 0.1 + i * 0.07, ease: 'easeOut' }}
                                    className={`bg-white/[0.025] rounded-xl p-5 md:p-6 transition-all duration-300 hover:bg-white/[0.04] ${item.status === 'live' ? 'border border-white/10 opacity-100 hover:border-[#8B5CF6]/30' : 'border border-white/5 opacity-50'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-3.5">
                                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/90">
                                            <div className="scale-150">
                                                <Icon />
                                            </div>
                                        </div>
                                        {item.status === 'live'
                                            ? <div className="w-2 h-2 rounded-full bg-[#34D399] mt-1 shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
                                            : <span className="text-[10px] font-bold text-white/30 tracking-[0.1em] bg-white/5 px-2 py-1 rounded-full uppercase">SOON</span>
                                        }
                                    </div>
                                    <div className="font-semibold text-[14px] text-white mb-1.5">{item.name}</div>
                                    <div className="text-[12px] text-white/40 leading-relaxed pr-2">{item.desc}</div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Integrations;
