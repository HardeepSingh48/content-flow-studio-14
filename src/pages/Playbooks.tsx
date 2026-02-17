import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
    Linkedin,
    Twitter,
    Instagram,
    Layers,
    ArrowRight
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Playbooks = () => {
    const [filter, setFilter] = useState("all");

    const playbooks = [
        {
            id: 1,
            platform: "LinkedIn",
            icon: <Linkedin className="w-5 h-5" />,
            title: "LinkedIn Thought Leadership Pipeline",
            description: "A 4-stage framework for establishing authority in your niche — from positioning your POV to driving consistent engagement on long-form posts."
        },
        {
            id: 2,
            platform: "LinkedIn",
            icon: <Linkedin className="w-5 h-5" />,
            title: "LinkedIn Company Page Growth System",
            description: "How to run a company page that actually converts. Cadence, content mix, employee amplification, and metrics that matter."
        },
        {
            id: 3,
            platform: "Twitter",
            icon: <Twitter className="w-5 h-5" />,
            title: "The Thread-to-Funnel Playbook",
            description: "Turn single ideas into multi-post threads that drive follows, clicks, and conversions. Includes thread structure templates."
        },
        {
            id: 4,
            platform: "Twitter",
            icon: <Twitter className="w-5 h-5" />,
            title: "Twitter/X Reactive Publishing Strategy",
            description: "How to respond to trending topics and industry news in a way that builds credibility — without chasing every trend."
        },
        {
            id: 5,
            platform: "Instagram",
            icon: <Instagram className="w-5 h-5" />,
            title: "Instagram Content Cadence Framework",
            description: "The optimal mix of Reels, Carousels, and Stories for B2B and B2C brands. Includes posting frequency and caption strategy."
        },
        {
            id: 6,
            platform: "Instagram",
            icon: <Instagram className="w-5 h-5" />,
            title: "Visual Storytelling Pipeline",
            description: "How to build a cohesive visual brand and turn single shoots into 30 days of content."
        },
        {
            id: 7,
            platform: "Cross-Platform",
            icon: <Layers className="w-5 h-5" />,
            title: "The Content Repurposing Engine",
            description: "One piece of content → 12 platform-specific posts. A step-by-step repurposing framework that keeps your pipeline full."
        },
        {
            id: 8,
            platform: "Cross-Platform",
            icon: <Layers className="w-5 h-5" />,
            title: "The Launch Sequence Playbook",
            description: "A multi-platform publishing strategy for product launches, announcements, and campaigns. Pre-launch → Launch Day → Post-launch cadence."
        },
        {
            id: 9,
            platform: "Cross-Platform",
            icon: <Layers className="w-5 h-5" />,
            title: "Audience Engagement Reaction Playbook",
            description: "When your content sparks curiosity or goes viral — here's how to ride the wave strategically across every platform."
        }
    ];

    const filteredPlaybooks = filter === "all"
        ? playbooks
        : playbooks.filter(p => p.platform.toLowerCase().replace('-', '') === filter.toLowerCase().replace('-', ''));

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow pt-24 pb-16">
                {/* Hero */}
                <div className="container mx-auto px-4 mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                            Platform <span className="gradient-text">Playbooks</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-10">
                            Stop guessing. Start publishing with strategy. Proven frameworks for growing your audience on every platform — built into your pipeline.
                        </p>
                    </motion.div>
                </div>

                {/* Filter Tabs */}
                <div className="container mx-auto px-4 mb-12 flex justify-center">
                    <Tabs defaultValue="all" onValueChange={setFilter} className="w-full max-w-2xl">
                        <TabsList className="grid w-full grid-cols-5 glass p-1">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
                            <TabsTrigger value="twitter">Twitter</TabsTrigger>
                            <TabsTrigger value="instagram">Instagram</TabsTrigger>
                            <TabsTrigger value="crossplatform">Cross-Platform</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {/* Playbook Grid */}
                <div className="container mx-auto px-4 mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPlaybooks.map((book, index) => (
                            <motion.div
                                key={book.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="group p-6 rounded-2xl glass hover:bg-card/60 transition-colors border border-border/50 flex flex-col h-full"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`p-2 rounded-lg bg-background/50 text-foreground`}>
                                        {book.icon}
                                    </div>
                                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        {book.platform}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                                    {book.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-6 flex-grow leading-relaxed">
                                    {book.description}
                                </p>

                                <Button variant="ghost" className="w-full justify-between group-hover:bg-primary/10">
                                    View Playbook
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto py-12 px-6 rounded-3xl glass-strong"
                    >
                        <h2 className="text-3xl font-bold mb-4">Build Your Playbook Into Your Pipeline</h2>
                        <p className="text-muted-foreground mb-8 text-lg">
                            Import any playbook directly into Content Pipeline Studio and start executing with your team today.
                        </p>
                        <Button size="lg" variant="gradient" className="text-lg px-8">
                            Start Free Trial
                        </Button>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Playbooks;
