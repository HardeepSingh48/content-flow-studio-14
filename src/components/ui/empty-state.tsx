import * as React from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: React.ReactNode;
    illustration?: string;
    title: string;
    description: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

export const EmptyState = ({
    icon,
    illustration,
    title,
    description,
    action,
    className,
    ...props
}: EmptyStateProps) => {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center text-center p-8 bg-neutral-50 rounded-xl border border-dashed border-neutral-200",
                className
            )}
            {...props}
        >
            {illustration && (
                <img src={illustration} alt="" className="w-48 h-auto mb-6 opacity-80" />
            )}
            {!illustration && icon && (
                <div className="p-4 bg-neutral-100 rounded-full text-neutral-400 mb-6">
                    {icon}
                </div>
            )}
            <h3 className="text-xl font-bold text-neutral-900 mb-2">{title}</h3>
            <p className="text-sm text-neutral-500 max-w-sm mb-8">{description}</p>
            {action && (
                <Button onClick={action.onClick} variant="primary">
                    {action.label}
                </Button>
            )}
        </div>
    );
};
