import { Ball } from "./Ball.js";
import { Brick } from "./Brick.js";
import { Paddle } from "./Paddle.js";

export class Game {
  #canvas;
  #context;

  // FPS
  #lastFrameTime = 0;
  #accumulator = 0;
  #fixedTimeStep = 1000 / 60; // Fixed 60Hz physics update

  // FPS monitoring
  #frameCount = 0; // Frames drawn in the last second
  #lastFPSUpdateTime = 0;
  #currentFPS = 0;

  // FPS simulation
  #simulatedRefreshRate = 60;
  #frameDuration = 1000 / 60; // Default to 60Hz

  // Brick settings
  brickColumnCount = 5;
  brickRowCount = 3;
  brickWidth = 75;
  brickHeight = 20;
  brickPadding = 10;
  brickOffsetTop = 30;
  brickOffsetLeft = 30;

  // Paddle settings
  paddleHeight = 10;
  paddleWidth = 75;
  #paddle;

  // Ball settings
  #ball;
  ballRadius = 10;
  ballSpeedBase = 300; // pixels per second
  dxDefault = 2;
  dyDefault = -2;

  // Keyboard state
  rightKeyPressed = false;
  leftKeyPressed = false;

  // Game data
  score = 0;
  lives = 3;
  #bricks = [];

  constructor() {
    // Initialize canvas
    this.#canvas = document.getElementById("gameCanvas");
    this.#context = this.#canvas.getContext("2d");

    // Initialize bricks
    for (let r = 0; r < this.brickRowCount; r++) {
      this.#bricks[r] = [];
      for (let c = 0; c < this.brickColumnCount; c++) {
        this.#bricks[r][c] = new Brick(c, r);
      }
    }

    // Initial resize
    this.resize();

    // Initialize ball
    this.#ball = new Ball(
      this.#canvas.width / 2,
      this.#canvas.height - 30,
      this.ballRadius,
      "#FF0000"
    );
    this.#ball.dx = this.dxDefault;
    this.#ball.dy = this.dyDefault;

    // Initialize paddle
    this.#paddle = new Paddle((this.#canvas.width - this.paddleWidth) / 2);

