import React from 'react';

export const PlatformIcons = {
    LINKEDIN: () => (
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg" alt="LinkedIn" className="w-4 h-4 md:w-5 md:h-5 object-contain" />
    ),
    TWITTER: () => (
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg" alt="X" className="w-3.5 h-3.5 md:w-4 md:h-4 object-contain dark:invert" />
    ),
    YOUTUBE: () => (
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" alt="YouTube" className="w-4 h-4 md:w-5 md:h-5 object-contain" />
    ),
    THREADS: () => (
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Threads_%28app%29_logo.svg" alt="Threads" className="w-4 h-4 md:w-5 md:h-5 object-contain" />
    ),
    INSTAGRAM: () => (
        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="Instagram" className="w-4 h-4 md:w-5 md:h-5 object-contain" />
    ),
    FACEBOOK: () => (
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="Facebook" className="w-4 h-4 md:w-5 md:h-5 object-contain" />
    ),
    MEDIUM: () => (
        <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Medium_logo_Monogram.svg" alt="Medium" className="w-4 h-4 md:w-5 md:h-5 object-contain" />
    ),
    DEFAULT: () => (
        <svg className="w-3 h-3 md:w-4 md:h-4 text-[#A78BFA]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    )
};
