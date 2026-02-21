import React from 'react';
import { PlatformIcons } from './PlatformIcons';

export interface ShowcaseCardProps {
    imageSrc: string;
    logoSrc?: string;
    title?: string;
    avatars: string[];
    category: string;
    platform: string;
}

export function ShowcaseCard({ imageSrc, logoSrc, title, avatars, category, platform }: ShowcaseCardProps) {
    return (
        <div className="w-[320px] md:w-[450px] flex-shrink-0 bg-white/5 backdrop-blur-md rounded-[24px] border border-white/10 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(139,92,246,0.15)] hover:border-white/20 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 group cursor-pointer relative z-20">
            <div className="p-4 md:p-5">
                <div className="w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden bg-neutral-900 relative shadow-inner">
                    <img src={imageSrc} alt={title || 'Showcase'} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-blue-800 flex items-center shadow-sm">
                        Visit Site
                        <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="px-6 pb-6 pt-1">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex-1 pr-4">
                        {logoSrc ? (
                            <img src={logoSrc} alt={title} className="h-8 md:h-10 object-contain brightness-0 invert opacity-90" />
                        ) : (
                            <h3 className="font-bold text-xl md:text-2xl text-white leading-tight">{title}</h3>
                        )}
                    </div>
                    <div className="flex -space-x-3 relative z-10">
                        {avatars.map((avatar, i) => (
                            <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#1E2548] overflow-hidden bg-neutral-800 shadow-sm transition-transform hover:-translate-y-1 hover:z-20">
                                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center text-[10px] md:text-[11px] font-bold text-white/50 uppercase tracking-widest border-t border-white/10 pt-4 mt-2">
                    <span>{category}</span>
                    <span className="mx-2 text-white/20">•</span>
                    <span>Published to</span>
                    <div className="ml-2 flex items-center text-white font-extrabold gap-1">
                        {PlatformIcons[platform as keyof typeof PlatformIcons] ?
                            React.createElement(PlatformIcons[platform as keyof typeof PlatformIcons]) :
                            <PlatformIcons.DEFAULT />
                        }
                        {platform}
                    </div>
                </div>
            </div>
        </div>
    );
}
