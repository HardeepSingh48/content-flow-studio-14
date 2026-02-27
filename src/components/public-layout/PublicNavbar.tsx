import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { InviteModal } from '@/components/ui/InviteModal';

const navLinks = [
    { label: 'Features', href: '/features' },
    { label: 'Playbooks', href: '/playbooks' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' },
];

export const PublicNavbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [inviteOpen, setInviteOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 32);
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    useEffect(() => setMobileOpen(false), [location.pathname]);

    return (
        <>
            <motion.nav
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{
                    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
                    background: scrolled ? 'rgba(10,14,39,0.97)' : 'rgba(10,14,39,0.75)',
                    backdropFilter: 'blur(16px)',
                    borderBottom: scrolled ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(255,255,255,0.05)',
                    transition: 'background 0.3s ease, border-color 0.3s ease',
                }}
            >
                <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* Logo */}
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
                        <img
                            src="/Stratiara Logo.png"
                            alt="Stratiara Logo"
                            style={{
                                width: 44,
                                height: 44,
                                objectFit: 'contain',
                                filter: 'invert(1)', // Inverting because the logo is black and the navbar is dark
                                transform: 'scale(1.4)'
                            }}
                        />
                        <span style={{ fontWeight: 700, fontSize: 22, color: '#fff', letterSpacing: '-0.01em' }}>Stratiara</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="pub-nav-links" style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
                        {navLinks.map((link) => (
                            <Link key={link.label} to={link.href} style={{
                                color: location.pathname === link.href ? '#fff' : 'rgba(255,255,255,0.65)',
                                textDecoration: 'none', fontWeight: 500, fontSize: 15, transition: 'color 0.2s ease',
                            }}
                                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                                onMouseLeave={e => (e.currentTarget.style.color = location.pathname === link.href ? '#fff' : 'rgba(255,255,255,0.65)')}
                            >{link.label}</Link>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="pub-nav-actions" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <button onClick={() => navigate('/signin')} style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: 'rgba(255,255,255,0.65)', fontWeight: 500, fontSize: 15, padding: '8px 12px',
                            transition: 'color 0.2s ease',
                        }}
                            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                        >Sign In</button>
                        <button onClick={() => setInviteOpen(true)} style={{
                            background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
                            color: '#fff', border: 'none', cursor: 'pointer',
                            padding: '10px 22px', borderRadius: 8, fontWeight: 600, fontSize: 15,
                            transition: 'all 0.2s ease', boxShadow: '0 4px 12px rgba(139,92,246,0.3)',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(139,92,246,0.45)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(139,92,246,0.3)'; }}
                        >Request Access</button>
                    </div>

                    {/* Mobile toggle */}
                    <button className="pub-nav-mobile-btn" onClick={() => setMobileOpen(v => !v)} style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: 'rgba(255,255,255,0.8)', padding: 8, display: 'none',
                    }}>
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ position: 'fixed', inset: 0, top: 68, zIndex: 999, background: '#0A0E27', display: 'flex', flexDirection: 'column', padding: '24px 32px' }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                            {navLinks.map((link, i) => (
                                <motion.div key={link.label} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                                    <Link to={link.href} style={{ display: 'block', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: 20, fontWeight: 600 }}>
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 24 }}>
                            <button onClick={() => navigate('/signin')} style={{ width: '100%', padding: 14, borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: '#fff', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Sign In</button>
                            <button onClick={() => { setInviteOpen(true); setMobileOpen(false); }} style={{ width: '100%', padding: 14, borderRadius: 8, background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)', border: 'none', color: '#fff', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Request Access</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <InviteModal isOpen={inviteOpen} onClose={() => setInviteOpen(false)} />

            <style>{`
        @media (max-width: 768px) {
          .pub-nav-links { display: none !important; }
          .pub-nav-actions { display: none !important; }
          .pub-nav-mobile-btn { display: flex !important; }
        }
      `}</style>
        </>
    );
};

export default PublicNavbar;
