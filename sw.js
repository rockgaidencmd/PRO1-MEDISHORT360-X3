/* Caché completa de la app; la activación de códigos requiere internet. */
const CACHE_NAME = 'ms360-free-dosis-20261020-v2';
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./premium.js",
  "./icono-192.png",
  "./style.css",
  "./app.js",
  "./install-free.js"
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('ms360-free-dosis-') && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;
  event.respondWith((async () => {
    try {
      const response = await fetch(event.request);
      if (response.ok) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(event.request, response.clone());
      }
      return response;
    } catch {
      const cached = await caches.match(event.request);
      if (cached) return cached;
      if (event.request.mode === 'navigate') return (await caches.match(new URL('./index.html', self.registration.scope))) || new Response('Sin conexión', {status:503});
      return new Response('Sin conexión', {status:503});
    }
  })());
});
