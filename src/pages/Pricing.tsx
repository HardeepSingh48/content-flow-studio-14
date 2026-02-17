import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Check, HelpCircle } from 'lucide-react';
import { Switch } from "@/components/ui/switch";

const Pricing = () => {
    const [isAnnual, setIsAnnual] = useState(true);

    const plans = [
        {
            name: "STARTER",
            price: isAnnual ? 24 : 29,
            description: "For solo creators getting started",
            features: [
                "5 connected platforms",
                "2 team members",
                "50 scheduled posts/month",
                "Basic pipeline workflow",
                "Content library (5GB)",
                "Email support"
            ],
            cta: "Start Free Trial",
            popular: false
        },
        {
            name: "PROFESSIONAL",
            price: isAnnual ? 79 : 99,
            description: "For growing teams publishing consistently",
            features: [
                "15 connected platforms",
                "10 team members",
                "Unlimited scheduled posts",
                "Advanced pipeline workflows",
                "Approval & review workflows",
                "Analytics & reporting dashboard",
                "Content library (50GB)",
                "API access",
                "Priority support"
            ],
            cta: "Start Free Trial",
            popular: true
        },
        {
            name: "AGENCY",
            price: "Custom",
            description: "For agencies managing multiple clients",
            features: [
                "Unlimited platforms",
                "Unlimited team members",
                "Client workspace management",
                "White-label reports",
                "Custom integrations",
                "Dedicated account manager",
                "SSO & enterprise security",
                "SLA guarantee"
            ],
            cta: "Contact Sales",
            popular: false
        }
    ];

    const faqs = [
        {
            q: "Can I switch plans anytime?",
            a: "Yes, upgrade or downgrade at any time. Changes take effect immediately."
        },
        {
            q: "Is there a free trial?",
            a: "Yes — 14 days free on any plan. No credit card required."
        },
        {
            q: "Do you offer annual billing?",
            a: "Yes, save 20% when you pay annually."
        },
        {
            q: "What counts as a 'connected platform'?",
            a: "Each social media account or publishing destination counts as one platform connection."
        },
        {
            q: "Can I manage multiple clients?",
            a: "Agency plan supports client workspace separation with individual billing and reporting per client."
        }
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow pt-24 pb-16">
                {/* Header */}
                <div className="container mx-auto px-4 mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                            Simple Pricing. <span className="gradient-text">Serious Distribution.</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-10">
                            For solo creators, growing teams, and agencies that publish at scale.
                        </p>

                        {/* Toggle */}
                        <div className="flex items-center justify-center gap-4 mb-12">
                            <span className={`text-sm ${!isAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>Monthly</span>
                            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
                            <span className={`text-sm ${isAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                                Annual <span className="text-accent text-xs ml-1">(Save 20%)</span>
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Pricing Cards */}
                <div className="container mx-auto px-4 mb-24">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`relative p-8 rounded-2xl border ${plan.popular
                                        ? 'glass-strong border-primary/50 shadow-glow-primary'
                                        : 'glass border-border/50'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                                        Most Popular
                                    </div>
                                )}

                                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                <div className="mb-2">
                                    <span className="text-4xl font-bold">
                                        {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                                    </span>
                                    {typeof plan.price === 'number' && (
                                        <span className="text-muted-foreground">/month</span>
                                    )}
                                </div>
                                <p className="text-sm text-muted-foreground mb-6 h-10">{plan.description}</p>

                                <Button
                                    className="w-full mb-8"
                                    variant={plan.popular ? "gradient" : "outline"}
                                >
                                    {plan.cta}
                                </Button>

                                <div className="space-y-4">
                                    {plan.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-3 text-sm">
                                            <Check className="w-4 h-4 text-primary mt-1 shrink-0" />
                                            <span className="text-muted-foreground">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {faqs.map((faq, index) => (
                            <div key={index} className="glass p-6 rounded-xl">
                                <div className="flex gap-3 mb-2">
                                    <HelpCircle className="w-5 h-5 text-accent shrink-0" />
                                    <h3 className="font-semibold">{faq.q}</h3>
                                </div>
                                <p className="text-muted-foreground text-sm pl-8">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Pricing;
