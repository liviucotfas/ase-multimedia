// Adapted from: https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript

class Ball {
    // Ball settings
    #radius = 10;

    // we want to add a small value to x and y after every frame has been drawn to make it appear that the ball is moving
    // dx and dy can be tuned for gameplay quality and difficulty
    #dxDefault = 2;
    #dyDefault = -2;
    #dx = null;
    #dy = null;

    #x = 0;
    #y = 0;

    constructor() {
        this.centre();
    }

    centre() {
        this.#x = Game.canvas.width / 2;
        this.#y = Game.canvas.height - 30;
        this.#dx = this.#dxDefault;
        this.#dy = this.#dyDefault;
    }

    draw() {
        Game.context.beginPath();
        Game.context.arc(this.#x, this.#y, this.#radius, 0, Math.PI * 2);
        Game.context.fillStyle = '#FF0000';
        Game.context.fill();
        Game.context.closePath();
    }

    moveAndCollide(paddle, bricks) {
        // Bouncing off the left and right
        if (this.#x + this.#dx > Game.canvas.width - this.#radius || this.#x + this.#dx < this.#radius) {
            this.#dx = -this.#dx;
        }

        // Bouncing off the top
        if (this.#y + this.#dy < this.#radius) {
            this.#dy = -this.#dy;
        }
        // Bouncing off the bottom
        else if (this.#y + this.#dy > Game.canvas.height - this.#radius) {
            if (this.#x > paddle.x && this.#x < paddle.x + paddle.width) {
                this.#dy = -this.#dy;
            } else {
                // Subtract a life if player missed the ball
                Game.subtractLife();
            }
        }

        // Hitting a brick destroys it, earns a point, and bounces the ball
        for (let brick of bricks) {
            if (brick.isAlive()) {
                if (this.#x > brick.x &&
                    this.#x < brick.x + brick.width &&
                    this.#y > brick.y &&
                    this.#y < brick.y + brick.height
                ) {
                    this.#dy = -this.#dy;
                    brick.destroy();
                    Game.score();
                }
            }
        }

        // Update the location of the ball
        this.#x += this.#dx;
        this.#y += this.#dy;
    }
}

class Paddle {
    // Paddle settings
    #width = 75;
    #height = 10;
    #x = null;

