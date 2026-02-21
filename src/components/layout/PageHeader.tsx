import React from 'react';
import { cn } from '@/lib/utils';
import { Breadcrumb } from './Breadcrumb';

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    subtitle?: string;
    breadcrumbs?: { label: string; href?: string; active?: boolean }[];
    actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    subtitle,
    breadcrumbs,
    actions,
    className,
    ...props
}) => {
    return (
        <div
            className={cn(
                "py-8 mb-8 border-b border-white/10",
                className
            )}
            {...props}
        >
            {breadcrumbs && (
                <Breadcrumb items={breadcrumbs} className="mb-4" />
            )}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-base text-white/50 max-w-2xl">
                            {subtitle}
                        </p>
                    )}
                </div>

                {actions && (
                    <div className="flex items-center gap-3">
                        {actions}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PageHeader;
