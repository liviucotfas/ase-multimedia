/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/service-worker.ts":
/*!*******************************!*\
  !*** ./src/service-worker.ts ***!
  \*******************************/
/***/ (() => {

eval("\n/**\n * service-worker.ts\n *\n * This TypeScript file implements the Service Worker for the PWA. It enables offline functionality\n * by caching specific resources and serving them from the cache when the network is unavailable.\n * The Service Worker listens for `install` and `fetch` events to manage caching and resource delivery.\n *\n * The code is structured as follows:\n * 1. **Global Scope Definition**: Defines the Service Worker global scope for TypeScript.\n * 2. **Cache Configuration**: Defines a cache name and an array of URLs to be cached during the installation phase.\n * 3. **Install Event**: Caches specified resources when the Service Worker is installed.\n * 4. **Fetch Event**: Intercepts network requests and serves cached resources if available, or fetches them from the network if not cached.\n */\n/// <reference lib=\"webworker\" />\n// Define the Service Worker global scope for TypeScript compatibility\nconst sw = self;\nconst CACHE_NAME = \"pwa-cache-v1\";\nconst urlsToCache = [\"/\", \"/index.html\", \"/main.js\", \"/manifest.json\"];\n/**\n * Install event\n *\n * This event is triggered when the Service Worker is installed. It opens the cache\n * and adds all the URLs specified in `urlsToCache` to enable offline access.\n * If any resource fails to cache, it will be logged in the console.\n */\nsw.addEventListener(\"install\", (event) => {\n    console.log(\"Service Worker installing\");\n    event.waitUntil(caches.open(CACHE_NAME).then((cache) => {\n        return cache.addAll(urlsToCache).catch((error) => {\n            console.error(\"Failed to cache:\", error);\n        });\n    }));\n});\n/**\n * Fetch event\n *\n * This event intercepts all network requests made by the application. It attempts to\n * serve the response from the cache first. If the resource is not found in the cache,\n * it fetches the resource from the network. This ensures the application can work offline\n * by serving cached resources and only fetching from the network when necessary.\n */\nsw.addEventListener(\"fetch\", (event) => {\n    console.log(\"Fetch event for \", event.request.url);\n    event.respondWith(caches.match(event.request).then((response) => {\n        return response || fetch(event.request);\n    }));\n});\n\n\n//# sourceURL=webpack://code-example/./src/service-worker.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/service-worker.ts"]();
/******/ 	
/******/ })()
;