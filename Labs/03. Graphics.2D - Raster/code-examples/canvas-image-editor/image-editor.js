/* Assignment
1. Implement threshold. Also check how the effect should look like: https://www.google.com/search?q=threshold+photoshop
Hint: v = (0.2126*r + 0.7152*g + 0.0722*b >= threshold) ? 255 : 0; r’= g’ = b’ = v
2. Implement sephia
Hint: 
r' = (r * .393) + (g *.769) + (b * .189)
g' = (r * .349) + (g *.686) + (b * .168)
b' = (r * .272) + (g *.534) + (b * .131)
3. Implement invert (negative)
Hint: r' = 255 – r; g' = 255 – g; b' = 255 – b;
4. Implement red
Hint: r'=r; g'=0; b'=0;
5. Implement green
Hint: r'=0; g'=g; b'=0;
6. Implement blue
Hint: r'=0; g'=0; b'=b;
7. Implement 2Channels
Hint: check https://gist.github.com/anonymous/1888841
8. Make the image darker
Hint: r' = r - v; g' = g - v; b' = b - v;
9. Make the image brighter
Hint: r' = r + v; g' = g + v; b' = b + v;
10. Implement pixelate
Hint: check https://gist.github.com/anonymous/1888841
11. Only display the download link when an effect is applied
12. Implement a color picker.
Hint: 
- check https://github.com/mdn/dom-examples/blob/master/canvas/pixel-manipulation/color-picker.js
- handle the `mousemove` event as use `offsetX` and `offsetY`
- make sure that the color picker continues to work when you reduce the size of the browser window (clientWidth)
13. Display the button for the currently selected effect with a different color.
Hint: use the .classList property and add()/remove() methods or the .className property 
14. (optional) Use Bootstrap for the UI (https://getbootstrap.com/)
15. (optional) Adjust the brightness effect using a slider
16. (optional) Adjust the threshold effect using a slider
17. (optional)Check web workers as a way to perfrom heavy processing without blocking the UI thread
Hint: https://stackoverflow.com/questions/8170431/using-web-workers-for-drawing-using-native-canvas-functions
*/

class ImageEditor {
    // Private fields: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields
    #visibleCanvas;
    #visibleCanvasContext;
    #offscreenCanvas;
    #offscreenCanvasContext;

    #donwloadLink;
    #loader;

    #currentEffect;

    constructor(){
        this.#visibleCanvas = document.getElementById("visibleCanvas");
        this.#visibleCanvasContext = this.#visibleCanvas.getContext("2d");
        this.#offscreenCanvas = document.createElement("canvas");
        this.#offscreenCanvasContext = this.#offscreenCanvas.getContext("2d");

        this.#donwloadLink = document.getElementById("donwloadLink");      
        this.#loader = document.querySelector('.loader');
    }
    /**
     * 
     * @param {HtmlImageElement} img 
     */
    changeImage(img){
        this.#offscreenCanvas.width = this.#visibleCanvas.width = img.naturalWidth;
        this.#offscreenCanvas.height = this.#visibleCanvas.height = img.naturalHeight;

        this.#offscreenCanvasContext.drawImage(img,0,0);

        this.changeEffect("normal");
    }
    /** Changes the effect
     * @param {string} effect - The new effect
     */
    changeEffect(effect){
        if(effect !== this.#currentEffect)
        {
            this.#currentEffect = effect;
            this.#drawImage();
        }
    }
    #drawImage(){
    
        //show spinner
        this.#loader.style.display = 'block';
    
        //https://developer.mozilla.org/en-US/docs/Web/API/Performance/now
        const t0 = performance.now();
        console.log("t0: "+t0);
    
        switch (this.#currentEffect) {
            case "normal":
                this.#normal();
                break;
            case "grayscale":
                this.#grayscale();
                break;
        }
    
        const t1 = performance.now();
        console.log(t1-t0 + ": drawing the image on the canvas");
    
        this.#visibleCanvas.toBlob((blob)=>{
            const blobUrl = URL.createObjectURL(blob);
            this.#donwloadLink.href = blobUrl;
        },"image/png");
    
        this.#loader.style.display = 'none';
    }
    #normal(){
        this.#visibleCanvasContext.drawImage(this.#offscreenCanvas, 0, 0);
    }
    #grayscale(){   
        const imageData = this.#offscreenCanvasContext.getImageData(
            0, 0, this.#offscreenCanvas.width, this.#offscreenCanvas.height);
        const pixels = imageData.data;
    
        for (let i = 0; i < pixels.length; i += 4)
            pixels[i] = pixels[i + 1] = pixels[i + 2] = Math.round((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);
            
        this.#visibleCanvasContext.putImageData(imageData, 0, 0); 
    }
}