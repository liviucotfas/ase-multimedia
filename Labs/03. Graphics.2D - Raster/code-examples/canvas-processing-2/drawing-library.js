class DrawingLibrary {
    static processImage(canvas, action) {
        var context = canvas.getContext("2d");
    
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
    
        // iterate over all pixels based on x and y coordinates.
    
        // loop through each row
        for (var y = 0; y < canvas.height; y++) {
            // loop through each column
            for (var x = 0; x < canvas.width; x++) {
                var offset = ((canvas.width * y) + x) * 4;
    
                var red = data[offset];
                var green = data[offset + 1];
                var blue = data[offset + 2];
                var alpha = data[offset + 3];
    
                var result = action(x, y, red, green, blue, alpha);
    
                if (typeof (result) != "undefined" && result instanceof Array) {
                    for (var i = 0; i < result.length; i++) {
                        data[offset + i] = result[i];
                    }
                }
            }
        }
    
        // draw the new image
        context.putImageData(imageData, 0, 0);
    }

    static analyzeColorChannels(canvasImage){
        var vR = new Array(); //equivalent to var vR = []; Futher reading: http://www.w3schools.com/js/js_arrays.asp
        var vG = [];
        var vB = [];
        for (var i = 0; i < 256; i++){ 
            vR[i] = 0; vG[i] = 0; vB[i] = 0; 
        }
    
        DrawingLibrary.processImage(canvasImage,
            function (x, y, r, g, b, a) {
                vR[r]++; vG[g]++; vB[b]++;
            });

        return {vR,vG,vB};
    }

    static convertToGreyScale(canvasImage) {

    }
}