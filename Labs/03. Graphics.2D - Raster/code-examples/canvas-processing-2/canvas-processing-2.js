"use strict";

/* Assignment
1. Implement the "convertToGreyScale" function
Hint:   
function (x, y, r, g, b, a) {var average = (r + g + b) / 3; return [average, average, average];}
2. Add a new div with the id "originalImage". Display the initial image ("img" variable bellow) in this div.
Hint: use the empty() and append() jQuery methods
3. Open the Developer Tools in the browser of your choice. Choose the Console tab. Click the browse button in the application and afterwards choose the Cancel option. An error will be displayed in the console tab. Try to fix it.
*/

class App{
    constructor(canvasImage, canvasHistogram){
        this.canvasImage = canvasImage;
        this.canvasHistogram = canvasHistogram;
        this.histogram = new Histogram(canvasHistogram);
    }

    loadFile(file) {
        //1. create the reader
        var reader = new FileReader();
        //2. attach events
        reader.addEventListener('load', function(event){
            //1. create the image element
            var img = new Image();
            //2. attach events
            img.addEventListener('load', function(e){
                this.displayImageOnCanvas(e.target);
                this.drawHistogram();            
                this.convertToGreyScale();
            }.bind(this));
            img.onerror = function (msg, source, lineNo) {
                alert("Mesaj eroare: {0}".format(msg));
            }.bind(this);
            //3. start loading the image
            img.src = event.target.result;
        }.bind(this));
        //3. start loading the file
        reader.readAsDataURL(file);
    }

    displayImageOnCanvas(img){
        app.canvasImage.height = img.height;
        app.canvasImage.width = img.width;

        var context =  app.canvasImage.getContext("2d");
        context.drawImage(img, 0, 0);

        context.font = "bold 10pt sans-serif";
        context.fillStyle = "#EFEFEF";

        context.fillText(img.src, 8, 25);
    }

    drawHistogram(){
        let result = DrawingLibrary.analyzeColorChannels(app.canvasImage);
        app.histogram.draw(result.vR, result.vG, result.vB);
    }

    convertToGreyScale (){
        DrawingLibrary.convertToGreyScale(app.canvasImage);
    }
}


//extends the string prototype object
//Inheritance and the prototype chain: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain 
// "{0} {1}".format(10, 9)
String.prototype.format = String.prototype.f = function () {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace('{' + i + '}', arguments[i]);
    }
    return s;
};