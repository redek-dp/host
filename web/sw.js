const version = "0.0.02";
const cacheName = `webapwa-${version}`;
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `/`,
        `/imagen/icon-150.png`,
        `/imagen/icons/icon-72x72.png`,
        `/imagen/icons/icon-96x96.png`,
        `/imagen/icons/icon-128x128.png`,
        `/imagen/icons/icon-144x144.png`,
        `/imagen/icons/icon-152x152.png`,
        `/imagen/icons/icon-192x192.png`,
        `/imagen/icons/icon-384x384.png`,
        `/imagen/icons/icon-512x512.png`,
        `/index.html`,
        `/manifest.json`,
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});