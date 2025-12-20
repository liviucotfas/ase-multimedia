export class Ball {
  x
  y
  dx
  dy
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
    ctx.arc(this.x, this.y, this.#radius, 0, Math.PI * 2);
    ctx.fillStyle = this.#color;
    ctx.fill();
    ctx.closePath();
  }
}