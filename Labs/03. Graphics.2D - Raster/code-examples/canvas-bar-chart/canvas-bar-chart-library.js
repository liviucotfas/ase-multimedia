//http://exploringjs.com/es6/ch_classes.html
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
/**
 * Draws numeric values as vertical bars on a canvas.
 */
export class BarChart{
    /**
     * The canvas on which the chart will be displayed.
     * @type {HTMLCanvasElement}
     */
    #canvas;
    /**
     * Creates an instance of BarChart.
     * @param {HTMLCanvasElement} canvas - The canvas used for drawing the bar chart.
     */
    constructor(canvas) {
        this.#canvas = canvas;
    }
    /**
     * Draws the bar chart on the canvas.
     * @param {Array<number>} values - The values that will be displayed in the chart.
     * @param {Object} options - The options for drawing the bar chart.
     * @param {boolean} [options.drawOutline] - Whether to draw an outline around each bar.
     * @returns {void}
     */
    draw(values, options){
        const context = this.#canvas.getContext('2d');
    
        // Save the current drawing state. We will restore it later.
        context.save();
    
        // Draw the chart background
        context.fillStyle = '#DEDEDE';
        context.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
    
        // Set the color for the bars
        context.fillStyle = 'red';
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        
        //...spread operator
        const maxValue = Math.max(...values);
        const scaleFactor = this.#canvas.height / maxValue;

        const barWidth = this.#canvas.width / values.length;
    
        for (let i = 0; i < values.length; i++) {
               
            const barHeight = values[i] * scaleFactor * 0.9;
            const barX = i * barWidth + barWidth / 4;
            const barY = this.#canvas.height - barHeight;
    
            context.fillRect(barX, barY, barWidth / 2, barHeight);

            if(options.drawOutline)
                context.strokeRect(barX, barY, barWidth / 2, barHeight);
    
            /* Equivalent to:
            context.beginPath();
            context.rect(barX, barY, barWidth/2, barHeight);
            context.fill();
            context.stroke();*/
        }

        // Restore the initial context
        context.restore();
    }
}

