import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'dark' | 'light';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'content-pipeline-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      return stored || 'dark';
    }
    return 'dark';
  });

  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const root = window.document.documentElement;
    
    const getResolvedTheme = (): 'dark' | 'light' => {
      if (theme === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return theme;
    };

    const resolved = getResolvedTheme();
    setResolvedTheme(resolved);
    
    root.classList.remove('light', 'dark');
    root.classList.add(resolved);

    // Update CSS variables for light mode
    if (resolved === 'light') {
      root.style.setProperty('--background', '0 0% 100%');
      root.style.setProperty('--foreground', '222 47% 11%');
      root.style.setProperty('--card', '210 40% 96%');
      root.style.setProperty('--card-foreground', '222 47% 11%');
      root.style.setProperty('--popover', '0 0% 100%');
      root.style.setProperty('--popover-foreground', '222 47% 11%');
      root.style.setProperty('--muted', '210 40% 96%');
      root.style.setProperty('--muted-foreground', '215 20% 45%');
      root.style.setProperty('--border', '214 32% 91%');
      root.style.setProperty('--input', '214 32% 91%');
    } else {
      root.style.setProperty('--background', '222 47% 11%');
      root.style.setProperty('--foreground', '210 40% 98%');
      root.style.setProperty('--card', '217 33% 17%');
      root.style.setProperty('--card-foreground', '210 40% 98%');
      root.style.setProperty('--popover', '217 33% 17%');
      root.style.setProperty('--popover-foreground', '210 40% 98%');
      root.style.setProperty('--muted', '217 33% 17%');
      root.style.setProperty('--muted-foreground', '215 20% 65%');
      root.style.setProperty('--border', '217 33% 25%');
      root.style.setProperty('--input', '217 33% 25%');
    }
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem(STORAGE_KEY, newTheme);
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
