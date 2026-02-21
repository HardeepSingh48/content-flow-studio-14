import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building, Mail, User, Users, Loader2 } from 'lucide-react';
import { api } from '@/services/api';
import { toast } from 'sonner';

interface InviteModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const InviteModal = ({ isOpen, onClose }: InviteModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        teamSize: ''
    });

    // Prevent scrolling when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await api.sendInviteRequest(formData);
            toast.success("Request received!", {
                description: "We'll be in touch with your early access invite soon."
            });
            onClose();
            // Optional: reset form after brief delay if you want
            setTimeout(() => setFormData({ firstName: '', lastName: '', email: '', company: '', teamSize: '' }), 500);
        } catch (error) {
            toast.error("Something went wrong", {
                description: "Failed to submit request. Please try again."
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[9999] bg-[#0A0E27]/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="bg-[#0A0E27] border border-white/10 rounded-2xl w-full max-w-[500px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.5)] pointer-events-auto relative"
                        >
                            {/* Glow */}
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#8B5CF6]/15 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

                            <div className="p-8 relative z-10">
                                <button
                                    onClick={onClose}
                                    className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>

                                <h2 className="text-2xl font-bold text-white mb-2">Request an invite</h2>
                                <p className="text-white/60 text-[15px] mb-8 leading-relaxed">
                                    ContentPipeline is currently in early access for enterprise teams and agencies. Leave your details below.
                                </p>

                                <form className="space-y-5" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-white/70 text-[13px] font-medium ml-1">First Name</label>
                                            <div className="relative">
                                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                                                <input name="firstName" value={formData.firstName} onChange={handleChange} type="text" required disabled={isLoading} className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-11 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#8B5CF6]/50 focus:ring-1 focus:ring-[#8B5CF6]/50 transition-all text-sm disabled:opacity-50" placeholder="Jane" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-white/70 text-[13px] font-medium ml-1">Last Name</label>
                                            <div className="relative">
                                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                                                <input name="lastName" value={formData.lastName} onChange={handleChange} type="text" required disabled={isLoading} className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-11 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#8B5CF6]/50 focus:ring-1 focus:ring-[#8B5CF6]/50 transition-all text-sm disabled:opacity-50" placeholder="Doe" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-white/70 text-[13px] font-medium ml-1">Work Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                                            <input name="email" value={formData.email} onChange={handleChange} type="email" required disabled={isLoading} className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-11 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#8B5CF6]/50 focus:ring-1 focus:ring-[#8B5CF6]/50 transition-all text-sm disabled:opacity-50" placeholder="jane@company.com" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-white/70 text-[13px] font-medium ml-1">Company Name</label>
                                            <div className="relative">
                                                <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                                                <input name="company" value={formData.company} onChange={handleChange} type="text" required disabled={isLoading} className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-11 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#8B5CF6]/50 focus:ring-1 focus:ring-[#8B5CF6]/50 transition-all text-sm disabled:opacity-50" placeholder="Acme Corp" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-white/70 text-[13px] font-medium ml-1">Team Size</label>
                                            <div className="relative">
                                                <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={18} />
                                                <select name="teamSize" value={formData.teamSize} onChange={handleChange} required disabled={isLoading} className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-11 pr-4 text-white focus:outline-none focus:border-[#8B5CF6]/50 focus:ring-1 focus:ring-[#8B5CF6]/50 transition-all text-sm appearance-none cursor-pointer disabled:opacity-50">
                                                    <option value="" disabled className="text-black">Select size</option>
                                                    <option value="1-10" className="text-black">1-10 employees</option>
                                                    <option value="11-50" className="text-black">11-50 employees</option>
                                                    <option value="51-200" className="text-black">51-200 employees</option>
                                                    <option value="201+" className="text-black">201+ employees</option>
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1 1L5 5L9 1" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] text-white font-semibold text-[16px] shadow-[0_4px_16px_rgba(139,92,246,0.25)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(139,92,246,0.4)] disabled:opacity-80 disabled:cursor-not-allowed disabled:transform-none"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="animate-spin" size={18} />
                                                    Sending Request...
                                                </>
                                            ) : (
                                                "Request Access"
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-center text-white/40 text-xs mt-4">
                                        By requesting access, you agree to our Terms of Service.
                                    </p>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};
