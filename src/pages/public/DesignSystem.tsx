import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Spinner } from '@/components/ui/spinner';
import { EmptyState } from '@/components/ui/empty-state';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Sidebar } from '@/components/layout/Sidebar';
import { Container } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Mail, Search, Plus, Bell, Trash2, ArrowRight, Layout, Navigation, Map } from 'lucide-react';

const DesignSystem = () => {
    const [isLoading, setIsLoading] = useState(false);

    const colors = [
        { name: 'Primary', scale: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900], prefix: 'bg-primary' },
        { name: 'Neutral', scale: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900], prefix: 'bg-neutral' },
    ];

    const semantic = [
        { name: 'Success', color: 'bg-success', text: 'text-success-foreground' },
        { name: 'Warning', color: 'bg-warning', text: 'text-warning-foreground' },
        { name: 'Error', color: 'bg-error', text: 'text-error-foreground' },
        { name: 'Info', color: 'bg-info', text: 'text-info-foreground' },
    ];

    const breadcrumbs = [
        { label: 'Studio', href: '#' },
        { label: 'Pipelines', href: '#' },
        { label: 'LinkedIn Automation', active: true },
    ];

    return (
        <div className="bg-neutral-50 min-h-screen font-primary pb-24">
            {/* Navbar Preview */}
            <div className="relative h-16 mb-12">
                <div className="absolute inset-0 pointer-events-none border-2 border-dashed border-primary/20 flex items-center justify-center text-[10px] text-primary/40 font-mono uppercase tracking-widest z-10">
                    Navbar Component
                </div>
                <Navbar />
            </div>

            <div className="p-12 space-y-24">
                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <Badge variant="info">v2.5 Stable</Badge>
                        <Badge variant="neutral">Layout System</Badge>
                    </div>
                    <h1 className="text-5xl font-bold tracking-tight mb-4 text-neutral-900 leading-tight">System Foundation & Layout</h1>
                    <p className="text-xl text-neutral-500 max-w-2xl">High-performance enterprise architecture with premium interactions.</p>
                </section>

                {/* Layout System Section */}
                <section className="space-y-12">
                    <h2 className="text-3xl font-semibold border-b border-neutral-200 pb-4 flex items-center gap-3">
                        <Layout className="text-primary-600" />
                        Layout & Structure
                    </h2>

                    <div className="grid grid-layout grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Responsive Containers</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-white border border-neutral-200 rounded-lg">
                                    <div className="h-4 bg-neutral-100 rounded w-full mb-2"></div>
                                    <p className="text-[10px] text-neutral-400 font-mono">.container--lg (default max-w: 1024px)</p>
                                </div>
                                <div className="p-4 bg-white border border-neutral-200 rounded-lg max-w-[400px]">
                                    <div className="h-4 bg-neutral-100 rounded w-full mb-2"></div>
                                    <p className="text-[10px] text-neutral-400 font-mono">.container--sm (max-w: 640px)</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Grid Utilities</h3>
                            <div className="grid grid-layout grid-cols-2 gap-4">
                                <div className="h-20 bg-primary-50 border border-primary-100 rounded flex items-center justify-center text-xs font-semibold text-primary-700">Col 1</div>
                                <div className="h-20 bg-primary-50 border border-primary-100 rounded flex items-center justify-center text-xs font-semibold text-primary-700">Col 2</div>
                            </div>
                            <div className="grid grid-layout grid-cols-3 gap-4">
                                <div className="h-16 bg-neutral-100 rounded flex items-center justify-center text-xs text-neutral-500">1/3</div>
                                <div className="h-16 bg-neutral-100 rounded flex items-center justify-center text-xs text-neutral-500">1/3</div>
                                <div className="h-16 bg-neutral-100 rounded flex items-center justify-center text-xs text-neutral-500">1/3</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Page Headers & Navigation</h3>
                        <div className="p-8 bg-white border border-neutral-200 rounded-xl shadow-sm">
                            <PageHeader
                                title="Content Pipelines"
                                subtitle="Orchestrate your multi-platform distribution strategy from a single dashboard."
                                breadcrumbs={breadcrumbs}
                                actions={
                                    <>
                                        <Button variant="secondary" icon={<Bell size={16} />}>Alerts</Button>
                                        <Button icon={<Plus size={16} />}>New Pipeline</Button>
                                    </>
                                }
                                className="py-0 mb-0 border-none"
                            />
                        </div>
                    </div>
                </section>

                {/* Sidebar Preview */}
                <section className="space-y-12">
                    <h2 className="text-3xl font-semibold border-b border-neutral-200 pb-4 flex items-center gap-3">
                        <Navigation className="text-primary-600" />
                        Navigation Contexts
                    </h2>

                    <div className="grid grid-layout grid-cols-3 gap-12">
                        <div className="col-span-1 space-y-6">
                            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Vertical Navigation (Sidebar)</h3>
                            <div className="h-[500px] relative border border-neutral-200 rounded-xl overflow-hidden bg-neutral-100 flex items-center justify-center">
                                <span className="text-[10px] text-neutral-400 font-mono rotate-90 absolute right-4">Sidebar implementation active</span>
                                <div className="scale-[0.85] origin-top h-full w-full">
                                    <Sidebar activePath="/" />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-2 space-y-12">
                            <div className="space-y-6">
                                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Section Patterns</h3>
                                <Section background="gray" padding="small" className="rounded-xl border border-neutral-200 p-8">
                                    <div className="text-center">
                                        <Badge variant="success" className="mb-4">Marketing Section</Badge>
                                        <h3 className="text-2xl font-bold mb-2 text-neutral-900 text-center">Seamless Integration</h3>
                                        <p className="text-neutral-500 max-w-md mx-auto">Connect with your favorite platforms in seconds. Optimized for high-throughput distribution.</p>
                                    </div>
                                </Section>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Secondary Typography</h3>
                                <div className="space-y-4">
                                    <p className="text-sm text-neutral-500 leading-relaxed font-primary">
                                        The primary goal of the layout system is to maintain <span className="font-bold text-neutral-900 underline decoration-primary-500 decoration-2 underline-offset-4">visual hierarchy</span> while ensuring high accessibility.
                                    </p>
                                    <div className="flex items-center gap-4 p-4 bg-primary-50/50 border border-primary-100 rounded-lg">
                                        <Bell className="text-primary-600 size-5" />
                                        <p className="text-xs text-primary-700 font-medium">System notification style using theme variables.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer Preview */}
                <section className="space-y-12 pt-12 border-t border-neutral-200">
                    <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Enterprise Footer</h3>
                    <div className="rounded-xl border border-neutral-200 overflow-hidden shadow-lg">
                        <Footer />
                    </div>
                </section>

                {/* Colors */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-semibold">Colors</h2>
                    <div className="space-y-8">
                        {colors.map((group) => (
                            <div key={group.name} className="space-y-3">
                                <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">{group.name}</h3>
                                <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                                    {group.scale.map((step) => (
                                        <div key={step} className="space-y-2">
                                            <div className={`h-12 w-full rounded-base border border-neutral-200 ${group.prefix}-${step}`} />
                                            <p className="text-xs text-center font-mono text-neutral-500">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Typography */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-semibold">Typography</h2>
                    <Card>
                        <CardBody className="p-8 space-y-8">
                            <div className="space-y-2">
                                <p className="text-sm font-mono text-neutral-400">Heading 1 / 5xl</p>
                                <h1 className="text-5xl font-bold tracking-tight">The quick brown fox jumps over the lazy dog</h1>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm font-mono text-neutral-400">Heading 2 / 3xl</p>
                                <h2 className="text-3xl font-semibold">The quick brown fox jumps over the lazy dog</h2>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm font-mono text-neutral-400">Body / base</p>
                                <p className="text-base text-neutral-600 leading-relaxed max-w-3xl">
                                    Enterprise SaaS platforms require legible, professional typography. We use Inter for its excellent
                                    on-screen performance and wide range of weights. This ensures clarity across all dashboard views.
                                </p>
                            </div>
                        </CardBody>
                    </Card>
                </section>

                {/* Premium Components Gallery (Previous Stage) */}
                <section className="space-y-12 pt-24">
                    <h2 className="text-3xl font-semibold border-b border-neutral-200 pb-4 flex items-center gap-3 text-neutral-400 italic">
                        Premium Components v2.0
                    </h2>

                    {/* Buttons & Inputs */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Buttons</h3>
                            <div className="flex flex-wrap gap-4">
                                <Button onClick={() => { setIsLoading(true); setTimeout(() => setIsLoading(false), 2000); }} loading={isLoading}>
                                    Action Button
                                </Button>
                                <Button variant="secondary">Secondary</Button>
                                <Button variant="ghost" icon={<Plus size={16} />}>Ghost Icon</Button>
                                <Button variant="danger" icon={<Trash2 size={16} />}>Delete</Button>
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                <Button size="sm">Small</Button>
                                <Button size="md">Medium</Button>
                                <Button size="lg">Large Scale</Button>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Inputs</h3>
                            <div className="space-y-4">
                                <Input label="Email Address" placeholder="alex@company.com" icon={<Mail size={16} />} />
                                <Input label="Search Workspace" placeholder="Type to find..." icon={<Search size={16} />} error="Must be at least 3 characters" />
                            </div>
                        </div>
                    </div>

                    {/* Feedback & Data */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="space-y-8">
                            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Semantic Badges</h3>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="success">Completed</Badge>
                                <Badge variant="warning">In Progress</Badge>
                                <Badge variant="error">Critical</Badge>
                                <Badge variant="info">New Feature</Badge>
                                <Badge variant="neutral">Draft</Badge>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="success" size="sm">Small</Badge>
                                <Badge variant="info" size="md">Medium</Badge>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Avatars & Status</h3>
                            <div className="flex flex-wrap items-end gap-6">
                                <Avatar size="xs" status="online"><AvatarFallback>JD</AvatarFallback></Avatar>
                                <Avatar size="sm" status="online"><AvatarFallback>JD</AvatarFallback></Avatar>
                                <Avatar size="md" status="offline"><AvatarFallback>JD</AvatarFallback></Avatar>
                                <Avatar size="lg" status="busy"><AvatarFallback>JD</AvatarFallback></Avatar>
                                <Avatar size="xl" status="online">
                                    <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Select & Tooltips</h3>
                            <div className="space-y-4">
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Platform" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                                        <SelectItem value="twitter">Twitter (X)</SelectItem>
                                        <SelectItem value="instagram">Instagram</SelectItem>
                                    </SelectContent>
                                </Select>

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="secondary" fullWidth>Hover for Tooltip</Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Comprehensive analytics for your content pipelines</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    </div>

                    {/* Complex Overlays */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <Card variant="elevated">
                            <CardHeader>
                                <CardTitle>Overlay Systems</CardTitle>
                                <CardDescription>Industry standard modal behavior.</CardDescription>
                            </CardHeader>
                            <CardBody className="flex gap-4">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="primary">Open Premium Modal</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Configure Platform Integration</DialogTitle>
                                            <DialogDescription>
                                                Connect your social media accounts to start distributing content.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="py-6 border-y border-neutral-100 my-4 space-y-4">
                                            <Input label="Account Name" placeholder="e.g. Marketing Team" />
                                            <div className="flex items-center gap-4 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                                                <Avatar size="md" status="online" />
                                                <div>
                                                    <p className="text-sm font-bold">Waiting for connection...</p>
                                                    <p className="text-xs text-neutral-500">Redirecting to LinkedIn OAuth</p>
                                                </div>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button variant="secondary">Cancel</Button>
                                            <Button>Connect Account</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <Spinner size="md" />
                            </CardBody>
                        </Card>

                        <EmptyState
                            illustration="/src/assets/images/illustrations/feature-pipeline.svg"
                            title="No Pipelines Active"
                            description="You haven't created any content pipelines yet. Start by defining your first workflow."
                            action={{ label: "Create Pipeline", onClick: () => { } }}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DesignSystem;
