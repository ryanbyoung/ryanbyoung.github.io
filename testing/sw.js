// can probably use js import to bring in these variables in the app
const CACHE_VERSION = 1;
const CURRENT_CACHE = 'SurfFlix-v' + CACHE_VERSION;

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
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
