const CACHE_NAME = 'farmchain-v1';
const API_CACHE_NAME = 'farmchain-api-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== API_CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API Requests (Network First, fallback to cache)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (request.method === 'GET') {
            const responseClone = networkResponse.clone();
            caches.open(API_CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;
          
          // If no cache, return a generic error or empty data depending on your app needs
          return new Response(JSON.stringify({ success: false, error: { message: "Offline" }, data: null }), {
            headers: { 'Content-Type': 'application/json' }
          });
        })
    );
    return;
  }

  // Handle Static Assets (Cache First, fallback to network)
  // For navigation requests (HTML pages in SPA), serve index.html
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match('/index.html').then((cachedResponse) => {
        return cachedResponse || fetch(request);
      })
    );
    return;
  }

  // For other static assets (JS, CSS, Images)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Optional: Update cache in background
        fetch(request).then((networkResponse) => {
           if (request.method === 'GET') {
             caches.open(CACHE_NAME).then((cache) => {
               cache.put(request, networkResponse);
             });
           }
        }).catch(() => {});
        return cachedResponse;
      }
      
      return fetch(request).then((networkResponse) => {
        if (request.method === 'GET') {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Fallback for images if needed
        return new Response('', { status: 404, statusText: 'Not Found' });
      });
    })
  );
});
