const CACHE = 'feelink-v1';
const ASSETS = ['/', '/index.html', '/gigs.html', '/auth.html', '/styles.css', '/manifest.json'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
