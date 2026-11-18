
# Instruction.md

## Project Overview

This project is a simple Progressive Web Application (PWA) for managing a to-do list. It is built with TypeScript and includes functionality for adding, displaying, and deleting tasks. Additionally, it registers a service worker to enable offline functionality and supports PWA installation on devices that support it.

### Key Features
- **Offline Functionality**: With the help of a service worker, the application caches essential resources and can function offline.
- **Persistent Task Management**: Tasks are saved in the browser's `localStorage`, ensuring they remain available even after the page is reloaded.
- **PWA Installation**: The app prompts the user to install it as a standalone application on devices that support PWA.

## Project Structure

The project has two primary TypeScript files and a JSON file:

- **app.ts**: Main application logic for managing tasks (adding, displaying, and deleting). It also registers the service worker and listens for PWA installation events.
- **service-worker.ts**: Service worker logic for caching resources and enabling offline functionality by intercepting fetch requests.
- **manifest.json**: Describes metadata for the PWA, such as app icons, theme colors, and display mode, allowing the app to be installed on mobile devices and desktops.

## How the Application Works

1. **Service Worker Registration**: The service worker is registered when the page loads if the browser supports it. This enables caching of resources and offline functionality.
2. **Task Management**:
   - The user can add tasks by typing them into an input field and submitting the form.
   - Tasks are displayed in a list with each task accompanied by a delete button.
   - When a task is added or deleted, the changes are saved in `localStorage` to persist across page reloads.
3. **Offline Caching**:
   - The service worker caches essential files (`index.html`, `main.js`, `manifest.json`) to ensure the app works offline.
   - When the app is offline, the service worker serves these cached resources to the user.
4. **PWA Install Prompt**: The application listens for the `beforeinstallprompt` event, which indicates that the app is eligible for installation. Users are given the option to install the app as a standalone PWA.

## How to Run the Application

### Prerequisites
- **Node.js** and **npm** should be installed on your machine.

### Steps to Run the Application

1. **Clone the Repository**
   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. **Install Dependencies**
   Run the following command to install the required dependencies:
   ```bash
   npm install
   ```

3. **Build the Project**
   Transpile the TypeScript files and bundle them using Webpack:
   ```bash
   npx webpack
   ```
   This will create the `dist` folder containing the compiled JavaScript files and other necessary assets.

4. **Start a Local HTTP Server**
   To view the application locally, start an HTTP server. You can use a simple HTTP server like `http-server`:

   ```bash
   npx http-server dist
   ```
   The application should now be accessible at [http://localhost:8080](http://localhost:8080) or another local address displayed in the console.

5. **Open the Application in a Browser**
   Open the provided local URL (e.g., [http://localhost:8080](http://localhost:8080)) in a browser that supports PWAs, such as Chrome or Edge.

## How to Use the Application

1. **Adding Tasks**: 
   - Type a task into the input field and press "Add Task". The task will appear in the list below.
   - Tasks are stored in `localStorage`, so they will persist even if you reload the page.

2. **Deleting Tasks**:
   - Click the "Delete" button next to a task to remove it from the list.
   - This action also removes the task from `localStorage`.

3. **Working Offline**:
   - Once loaded, the application can be used offline. The service worker caches necessary resources, so the to-do list and interface will still be available without an internet connection.
   - To test offline mode, you can go to Chrome DevTools > Application > Service Workers and enable "Offline" mode.

4. **Installing the Application**:
   - If the browser detects that the app meets PWA criteria, you’ll see an install option in the address bar.
   - Click the install icon in the address bar or look for an option to "Add to Home Screen" or "Install App" in the browser menu to install it as a standalone app on your device.

## Troubleshooting

- **Service Worker Not Registering**: Ensure you are accessing the app over `localhost` or a secure (HTTPS) connection.
- **Installation Option Not Appearing**: Double-check that `manifest.json` and `service-worker.ts` are set up correctly, and ensure all resources specified in the `urlsToCache` array are accessible.
- **Changes Not Reflecting**: If you make changes to `service-worker.ts`, you may need to unregister the service worker in DevTools (Application > Service Workers) and refresh the page to see the updates.

## Summary

This application demonstrates a basic PWA with offline capabilities and task management functionality. By using a service worker to cache resources and enabling `localStorage` for task persistence, it provides a seamless experience both online and offline.
