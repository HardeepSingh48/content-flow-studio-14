// src/pages/Features.tsx

import React, { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface Integration {
    id: string;
    name: string;
    category: string;
    status: 'active' | 'beta' | 'coming_soon' | 'disabled';
    description: string;
    icon: string;
    features: string[];
    releaseDate?: string;
    betaNote?: string;
}

interface IntegrationGroups {
    ai_generation: Integration[];
    publishing: Integration[];
    ai_media: Integration[];
}

export default function Features() {
    const [integrations, setIntegrations] = useState<IntegrationGroups | null>(null);
    const [userRole, setUserRole] = useState('USER');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchIntegrations();
    }, []);

    const fetchIntegrations = async () => {
        try {
            const response = await api.getIntegrationStatus();
            setIntegrations(response.integrations);
            setUserRole(response.userRole);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching integrations:', error);
            setLoading(false);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return <Badge className="bg-green-500 hover:bg-green-600">Live</Badge>;
            case 'beta':
                return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black">Beta</Badge>;
            case 'coming_soon':
                return <Badge variant="secondary">Coming Soon</Badge>;
            case 'disabled':
                return <Badge variant="destructive">Disabled</Badge>;
            default:
                return null;
        }
    };

    const IntegrationCard = ({ integration }: { integration: Integration }) => (
        <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                        <img
                            src={integration.icon}
                            alt={integration.name}
                            className="w-10 h-10 object-contain"
                            onError={(e) => {
                                // Fallback if icon missing
                                (e.target as HTMLImageElement).src = 'https://placehold.co/40x40?text=' + integration.name.charAt(0);
                            }}
                        />
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                    </div>
                    {getStatusBadge(integration.status)}
                </div>
                <CardDescription>{integration.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <ul className="space-y-2 text-sm text-muted-foreground">
                    {integration.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            {feature}
                        </li>
                    ))}
                </ul>

                {integration.betaNote && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                        <strong>Beta:</strong> {integration.betaNote}
                    </div>
                )}

                {integration.releaseDate && (
                    <p className="mt-4 text-xs text-muted-foreground">
                        Expected: {integration.releaseDate}
                    </p>
                )}
            </CardContent>
        </Card>
    );

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin w-8 h-8" /></div>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Features & Integrations</h1>
                    <p className="text-xl text-muted-foreground">
                        Everything you need to build, publish, and grow your content strategy
                    </p>

                    {(userRole === 'ADMIN' || userRole === 'ENTERPRISE') && (
                        <div className="mt-4 inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-lg text-sm font-medium">
                            {userRole === 'ADMIN' ? '🔧 Admin View' : '🏢 Enterprise View'} - You can see all features
                        </div>
                    )}
                </div>

                {integrations?.ai_generation?.length ? (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            🤖 AI Content Generation
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {integrations.ai_generation.map((integration) => (
                                <IntegrationCard key={integration.id} integration={integration} />
                            ))}
                        </div>
                    </section>
                ) : null}

                {integrations?.publishing?.length ? (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            📱 Social Media Publishing
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {integrations.publishing.map((integration) => (
                                <IntegrationCard key={integration.id} integration={integration} />
                            ))}
                        </div>
                    </section>
                ) : null}

                {integrations?.ai_media?.length ? (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            🎬 AI Media Generation
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {integrations.ai_media.map((integration) => (
                                <IntegrationCard key={integration.id} integration={integration} />
                            ))}
                        </div>
                    </section>
                ) : null}
            </main>
            <Footer />
        </div>
    );
}
