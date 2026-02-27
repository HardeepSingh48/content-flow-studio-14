import React from 'react';
import { motion } from 'framer-motion';
import { PublicNavbar } from '@/components/public-layout/PublicNavbar';
import { PublicFooter } from '@/components/public-layout/PublicFooter';

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-[#0A0E27] relative overflow-hidden">
            <PublicNavbar />
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8B5CF6]/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

            <div className="pt-32 pb-24 relative z-10">
                <div className="max-w-[1280px] mx-auto px-6 md:px-10 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">
                    <div className="max-w-[500px]">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[28px] md:text-[40px] lg:text-[56px] font-bold text-white leading-[1.15] tracking-[-0.02em] mb-6"
                        >
                            Get in touch with our team
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-[16px] md:text-[18px] lg:text-[20px] text-white/60 leading-[1.6] mb-12"
                        >
                            Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
                        </motion.p>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-white font-semibold text-lg mb-2">Support</h3>
                                <p className="text-white/60">contact@stratiara.com</p>
                            </div>

                        </div>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 backdrop-blur-md"
                    >
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-white/70 mb-2">First Name</label>
                                    <input type="text" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#8B5CF6]/50 focus:ring-1 focus:ring-[#8B5CF6]/50 transition-colors" placeholder="Jane" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-white/70 mb-2">Last Name</label>
                                    <input type="text" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#8B5CF6]/50 focus:ring-1 focus:ring-[#8B5CF6]/50 transition-colors" placeholder="Doe" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/70 mb-2">Work Email</label>
                                <input type="email" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#8B5CF6]/50 focus:ring-1 focus:ring-[#8B5CF6]/50 transition-colors" placeholder="jane@company.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/70 mb-2">Message</label>
                                <textarea rows={4} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#8B5CF6]/50 focus:ring-1 focus:ring-[#8B5CF6]/50 transition-colors" placeholder="How can we help?"></textarea>
                            </div>
                            <button type="button" className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white font-semibold py-4 rounded-lg hover:shadow-[0_8px_24px_rgba(139,92,246,0.25)] transition-all hover:-translate-y-0.5">
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
            <PublicFooter />
        </div>
    );
};

export default ContactPage;
