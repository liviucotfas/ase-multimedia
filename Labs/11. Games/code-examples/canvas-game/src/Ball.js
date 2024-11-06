export class Ball {
  x
  y
  #radius
  #color
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.#radius = radius;
    this.#color = color;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(app.x, app.y, app.ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#FF0000';
    ctx.fill();
    ctx.closePath();
  }
}