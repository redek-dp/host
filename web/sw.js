const version = "0.0.02";
const cacheName = `webapwa-${version}`;
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `./`,
        `./icon/36.png`,
        `./icon/72.png`,
        `./icon/144.png`,
        `./icon/256.png`,
        `./icon/512.png`,
        `https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css`,
        `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css`,
        `https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js`,
        `https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.3/vue.min.js`,
        `https://unpkg.com/axios/dist/axios.min.js`,
        `https://rss.app/feeds/GY72k3NLXlP0da2m.json`,
        `./pxw.js`,
        `./manifest.json`,
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