    // Event listeners
    this.#canvas.addEventListener("touchmove", (e) => this.touchMove(e), {
      passive: true,
    });
    document.addEventListener("keydown", (e) => this.keyDownHandler(e), false);
    document.addEventListener("keyup", (e) => this.keyUpHandler(e), false);
    document.addEventListener("mousemove", (e) => this.mouseMoveHandler(e), false);

    // Initialize lastTime and start game loop
    this.#lastFrameTime = performance.now();
    requestAnimationFrame((timestamp) => this.draw(timestamp));
  }

  resize() {
    // Update canvas dimensions if needed
    const width = this.#canvas.clientWidth;
    const height = this.#canvas.clientHeight;
    if (this.#canvas.width !== width || this.#canvas.height !== height) {
      this.#canvas.width = width;
      this.#canvas.height = height;
    }

    // Calculate brick dimensions based on canvas size
    const brickTotalWidth =
      (this.#canvas.width - 2 * this.brickOffsetLeft) / this.brickColumnCount;
    this.brickWidth = brickTotalWidth - this.brickPadding;

    // Update brick positions
    for (let r = 0; r < this.brickRowCount; r++) {
      for (let c = 0; c < this.brickColumnCount; c++) {
        if (this.#bricks[r][c].status === 1) {
          const brickX =
            c * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
          const brickY =
            r * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
          this.#bricks[r][c].x = brickX;
          this.#bricks[r][c].y = brickY;
        }
      }
    }
  }

  // Event Handlers
  touchMove(e) {
    const relativeX = e.touches[0].clientX;
    if (relativeX > 0 && relativeX < this.#canvas.width) {
      this.#paddle.x = relativeX - this.paddleWidth / 2;
    }
  }

  keyDownHandler(e) {
    if (e.keyCode === 39) {
      this.rightKeyPressed = true;
    } else if (e.keyCode === 37) {
      this.leftKeyPressed = true;
    }
  }

  keyUpHandler(e) {
    if (e.keyCode === 39) {
      this.rightKeyPressed = false;
    } else if (e.keyCode === 37) {
      this.leftKeyPressed = false;
    }
  }

  mouseMoveHandler(e) {
    const relativeX = e.clientX - this.#canvas.offsetLeft;
    if (relativeX > 0 && relativeX < this.#canvas.width) {
      this.#paddle.x = relativeX - this.paddleWidth / 2;
    }
  }

  // Drawing Methods
  drawBall() {
    this.#ball.draw(this.#context);
  }

  drawPaddle() {
    this.#context.fillStyle = "#0095DD";
    this.#context.fillRect(
      this.#paddle.x,
      this.#canvas.height - this.paddleHeight,
      this.paddleWidth,
      this.paddleHeight
    );
  }

  drawBricks() {
    this.#context.fillStyle = "#0095DD";
    for (let r = 0; r < this.brickRowCount; r++) {
      for (let c = 0; c < this.brickColumnCount; c++) {
        const brick = this.#bricks[r][c];
        if (brick.status === 1) {
          this.#context.fillRect(
            brick.x,
            brick.y,
            this.brickWidth,
            this.brickHeight
          );
        }
      }
    }
  }

  drawScore() {
    this.#context.font = "16px Arial";
    this.#context.fillStyle = "#000000";
    this.#context.fillText("Score: " + this.score, 8, 20);
  }

  drawLives() {
    this.#context.font = "16px Arial";
    this.#context.fillStyle = "#000000";
    this.#context.fillText("Lives: " + this.lives, this.#canvas.width - 65, 20);
  }

  drawFPS() {
    this.#context.font = "16px Arial";
    this.#context.fillStyle = "#000000";
    this.#context.fillText(
      `FPS: ${Math.round(this.#currentFPS)} (${this.#simulatedRefreshRate}Hz)`,
      8,
      40
    );
  }

  setSimulatedRefreshRate(hz) {
    this.#simulatedRefreshRate = hz;
    this.#frameDuration = 1000 / hz;
  }

  collisionDetection() {
    for (let r = 0; r < this.brickRowCount; r++) {
      for (let c = 0; c < this.brickColumnCount; c++) {
        const brick = this.#bricks[r][c];
        if (brick.status === 1) {
          if (
            this.#ball.x > brick.x &&
            this.#ball.x < brick.x + this.brickWidth &&
            this.#ball.y > brick.y &&
            this.#ball.y < brick.y + this.brickHeight
          ) {
            this.#ball.dy = -this.#ball.dy;
            brick.status = 0;
            this.score++;

            if (this.score === this.brickRowCount * this.brickColumnCount) {
              alert("YOU WIN, CONGRATS!");
              document.location.reload();
            }
          }
        }
      }
    }
  }

  updateGameState(dt) {
    // Calculate normalized direction vector
    const magnitude = Math.sqrt(
      this.#ball.dx * this.#ball.dx + this.#ball.dy * this.#ball.dy
    );
    const normalizedDx = this.#ball.dx / magnitude;
    const normalizedDy = this.#ball.dy / magnitude;

    // Apply constant speed in the current direction
    this.#ball.x += normalizedDx * this.ballSpeedBase * dt;
    this.#ball.y += normalizedDy * this.ballSpeedBase * dt;

    // Handle collisions
    this.collisionDetection();

    // Wall collisions
    if (
      this.#ball.x > this.#canvas.width - this.ballRadius ||
      this.#ball.x < this.ballRadius
    ) {
      this.#ball.dx = -this.#ball.dx;
    }

    // Ceiling collision
    if (this.#ball.y < this.ballRadius) {
      this.#ball.dy = -this.#ball.dy;
    }
    // Floor/Paddle collision
    else if (this.#ball.y > this.#canvas.height - this.ballRadius) {
      if (
        this.#ball.x > this.#paddle.x &&
        this.#ball.x < this.#paddle.x + this.paddleWidth
      ) {
        this.#ball.dy = -this.#ball.dy;
      } else {
        this.lives--;
        if (this.lives === 0) {
          alert("GAME OVER");
          document.location.reload();
        } else {
          // Reset ball and paddle
          this.#ball.x = this.#canvas.width / 2;
          this.#ball.y = this.#canvas.height - 30;
          this.#ball.dx = this.dxDefault;
          this.#ball.dy = this.dyDefault;
          this.#paddle.x = (this.#canvas.width - this.paddleWidth) / 2;
        }
      }
    }

    // Update paddle position
    const paddleSpeed = 420; // pixels per second (7 pixels per frame * 60 fps)
    if (
      this.rightKeyPressed &&
      this.#paddle.x < this.#canvas.width - this.paddleWidth
    ) {
      this.#paddle.x += paddleSpeed * dt;
    } else if (this.leftKeyPressed && this.#paddle.x > 0) {
      this.#paddle.x -= paddleSpeed * dt;
    }
  }

  draw(currentTime) {
    // Calculate time since last frame
    let timeSinceLastFrame = currentTime - this.#lastFrameTime;

    // FPS simulation - skip frames to simulate lower refresh rates
    // Check if the time that has passed since the last frame is less than the frame duration
    if (timeSinceLastFrame < this.#frameDuration) {
      // Skip the frame
      requestAnimationFrame((timestamp) => this.draw(timestamp));
      return;
    }

    //Update the time of the last frame to the current time    
    this.#lastFrameTime = currentTime;

    // Prevent spiral of death
    /*
    The "spiral of death" refers to when frame times get increasingly longer due to processing taking longer than the available time between frames. This causes more work to accumulate, leading to even longer frame times in a downward spiral. The code prevents this by capping frameTime at 250ms.
    */
    if (timeSinceLastFrame > 250) 
      timeSinceLastFrame = 250; // Maximum frame time to avoid spiral of death

    // Accumulate time to process
    this.#accumulator += timeSinceLastFrame;

    // Update FPS counter
    this.#frameCount++;
    // Check if more than 1 second has passed
    if (currentTime - this.#lastFPSUpdateTime >= 1000) { 
      // Update the number of frames that we have been able to draw in the last second
      this.#currentFPS = this.#frameCount;
      // Reset the frame counter
      this.#frameCount = 0;
      // Update the last time we updated the FPS counter
      this.#lastFPSUpdateTime = currentTime;
    }

    // Clear and resize
    this.resize();
    this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

    // Process physics at fixed timestep
    while (this.#accumulator >= this.#fixedTimeStep) {
      this.updateGameState(this.#fixedTimeStep / 1000);
      this.#accumulator -= this.#fixedTimeStep;
    }

    // Draw everything
    this.drawBricks();
    this.drawBall();
    this.drawPaddle();
    this.drawScore();
    this.drawLives();
    this.drawFPS();

    requestAnimationFrame((timestamp) => this.draw(timestamp));
  }
}