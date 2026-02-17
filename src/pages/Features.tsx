import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
    GitBranch,
    Share2,
    LayoutTemplate,
    Calendar,
    Users,
    MessageSquare,
    Library,
    ShieldAlert
} from 'lucide-react';

const features = [
    {
        icon: <GitBranch className="w-6 h-6 text-primary" />,
        title: "Pipeline Workflow Engine",
        description: "Visualize your content journey from draft to live post. Move content through custom stages — ideation, writing, review, approval, scheduling — with full team visibility."
    },
    {
        icon: <Share2 className="w-6 h-6 text-accent" />,
        title: "Multi-Platform Publishing",
        description: "Connect LinkedIn, Twitter/X, Facebook, Instagram, Medium, and more. Publish simultaneously or schedule strategically per platform."
    },
    {
        icon: <LayoutTemplate className="w-6 h-6 text-primary" />,
        title: "Platform-Specific Formatting",
        description: "Every platform has different rules. Content Pipeline Studio automatically adapts your content — character limits, hashtag placement, image dimensions — so it looks native everywhere."
    },
    {
        icon: <Calendar className="w-6 h-6 text-accent" />,
        title: "Strategic Scheduling",
        description: "Queue weeks of content in minutes. Set exact times or let data guide your timing based on audience behavior patterns."
    },
    {
        icon: <Users className="w-6 h-6 text-primary" />,
        title: "Team Collaboration",
        description: "Assign roles, review drafts, approve before publish. No more Slack threads asking 'is this ready to go?'"
    },
    {
        icon: <MessageSquare className="w-6 h-6 text-accent" />,
        title: "Unified Inbox & Engagement",
        description: "Respond to comments across all platforms from one place. Never miss a conversation that matters."
    },
    {
        icon: <Library className="w-6 h-6 text-primary" />,
        title: "Content Library & Templates",
        description: "Save your best-performing formats as templates. Build a searchable archive of everything you've published."
    },
    {
        icon: <ShieldAlert className="w-6 h-6 text-accent" />,
        title: "Manual Intervention Controls",
        description: "Pipeline automation with human override. Hold content, request revisions, or kill a post before it goes live — full control at every stage."
    }
];

const Features = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow pt-24 pb-16">
                {/* Hero Section */}
                <div className="container mx-auto px-4 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                            Everything Your Content <span className="gradient-text">Workflow Needs</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-10">
                            From idea to published — manage every stage of your content pipeline with tools built for strategic distribution.
                        </p>
                        <Button size="lg" variant="gradient" className="text-lg px-8">
                            Start Free Trial
                        </Button>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="p-6 rounded-2xl glass-strong hover:bg-card/50 transition-colors border border-border/50"
                            >
                                <div className="mb-4 p-3 rounded-xl bg-background/50 w-fit">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="container mx-auto px-4 mt-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="glass-strong rounded-3xl p-12 text-center max-w-4xl mx-auto relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
                        <h2 className="text-3xl font-bold mb-6">Ready to build your content pipeline?</h2>
                        <Button size="lg" variant="gradient" className="text-lg px-10">
                            Start Free Trial
                        </Button>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Features;
