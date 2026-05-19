"use client";

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { getTheme, setTheme, type Theme } from '@/lib/theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setCurrentTheme] = useState<Theme>('system');

  useEffect(() => {
    setMounted(true);
    const currentTheme = getTheme();
    setCurrentTheme(currentTheme);
  }, []);

  if (!mounted) return children;

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(newTheme);
    setTheme(newTheme);
  };

  return (
    <>
      {children}
      <button
        onClick={toggleTheme}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Toggle theme"
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>
    </>
  );
}
