import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { InviteModal } from '@/components/ui/InviteModal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// ─── Types ───────────────────────────────────────────────────────────────────

interface PipelineNode {
    x: number;
    y: number;
    label: string;
    color: string;
    pulsePhase: number;
}

interface Particle {
    x: number;
    y: number;
    speed: number;
    size: number;
    opacity: number;
    color: string;
}

interface PlatformDot {
    name: string;
    x: number;
    y: number;
    color: string;
}

// ─── Canvas Animation Engine ──────────────────────────────────────────────────

class ContentPipelineFlow {
    ambientCanvas: HTMLCanvasElement;
    pipelineCanvas: HTMLCanvasElement;
    ambientCtx: CanvasRenderingContext2D;
    pipelineCtx: CanvasRenderingContext2D;
    progress = 0;
    particles: Particle[] = [];
    nodes: PipelineNode[] = [];
    platformDots: PlatformDot[] = [];
    animId = 0;
    time = 0;

    constructor(ambient: HTMLCanvasElement, pipeline: HTMLCanvasElement) {
        this.ambientCanvas = ambient;
        this.pipelineCanvas = pipeline;
        this.ambientCtx = ambient.getContext('2d')!;
        this.pipelineCtx = pipeline.getContext('2d')!;
        this.init();
    }

    init() {
        this.nodes = [
            { x: 0.10, y: 0.50, label: 'DRAFT', color: '#9CA3AF', pulsePhase: 0.0 },
            { x: 0.28, y: 0.33, label: 'REVIEW', color: '#FBBF24', pulsePhase: 0.4 },
            { x: 0.50, y: 0.62, label: 'SCHEDULE', color: '#3B82F6', pulsePhase: 0.8 },
            { x: 0.72, y: 0.38, label: 'PUBLISH', color: '#10B981', pulsePhase: 1.2 },
            { x: 0.88, y: 0.55, label: 'LIVE', color: '#8B5CF6', pulsePhase: 1.6 },
        ];

        const particleColors = ['#8B5CF6', '#6366F1', '#A78BFA', '#C4B5FD', '#3B82F6'];
        for (let i = 0; i < 60; i++) {
            this.particles.push({
                x: Math.random(),
                y: Math.random(),
                speed: 0.0003 + Math.random() * 0.0012,
                size: 1.5 + Math.random() * 3,
                opacity: 0.2 + Math.random() * 0.6,
                color: particleColors[Math.floor(Math.random() * particleColors.length)],
            });
        }

        this.platformDots = [
            { name: 'LinkedIn', x: 0.84, y: 0.28, color: '#0A66C2' },
            { name: 'Twitter', x: 0.90, y: 0.50, color: '#1DA1F2' },
            { name: 'Instagram', x: 0.84, y: 0.72, color: '#E1306C' },
        ];
    }

    resize() {
        const dpr = window.devicePixelRatio || 1;
        const fw = window.innerWidth;
        const fh = window.innerHeight;

        // Ambient — oversized 110% for parallax offset
        const aw = Math.round(fw * 1.1 * dpr);
        const ah = Math.round(fh * 1.1 * dpr);
        this.ambientCanvas.width = aw;
        this.ambientCanvas.height = ah;
        this.ambientCanvas.style.width = Math.round(fw * 1.1) + 'px';
        this.ambientCanvas.style.height = Math.round(fh * 1.1) + 'px';
        this.ambientCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // Pipeline — exact viewport
        this.pipelineCanvas.width = Math.round(fw * dpr);
        this.pipelineCanvas.height = Math.round(fh * dpr);
        this.pipelineCanvas.style.width = fw + 'px';
        this.pipelineCanvas.style.height = fh + 'px';
        this.pipelineCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    drawAmbient() {
        const w = this.ambientCanvas.width / (window.devicePixelRatio || 1);
        const h = this.ambientCanvas.height / (window.devicePixelRatio || 1);
        const ctx = this.ambientCtx;
        const p = this.progress;

        ctx.clearRect(0, 0, w, h);

        const blobs: [number, number, number, string][] = [
            [0.20, 0.25, 0.55, `rgba(139,92,246,${0.20 * p})`],
            [0.75, 0.65, 0.50, `rgba(99,102,241,${0.18 * p})`],
            [0.50, 0.50, 0.35, `rgba(168,139,250,${0.12 * p})`],
        ];

        for (const [cx, cy, r, color] of blobs) {
            const g = ctx.createRadialGradient(cx * w, cy * h, 0, cx * w, cy * h, r * w);
            g.addColorStop(0, color);
            g.addColorStop(1, 'transparent');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);
        }
    }

