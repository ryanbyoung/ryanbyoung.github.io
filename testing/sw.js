self.addEventListener('install', function(event) {
    console.log('SW INSTALLING');
    const installCompleted = Promise.resolve()
      .then(() => console.log('SW INSTALLED'));
    event.waitUntil(installCompleted);
});

self.addEventListener('activate', event => {
  console.log('SW ACTIVATING');
  const activationCompleted = Promise.resolve()
    .then((activationCompleted) => console.log('SW ACTIVATED'));
  event.waitUntil(activationCompleted);
});

self.addEventListener('fetch', function(event) {
  // Get current path
  var requestUrl = new URL(event.request.url);

  // Save all resources on origin path only
  if (requestUrl.origin === location.origin) {
      event.respondWith(
        // Open the cache created when install
        caches.open(cacheName).then(function(cache) {
          // Go to the network to ask for that resource
          return fetch(event.request).then(function(networkResponse) {
            // Add a copy of the response to the cache
            cache.put(event.request, networkResponse.clone());
            // Respond with it
            return networkResponse;
          }).catch(function() {
            // If no internet connection, try to match request
            // to some of our cached resources
            return cache.match(event.request);
          })
        })
      );
  }
});
