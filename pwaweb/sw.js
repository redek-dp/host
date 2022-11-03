self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('pwa-web').then((cache) => cache.addAll([
      '/host/pwaweb/off',
      '/host/pwaweb/off.html',
      '/host/pwaweb/index.js',
      '/host/pwaweb/icon/36.png',
      '/host/pwaweb/icon/72.png',
      '/host/pwaweb/icon/144.png',
      '/host/pwaweb/icon/256.png',
      '/host/pwaweb/icon/512.png',
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
