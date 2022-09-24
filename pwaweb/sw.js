self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('fox-kop').then((cache) => cache.addAll([
      '/host/pwaweb/',
      '/host/pwaweb/index.html',
      '/host/pwaweb/index.js',
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
