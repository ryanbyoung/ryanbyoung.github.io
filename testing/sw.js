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
