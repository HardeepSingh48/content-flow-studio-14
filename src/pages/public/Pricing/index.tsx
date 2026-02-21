import React from 'react';
import { motion } from 'framer-motion';
import { PricingPreview } from '../Landing/sections/PricingPreview';
import { PublicNavbar } from '@/components/public-layout/PublicNavbar';
import { PublicFooter } from '@/components/public-layout/PublicFooter';

const PricingPage = () => {
    return (
        <div className="min-h-screen bg-[#0A0E27]">
            <PublicNavbar />
            <div className="pt-20 pb-24">
                <PricingPreview />

                {/* FAQ Section */}
                <div className="max-w-[800px] mx-auto px-6 md:px-10 mt-16">
                    <h3 className="text-[28px] font-bold text-white mb-8 text-center">Frequently Asked Questions</h3>
                    <div className="space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h4 className="text-white font-semibold text-[16px] mb-2">Can I switch plans later?</h4>
                            <p className="text-white/60 text-[15px] leading-[1.6]">Absolutely. You can upgrade, downgrade, or cancel your plan at any time from your billing dashboard. Changes take effect on your next billing cycle.</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h4 className="text-white font-semibold text-[16px] mb-2">What happens when I exceed my allotted posts?</h4>
                            <p className="text-white/60 text-[15px] leading-[1.6]">If you are on the free plan, you will need to upgrade to continue scheduling. For paid plans, you have unlimited posting capabilities.</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h4 className="text-white font-semibold text-[16px] mb-2">Do you offer discounts for non-profits?</h4>
                            <p className="text-white/60 text-[15px] leading-[1.6]">Yes, we offer a 50% discount for registered 501(c)(3) organizations. Please contact our support team to get set up.</p>
                        </div>
                    </div>
                </div>
            </div>
            <PublicFooter />
        </div>
    );
};

export default PricingPage;
