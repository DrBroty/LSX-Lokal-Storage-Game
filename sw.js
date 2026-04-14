const CACHE = 'lsx-v3'; // ← hochgezählt von v2

const ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&family=Share+Tech+Mono&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // ── PHP / API niemals cachen ──────────────────────────
  if (url.pathname.includes('.php') || url.pathname.includes('lsx-proxy')) {
    e.respondWith(fetch(e.request));
    return;
  }

  // ── Assets: Cache First ───────────────────────────────
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});