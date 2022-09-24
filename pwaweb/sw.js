self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('fox-kop').then((cache) => cache.addAll([
      '/pwa-examples/a2hs/',
      '/pwa-examples/a2hs/index.html',
      '/pwa-examples/a2hs/index.js',
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
