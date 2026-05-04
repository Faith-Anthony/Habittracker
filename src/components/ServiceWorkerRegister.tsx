'use client';

import { useEffect } from 'react';

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });
        console.log('[ServiceWorker] Registered successfully:', registration);
      } catch (error) {
        console.error('[ServiceWorker] Registration failed:', error);
      }
    };

    // Register after a slight delay to ensure page is loaded
    const timeout = setTimeout(registerServiceWorker, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
