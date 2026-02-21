import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    background?: 'white' | 'gray' | 'gradient';
    padding?: 'none' | 'small' | 'medium' | 'large';
    children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
    background = 'white',
    padding = 'medium',
    children,
    className,
    ...props
}) => {
    const bgClasses = {
        white: 'bg-white',
        gray: 'bg-neutral-50',
        gradient: 'bg-gradient-to-br from-primary-50/50 to-indigo-50/50',
    };

    const paddingClasses = {
        none: 'py-0',
        small: 'py-12',
        medium: 'py-20',
        large: 'py-32',
    };

    return (
        <section
            className={cn(
                "relative overflow-hidden w-full",
                bgClasses[background],
                paddingClasses[padding],
                className
            )}
            {...props}
        >
            {children}
        </section>
    );
};

export default Section;
