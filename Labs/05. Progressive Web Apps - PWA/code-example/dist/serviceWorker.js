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

eval("\n/// <reference lib=\"webworker\" />\nconst sw = self;\nconst CACHE_NAME = \"pwa-cache-v1\";\nconst urlsToCache = [\n    \"/\",\n    \"/index.html\",\n    \"/bundle.js\",\n    \"/main.js\",\n    \"/manifest.json\",\n];\n// Install event\nsw.addEventListener(\"install\", (event) => {\n    console.log(\"Service Worker installed\");\n    event.waitUntil(caches.open(CACHE_NAME).then((cache) => {\n        return cache.addAll(urlsToCache);\n    }));\n});\n// Fetch event\nsw.addEventListener(\"fetch\", (event) => {\n    event.respondWith(caches.match(event.request).then((response) => {\n        return response || fetch(event.request);\n    }));\n});\n\n\n//# sourceURL=webpack://code-example/./src/service-worker.ts?");

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