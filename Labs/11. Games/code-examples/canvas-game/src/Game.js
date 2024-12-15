// Adapted from: https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript
import { Ball } from "./Ball.js";
import { Brick } from "./Brick.js";
import { Paddle } from "./Paddle.js";

export class Game {
    #canvas;
    #context;
    //Brick settings
    brickColumnCount = 5;
    brickRowCount = 3;
    brickHeight = 20;
    brickPadding = 10;
    brickOffsetTop = 30;
    brickOffsetLeft = 30;
    //Paddle settings
    paddleHeight = 10;
    paddleWidth = 75;
    #paddle;
    //Ball settings
    #ball;
    ballRadius = 10;
    dxDefault = 2;
    dyDefault = -2;
    //Keyboard - store information on whether the left or right control button is pressed
    rightKeyPressed = false;
    leftKeyPressed = false;
    //Game data
    score = 0;
    lives = 3;
    #bricks = [];

    constructor() {
        this.#canvas = document.getElementById('gameCanvas');
        this.#context = this.#canvas.getContext('2d');

        //Game data
        for (let r = 0; r < this.brickRowCount; r++) {
            this.#bricks[r] = [];
            for (let c = 0; c < this.brickColumnCount; c++) {
                this.#bricks[r][c] = new Brick(c, r);
            }
        }

        //Resize the canvas
        this.resize();

        //Ball settings
        this.#ball = new Ball(this.#canvas.width / 2, this.#canvas.height - 30, this.ballRadius, '#FF0000');
        //we want to add a small value to x and y after every frame has been drawn to make it appear that the ball is moving
        this.#ball.dx = this.dxDefault;
        this.#ball.dy = this.dyDefault;

        //Paddle settings
        this.#paddle = new Paddle((this.#canvas.width - this.paddleWidth) / 2);

        //Attach events
        this.#canvas.addEventListener('touchmove', (e) => this.touchMove(e), { passive: true });
        document.addEventListener('keydown', (e) => this.keyDownHandler(e), false);
        document.addEventListener('keyup', (e) => this.keyUpHandler(e), false);
        document.addEventListener('mousemove', (e) => this.mouseMoveHandler(e), false);

        //Start drawing
        this.draw();
    }

    //Events
    touchMove(e) {
        const relativeX = e.touches[0].clientX;
        if (relativeX > 0 && relativeX < this.#canvas.width) {
            this.#paddle.x = relativeX - paddleWidth / 2;
        }
    }

