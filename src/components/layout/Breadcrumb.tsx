import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
    label: string;
    href?: string;
    active?: boolean;
}

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
    items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className, ...props }) => {
    return (
        <nav
            aria-label="Breadcrumb"
            className={cn("flex text-sm text-neutral-500", className)}
            {...props}
        >
            <ol className="flex items-center space-x-2">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        {index > 0 && (
                            <ChevronRight className="w-4 h-4 mx-2 text-neutral-300 flex-shrink-0" />
                        )}
                        {item.href && !item.active ? (
                            <a
                                href={item.href}
                                className="hover:text-primary-600 transition-colors duration-200"
                            >
                                {item.label}
                            </a>
                        ) : (
                            <span
                                className={cn("",
                                    item.active ? "font-semibold text-neutral-900" : ""
                                )}
                                aria-current={item.active ? "page" : undefined}
                            >
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
