import React, { useState } from 'react';
import {
    LayoutDashboard,
    GitBranch,
    FileText,
    BarChart2,
    Settings,
    PlusCircle,
    Linkedin,
    Twitter,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface SidebarProps {
    activePath?: string;
    onNavigate?: (path: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePath = '/', onNavigate }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const mainNav = [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { label: 'Pipeline', icon: GitBranch, path: '/pipeline' },
        { label: 'Content', icon: FileText, path: '/content' },
        { label: 'Analytics', icon: BarChart2, path: '/analytics' },
        { label: 'Settings', icon: Settings, path: '/settings' },
    ];

    const integrations = [
        { label: 'LinkedIn', icon: Linkedin, path: '/integrations/linkedin' },
        { label: 'Twitter', icon: Twitter, path: '/integrations/twitter' },
    ];

    const SidebarItem = ({ item }: { item: any }) => {
        const isActive = activePath === item.path;
        const Icon = item.icon;

        return (
            <button
                onClick={() => onNavigate?.(item.path)}
                className={cn(
                    "flex items-center w-full gap-3 p-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                    isActive
                        ? "bg-primary/10 text-primary font-semibold border border-primary/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                        : "text-white/60 hover:bg-white/5 hover:text-white border border-transparent"
                )}
                title={isCollapsed ? item.label : undefined}
            >
                {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />
                )}
                <Icon className={cn("shrink-0 relative z-10", isCollapsed ? "size-6" : "size-5", isActive ? "text-primary" : "text-white/60 group-hover:text-white")} />
                {!isCollapsed && <span className="text-sm relative z-10">{item.label}</span>}
                {isActive && !isCollapsed && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-primary rounded-r-full shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
                )}
            </button>
        );
    };

    return (
        <aside
            className={cn(
                "fixed top-0 left-0 h-screen bg-[#0A0E27] border-r border-white/10 flex flex-col transition-all duration-300 z-50",
                isCollapsed ? "w-20" : "w-64"
            )}
        >
            {/* Header */}
            <div className="h-16 flex items-center px-4 border-b border-white/10 justify-between">
                {!isCollapsed && (
                    <div className="flex items-center gap-2">
                        <Zap className="w-6 h-6 text-primary" />
                        <span className="text-lg font-bold text-foreground">
                            Content Pipeline<span className="text-primary text-sm font-bold"> Studio</span>
                        </span>
                    </div>
                )}
                {isCollapsed && (
                    <Zap className="w-8 h-8 text-primary mx-auto" />
                )}
            </div>

            {/* Main Nav */}
            <div className="flex-1 overflow-y-auto py-6 px-3 space-y-8">
                <div className="space-y-1">
                    {mainNav.map((item) => <SidebarItem key={item.path} item={item} />)}
                </div>

                <div className="space-y-4">
                    {!isCollapsed && (
                        <h4 className="px-3 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                            Integrations
                        </h4>
                    )}
                    <div className="space-y-1">
                        {integrations.map((item) => <SidebarItem key={item.path} item={item} />)}
                        <button className={cn(
                            "flex items-center w-full gap-3 p-3 text-white/40 hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200",
                            isCollapsed && "justify-center"
                        )}>
                            <PlusCircle size={isCollapsed ? 24 : 18} />
                            {!isCollapsed && <span className="text-sm">Add Platform</span>}
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer / User */}
            <div className="p-4 border-t border-white/10 space-y-4">
                <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
                    <Avatar size={isCollapsed ? "sm" : "md"} status="online">
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate">John Doe</p>
                            <p className="text-xs text-white/50 truncate">Pro Account</p>
                        </div>
                    )}
                </div>

                <button className={cn(
                    "flex items-center w-full gap-3 p-3 rounded-lg text-white/60 hover:bg-destructive/20 hover:text-destructive hover:border hover:border-destructive/30 border border-transparent transition-all duration-200",
                    isCollapsed && "justify-center"
                )}>
                    <LogOut size={isCollapsed ? 24 : 18} />
                    {!isCollapsed && <span className="text-sm font-medium">Sign Out</span>}
                </button>
            </div>

            {/* Collapse Toggle */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-20 bg-[#141A3B] border border-white/10 rounded-full p-1 text-white/60 hover:text-white shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:border-white/30 transition-all z-50"
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>
        </aside>
    );
};

export default Sidebar;
