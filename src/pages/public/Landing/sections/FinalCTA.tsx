import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { InviteModal } from '@/components/ui/InviteModal';

export const FinalCTA = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const [inviteOpen, setInviteOpen] = useState(false);

    return (
        <section className="bg-[#0A0E27] pt-24 pb-28 md:pt-32 md:pb-36 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/5" />

            {/* Center bloom */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] pointer-events-none bg-[radial-gradient(ellipse,rgba(139,92,246,0.13)_0%,rgba(99,102,241,0.07)_30%,transparent_65%)] blur-[60px]" />

            <div ref={ref} className="max-w-[800px] mx-auto px-6 md:px-10 text-center relative z-10">

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    className="text-[13px] font-bold text-[#8B5CF6] tracking-[0.12em] uppercase mb-5"
                >
                    Get started today
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 32 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
                    className="text-[38px] sm:text-[48px] md:text-[72px] font-bold leading-[1.1] tracking-[-0.03em] mb-6"
                >
                    <span className="text-white">Ready to lead</span>
                    <br />
                    <span className="bg-gradient-to-br from-white to-[#A78BFA] text-transparent bg-clip-text">with strategy?</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                    className="text-[18px] leading-[1.7] text-white/50 max-w-[520px] mx-auto mb-11"
                >
                    Join 500+ teams who put strategy first and eliminated the guesswork from their content operations. Start free — no credit card needed.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.3, ease: 'easeOut' }}
                    className="flex items-center justify-center gap-4 flex-wrap"
                >
                    <button
                        onClick={() => setInviteOpen(true)}
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg no-underline bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] text-white font-semibold text-[16px] shadow-[0_4px_20px_rgba(139,92,246,0.4)] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_28px_rgba(139,92,246,0.55)]"
                    >
                        Get an Invite
                        <ArrowRight size={16} />
                    </button>
                    <Link
                        to="/contact"
                        className="inline-flex items-center px-8 py-[13px] rounded-lg no-underline bg-transparent text-white/65 font-semibold text-[16px] border border-white/15 transition-colors duration-200 hover:text-white hover:border-white/30 hover:bg-white/5"
                    >
                        Talk to sales
                    </Link>
                </motion.div>

                {/* Social proof */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.55 }}
                    className="flex items-center justify-center gap-3 mt-10"
                >
                    <div className="flex">
                        {['bg-[#8B5CF6]', 'bg-[#6366F1]', 'bg-[#7C3AED]', 'bg-[#4F46E5]', 'bg-[#9333EA]'].map((c, i) => (
                            <div key={i} className={`w-[30px] h-[30px] rounded-full border-2 border-[#0A0E27] ${i > 0 ? '-ml-2' : ''} ${c} flex items-center justify-center text-[9px] font-bold text-white shadow-sm`}>
                                {['S', 'M', 'P', 'T', 'J'][i]}
                            </div>
                        ))}
                    </div>
                    <span className="text-[14px] text-white/35">
                        Joined by <strong className="text-white/60 font-semibold">500+ strategy teams</strong> this month
                    </span>
                </motion.div>
            </div>

            <InviteModal isOpen={inviteOpen} onClose={() => setInviteOpen(false)} />
        </section>
    );
};

export default FinalCTA;
