// Service Worker for HabitFlow PWA
// Phase 2: Implement caching and offline functionality

const CACHE_NAME = 'habitflow-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache opened');
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Phase 2: Implement fetch strategies (cache-first, network-first, etc.)
  event.respondWith(fetch(event.request));
});