    resize() {
        const brickTotalWidth = (this.#canvas.width - 2 * this.brickOffsetLeft) / this.brickColumnCount;
        this.brickWidth = brickTotalWidth - this.brickPadding;

        for (let r = 0; r < this.brickRowCount; r++) {
            for (let c = 0; c < this.brickColumnCount; c++) {
                if (this.#bricks[r][c].status == 1) {
                    const brickX = (c * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
                    const brickY = (r * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
                    this.#bricks[r][c].x = brickX;
                    this.#bricks[r][c].y = brickY;
                }
            }
        }

        const width = this.#canvas.clientWidth;
        const height = this.#canvas.clientHeight;
        if (this.#canvas.width != width ||
            this.#canvas.height != height) {
            this.#canvas.width = width;
            this.#canvas.height = height;
        }
    }

    keyDownHandler(e) {
        if (e.keyCode == 39) {
            this.rightKeyPressed = true;
        }
        else if (e.keyCode == 37) {
            this.leftKeyPressed = true;
        }
    }

    keyUpHandler(e) {
        if (e.keyCode == 39) {
            this.rightKeyPressed = false;
        }
        else if (e.keyCode == 37) {
            this.leftKeyPressed = false;
        }
    }

    mouseMoveHandler(e) {
        const relativeX = e.clientX - this.#canvas.offsetLeft;
        if (relativeX > 0 && relativeX < this.#canvas.width) {
            this.#paddle.x = relativeX - this.paddleWidth / 2;
        }
    }

    //Drawing functions
    drawBall() {
        this.#ball.draw(this.#context);
    }

    drawPaddle() {
        this.#context.beginPath();
        this.#context.rect(this.#paddle.x, this.#canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
        this.#context.fillStyle = '#0095DD';
        this.#context.fill();
        this.#context.closePath();
        //equivalen to app.context.fillRect
    }
    drawBricks() {
        for (let r = 0; r < this.brickRowCount; r++) {
            for (let c = 0; c < this.brickColumnCount; c++) {
                const b = this.#bricks[r][c];
                if (b.status == 1) {
                    this.#context.fillStyle = '#0095DD';
                    this.#context.fillRect(b.x, b.y, this.brickWidth, this.brickHeight);
                }
            }
        }
    }
    drawScore() {
        this.#context.font = '16px Arial';
        this.#context.fillStyle = '#000000';
        this.#context.fillText('Score: ' + this.score, 8, 20);
    }
    drawLives() {
        this.#context.font = '16px Arial';
        this.#context.fillStyle = '#000000';
        this.#context.fillText('Lives: ' + this.lives, this.#canvas.width - 65, 20);
    }

    draw() {
        this.resize()
        //clear the canvas before each frame
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        
        //draw the elements
        this.drawBricks();
        this.drawBall();
        this.drawPaddle();
        this.drawScore();
        this.drawLives();

        //detect collisions
        this.collisionDetection();

        //Bouncing off the left and right
        if (this.#ball.x + this.#ball.dx > this.#canvas.width - this.ballRadius || this.#ball.x + this.#ball.dx < this.ballRadius) {
            this.#ball.dx = -this.#ball.dx;
        }

        //Bouncing off the top
        if (this.#ball.y + this.#ball.dy < this.ballRadius) {
            this.#ball.dy = -this.#ball.dy;
        }

        //Bouncing off the bottom
        else if (this.#ball.y + this.#ball.dy > this.#canvas.height - this.ballRadius) {

            if (this.#ball.x > this.#paddle.x && this.#ball.x < this.#paddle.x + this.paddleWidth) {
                this.#ball.dy = -this.#ball.dy;
            }
            else {
                this.lives--;
                if (this.lives === 0) {
                    alert('GAME OVER');
                    document.location.reload();
                }
                else {
                    this.#ball.x = this.#canvas.width / 2;
                    this.#ball.y = this.#canvas.height - 30;
                    this.#ball.dx = this.#ball.dxDefault;
                    this.#ball.dy = this.#ball.dyDefault;
                    //center the paddle
                    this.#paddle.x = (this.#canvas.width - this.paddleWidth) / 2;
                }
            }
        }

        //move the paddle right if the right control button is pressed
        if (this.rightKeyPressed && this.#paddle.x < this.#canvas.width - this.paddleWidth) {
            this.#paddle.x += 7;
        }
        //move the paddle left if the left control button is pressed
        else if (this.leftKeyPressed && this.paddl.X > 0) {
            this.#paddle.x -= 7;
        }

        //update the location of the ball
        this.#ball.x += this.#ball.dx;
        this.#ball.y += this.#ball.dy;

        requestAnimationFrame(() => this.draw());
    }

    collisionDetection() {
        for (let r = 0; r < this.brickRowCount; r++) {
            for (let c = 0; c < this.brickColumnCount; c++) {
                const b = this.#bricks[r][c];
                if (b.status == 1) {
                    if (this.#ball.x > b.x && this.#ball.x < b.x + this.brickWidth && this.#ball.y > b.y && this.#ball.y < b.y + this.brickHeight) {
                        this.#ball.dy = -this.#ball.dy;
                        b.status = 0;
                        this.score++;
                        if (this.score === this.brickColumnCount * this.brickRowCount) {
                            alert('YOU WIN, CONGRATS!');
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceworker.js')
        .then(function (registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch(function (err) {
            console.log('Service worker registration failed:', err);
        });
}

