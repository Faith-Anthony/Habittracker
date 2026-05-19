// Theme utilities for dark/light mode
export type Theme = 'light' | 'dark' | 'system';

export function getTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  
  const stored = localStorage.getItem('theme') as Theme | null;
  if (stored) return stored;
  
  // Check system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function setTheme(theme: Theme): void {
  localStorage.setItem('theme', theme);
  
  const html = document.documentElement;
  
  if (theme === 'system') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    html.classList.toggle('dark', isDark);
  } else {
    html.classList.toggle('dark', theme === 'dark');
  }
}

export function initTheme(): void {
  const theme = getTheme();
  setTheme(theme);
}
