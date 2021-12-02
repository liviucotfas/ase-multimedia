class Game {
    #canvas = null;
    #context = null;

    // Brick settings
    #brickColumnCount = 5;
    #brickRowCount = 3;
    #brickWidth = 0;
    #brickHeight = 20;
    #brickPadding = 10;
    #brickOffsetTop = 30;
    #brickOffsetLeft = 30;

    // Paddle settings
    #paddleHeight = 10;
    #paddleWidth = 75;
    #paddleX = null;

    // Ball settings
    #ballRadius = 10;
    #dxDefault = 2;
    #dyDefault = -2;
    #dx = null;
    #dy = null;
    #x = 0;
    #y = 0;

    // Keyboard - store information on whether the left or right control button is pressed
    #rightKeyPressed = false;
    #leftKeyPressed = false;

    // Game data
    #score = 0;
    #lives = 3;
    #bricks = [];

    constructor(canvas) {
        this.#canvas = canvas;
        this.#context = this.#canvas.getContext('2d');

        this.#resize();

        // Ball settings
        this.#x = this.#canvas.width / 2;
        this.#y = this.#canvas.height - 30;

        // we want to add a small value to x and y after every frame has been drawn to make it appear that the ball is moving
        this.#dx = this.#dxDefault;
        this.#dy = this.#dyDefault;

        // Paddle settings
        this.#paddleX = (this.#canvas.width - this.#paddleWidth) / 2;

        const brickTotalWidth = (this.#canvas.width - 2 * this.#brickOffsetLeft) / this.#brickColumnCount;
        this.#brickWidth = brickTotalWidth - this.#brickPadding;

        // Game data
        for (let r = 0; r < this.#brickRowCount; r++) {
            this.#bricks[r] = [];
            for (let c = 0; c < this.#brickColumnCount; c++) {
                this.#bricks[r][c] = { x: 0, y: 0, status: 1 };
            }
        }

        // Attach events
        //
        // If we use classes, we either have to wrap methods in arrow functions like this or 
        // use Function.bind(this) because otherwise they will lose their "this" references
        // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#class_context
        //
        this.#canvas.addEventListener('touchmove', e => this.#touchMove(e), { passive: true });

        document.addEventListener('keydown', e => this.#keyDownHandler(e), false);
        document.addEventListener('keyup', e => this.#keyUpHandler(e), false);
        document.addEventListener('mousemove', e => this.#mouseMoveHandler(e), false);
    }

    #touchMove(e) {
        const relativeX = e.touches[0].clientX;
        if (relativeX > 0 && relativeX < this.#canvas.width) {
            paddleX = relativeX - paddleWidth / 2;
        }
    }

    #resize() {
        const width = this.#canvas.clientWidth;
        const height = this.#canvas.clientHeight;
        if (this.#canvas.width != width ||
            this.#canvas.height != height) {
            this.#canvas.width = width;
            this.#canvas.height = height;
        }
    }

    #keyDownHandler(e) {
        if (e.keyCode == 39) {
            this.#rightKeyPressed = true;
        }
        else if (e.keyCode == 37) {
            this.#leftKeyPressed = true;
        }
    }

    #keyUpHandler(e) {
        if (e.keyCode == 39) {
            this.#rightKeyPressed = false;
        }
        else if (e.keyCode == 37) {
            this.#leftKeyPressed = false;
        }
    }

    #mouseMoveHandler(e) {
        const relativeX = e.clientX - this.#canvas.offsetLeft;
        if (relativeX > 0 && relativeX < this.#canvas.width) {
            this.#paddleX = relativeX - this.#paddleWidth / 2;
        }
    }

    #drawBall() {
        this.#context.beginPath();
        this.#context.arc(this.#x, this.#y, this.#ballRadius, 0, Math.PI * 2);
        this.#context.fillStyle = '#FF0000';
        this.#context.fill();
        this.#context.closePath();
    }

    #drawPaddle() {
        this.#context.beginPath();
        this.#context.rect(this.#paddleX, this.#canvas.height - this.#paddleHeight, this.#paddleWidth, this.#paddleHeight);
        this.#context.fillStyle = '#0095DD';
        this.#context.fill();
        this.#context.closePath();
        // equivalent to app.context.fillRect
    }

    #drawBricks() {
        for (let r = 0; r < this.#brickRowCount; r++) {
            for (let c = 0; c < this.#brickColumnCount; c++) {
                if (this.#bricks[r][c].status == 1) {
                    const brickX = (c * (this.#brickWidth + this.#brickPadding)) + this.#brickOffsetLeft;
                    const brickY = (r * (this.#brickHeight + this.#brickPadding)) + this.#brickOffsetTop;
                    this.#bricks[r][c].x = brickX;
                    this.#bricks[r][c].y = brickY;
                    this.#context.beginPath();
                    this.#context.rect(brickX, brickY, this.#brickWidth, this.#brickHeight);
                    this.#context.fillStyle = '#0095DD';
                    this.#context.fill();
                    this.#context.closePath();
                }
            }
        }
    }

    #drawScore() {
        this.#context.font = '16px Arial';
        this.#context.fillStyle = '#000000';
        this.#context.fillText('Score: ' + this.#score, 8, 20);
    }

    #drawLives() {
        this.#context.font = '16px Arial';
        this.#context.fillStyle = '#000000';
        this.#context.fillText('Lives: ' + this.#lives, this.#canvas.width - 65, 20);
    }

    draw() {
        this.#resize();

        // clear the canvas before each frame
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        
        // draw the elements
        this.#drawBricks();
        this.#drawBall();
        this.#drawPaddle();
        this.#drawScore();
        this.#drawLives();
        
        // detect collisions
        this.#collisionDetection();

        // Bouncing off the left and right
        if (this.#x + this.#dx > this.#canvas.width - this.#ballRadius || this.#x + this.#dx < this.#ballRadius) {
            this.#dx = -this.#dx;
        }

        // Bouncing off the top
        if (this.#y + this.#dy < this.#ballRadius) {
            this.#dy = -this.#dy;
        }
        // Bouncing off the bottom
        else if (this.#y + this.#dy > this.#canvas.height - this.#ballRadius) {

            if (this.#x > this.#paddleX && this.#x < this.#paddleX + this.#paddleWidth) {
                this.#dy = -this.#dy;
            }
            else {
                this.#lives--;
                if (!this.#lives) {
                    alert('GAME OVER');
                    document.location.reload();
                }
                else {
                    this.#x = this.#canvas.width / 2;
                    this.#y = this.#canvas.height - 30;
                    this.#dx = this.#dxDefault;
                    this.#dy = this.#dyDefault;
                    //center the paddle
                    this.#paddleX = (this.#canvas.width - this.#paddleWidth) / 2;
                }
            }
        }

        // move the paddle right if the right control button is pressed
        if (this.#rightKeyPressed && this.#paddleX < this.#canvas.width - this.#paddleWidth) {
            this.#paddleX += 7;
        }
        // move the paddle left if the left control button is pressed
        else if (this.#leftKeyPressed && this.#paddleX > 0) {
            this.#paddleX -= 7;
        }

        // update the location of the ball
        this.#x += this.#dx;
        this.#y += this.#dy;

        // schedule the next iteration for the next frame
        requestAnimationFrame(() => this.draw());
    }

    #collisionDetection() {
        for (let r = 0; r < this.#brickRowCount; r++) {
            for (let c = 0; c < this.#brickColumnCount; c++) {
                const b = this.#bricks[r][c];
                if (b.status == 1) {
                    if (this.#x > b.x && this.#x < b.x + this.#brickWidth && this.#y > b.y && this.#y < b.y + this.#brickHeight) {
                        this.#dy = -this.#dy;
                        b.status = 0;
                        this.#score++;
                        if (this.#score == this.#brickColumnCount * this.#brickRowCount) {
                            alert('YOU WIN, CONGRATS!');
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }
}