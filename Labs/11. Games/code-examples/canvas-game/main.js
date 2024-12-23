import { Game } from "./src/Game.js";

window.game = new Game();

document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const hz = parseInt(button.textContent);
      window.game.setSimulatedRefreshRate(hz);
    });
});
