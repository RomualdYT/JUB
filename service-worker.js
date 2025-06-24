const CACHE_NAME = 'jub-cache-v2';
const ASSETS = [
  './',
  './index.html',
  './service-worker.js',
  './upc-data.json',
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/moment@2.29.4/moment.min.js',
  'https://cdn.jsdelivr.net/npm/@handsontable/pikaday@1.0.0/pikaday.min.js',
  'https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.js',
  'https://cdn.jsdelivr.net/npm/handsontable@15.3.0/languages/fr-FR.js',
  'https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdn.jsdelivr.net/npm/docx@9.5.0/+esm'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
