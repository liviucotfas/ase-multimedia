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

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (() => {

eval("\n/**\n * app.ts\n *\n * This TypeScript file serves as the main entry point for a Progressive Web Application (PWA) that manages a simple to-do list.\n * It registers a service worker, handles offline caching, and provides functionality for creating, displaying, and deleting tasks.\n * The application also supports PWA installation prompts for mobile and desktop environments.\n *\n * The code is structured as follows:\n * 1. **Service Worker Registration**: Checks if service workers are supported by the browser, and if so, registers a service worker to enable offline functionality.\n * 2. **DOM Element Selection**: Selects necessary HTML elements (form, input, list) for user interaction.\n * 3. **Task Interface and State Management**: Defines an interface for Task objects and retrieves an initial list of tasks from `localStorage`.\n * 4. **Core Functions**:\n *    - `renderTasks()`: Renders the list of tasks on the page.\n *    - `addTask(taskText: string)`: Adds a new task to the list, saves it in `localStorage`, and re-renders the task list.\n *    - `deleteTask(taskId: number)`: Removes a task by its ID, updates `localStorage`, and re-renders the task list.\n * 5. **Form Submission Handling**: Adds a submit event listener to handle task creation and prevent default form submission behavior.\n * 6. **PWA Install Prompt Handling**: Listens for the `beforeinstallprompt` event, prevents the default install prompt, and logs when the app is eligible for installation.\n */\nif (\"serviceWorker\" in navigator) {\n    window.addEventListener(\"load\", () => {\n        navigator.serviceWorker\n            .register(\"/service-worker.js\")\n            .then((registration) => {\n            console.log(\"Service Worker registered with scope:\", registration.scope);\n        })\n            .catch((error) => {\n            console.error(\"Service Worker registration failed:\", error);\n        });\n    });\n}\nconst todoForm = document.getElementById(\"todo-form\");\nconst todoInput = document.getElementById(\"todo-input\");\nconst todoList = document.getElementById(\"todo-list\");\nconst tasks = JSON.parse(localStorage.getItem(\"tasks\") || \"[]\");\nfunction renderTasks() {\n    todoList.innerHTML = \"\";\n    tasks.forEach((task) => {\n        const li = document.createElement(\"li\");\n        li.textContent = task.text;\n        const deleteButton = document.createElement(\"button\");\n        deleteButton.textContent = \"Delete\";\n        deleteButton.addEventListener(\"click\", () => {\n            deleteTask(task.id);\n        });\n        li.appendChild(deleteButton);\n        todoList.appendChild(li);\n    });\n}\nfunction addTask(taskText) {\n    const newTask = {\n        id: Date.now(),\n        text: taskText,\n    };\n    tasks.push(newTask);\n    localStorage.setItem(\"tasks\", JSON.stringify(tasks));\n    renderTasks();\n}\nfunction deleteTask(taskId) {\n    const index = tasks.findIndex((task) => task.id === taskId);\n    if (index > -1) {\n        tasks.splice(index, 1);\n        localStorage.setItem(\"tasks\", JSON.stringify(tasks));\n        renderTasks();\n    }\n}\ntodoForm.addEventListener(\"submit\", (e) => {\n    e.preventDefault();\n    if (todoInput.value.trim()) {\n        addTask(todoInput.value.trim());\n        todoInput.value = \"\";\n    }\n});\nrenderTasks();\nwindow.addEventListener(\"beforeinstallprompt\", (event) => {\n    event.preventDefault();\n    console.log(\"beforeinstallprompt fired\");\n});\n\n\n//# sourceURL=webpack://code-example/./src/app.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/app.ts"]();
/******/ 	
/******/ })()
;