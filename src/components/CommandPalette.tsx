import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHotkeys } from 'react-hotkeys-hook';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  LayoutDashboard,
  PlusCircle,
  History,
  BarChart3,
  Clock,
  Settings,
  Plug,
  Search,
  FileText,
  Twitter,
  Linkedin,
  Video,
  Moon,
  Sun,
  Keyboard,
  HelpCircle,
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

interface CommandPaletteProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CommandPalette({ open: controlledOpen, onOpenChange }: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  useHotkeys('mod+k', (e) => {
    e.preventDefault();
    setOpen(true);
  }, { enableOnFormTags: true });

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, [setOpen]);

  const navigationCommands = [
    { icon: LayoutDashboard, label: 'Dashboard', action: () => navigate('/dashboard') },
    { icon: PlusCircle, label: 'Create Content', action: () => navigate('/dashboard/create') },
    { icon: History, label: 'Content History', action: () => navigate('/dashboard/history') },
    { icon: BarChart3, label: 'Analytics', action: () => navigate('/dashboard/analytics') },
    { icon: Clock, label: 'Publishing Queue', action: () => navigate('/dashboard/queue') },
    { icon: Plug, label: 'Integrations', action: () => navigate('/dashboard/configuration') },
    { icon: Settings, label: 'Settings', action: () => navigate('/dashboard/settings') },
  ];

  const contentCommands = [
    { icon: FileText, label: 'New Article', action: () => navigate('/dashboard/create?type=article') },
    { icon: Twitter, label: 'New Twitter Thread', action: () => navigate('/dashboard/create?type=twitter') },
    { icon: Linkedin, label: 'New LinkedIn Post', action: () => navigate('/dashboard/create?type=linkedin') },
    { icon: Video, label: 'New Reel Script', action: () => navigate('/dashboard/create?type=reel') },
  ];

  const actionCommands = [
    { 
      icon: theme === 'dark' ? Sun : Moon, 
      label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`, 
      action: toggleTheme 
    },
    { icon: Keyboard, label: 'Keyboard Shortcuts', action: () => {} },
    { icon: HelpCircle, label: 'Help & Support', action: () => {} },
  ];

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Navigation">
          {navigationCommands.map((cmd) => (
            <CommandItem
              key={cmd.label}
              onSelect={() => runCommand(cmd.action)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <cmd.icon className="w-4 h-4 text-muted-foreground" />
              <span>{cmd.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Create Content">
          {contentCommands.map((cmd) => (
            <CommandItem
              key={cmd.label}
              onSelect={() => runCommand(cmd.action)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <cmd.icon className="w-4 h-4 text-muted-foreground" />
              <span>{cmd.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Actions">
          {actionCommands.map((cmd) => (
            <CommandItem
              key={cmd.label}
              onSelect={() => runCommand(cmd.action)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <cmd.icon className="w-4 h-4 text-muted-foreground" />
              <span>{cmd.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
      
      <div className="border-t border-border p-2 text-xs text-muted-foreground flex items-center justify-between">
        <div className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">↑↓</kbd>
          <span>Navigate</span>
        </div>
        <div className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">Enter</kbd>
          <span>Select</span>
        </div>
        <div className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">Esc</kbd>
          <span>Close</span>
        </div>
      </div>
    </CommandDialog>
  );
}
