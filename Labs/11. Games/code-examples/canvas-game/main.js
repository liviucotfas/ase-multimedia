import { Game } from "./src/Game.js";

window.game = new Game();

document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const hz = parseInt(button.textContent);
      window.game.setSimulatedRefreshRate(hz);
    });
});

// Register service worker if available
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/serviceworker.js")
    .then(function (registration) {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed:", err);
    });
}
