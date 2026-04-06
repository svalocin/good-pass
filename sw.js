const CACHE_KEY = 'good-pass_v3.0.1';

const CACHE_LIST = [
  '/',
  'index.html',
  'js/md5.min.js',
  'manifest.json',
  'img/android-icon-144x144.png',
  'img/android-icon-192x192.png',
  'img/android-icon-36x36.png',
  'img/android-icon-48x48.png',
  'img/android-icon-72x72.png',
  'img/android-icon-96x96.png',
  'img/apple-icon-114x114.png',
  'img/apple-icon-120x120.png',
  'img/apple-icon-144x144.png',
  'img/apple-icon-152x152.png',
  'img/apple-icon-180x180.png',
  'img/apple-icon-57x57.png',
  'img/apple-icon-60x60.png',
  'img/apple-icon-72x72.png',
  'img/apple-icon-76x76.png',
  'img/apple-icon-precomposed.png',
  'img/apple-icon.png',
  'img/favicon-16x16.png',
  'img/favicon-32x32.png',
  'img/favicon-96x96.png',
  'img/favicon.ico',
  'img/ms-icon-144x144.png',
  'img/ms-icon-150x150.png',
  'img/ms-icon-310x310.png',
  'img/ms-icon-70x70.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_KEY)
      .then(cache => cache.addAll(CACHE_LIST))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_KEY).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached ?? fetch(e.request))
  );
});
