import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Mail, ArrowLeft } from 'lucide-react';

const PendingApproval = () => {
    const { state } = useLocation();
    const email = (state as any)?.email || 'your email';

    return (
        <div className="min-h-screen bg-[#0A0E27] flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background glows */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#8B5CF6]/10 rounded-full blur-[80px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="w-full max-w-md text-center relative z-10"
            >
                {/* Icon */}
                <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.5, ease: 'easeOut' }}
                    className="w-20 h-20 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center mx-auto mb-6"
                >
                    <Clock size={36} className="text-[#A78BFA]" />
                </motion.div>

                <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
                    Application submitted
                </h1>
                <p className="text-white/50 text-base leading-relaxed mb-8 max-w-sm mx-auto">
                    Thanks for applying. Our team will review your application and get back to you within <strong className="text-white/70">48 hours</strong>.
                </p>

                {/* Email pill */}
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 mb-8">
                    <Mail size={14} className="text-white/40" />
                    <span className="text-sm text-white/60">We'll notify you at <strong className="text-white/80">{email}</strong></span>
                </div>

                {/* Info box */}
                <div className="bg-[#8B5CF6]/5 border border-[#8B5CF6]/20 rounded-2xl p-6 text-left mb-8">
                    <p className="text-sm text-white/60 leading-relaxed">
                        <span className="block text-white/80 font-semibold mb-2">What happens next?</span>
                        Our team personally reviews each application to ensure Stratiara is the right fit. Once approved, you'll receive an email with instructions to sign in.
                    </p>
                </div>

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                    <ArrowLeft size={14} /> Back to home
                </Link>
            </motion.div>
        </div>
    );
};

export default PendingApproval;
