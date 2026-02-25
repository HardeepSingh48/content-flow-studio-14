import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
    {
        name: 'Solo',
        price: '$0',
        period: 'forever free',
        description: 'For individual strategists who are mapping their content pillars and getting their editorial workflow off the ground.',
        features: ['5 content briefs per month', '2 platforms connected', 'Content pillar builder', 'Community support'],
        cta: 'Start free',
        href: '/signup',
        featured: false,
    },
    {
        name: 'Pro',
        price: '$29',
        period: 'per month',
        description: 'For content strategists and editorial teams who run a structured, repeatable content operation.',
        features: ['Unlimited briefs & posts', 'All platforms connected', 'Content pillar analytics', 'Smart scheduling', 'Strategy review workflows', 'Priority support'],
        cta: 'Start 14-day trial',
        href: '/signup',
        featured: true,
    },
    {
        name: 'Team',
        price: '$79',
        period: 'per month',
        description: 'For growth organisations running multi-channel content strategy across multiple brands or executives.',
        features: ['Everything in Pro', '5 team seats', 'Shared strategy library', 'Approval & sign-off workflows', 'API access', 'Dedicated CSM'],
        cta: 'Start 14-day trial',
        href: '/signup',
        featured: false,
    },
];

export const PricingPreview = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    return (
        <section className="relative w-full bg-[#0A0E27] py-32 overflow-hidden border-t border-white/5">
            <div className="max-w-[1280px] mx-auto px-10">
                {/* Header */}
                <div ref={ref} className="text-center max-w-[580px] mx-auto mb-[72px]">
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                        className="text-[30px] md:text-[46px] font-bold leading-[1.18] tracking-[-0.025em] text-white mb-4"
                    >
                        Simple, transparent pricing
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.55, delay: 0.18, ease: 'easeOut' }}
                        className="text-[18px] leading-[1.65] text-white/50"
                    >
                        No hidden fees. Cancel anytime.
                    </motion.p>
                </div>

                {/* Pricing cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 32 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease: 'easeOut' }}
                            className={`relative flex flex-col p-10 rounded-[20px] transition-all duration-300 ${plan.featured
                                ? 'bg-[#8B5CF6]/5 border-2 border-[#8B5CF6]/40 shadow-[0_12px_48px_rgba(139,92,246,0.15)] hover:-translate-y-2 hover:border-[#8B5CF6]/60'
                                : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1'
                                }`}
                        >
                            {/* Featured badge */}
                            {plan.featured && (
                                <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white px-5 py-1 rounded-full text-[11px] font-bold tracking-[0.06em] whitespace-nowrap shadow-[0_4px_12px_rgba(139,92,246,0.4)]">
                                    MOST POPULAR
                                </div>
                            )}

                            <div className="mb-7">
                                <div className="text-[14px] font-semibold text-white/45 mb-3 tracking-[0.03em] uppercase">
                                    {plan.name}
                                </div>
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-[52px] font-bold tracking-[-0.04em] text-white leading-none">{plan.price}</span>
                                    <span className="text-[16px] text-white/45 font-medium">{plan.period}</span>
                                </div>
                                <p className="text-[15px] leading-[1.6] text-white/50">{plan.description}</p>
                            </div>

                            <ul className="flex flex-col gap-3 flex-1 mb-8">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-center gap-3 text-[15px] text-white/65">
                                        <Check size={16} className="text-[#8B5CF6] shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                to={plan.href}
                                className={`flex items-center justify-center gap-2 px-6 py-[14px] rounded-xl font-semibold text-[15px] transition-all duration-200 ${plan.featured
                                    ? 'bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white shadow-[0_4px_16px_rgba(139,92,246,0.35)] hover:shadow-[0_8px_24px_rgba(139,92,246,0.5)] hover:-translate-y-[1px]'
                                    : 'bg-transparent text-white/70 border border-white/15 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                {plan.cta} <ArrowRight size={16} />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.7 }}
                    className="text-center text-[14px] text-white/25 mt-10"
                >
                    No credit card required · Cancel anytime · 20% savings on annual plans
                </motion.p>
            </div>
        </section>
    );
};

export default PricingPreview;
