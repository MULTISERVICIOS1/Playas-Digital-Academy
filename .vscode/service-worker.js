const CACHE_NAME = 'pda-cache-v3';
const FILES_TO_CACHE = [
  '/', // importante para que GitHub Pages redirija
  '/index.html',
  '/styles.css',
  '/app.js',
  '/manifest.json',
  '/assets/icons/icon-192.png',
  '/assets/icons/icon-512.png'
];

// Durante la instalación, cachear recursos
self.addEventListener('install', evt => {
  self.skipWaiting();
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener('activate', evt => {
  evt.waitUntil(self.clients.claim());
});

// Estrategia: cache first, luego network
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(networkRes => {
        // opcional: cachear nuevas peticiones (con cuidado)
        return networkRes;
      });
    }).catch(()=> caches.match('/index.html'))
  );
});
