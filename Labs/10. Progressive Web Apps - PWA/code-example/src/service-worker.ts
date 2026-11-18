/**
 * service-worker.ts
 *
 * This TypeScript file implements the Service Worker for the PWA. It enables offline functionality
 * by caching specific resources and serving them from the cache when the network is unavailable.
 * The Service Worker listens for `install` and `fetch` events to manage caching and resource delivery.
 *
 * The code is structured as follows:
 * 1. **Global Scope Definition**: Defines the Service Worker global scope for TypeScript.
 * 2. **Cache Configuration**: Defines a cache name and an array of URLs to be cached during the installation phase.
 * 3. **Install Event**: Caches specified resources when the Service Worker is installed.
 * 4. **Fetch Event**: Intercepts network requests and serves cached resources if available, or fetches them from the network if not cached.
 */

/// <reference lib="webworker" />

// Define the Service Worker global scope for TypeScript compatibility
const sw = self as unknown as ServiceWorkerGlobalScope;

const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = ["/", "/index.html", "/main.js", "/manifest.json"];

/**
 * Install event
 *
 * This event is triggered when the Service Worker is installed. It opens the cache
 * and adds all the URLs specified in `urlsToCache` to enable offline access.
 * If any resource fails to cache, it will be logged in the console.
 */
sw.addEventListener("install", (event: ExtendableEvent) => {
  console.log("Service Worker installing");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch((error) => {
        console.error("Failed to cache:", error);
      });
    })
  );
});

/**
 * Fetch event
 *
 * This event intercepts all network requests made by the application. It attempts to
 * serve the response from the cache first. If the resource is not found in the cache,
 * it fetches the resource from the network. This ensures the application can work offline
 * by serving cached resources and only fetching from the network when necessary.
 */
sw.addEventListener("fetch", (event: FetchEvent) => {
  console.log("Fetch event for ", event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
