import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const footerLinks = {
    Product: [
        { label: 'Features', href: '/features' },
        { label: 'Playbooks', href: '/playbooks' },
        { label: 'Pricing', href: '/pricing' },
        { label: "What's new", href: '/features' },
    ],
    Company: [
        // { label: 'About', href: '#' },
        // { label: 'Blog', href: '#' },
        // { label: 'Careers', href: '#' },
        { label: 'Contact', href: '/contact' },
    ],
    // Legal: [
    //     { label: 'Privacy Policy', href: '#' },
    //     { label: 'Terms of Service', href: '#' },
    //     { label: 'Cookie Policy', href: '#' },
    // ],
};

export const PublicFooter = () => {
    return (
        <footer style={{ background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '80px 0 40px' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
                <div className="pub-footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr repeat(3, 1fr)', gap: 60, marginBottom: 64 }}>
                    {/* Brand */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <img src="/Stratiara Logo.png" alt="Stratiara Logo" className="w-7 h-7 object-contain dark:invert invert" />
                            <span className="text-lg font-bold text-foreground">
                                Stratiara<span className="gradient-text"> </span>
                            </span>
                        </Link>
                        <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.45)', maxWidth: 280 }}>
                            The content strategy platform for serious teams. Plan. Align. Distribute. Outperform.
                        </p>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 20, color: 'rgba(255,255,255,0.35)', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s ease' }}
                            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
                        >@stratiara <ArrowUpRight size={13} /></a>
                    </div>

                    {Object.entries(footerLinks).map(([group, links]) => (
                        <div key={group}>
                            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 18 }}>{group}</h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link to={link.href} style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontSize: 15, transition: 'color 0.2s ease' }}
                                            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                                            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                                        >{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div style={{ paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.28)', margin: 0 }}>
                        © {new Date().getFullYear()} Stratiara. All rights reserved.
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#34D399' }} />
                        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.28)' }}>All systems operational</span>
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) { .pub-footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 520px)  { .pub-footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
        </footer>
    );
};

export default PublicFooter;
