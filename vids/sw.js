const CACHE_VERSION = 1;
const CURRENT_CACHE = 'PrefetchVideos-v' + CACHE_VERSION;
let urlsToCache = [
  '/vids/videos/offline.mp4'
];

self.addEventListener('install', event => {
    log('SW INSTALLING');
    const installCompleted = Promise.resolve()
                        .then(() => log('SW INSTALLED'));

    event.waitUntil(installCompleted);
});

self.addEventListener('activate', event => {
    log('SW ACTIVATING');
    const activationCompleted = Promise.resolve()
        .then((activationCompleted) => log('SW ACTIVATED'));

    event.waitUntil(activationCompleted);
});

//self.addEventListener('install', function(event) {
  // All of these logging statements should be visible via the "Inspect" interface
  // for the relevant SW accessed via chrome://serviceworker-internals
  //console.log('Handling install event. Resources to prefetch:', urlsToPrefetch);

  //self.skipWaiting();

  //event.waitUntil(
    //caches.open(CURRENT_CACHES.prefetch).then(function(cache) {
      //return cache.addAll(urlsToPrefetch);
    //})
  //);
//});

// each logging line will be prepended with the service worker name
function log(message) {
    console.log(message);
}
