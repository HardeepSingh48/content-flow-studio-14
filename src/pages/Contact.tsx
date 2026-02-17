import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Mail,
    Briefcase,
    LifeBuoy,
    CheckCircle2
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // Here you would typically handle form submission logic
    };

    const contactOptions = [
        { email: "hello@contentpipelinestudio.com", label: "General" },
        { email: "sales@contentpipelinestudio.com", label: "Sales & Demos" },
        { email: "support@contentpipelinestudio.com", label: "Support" }
    ];

    const reasonCards = [
        {
            icon: <Briefcase className="w-5 h-5 text-primary" />,
            title: "Book a Demo",
            desc: "See Content Pipeline Studio in action with a personalized walkthrough of your use case."
        },
        {
            icon: <CheckCircle2 className="w-5 h-5 text-accent" />,
            title: "Enterprise Inquiry",
            desc: "Custom pricing, dedicated onboarding, and enterprise-grade security for large teams."
        },
        {
            icon: <LifeBuoy className="w-5 h-5 text-primary" />,
            title: "Technical Support",
            desc: "Integration issues, API questions, or platform connection problems — we've got you."
        }
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

                        {/* Left Side - Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-4xl font-bold mb-4">Let's Talk <span className="gradient-text">Strategy</span></h1>
                            <p className="text-xl text-muted-foreground mb-8">
                                Whether you're setting up your first pipeline or scaling a team of 50 — we're here to help.
                            </p>

                            <div className="space-y-4 mb-10">
                                {contactOptions.map((opt, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm">
                                        <Mail className="w-4 h-4 text-primary" />
                                        <span className="font-medium w-24">{opt.label}:</span>
                                        <a href={`mailto:${opt.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                                            {opt.email}
                                        </a>
                                    </div>
                                ))}
                                <p className="text-xs text-muted-foreground mt-4 ml-7">
                                    Typical response time: under 4 hours on business days
                                </p>
                            </div>

                            <div className="space-y-4">
                                {reasonCards.map((card, index) => (
                                    <div key={index} className="glass p-5 rounded-xl border border-border/50">
                                        <div className="flex items-center gap-3 mb-2">
                                            {card.icon}
                                            <h3 className="font-semibold">{card.title}</h3>
                                        </div>
                                        <p className="text-sm text-muted-foreground pl-8">
                                            {card.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right Side - Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="glass-strong p-8 rounded-2xl border border-border/60"
                        >
                            {!submitted ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Full Name</label>
                                        <Input placeholder="Jane Doe" required />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Work Email</label>
                                        <Input type="email" placeholder="jane@company.com" required />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Company Name</label>
                                            <Input placeholder="Acme Inc." required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Team Size</label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select size" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">Just me</SelectItem>
                                                    <SelectItem value="2-5">2-5 people</SelectItem>
                                                    <SelectItem value="6-20">6-20 people</SelectItem>
                                                    <SelectItem value="20+">20+ people</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Reason for contact</label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a reason" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="general">General Inquiry</SelectItem>
                                                <SelectItem value="demo">Book a Demo</SelectItem>
                                                <SelectItem value="enterprise">Enterprise Pricing</SelectItem>
                                                <SelectItem value="support">Technical Support</SelectItem>
                                                <SelectItem value="partner">Partnership</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Message</label>
                                        <Textarea
                                            placeholder="Tell us about your needs..."
                                            className="min-h-[120px]"
                                            required
                                        />
                                    </div>

                                    <Button type="submit" size="lg" className="w-full" variant="gradient">
                                        Send Message
                                    </Button>
                                </form>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle2 className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                                    <p className="text-muted-foreground mb-6">
                                        Thanks for reaching out. Our team will get back to you shortly.
                                    </p>
                                    <Button variant="outline" onClick={() => setSubmitted(false)}>
                                        Send another message
                                    </Button>
                                </div>
                            )}
                        </motion.div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;
