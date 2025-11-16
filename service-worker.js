const CACHE_NAME = "pda-cache-v2";
const urlsToCache = [
  "/Playas-Digital-Academy/",
  "/Playas-Digital-Academy/index.html",
  "/Playas-Digital-Academy/styles.css",
  "/Playas-Digital-Academy/manifest.json"
];

// Instalar SW
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Interceptar peticiones
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
