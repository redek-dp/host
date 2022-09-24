self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('fox-kop').then((cache) => cache.addAll([
      '/host/pwaweb/',
      '/host/pwaweb/index.html',
      '/host/pwaweb/index.js',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css',
      'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js',
      '/host/pwaweb/manifest.webmanifest',
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
