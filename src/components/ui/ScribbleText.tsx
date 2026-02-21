import React from 'react';

interface ScribbleTextProps {
    children: React.ReactNode;
    arrowDirection?: 'up-right' | 'down-right' | 'up-left' | 'down-left';
    className?: string;
}

export function ScribbleText({ children, arrowDirection = 'down-right', className = '' }: ScribbleTextProps) {
    return (
        <div className={`relative inline-flex flex-col items-center group pointer-events-none ${className}`}>
            <div className="font-handwritten text-2xl md:text-[32px] font-bold text-[#A78BFA] -rotate-6 text-center max-w-[220px] leading-[1.1] uppercase tracking-wide">
                {children}
            </div>

            {/* Hand-drawn style curving arrow SVG */}
            <div className="absolute top-full left-1/2 w-24 h-24 mt-0 opacity-80 scale-x-110">
                {arrowDirection === 'down-right' && (
                    <svg viewBox="0 0 100 100" className="w-full h-full text-[#A78BFA] stroke-current stroke-[2] fill-none" style={{ vectorEffect: 'non-scaling-stroke' }}>
                        {/* Curving down and right */}
                        <path d="M20,10 C20,40 50,80 80,80" strokeLinecap="round" />
                        <path d="M70,65 L82,82 L65,88" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
                {arrowDirection === 'down-left' && (
                    <svg viewBox="0 0 100 100" className="w-full h-full text-[#A78BFA] stroke-current stroke-[2] fill-none" style={{ vectorEffect: 'non-scaling-stroke' }}>
                        {/* Curving down and left */}
                        <path d="M80,10 C80,40 50,80 20,80" strokeLinecap="round" />
                        <path d="M30,65 L18,82 L35,88" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </div>
        </div>
    );
}
