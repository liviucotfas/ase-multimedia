'use strict';

//http://exploringjs.com/es6/ch_classes.html
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
class BarChart{
    constructor(canvas) {
        this.canvas = canvas;
    }
    draw(values){
        let context = this.canvas.getContext('2d');
    
        let h = this.canvas.height;
        let w = this.canvas.width / values.length;
    
        context.fillStyle = '#DEDEDE';
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
        context.fillStyle = 'red';
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        
        //...spread operator
        let maxValue = Math.max(...values);
        let f = this.canvas.height / maxValue;
    
        for (let i = 0; i < values.length; i++) {
    
            let rectWidth = w * 0.8;
            let rectHeight = values[i] * f * 0.9;
            let rectX = (i + 0.1) * w;
            let rectY = h - rectHeight;
    
            context.fillRect(rectX, rectY, rectWidth, rectHeight);
            context.strokeRect(rectX, rectY, rectWidth, rectHeight);
    
            /* Equivalent to:
            context.beginPath();
            context.rect(rectX, rectY, rectWidth, rectHeight);
            context.fill();
            context.stroke();*/
        }
    }
}

