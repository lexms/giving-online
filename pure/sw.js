const CACHE_NAME = "giving-app-v1"
const urlsToCache = [
  "./",
  "./index.html",
  "./offline.html",
  "./styles.css",
  "./script.js",
  "./manifest.json",
  "./icons/favicon.ico",
  "./icons/favicon.svg",
  "./icons/favicon-96x96.png",
  "./icons/apple-touch-icon.png",
  "./icons/web-app-manifest-192x192.png",
  "./icons/web-app-manifest-512x512.png",
  "./images/giving-LogoOnly-white.svg",
  "./images/hero-banner.webp",
  "./screenshots/desktop-1.png",
  "./screenshots/desktop-2.png",
  "./screenshots/mobile-1.png",
  "./screenshots/mobile-2.png",
]

// Install event - cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache")
      return cache.addAll(urlsToCache)
    })
  )
})

// Fetch event - serve from cache when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request)
      })
      .catch(() => {
        // If both cache and network fail, show offline page
        if (event.request.destination === "document") {
          return caches.match("./offline.html")
        }
      })
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// Handle offline/online status
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})
