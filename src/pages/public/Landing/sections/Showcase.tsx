import React from 'react';
import { ShowcaseCard } from '../../../../components/ui/ShowcaseCard';
import { ScribbleText } from '../../../../components/ui/ScribbleText';

export function Showcase() {
    const cards = [
        {
            imageSrc: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
            title: 'B2B Growth Agency',
            avatars: ['https://i.pravatar.cc/150?u=1', 'https://i.pravatar.cc/150?u=2'],
            category: 'COMPANY',
            platform: 'LINKEDIN',
        },
        {
            imageSrc: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
            title: 'Daily Tech Newsletter',
            avatars: ['https://i.pravatar.cc/150?u=3'],
            category: 'PERSONAL BRAND',
            platform: 'TWITTER',
        },
        {
            imageSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
            title: 'Show Them',
            avatars: ['https://i.pravatar.cc/150?u=4', 'https://i.pravatar.cc/150?u=5'],
            category: 'COURSE',
            platform: 'YOUTUBE',
        },
        {
            imageSrc: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=800',
            title: 'Creator Community',
            avatars: ['https://i.pravatar.cc/150?u=6'],
            category: 'COMMUNITY',
            platform: 'THREADS',
        }
    ];

    // Tile cards 4 times to ensure infinite smooth scrolling marquee
    const marqueeItems = [...cards, ...cards, ...cards, ...cards];

    return (
        <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#0A0E27] to-[#12183B] py-24 sm:py-32 border-y border-white/5">

            {/* Decorative top fade blending into dark hero */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#0A0E27] to-transparent pointer-events-none z-10"></div>

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="flex justify-between items-end mb-16 md:mb-24 relative max-w-5xl mx-auto">

                    <div className="absolute -top-16 left-0 md:-left-12 z-20 hidden lg:block origin-center hover:scale-105 transition-transform">
                        <ScribbleText arrowDirection="down-right">
                            SEE WHAT OUR CREATORS ARE PUBLISHING
                        </ScribbleText>
                    </div>

                    <div className="w-full flex-wrap justify-center gap-4 uppercase text-[10px] md:text-xs font-bold tracking-widest text-[#A78BFA] hidden md:flex opacity-80">
                        <span className="bg-white/5 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">Agencies</span>
                        <span className="bg-white/5 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">Creators</span>
                        <span className="bg-white/5 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">Growth Teams</span>
                        <span className="bg-transparent px-4 py-1.5 rounded-full border border-[#8B5CF6]/30 border-dashed">Thought Leaders</span>
                    </div>

                    <div className="absolute -top-16 right-0 md:-right-12 z-20 hidden lg:block origin-center hover:scale-105 transition-transform">
                        <ScribbleText arrowDirection="down-left">
                            10 MILLION VIEWS IN THE FIRST 48 HOURS
                        </ScribbleText>
                    </div>
                </div>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full flex overflow-hidden group">
                <div className="flex space-x-6 md:space-x-8 animate-marquee pl-6 md:pl-8 min-w-max hover:[animation-play-state:paused] py-4">
                    {marqueeItems.map((card, idx) => (
                        <ShowcaseCard key={idx} {...card} />
                    ))}
                </div>

                {/* Gradient Edges for fading effect */}
                <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#0E1333] to-transparent z-20 pointer-events-none"></div>
                <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#12183B] to-transparent z-20 pointer-events-none"></div>
            </div>

        </section >
    );
}