    get width() { return this.#width; }
    get height() { return this.#height; }
    get x() { return this.#x; }

    constructor() {
        this.centre();
    }

    centre() { this.#x = (Game.canvas.width - this.#width) / 2; }

    handleUserInput(input) {
        // we can control the position of the paddle by checking for input and updating it each frame
        const { type, e } = input;
        let relativeX;

        switch (type) {
            case 'mouse':
                // peg the movement of the paddle to the relative position 
                // of the pointer within the game canvas
                relativeX = e.clientX - Game.canvas.offsetLeft;
                if (relativeX > 0 && relativeX < Game.canvas.width) {
                    this.#x = relativeX - this.#width / 2;
                }
                break;
            case 'keyboard':
                // move the paddle right if the right control button is pressed
                if (Game.rightKeyPressed && this.#x < Game.canvas.width - this.#width) {
                    this.#x += 7;
                }
                // move the paddle left if the left control button is pressed
                else if (Game.leftKeyPressed && this.#x > 0) {
                    this.#x -= 7;
                }
                break;
            case 'touch':
                relativeX = input.e.touches[0].clientX;
                if (relativeX > 0 && relativeX < Game.canvas.width) {
                    this.#x = relativeX - paddleWidth / 2;
                }
                break;
        }
    }

    draw() {
        Game.context.beginPath();
        Game.context.rect(this.#x, Game.canvas.height - this.#height, this.#width, this.#height);
        Game.context.fillStyle = '#0095DD';
        Game.context.fill();
        Game.context.closePath();
        // equivalent to `context.fillRect()`
    }
}

class Brick {
    // Brick settings
    #width = 0;
    #height = 0;
    #x = 0;
    #y = 0;
    #alive = true;

    set x(x) { this.#x = x; }
    set y(y) { this.#y = y; }

    get width() { return this.#width; }
    get height() { return this.#height; }
    get x() { return this.#x; }
    get y() { return this.#y; }

    constructor(x, y, width, height) {
        this.#x = x;
        this.#y = y;
        this.#width = width;
        this.#height = height;
        this.#alive = true;
    }

    isAlive() { return this.#alive; }

    destroy() { this.#alive = false; }

    draw() {
        Game.context.beginPath();
        Game.context.rect(this.#x, this.#y, this.#width, this.#height);
        Game.context.fillStyle = '#0095DD';
        Game.context.fill();
        Game.context.closePath();
    }
}

class BrickMatrix {
    // Brick collection class
    #rowCount = 0;
    #columnCount = 0;

    #individualBrickWidth = 0;
    #individualBrickHeight = 20;
    #individualBrickPadding = 10;

    #offsetTop = 30;
    #offsetLeft = 30;

    // keep bricks in a flat array because it's easier to iterate over them
    #bricks = [];

    constructor(rowCount, columnCount) {
        this.#rowCount = rowCount;
        this.#columnCount = columnCount;

        const brickTotalWidth = (Game.canvas.width - 2 * this.#offsetLeft) / this.#columnCount;
        this.#individualBrickWidth = brickTotalWidth - this.#individualBrickPadding;

        // Initialise bricks
        for (let i = 0; i < this.size(); i++) {
            this.#bricks.push(
                new Brick(0, 0, this.#individualBrickWidth, this.#individualBrickHeight)
            );
        }
    }

    size() { return this.#rowCount * this.#columnCount; }

    // Implement iterator so we can use `for (let brick of bricks) {}`
    // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
    [Symbol.iterator]() {
        let index = -1;
        let data = this.#bricks;

        return {
            next: () => ({ value: data[++index], done: !(index in data) })
        };
    };

    draw() {
        // traverse as if it were a matrix in order to calculate positions
        for (let r = 0; r < this.#rowCount; r++) {
            for (let c = 0; c < this.#columnCount; c++) {
                // get index for flat array
                const i = r * this.#columnCount + c;
                if (this.#bricks[i].isAlive()) {
                    const brickX = (c * (this.#individualBrickWidth + this.#individualBrickPadding)) + this.#offsetLeft;
                    const brickY = (r * (this.#individualBrickHeight + this.#individualBrickPadding)) + this.#offsetTop;
                    this.#bricks[i].x = brickX;
                    this.#bricks[i].y = brickY;
                    this.#bricks[i].draw();
                }
            }
        }
    }
}

class Game {
    // Elements we use to calculate positions and draw 
    static #canvas = null;
    static #context = null;

    // Entities
    static #ball = null;
    static #paddle = null;
    static #bricks = null;

    // Keyboard - store information on whether the left or right control button is pressed
    static #rightKeyPressed = false;
    static #leftKeyPressed = false;

    static get canvas() { return this.#canvas; }
    static get context() { return this.#context; }
    static get rightKeyPressed() { return this.#rightKeyPressed; }
    static get leftKeyPressed() { return this.#leftKeyPressed; }

    // Game state
    static #score = 0;
    static #lives = 3;

    static init(canvas) {
        this.#canvas = canvas;
        this.#context = this.#canvas.getContext('2d');

        this.#resize();

        // Initialise ball
        this.#ball = new Ball();

        // Initialise paddle
        this.#paddle = new Paddle();

        // Initialise a 3 * 5 matrix of bricks
        this.#bricks = new BrickMatrix(3, 5);

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

    static #resize() {
        const width = this.#canvas.clientWidth;
        const height = this.#canvas.clientHeight;
        if (this.#canvas.width != width ||
            this.#canvas.height != height) {
            this.#canvas.width = width;
            this.#canvas.height = height;
        }
    }

    static #touchMove(e) {
        this.#paddle.handleUserInput({ type: 'touch', e: e });
    }

    static #keyDownHandler(e) {
        if (e.keyCode == 39) {
            this.#rightKeyPressed = true;
        }
        else if (e.keyCode == 37) {
            this.#leftKeyPressed = true;
        }
    }

    static #keyUpHandler(e) {
        if (e.keyCode == 39) {
            this.#rightKeyPressed = false;
        }
        else if (e.keyCode == 37) {
            this.#leftKeyPressed = false;
        }
    }

    static #mouseMoveHandler(e) {
        this.#paddle.handleUserInput({ type: 'mouse', e: e });
    }

    static #drawScore() {
        this.#context.font = '16px Arial';
        this.#context.fillStyle = '#000000';
        this.#context.fillText('Score: ' + this.#score, 8, 20);
    }

    static #drawLives() {
        this.#context.font = '16px Arial';
        this.#context.fillStyle = '#000000';
        this.#context.fillText('Lives: ' + this.#lives, this.#canvas.width - 65, 20);
    }

    static #win() {
        alert('YOU WIN, CONGRATS!');
        document.location.reload();
    }

    static #lose() {
        alert('GAME OVER');
        document.location.reload();
    }

    static score() {
        this.#score++;
        if (this.#score == this.#bricks.size()) {
            this.#win();
        }
    }

    static subtractLife() {
        this.#lives--;
        this.#paddle.centre();
        this.#ball.centre();
        if (this.#lives < 1) {
            this.#lose();
        }
    }

    static draw() {
        this.#resize();

        // clear the canvas before each frame
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

        // draw the elements
        this.#bricks.draw();
        this.#ball.draw();
        this.#paddle.draw();

        this.#drawScore();
        this.#drawLives();

        // move the ball and check for collisions with the paddle and the bricks
        this.#ball.moveAndCollide(this.#paddle, this.#bricks);

        // handle paddle input
        if (this.#leftKeyPressed || this.#rightKeyPressed) {
            this.#paddle.handleUserInput({ type: 'keyboard' });
        }

        // schedule the next iteration for the next frame
        requestAnimationFrame(() => this.draw());
    }
}