    drawPipeline() {
        const w = this.pipelineCanvas.width / (window.devicePixelRatio || 1);
        const h = this.pipelineCanvas.height / (window.devicePixelRatio || 1);
        const ctx = this.pipelineCtx;
        const p = this.progress;

        ctx.clearRect(0, 0, w, h);

        if (p <= 0) return;

        // Draw connector lines
        for (let i = 0; i < this.nodes.length - 1; i++) {
            const segStart = i * 0.22;
            const segEnd = segStart + 0.22;
            const lineP = Math.max(0, Math.min(1, (p - segStart) / (segEnd - segStart)));
            if (lineP <= 0) continue;

            const from = this.nodes[i];
            const to = this.nodes[i + 1];
            const x1 = from.x * w;
            const y1 = from.y * h;
            const x2 = to.x * w;
            const y2 = to.y * h;

            // Glowing line
            ctx.save();
            ctx.shadowColor = from.color;
            ctx.shadowBlur = 12;
            ctx.strokeStyle = from.color + '60';
            ctx.lineWidth = 2.5;
            ctx.setLineDash([8, 6]);
            ctx.lineDashOffset = -this.time * 0.8;

            const cpX = (x1 + x2) / 2;
            const cpY = (y1 + y2) / 2 - h * 0.08;

            // Compute bezier point at lineP
            const bx = (1 - lineP) * (1 - lineP) * x1 + 2 * (1 - lineP) * lineP * cpX + lineP * lineP * x2;
            const by = (1 - lineP) * (1 - lineP) * y1 + 2 * (1 - lineP) * lineP * cpY + lineP * lineP * y2;

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            // Approximate partial bezier by sampling
            const steps = Math.ceil(lineP * 40);
            for (let s = 1; s <= steps; s++) {
                const t = (s / steps) * lineP;
                const bxT = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cpX + t * t * x2;
                const byT = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cpY + t * t * y2;
                ctx.lineTo(bxT, byT);
            }
            ctx.stroke();
            ctx.restore();

            // Travelling dot on line
            if (lineP > 0.1 && lineP < 0.95) {
                ctx.save();
                ctx.shadowColor = from.color;
                ctx.shadowBlur = 16;
                ctx.beginPath();
                ctx.arc(bx, by, 5, 0, Math.PI * 2);
                ctx.fillStyle = '#FFFFFF';
                ctx.fill();
                ctx.restore();
            }
        }

        // Draw nodes
        for (let i = 0; i < this.nodes.length; i++) {
            const nd = this.nodes[i];
            const nodeP = Math.max(0, Math.min(1, (p - i * 0.18) / 0.12));
            if (nodeP <= 0) continue;

            const x = nd.x * w;
            const y = nd.y * h;
            const radius = 22 * nodeP;
            const pulse = Math.sin(this.time * 0.04 + nd.pulsePhase) * 0.25 + 0.75;

            // Outer glow ring
            ctx.save();
            ctx.shadowColor = nd.color;
            ctx.shadowBlur = 24 * pulse;
            const outer = ctx.createRadialGradient(x, y, 0, x, y, radius * 2.8);
            outer.addColorStop(0, nd.color + '30');
            outer.addColorStop(1, 'transparent');
            ctx.fillStyle = outer;
            ctx.beginPath();
            ctx.arc(x, y, radius * 2.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Node circle with gradient fill
            ctx.save();
            ctx.shadowColor = nd.color;
            ctx.shadowBlur = 12;
            const grad = ctx.createRadialGradient(x - radius * 0.3, y - radius * 0.3, 0, x, y, radius);
            grad.addColorStop(0, '#FFFFFF20');
            grad.addColorStop(1, nd.color);
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
            ctx.restore();

            // Inner highlight
            ctx.beginPath();
            ctx.arc(x - radius * 0.2, y - radius * 0.25, radius * 0.35, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.25)';
            ctx.fill();

            // Label
            if (nodeP > 0.7) {
                const labelAlpha = Math.min(1, (nodeP - 0.7) / 0.3);
                ctx.save();
                ctx.globalAlpha = labelAlpha;
                ctx.fillStyle = '#FFFFFF';
                ctx.font = `bold 11px Inter, -apple-system, sans-serif`;
                ctx.textAlign = 'center';
                ctx.letterSpacing = '0.08em';
                ctx.fillText(nd.label, x, y - radius - 12);
                ctx.restore();
            }
        }

        // Particles
        for (const particle of this.particles) {
            const spd = particle.speed * (0.3 + p * 0.7);
            particle.x += spd;
            if (particle.x > 1) particle.x = -0.02;

            if (p <= 0.05) continue;
            const alpha = particle.opacity * Math.min(1, p * 3);

            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.shadowColor = particle.color;
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.arc(particle.x * w, particle.y * h, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            ctx.restore();
        }

        // Platform icons (last 20% of scroll)
        if (p > 0.80) {
            const iconP = (p - 0.80) / 0.20;

            for (let i = 0; i < this.platformDots.length; i++) {
                const pd = this.platformDots[i];
                const delay = i * 0.25;
                const alpha = Math.max(0, Math.min(1, (iconP - delay) * 4));
                if (alpha <= 0) continue;

                const x = pd.x * w;
                const y = pd.y * h;
                const r = 26 * alpha;

                // Glow
                ctx.save();
                ctx.shadowColor = pd.color;
                ctx.shadowBlur = 20 * alpha;
                ctx.globalAlpha = alpha;

                // Circle background
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fillStyle = pd.color;
                ctx.fill();

                // White border
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Label below
                ctx.fillStyle = '#FFFFFF';
                ctx.font = `600 11px Inter, sans-serif`;
                ctx.textAlign = 'center';
                ctx.fillText(pd.name, x, y + r + 18);

                // Connection line from last pipeline node to this dot
                const lastNode = this.nodes[this.nodes.length - 1];
                const lx = lastNode.x * w;
                const ly = lastNode.y * h;
                ctx.setLineDash([4, 6]);
                ctx.strokeStyle = pd.color + '50';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(lx + 22, ly);
                ctx.lineTo(x - r, y);
                ctx.stroke();
                ctx.setLineDash([]);

                ctx.restore();
            }
        }
    }

    tick() {
        this.time++;
        this.drawAmbient();
        this.drawPipeline();
        this.animId = requestAnimationFrame(() => this.tick());
    }

    start() {
        this.resize();
        this.tick();
    }

    destroy() {
        cancelAnimationFrame(this.animId);
    }
}

// ─── Component ────────────────────────────────────────────────────────────────

export const ScrollytellingHero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const ambientRef = useRef<HTMLCanvasElement>(null);
    const pipelineRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<ContentPipelineFlow | null>(null);
    const [inviteOpen, setInviteOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Detect low-performance devices early
        const isLowPerf = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        );

        if (!ambientRef.current || !pipelineRef.current || !sectionRef.current) return;

        if (isLowPerf || isMobile) {
            // Skip canvas on low-perf devices or mobile; CSS background covers it
            ambientRef.current.style.display = 'none';
            pipelineRef.current.style.display = 'none';
        }

        // ── Lenis ──
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        // Connect Lenis to GSAP ticker
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        // ── Canvas engine ──
        if (!isLowPerf && !isMobile) {
            const engine = new ContentPipelineFlow(
                ambientRef.current!,
                pipelineRef.current!
            );
            engineRef.current = engine;
            engine.start();

            // ── ScrollTrigger ──
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.2,
                onUpdate: (self) => {
                    engine.progress = self.progress;
                },
            });

