import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
    size = 'lg',
    children,
    className,
    ...props
}) => {
    const maxWidthClasses = {
        sm: 'max-w-[640px]',
        md: 'max-w-[768px]',
        lg: 'max-w-[1024px]',
        xl: 'max-w-[1280px]',
        full: 'max-w-full',
    };

    return (
        <div
            className={cn(
                "mx-auto px-4 sm:px-6 lg:px-8 w-full",
                maxWidthClasses[size],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Container;
