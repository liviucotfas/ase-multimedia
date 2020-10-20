//http://exploringjs.com/es6/ch_classes.html
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
class BarChart{
    constructor(canvas) {
        this.canvas = canvas;
    }
    draw(values){
        
        let context = this.canvas.getContext('2d');

        let cW = this.canvas.width;
        let cH = this.canvas.height;

        context.clearRect(0, 0, cW, cH);
        
        //Saves the entire state of the canvas by pushing the current state onto a stack.
        //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save
        context.save();

        //256 shades of grey
        let n = values.length;      
        
        //flip the histogram
        //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate
        //The rotation center point is always the canvas origin.
        // To change the center point, we will need to move the canvas by using the translate() method.
        context.rotate(Math.PI);
        // translate it
        context.translate(0, -cH);
        
        //Function.prototype.apply()
        //The apply() method calls a function with a given this value and arguments provided as an array
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
        //let f = cH / Math.max.apply(this, v);
        let f = cH / Math.max(...values); //...spread operator
        //var f = cH / Math.max(v) will not work, because max doesn't accept an array as input.
        //http://stackoverflow.com/questions/21255138/how-does-the-math-max-apply-work


        //The CanvasRenderingContext2D.scale() method of the Canvas 2D API adds a scaling transformation to the canvas units by x horizontally and by y vertically.
        //void ctx.scale(x, y); x: Scaling factor in the horizontal direction. y: Scaling factor in the vertical direction. 
        //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale
        //You can use ctx.scale(-1, 1) to flip the context horizontally and ctx.scale(1, -1) to flip it vertically.
        context.scale(-1, f); //flip (necessary due to  c.rotate(Math.PI);) & scale
                    
        //drawing color and transparency
        context.fillStyle = 'rgba(255,0,0,0.8)';
        
        //Determin the width of the rectangle for each shade of grey
        let w = cW / n;
        for (let i = 0; i < n; i++) {
            // -i * w = x coordinate
            // 0 = y coordinate
            // w = width of the rectangle as computed above
            // v[i] = height of the rectangle. The value will be scaled automatically due to c.scale(-1, f);

            let rectWidth = w;
            let rectHeight = values[i];
            let rectX = i * w;
            let rectY = 0;

            context.fillRect(rectX, rectY, rectWidth, rectHeight);
        }

        //Restores the most recently saved canvas state by popping the top entry in the drawing state stack.
        //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore
        context.restore();
    }
}

