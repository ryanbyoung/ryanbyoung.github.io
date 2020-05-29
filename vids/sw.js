self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install');
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/vids/',
        '/vids/index.html',
        '/vids/channels/',
        '/vids/channels/dane-reynolds/'
      ]);
    })
  );
});
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return resp || fetch(event.request).then((response) => {
        let responseClone = response.clone();
        caches.open('v1').then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      });
    }).catch(() => {
      return ('<p>Sorry, something has gone wrong. Return <a href="/vids/">home</a>.</p>');
    })
  );
});
