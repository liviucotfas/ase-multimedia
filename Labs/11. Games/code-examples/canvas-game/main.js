import { Game } from "./src/Game.js";
new Game();

document.addEventListener("DOMContentLoaded", () => {
  window.game = new Game();

  // Add event listeners to buttons
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const hz = parseInt(button.textContent);
      window.game.setSimulatedRefreshRate(hz);
    });
  });
});
