export class Brick {
    static brickWidth;
    x;
    y;
    status;

    /**
     *  
     * @param {Number} x The x coordinate of the brick
     * @param {Number} y The y coordinate of the brick
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.status = 1;
    }
}