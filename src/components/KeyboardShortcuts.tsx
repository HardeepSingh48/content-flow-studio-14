import { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ShortcutGroup {
  title: string;
  shortcuts: { keys: string[]; description: string }[];
}

const shortcutGroups: ShortcutGroup[] = [
  {
    title: 'Navigation',
    shortcuts: [
      { keys: ['⌘', 'K'], description: 'Open command palette' },
      { keys: ['G', 'D'], description: 'Go to Dashboard' },
      { keys: ['G', 'C'], description: 'Go to Create Content' },
      { keys: ['G', 'H'], description: 'Go to History' },
      { keys: ['G', 'A'], description: 'Go to Analytics' },
      { keys: ['G', 'S'], description: 'Go to Settings' },
    ],
  },
  {
    title: 'Editor',
    shortcuts: [
      { keys: ['⌘', 'S'], description: 'Save draft' },
      { keys: ['⌘', 'Enter'], description: 'Publish content' },
      { keys: ['⌘', 'Z'], description: 'Undo' },
      { keys: ['⌘', 'Shift', 'Z'], description: 'Redo' },
    ],
  },
  {
    title: 'General',
    shortcuts: [
      { keys: ['?'], description: 'Show this help' },
      { keys: ['Esc'], description: 'Close modal / Cancel' },
    ],
  },
];

export function KeyboardShortcutsProvider({ children }: { children: React.ReactNode }) {
  const [showHelp, setShowHelp] = useState(false);
  const navigate = useNavigate();

  // Help shortcut
  useHotkeys('shift+/', () => setShowHelp(true), { enableOnFormTags: false });
  
  // Navigation shortcuts with "g" prefix
  useHotkeys('g d', () => navigate('/dashboard'), { enableOnFormTags: false });
  useHotkeys('g c', () => navigate('/dashboard/create'), { enableOnFormTags: false });
  useHotkeys('g h', () => navigate('/dashboard/history'), { enableOnFormTags: false });
  useHotkeys('g a', () => navigate('/dashboard/analytics'), { enableOnFormTags: false });
  useHotkeys('g s', () => navigate('/dashboard/settings'), { enableOnFormTags: false });

  return (
    <>
      {children}
      <KeyboardShortcutsDialog open={showHelp} onOpenChange={setShowHelp} />
    </>
  );
}

interface KeyboardShortcutsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function KeyboardShortcutsDialog({ open, onOpenChange }: KeyboardShortcutsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass max-w-lg">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          {shortcutGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                {group.title}
              </h3>
              <div className="space-y-2">
                {group.shortcuts.map((shortcut, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-1.5"
                  >
                    <span className="text-sm text-foreground">
                      {shortcut.description}
                    </span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, j) => (
                        <kbd
                          key={j}
                          className="px-2 py-1 bg-muted rounded text-xs font-mono text-muted-foreground"
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
