// from include js
const CACHE_VERSION = 1;
const CURRENT_CACHE = 'SurfFlix-v' + CACHE_VERSION;

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

//This code is based on  https://googlechrome.github.io/samples/service-worker/prefetch-video/ 
self.addEventListener('fetch', function(event) {
  
  // *** added this, only run if video file and if the cache exists
  // hard coded offline movie for now, will need to update to any file in videos folder
  if (event.request.url === 'https://ryanbyoung.github.io/vids/videos/offline.mp4' && caches.has(CURRENT_CACHE)) {

  log('HTTP call intercepted: ' + event.request.url);
 
  let headersLog = [];
  for (var pair of event.request.headers.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
    headersLog.push(pair[0] + ': '+ pair[1])
  }
  console.log('Handling fetch event for: ', event.request.url, JSON.stringify(headersLog));

  if (event.request.headers.get('range')) {
    let rangeHeader = event.request.headers.get('range');
    let rangeMatch = rangeHeader.match(/^bytes\=(\d+)\-(\d+)?/);
    let pos = Number(rangeMatch[1]);
    let pos2 = rangeMatch[2];
    if (pos2) { pos2 = Number(pos2); }
    
    console.log('Range request for: '+ event.request.url,' Range: ' + rangeHeader, " Parsed as: " + pos + "-" + pos2);
    event.respondWith(
      caches.open(CURRENT_CACHE).then(function(cache) {
        return cache.match(event.request.url).then(function(response) {

          // if no response from cache
          if (!response) {
            console.log("Not found in cache, doing a fetch from the network.")
            return fetch(event.request).then(response => {
              console.log("Network fetch done, returning response: ", response)
              return response.arrayBuffer();
            });
          }
          console.log("Found in cache, fetching from there.")
          return response.arrayBuffer();
        }).then(function(ab) {
          console.log("Response processing.")
          let responseHeaders = {
            status: 206,
            statusText: 'Partial Content',
            headers: [
              ['Content-Type', 'video/mp4'],
              ['Content-Range', 'bytes ' + pos + '-' + 
              (pos2||(ab.byteLength - 1)) + '/' + ab.byteLength]
            ]
          };
          console.log("Response: ", JSON.stringify(responseHeaders))
          let abSliced = {};
          if (pos2 > 0) {
            abSliced = ab.slice(pos, pos2 + 1);
          } else {
            abSliced = ab.slice(pos);
          }
          console.log("Response length: ", abSliced.byteLength)
          return new Response(
            abSliced, responseHeaders
          );
        }); // end match event
      }) // end cache open
    ); // end event respondWith

  } else {
    console.log('Non-range request for: ', event.request.url);
    event.respondWith(
      // caches.match() will look for a cache entry in all of the caches available to the service worker.
      // It's an alternative to first opening a specific named cache and then matching on that.
      caches.match(event.request).then(function(response) {
        if (response) {
          console.log('Found response in cache: ', response);
          return response;
        }
        console.log('No response found in cache. About to fetch from network...');
        // event.request will always have the proper mode set ('cors, 'no-cors', etc.) so we don't
        // have to hardcode 'no-cors' like we do when fetch()ing in the install handler.
        return fetch(event.request).then(function(response) {
          console.log('Response from network is: ', response);
          return response;
        }).catch(function(error) {
          // This catch() will handle exceptions thrown from the fetch() operation.
          // Note that a HTTP error response (e.g. 404) will NOT trigger an exception.
          // It will return a normal response object that has the appropriate error code set.
          console.error('Fetching failed: ', error);
          throw error;
        });
      })
    );
  } // end if range request


  // *** added this
  } else if (caches.has(CURRENT_CACHE)) {
    event.respondWith(
      // caches.match() will look for a cache entry in all of the caches available to the service worker.
      // It's an alternative to first opening a specific named cache and then matching on that.
      caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        }
        // event.request will always have the proper mode set ('cors, 'no-cors', etc.) so we don't
        // have to hardcode 'no-cors' like we do when fetch()ing in the install handler.
        return fetch(event.request).then(function(response) {
          return response;
        }).catch(function(error) {
          // This catch() will handle exceptions thrown from the fetch() operation.
          // Note that a HTTP error response (e.g. 404) will NOT trigger an exception.
          // It will return a normal response object that has the appropriate error code set.
          console.error('Fetching failed: ', error);
          throw error;
        });
      })
    );
  } // *** added this - end if for video file/cache exists

});

// log function
function log(message) {
    console.log(message);
}
