class Histogram{
    constructor(canvas){
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
    }
    draw(vR, vG, vB){

        //Saves the entire state of the canvas by pushing the current state onto a stack.
        //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save
        this.context.save();

        //draw the background of the histogram
        this.context.fillStyle = "#DEDEDE";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        var h = this.canvas.height;
        var w = this.canvas.width / vR.length;
                   
        var f = this.canvas.height * 0.9 / Math.max(... [].concat(vR, vG, vB));
    
        for (var i = 0; i < vR.length; i++) {
    
            this.context.fillStyle = "rgba(10%,10%,10%,0.2)";
            //rgba(red, green, blue, alpha) 
            //The alpha parameter is a number between 0.0 (fully transparent) and 1.0 (fully opaque).
            this.context.fillRect(i * w, h - (vR[i] + vG[i] + vB[i]) * f, w, (vR[i] + vG[i] + vB[i]) * f);
    
            this.context.fillStyle = "rgba(100%,0%,0%,0.3)";
            this.context.fillRect(i * w, h - vR[i] * f, w, vR[i] * f);
    
            this.context.fillStyle = "rgba(0%,100%,0%,0.3)";
            this.context.fillRect(i * w, h - vG[i] * f, w, vG[i] * f);
    
            this.context.fillStyle = "rgba(0%,0%,100%,0.3)";
            this.context.fillRect(i * w, h - vB[i] * f, w, vB[i] * f);
        }

        //Restores the most recently saved canvas state by popping the top entry in the drawing state stack.
        //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore
        this.context.restore();
    }
}