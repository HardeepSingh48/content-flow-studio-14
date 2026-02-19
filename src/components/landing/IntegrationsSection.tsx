import React from 'react';
import { motion } from 'framer-motion';
import {
    Bot,
    Linkedin,
    Twitter,
    Instagram,
    Video,
    Youtube,
    Sparkles,
    Mic,
    Clapperboard,
    Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const IntegrationsSection = () => {
    const activeIntegrations = [
        { name: 'Gemini', icon: Sparkles, status: 'active', color: 'text-blue-500' },
        { name: 'ChatGPT', icon: Bot, status: 'active', color: 'text-green-500' },
        { name: 'LinkedIn', icon: Linkedin, status: 'active', note: 'Profile posting', color: 'text-blue-700' },
        { name: 'Twitter/X', icon: Twitter, status: 'active', color: 'text-black dark:text-white' },
    ];

    const comingSoon = [
        { name: 'LinkedIn Pages', icon: Linkedin, color: 'text-blue-700' },
        { name: 'Instagram', icon: Instagram, color: 'text-pink-600' },
        { name: 'ElevenLabs', icon: Mic, color: 'text-orange-500' },
        { name: 'HeyGen', icon: Video, color: 'text-purple-600' },
        { name: 'TikTok', icon: Video, color: 'text-black dark:text-white' },
        { name: 'YouTube', icon: Youtube, color: 'text-red-600' },
    ];

    return (
        <section className="py-20 bg-secondary/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Integrations That Work Today
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        Connect your favorite platforms and start publishing
                    </p>
                </motion.div>

                {/* Active Integrations */}
                <div className="mb-16">
                    <h3 className="text-2xl font-semibold mb-8 text-center text-green-600 flex items-center justify-center gap-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        Live Now
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {activeIntegrations.map((integration, index) => (
                            <motion.div
                                key={integration.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-background rounded-xl p-6 text-center shadow-sm hover:shadow-md transition border border-border"
                            >
                                <div className={`mx-auto mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-secondary ${integration.color}`}>
                                    <integration.icon className="w-6 h-6" />
                                </div>
                                <h4 className="font-semibold mb-1 text-foreground">{integration.name}</h4>
                                {integration.note && (
                                    <p className="text-xs text-muted-foreground mb-2">{integration.note}</p>
                                )}
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                    Active
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Coming Soon */}
                <div>
                    <h3 className="text-2xl font-semibold mb-8 text-center text-muted-foreground flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Coming Soon
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                        {comingSoon.map((integration, index) => (
                            <motion.div
                                key={integration.name}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + (index * 0.05) }}
                                className="bg-background/50 rounded-lg p-4 text-center opacity-70 hover:opacity-100 transition border border-transparent hover:border-border"
                            >
                                <div className={`mx-auto mb-2 w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50 ${integration.color}`}>
                                    <integration.icon className="w-5 h-5 grayscale opacity-50" />
                                </div>
                                <p className="text-xs font-medium text-muted-foreground">{integration.name}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <Link
                        to="/features"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 py-2"
                    >
                        View All Integrations →
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default IntegrationsSection;
