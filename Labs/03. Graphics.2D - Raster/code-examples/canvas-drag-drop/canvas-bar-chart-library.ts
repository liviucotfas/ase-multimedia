//http://exploringjs.com/es6/ch_classes.html
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
export class BarChart {
    /**
     * The canvas on which the chart will be displayed
     */
    private canvas: HTMLCanvasElement;

    /**
     *
     * @param {HTMLCanvasElement} canvas - The canvas used for drawing the histogram
     */
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    /**
     *
     * @param {Array<number>} values - The values that will be displayed in the chart
     * @param {*} options
     */
    draw(values: number[], options: { stroke?: boolean }): void {
        const context: CanvasRenderingContext2D | null = this.canvas.getContext('2d');
        if (!context) {
            throw new Error('2D context is not supported');
        }
        // Save the current context of the applciation. We will restore it later.
        context.save();

        // Draw the chart background
        context.fillStyle = '#DEDEDE';
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Set the color for the bars
        context.fillStyle = 'red';
        context.strokeStyle = 'black';
        context.lineWidth = 2;

        //...spread operator
        const maxValue: number = Math.max(...values);
        const f: number = this.canvas.height / maxValue;
        const barWidth: number = this.canvas.width / values.length;

        for (let i: number = 0; i < values.length; i++) {
            const barHeight: number = values[i] * f * 0.9;
            const barX: number = i * barWidth + barWidth / 4;
            const barY: number = this.canvas.height - barHeight;

            context.fillRect(barX, barY, barWidth / 2, barHeight);

            if (options.stroke)
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