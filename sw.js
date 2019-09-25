
console.log('Script loaded!')
var cacheStorageKey = '9f2c3b61-0f1f-4a8a-b332-71a8ad2dc303_2.1.0'

var cacheList = [
    '/',
    "index.html",
    "css/mustard-ui.min.css",
    "js/md5.min.js",
    "js/jquery-3.4.1.min.js",
    "img/android-icon-144x144.png",
    "img/android-icon-192x192.png",
    "img/android-icon-36x36.png",
    "img/android-icon-48x48.png",
    "img/android-icon-72x72.png",
    "img/android-icon-96x96.png",
    "img/apple-icon-114x114.png",
    "img/apple-icon-120x120.png",
    "img/apple-icon-144x144.png",
    "img/apple-icon-152x152.png",
    "img/apple-icon-180x180.png",
    "img/apple-icon-57x57.png",
    "img/apple-icon-60x60.png",
    "img/apple-icon-72x72.png",
    "img/apple-icon-76x76.png",
    "img/apple-icon-precomposed.png",
    "img/apple-icon.png",
    "img/favicon-16x16.png",
    "img/favicon-32x32.png",
    "img/favicon-96x96.png",
    "img/favicon.ico",
    "img/ms-icon-144x144.png",
    "img/ms-icon-150x150.png",
    "img/ms-icon-310x310.png",
    "img/ms-icon-70x70.png"
]

self.addEventListener('install', function (e) {
    console.log('Cache event!')
    e.waitUntil(
        caches.open(cacheStorageKey).then(function (cache) {
            console.log('Adding to Cache:', cacheList)
            return cache.addAll(cacheList)
        }).then(function () {
            console.log('Skip waiting!')
            return self.skipWaiting()
        })
    )
})

self.addEventListener('activate', function (e) {
    console.log('Activate event')
    e.waitUntil(
        Promise.all(
            caches.keys().then(cacheNames => {
                return cacheNames.map(name => {
                    if (name !== cacheStorageKey) {
                        return caches.delete(name)
                    }
                })
            })
        ).then(() => {
            console.log('Clients claims.')
            return self.clients.claim()
        })
    )
})

self.addEventListener('fetch', function (e) {
    // console.log('Fetch event:', e.request.url)
    e.respondWith(
        caches.match(e.request).then(function (response) {
            if (response != null) {
                console.log('Using cache for:', e.request.url)
                return response
            }
            console.log('Fallback to fetch:', e.request.url)
            return fetch(e.request.url)
        })
    )
})