            // ── Resize (debounced) ──
            let resizeTimer: ReturnType<typeof setTimeout>;
            const onResize = () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    engine.resize();
                    ScrollTrigger.refresh();
                }, 150);
            };
            window.addEventListener('resize', onResize);

            return () => {
                engine.destroy();
                clearTimeout(resizeTimer);
                window.removeEventListener('resize', onResize);
                ScrollTrigger.getAll().forEach((t) => t.kill());
                gsap.ticker.remove(lenis.raf);
                lenis.destroy();
            };
        }

        return () => {
            gsap.ticker.remove(lenis.raf);
            lenis.destroy();
        };
    }, [isMobile]);

    return (
        <>
            {/* ── Scrollytelling outer (defines scroll distance) ── */}
            <section
                ref={sectionRef}
                id="scrollytelling-hero"
                style={{
                    height: isMobile ? '100vh' : '800vh',
                    position: 'relative',
                }}
                className="mobile-hero-height"
            >
                {/* ── Sticky viewport ── */}
                <div
                    style={{
                        position: 'sticky',
                        top: 0,
                        height: '100vh',
                        overflow: 'hidden',
                        background: '#0A0E27',
                    }}
                >
                    {/* Fine grid texture */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            opacity: 0.035,
                            backgroundImage:
                                'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                            backgroundSize: '72px 72px',
                            pointerEvents: 'none',
                            zIndex: 0,
                        }}
                    />

                    {/* Ambient canvas — blurred glow layer */}
                    <canvas
                        ref={ambientRef}
                        style={{
                            position: 'absolute',
                            top: '-5%',
                            left: '-5%',
                            filter: 'blur(60px) saturate(1.5)',
                            opacity: 0.7,
                            zIndex: 1,
                            pointerEvents: 'none',
                        }}
                    />

                    {/* Pipeline canvas — sharp animation layer */}
                    <canvas
                        ref={pipelineRef}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 2,
                            pointerEvents: 'none',
                            WebkitMaskImage:
                                'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
                            maskImage:
                                'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
                        }}
                    />

                    {/* Static fallback gradient for low-perf */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background:
                                'radial-gradient(ellipse 900px 600px at 50% 50%, rgba(139,92,246,0.14) 0%, transparent 65%), radial-gradient(ellipse 700px 500px at 80% 80%, rgba(99,102,241,0.10) 0%, transparent 60%)',
                            zIndex: 0,
                            pointerEvents: 'none',
                        }}
                    />

                    {/* ── Text overlay ── */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10,
                            padding: '0 24px',
                            paddingTop: '68px', // navbar clearance
                        }}
                    >
                        <div style={{ textAlign: 'center', maxWidth: 920, width: '100%' }}>

                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55, ease: 'easeOut' }}
                                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 32 }}
                            >
                                {/* <div
                                    style={{
                                        display: 'inline-flex', alignItems: 'center', gap: 8,
                                        padding: '9px 20px', borderRadius: 100,
                                        background: 'rgba(139,92,246,0.10)',
                                        border: '1px solid rgba(139,92,246,0.30)',
                                    }}
                                >

                                    <span
                                        style={{
                                            padding: '2px 8px', borderRadius: 100,
                                            background: 'rgba(139,92,246,0.25)',
                                            color: '#C4B5FD', fontSize: 11, fontWeight: 700, letterSpacing: '0.03em',
                                        }}
                                    >
                                        NEW
                                    </span>
                                </div> */}
                            </motion.div>

                            {/* Headline */}
                            <motion.h1
                                initial={{ opacity: 0, y: 28 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.65, delay: 0.08, ease: 'easeOut' }}
                                style={{
                                    fontSize: 'clamp(2.6rem, 9vw, 5.8rem)',
                                    fontWeight: 800,
                                    lineHeight: 0.97,
                                    letterSpacing: '-0.035em',
                                    marginBottom: 24,
                                    textTransform: 'uppercase',
                                }}
                            >
                                <span style={{ display: 'block', color: '#FFFFFF' }}>
                                    Stop creating noise.
                                </span>
                                <span
                                    style={{
                                        display: 'block',
                                        background: 'linear-gradient(135deg, #FFFFFF 0%, #A78BFA 45%, #6366F1 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    Start owning narratives.
                                </span>
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.p
                                initial={{ opacity: 0, y: 22 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.18, ease: 'easeOut' }}
                                style={{
                                    fontSize: 'clamp(1rem, 2.5vw, 1.22rem)',
                                    lineHeight: 1.65,
                                    color: 'rgba(255,255,255,0.62)',
                                    maxWidth: 680,
                                    margin: '0 auto 40px',
                                }}
                            >
                                Stratiara is the content strategy platform for serious teams.
                                Plan your narrative, move content through your editorial pipeline,
                                and publish when the moment is right.
                            </motion.p>

                            {/* CTAs */}
                            <motion.div
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.28, ease: 'easeOut' }}
                                className="hero-cta-wrap"
                            >
                                <button
                                    onClick={() => setInviteOpen(true)}
                                    className="hero-btn-primary"
                                >
                                    Request Access <ArrowRight size={16} style={{ display: 'inline', marginLeft: 6, verticalAlign: 'middle' }} />
                                </button>
                                <Link to="/features" className="hero-btn-secondary">
                                    See how it works
                                </Link>
                            </motion.div>

                            {/* Scroll hint */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2.0 }}
                                style={{
                                    marginTop: 60,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 8,
                                }}
                            >
                                <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                                    Scroll to explore
                                </span>
                                <div
                                    style={{
                                        width: 1,
                                        height: 40,
                                        background: 'linear-gradient(to bottom, transparent, rgba(139,92,246,0.5))',
                                        animation: 'pulse 2s ease-in-out infinite',
                                    }}
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Stats transition strip ── */}
            <section
                style={{
                    background: 'linear-gradient(180deg, #0A0E27 0%, #0f1225 40%, #12183B 100%)',
                    padding: '80px 24px 100px',
                }}
            >
                <div
                    style={{
                        maxWidth: 1000,
                        margin: '0 auto',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: 1,
                        background: 'rgba(255,255,255,0.06)',
                        borderRadius: 20,
                        overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,0.08)',
                    }}
                    className="stats-grid-wrap"
                >
                    {[
                        { value: '80%', label: 'Less planning overhead' },
                        { value: '500+', label: 'Strategy teams' },
                        { value: '12×', label: 'Faster editorial cycles' },
                        { value: '4.9★', label: 'Customer rating' },
                    ].map((s) => (
                        <div
                            key={s.label}
                            style={{
                                background: 'rgba(10,14,39,0.9)',
                                padding: '40px 24px',
                                textAlign: 'center',
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 'clamp(2rem, 5vw, 3rem)',
                                    fontWeight: 800,
                                    lineHeight: 1,
                                    letterSpacing: '-0.03em',
                                    marginBottom: 10,
                                    background: 'linear-gradient(135deg, #fff 0%, #A78BFA 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >
                                {s.value}
                            </div>
                            <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.45)' }}>
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <InviteModal isOpen={inviteOpen} onClose={() => setInviteOpen(false)} />

            <style>{`
                .mobile-hero-height { height: 800vh; }
                @media (max-width: 768px) {
                    .mobile-hero-height { height: 400vh; }
                }

                .hero-cta-wrap {
                    display: flex;
                    gap: 14px;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .hero-btn-primary {
                    display: inline-flex;
                    align-items: center;
                    padding: 16px 40px;
                    border-radius: 12px;
                    background: linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%);
                    color: #fff;
                    font-weight: 600;
                    font-size: 16px;
                    border: none;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    box-shadow: 0 4px 20px rgba(139,92,246,0.38);
                    text-decoration: none;
                }
                .hero-btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 32px rgba(139,92,246,0.55);
                }

                .hero-btn-secondary {
                    display: inline-flex;
                    align-items: center;
                    padding: 15px 40px;
                    border-radius: 12px;
                    background: transparent;
                    color: rgba(255,255,255,0.85);
                    font-weight: 600;
                    font-size: 16px;
                    border: 1.5px solid rgba(255,255,255,0.18);
                    cursor: pointer;
                    transition: all 0.25s ease;
                    text-decoration: none;
                }
                .hero-btn-secondary:hover {
                    background: rgba(255,255,255,0.05);
                    border-color: rgba(255,255,255,0.38);
                    color: #fff;
                }

                .stats-grid-wrap {
                    grid-template-columns: repeat(4, 1fr) !important;
                }
                @media (max-width: 640px) {
                    .stats-grid-wrap {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                    .hero-cta-wrap {
                        flex-direction: column;
                        padding: 0 8px;
                    }
                    .hero-btn-primary,
                    .hero-btn-secondary {
                        width: 100%;
                        justify-content: center;
                    }
                }

                @keyframes pulse {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 1; }
                }
            `}</style>
        </>
    );
};

export default ScrollytellingHero;
