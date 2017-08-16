//2. installer le sw
var mycache = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/styles/main.css',
  'main.js',
  'favicon.ico',
  'images/sgicon.png',
  'index.html',
  '/scripts/app.js',
  '/scripts/controllers/about.js',
  '/scripts/controllers/main.js',
]; 

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(mycache)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

//3. fetch caches ! Je comprends c'est quoi ça ???
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // IMPORTANT: Clone the request. A request is a stream and can only be consumed once. Since we are consuming this once by cache and once by the browser for fetch, we need to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();

            caches.open(mycache)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

//6. pour revevoir des notification, il faut utiliser sw, bien sûr c'est ça
self.addEventListener('push', function(event) {
  var notificationOptions = {
    body: "Hello World",
    icon: 'images/sgicon.png',
    data:{
      url : 'https://www.google.co.uk/'
    }
  };
  title = "Ceci est une notification !";
  event.waitUntil(self.registration.showNotification(title, notificationOptions));
});

//6.5 supplémentaire:  clique sur notification
self.addEventListener('notificationclick', function(event) {
  var url = event.notification.data.url;
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
