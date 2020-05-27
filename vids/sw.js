self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install');
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/vids/',
        '/vids/index.html'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
  );
});
