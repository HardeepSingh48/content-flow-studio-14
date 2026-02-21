import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
    {
        quote: "ContentPipeline cut our publishing time by 60%. What used to take a full production day now ships before lunch. The pipeline board gives us total clarity.",
        name: 'Sarah Chen',
        role: 'Head of Growth · Velocity Labs',
        initials: 'SC',
        color: '#8B5CF6',
    },
    {
        quote: "We went from posting twice a week to every single day across five platforms. The formatting engine alone justified the subscription on day one.",
        name: 'Marcus Adeola',
        role: 'Content Director · Frontier Capital',
        initials: 'MA',
        color: '#6366F1',
    },
    {
        quote: "As a solo creator, this is like having a full content team in my pocket. The scheduling is smart and the engagement inbox keeps me sane.",
        name: 'Priya Sharma',
        role: 'Independent Creator · 180k+ followers',
        initials: 'PS',
        color: '#7C3AED',
    },
    {
        quote: "LinkedIn engagement up 340% in three months. The team approval workflow means nothing goes live without sign-off. Game changer.",
        name: 'Tom Reeves',
        role: 'VP Marketing · Harbour Software',
        initials: 'TR',
        color: '#4F46E5',
    },
];

const metrics = [
    { value: '340%', label: 'Avg engagement increase' },
    { value: '12×', label: 'Faster content production' },
    { value: '4.9 / 5', label: 'Customer satisfaction' },
    { value: '500+', label: 'Teams worldwide' },
];

export const Testimonials = () => {
    const ref = useRef(null);
    const metricsRef = useRef(null);
    const inView = useInView(ref, { once: true });
    const metricsInView = useInView(metricsRef, { once: true });

    return (
        <section style={{ background: '#0A0E27', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.06)' }} />

            {/* Soft center glow */}
            <div style={{
                position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)',
                width: 900, height: 600, pointerEvents: 'none',
                background: 'radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 65%)',
                filter: 'blur(60px)',
            }} />

            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div ref={ref} style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 64px' }}>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        style={{ fontSize: 13, fontWeight: 700, color: '#8B5CF6', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}
                    >
                        Customer Stories
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                        style={{ fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 700, lineHeight: 1.18, letterSpacing: '-0.025em', color: '#fff' }}
                    >
                        Teams who ship content
                        <br />choose ContentPipeline
                    </motion.h2>
                </div>

                {/* Testimonials grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }} className="testimonials-grid">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 28 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.55, delay: 0.12 + i * 0.1, ease: 'easeOut' }}
                            style={{
                                background: 'rgba(255,255,255,0.025)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: 16, padding: '32px',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <Quote size={22} style={{ color: 'rgba(139,92,246,0.35)', marginBottom: 20, display: 'block' }} />
                            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', marginBottom: 28 }}>
                                "{t.quote}"
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                <div style={{
                                    width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                                    background: t.color,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 12, fontWeight: 700, color: '#fff',
                                }}>{t.initials}</div>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: 15, color: '#fff' }}>{t.name}</div>
                                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{t.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Metrics */}
                <motion.div
                    ref={metricsRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={metricsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                    style={{
                        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '1px', background: 'rgba(255,255,255,0.07)',
                        borderRadius: 16, overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,0.08)',
                    }}
                    className="metrics-grid"
                >
                    {metrics.map((m) => (
                        <div key={m.label} style={{ background: '#0A0E27', padding: '32px 24px', textAlign: 'center' }}>
                            <div style={{
                                fontSize: 38, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 8,
                                background: 'linear-gradient(135deg, #fff 0%, #A78BFA 100%)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                            }}>{m.value}</div>
                            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>{m.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .testimonials-grid { grid-template-columns: 1fr !important; }
          .metrics-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
        </section>
    );
};

export default Testimonials;
