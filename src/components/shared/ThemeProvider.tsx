"use client";

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get initial theme
    const saved = localStorage.getItem('theme');
    const isDark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setCurrentTheme(isDark ? 'dark' : 'light');
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Update document
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  if (!mounted) return children;

  const toggleTheme = () => {
    setCurrentTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      {children}
      <button
        onClick={toggleTheme}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
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
