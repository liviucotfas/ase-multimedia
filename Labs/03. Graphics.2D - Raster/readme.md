# 2D Raster Graphics

<!-- vscode-markdown-toc -->
* 1. [Objectives](#Objectives)
* 2. [Documentation](#Documentation)
* 3. [Demos](#Demos)
* 4. [Assignments](#Assignments)
	* 4.1. [Assignment 1](#Assignment1)
	* 4.2. [Assignment 2](#Assignment2)
	* 4.3. [Assignment 3](#Assignment3)
	* 4.4. [Assignment 4](#Assignment4)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

##  1. <a name='Objectives'></a>Objectives
- drawing various shapes on the `canvas` (rectangles, lines, etc.);
- loading an image using drag and drop;
- loading an image using the file picker;
- loading an image using the clipboard;
- drawing the histogram for an image;
- applying various effects on an image;
- saving the content of the canvas as a `*.png` or `.jpeg` file.
##  2. <a name='Documentation'></a>Documentation
- HTML5 Canvas: <https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images>
- (optional) HTML Living Standard: <https://html.spec.whatwg.org/#the-canvas-element>

##  3. <a name='Demos'></a>Demos
-   Capture image from the web cam:
    <https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos>
-   Image zoom: <http://phrogz.net/tmp/canvas_image_zoom.html>
-   Image effects: <http://www.html5rocks.com/en/tutorials/canvas/imagefilters/>
- Slideshow: <https://www.google.com/logos/2016/slideshow/slideshow.html?doodle=holidays-2017-day-2&hl=fr>

##  4. <a name='Assignments'></a>Assignments
###  4.1. <a name='Assignment1'></a>Assignment 1
1. Try the "canvas-bar-chart" sample by clicking [here](https://ase-multimedia.azurewebsites.net/canvas-bar-chart). 
2. Check the source code in the `code-examples.zip` archive or in the `code-examples` folder. 
3. Complete the assignments included in the ```html``` file. 

###  4.2. <a name='Assignment2'></a>Assignment 2
The goal of the example is to create a histogram for an image loaded using drag and drop. 

> Histograms in Adobe PhotoShop: https://helpx.adobe.com/photoshop/using/viewing-histograms-pixel-values.html

1. Try the "canvas-drag-drop" sample by clicking [here](https://ase-multimedia.azurewebsites.net/canvas-drag-drop). 

    > HTML Drag and Drop API:
https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

2. Check the source code in the `code-examples.zip` archive or in the `code-examples` folder. 
3. Complete the assignments included in the ```html``` file. 
4. Allow the user to load images using `Ctrl+C` and `Ctrl+V` (hint: use the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)).

###  4.3. <a name='Assignment3'></a>Assignment 3
1. Try the "canvas-processing-2.html" sample by clicking [here](https://ase-multimedia.azurewebsites.net/canvas-processing-2). 
2. Check the source code in the `code-examples.zip` archive or in the `code-examples` folder. 
3. Complete the assignments included in the `js` file.

###  4.4. <a name='Assignment4'></a>Assignment 4
1. Try the "canvas-image-editor" sample by clicking [here](https://ase-multimedia.azurewebsites.net/canvas-image-editor). 
    > Note: only the "Normal" and the "Grayscale" effects are implemented.
2. Also try the sample on your mobile phone. Add a shortcut to the application on the homescreen of your phone as shown in the following image. Launch the application using the shortcut.

    ![](media/android-add-to-home-screen.jpg)
2. Download the `code-examples.zip` archive. We'll be doing all our coding work in a directory called `canvas-image-editor-dev`. The directory called `canvas-image-editor-final` contains the final version of the application.
3. Add an `html` file called `index.html` and add the code included below.
    ```html
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="utf-8" />
        <title>Image Editor</title>
        <meta name="description" content="HTML5 image editor.">

        <link rel="stylesheet" href="image-editor.css">
    </head>

    <body>
        <canvas id="visibleCanvas">
            Your browser does not support the canvas element.
        </canvas>

        <input type="file" id="fileBrowser" accept="image/*" placeholder="Choose an image" class="outline top">

        <div class="outline bottom">
            <button type="button" data-effect="normal">Normal</button>

            <button type="button" data-effect="grayscale">Grayscale</button>
            <button type="button" data-effect="threshold">Threshold</button>
            <button type="button" data-effect="sepia">Sepia</button>
            <button type="button" data-effect="invert">Invert Colors</button>
            <button type="button" data-effect="pixelate">Pixelate</button>
            <button type="button" data-effect="twoChannels">2 Channels</button>
            <button type="button" data-effect="red">Red</button>
            <button type="button" data-effect="green">Green</button>
            <button type="button" data-effect="blue">Blue</button>

            <button id="btnSave" type="button">Save</button>
        </div>

        <div class="loader hidden">
            <div id="spinner"></div>
        </div>
        
        <script src="image-editor.js"></script>
        <script src="main.js"></script>
    </body>

    </html>
    ```
4. In the ```<head>``` section of the HTML file add some additional metadata for controlling how the application will be displayed in a mobile browser

    ```HTML
     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ```

5. Add a `JavaScript` file called `image-editor.js` and reference it from the `html` as shown below.

    ```HTML
     <script src="image-editor.js"></script>
    ```

> Does it matter where (`<head>` or `<body>`) we reference this script within our HTML file? When will the code within be executed or be available for execution in each case?

6. Update the `image-editor.js` `JavaScript` file as follows.
   ```JavaScript
    class ImageEditor {

        #visibleCanvas;
        #visibleCanvasContext;
        #offscreenCanvas;
        #offscreenCanvasContext;

        #loader;

        #effect;

        constructor(visibleCanvas){
            this.#visibleCanvas = visibleCanvas;
            this.#visibleCanvasContext = this.#visibleCanvas.getContext("2d");
            this.#offscreenCanvas = document.createElement("canvas"); 
            this.#offscreenCanvasContext = this.#offscreenCanvas.getContext("2d");

            this.#loader = document.querySelector('.loader');
        }
    }
    ```
> Classes can be used in JavaScript just like in many other languages. However, they have not always been supported and there are different from more straightforward object-oriented languages such as Java. For more information you may consult https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Classes_in_JavaScript.

7. Add a `main.js` `JavaScript` file. Instantiate an `ImageEditor` object once the `DOM` has finished loading:

    ```JavaScript
    const visibleCanvas = document.getElementById("visibleCanvas");
    const imageEditor = new ImageEditor(visibleCanvas);
    ```

8. At the level of the `ImageEditor` class, add the method `drawImage` (used for displaying the image), `normal` (no effect, displaying the normal unaltered image) and `grayscale` (converting to black-and-white).

    ```JavaScript
    #drawImage () {
    
        //show spinner
        this.#loader.style.display = 'block';
    
        //https://developer.mozilla.org/en-US/docs/Web/API/Performance/now
        const t0 = performance.now();
        console.log("t0: "+t0);
    
        switch (this.#effect) {
            case "normal":
                this.#normal();
                break;
            case "grayscale":
                this.#grayscale();
                break;
        }
    
        const t1 = performance.now();
        console.log(t1-t0 + ": drawing the image on the canvas");    
        this.#loader.style.display = 'none';
    }

    #normal () {
        this.#visibleCanvasContext.drawImage(this.#offscreenCanvas, 0, 0);
    }
    
    #grayscale () {   
        const imageData = this.#offscreenCanvasContext.getImageData(
            0, 0, this.#offscreenCanvas.width, this.#offscreenCanvas.height);
        const pixels = imageData.data;
    
        for (let i = 0; i < pixels.length; i += 4)
            pixels[i] = pixels[i + 1] = pixels[i + 2] = Math.round((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);
            
        this.#visibleCanvasContext.putImageData(imageData, 0, 0); 
    }
    ```

9. Add the `changeEffect` method, that will be used for changing the current effect.

    ```JavaScript
    changeEffect (effect) {
        if (effect !== this.#effect) {
            this.#effect = effect;
            this.#drawImage();
        }
    }
    ```

10. In file `main.js`, call the `changeEffect` method when a button is pressed in the UI:

    ```JavaScript
    const buttons = document.querySelectorAll("[data-effect]");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () { imageEditor.changeEffect(this.dataset.effect) });
    }
    ```

> More about the `data-` attribute: https://developer.mozilla.org/en/docs/Web/Guide/HTML/Using_data_attributes

11. Let's define the public method `changeImage`, which will set the current image when the user loads an image for processing:

    ```JavaScript
    changeImage (img) {
        this.#offscreenCanvas.width = this.#visibleCanvas.width = img.naturalWidth;
        this.#offscreenCanvas.height = this.#visibleCanvas.height = img.naturalHeight;

        this.#offscreenCanvasContext.drawImage(img,0,0);

        this.changeEffect("normal");
    }
    ```

12. In the `main.js` file, handle the `change` event of the file input as follows.

    ```JavaScript
    document.getElementById("fileBrowser").addEventListener("change", function (ev) {
        //1. create the reader
        const reader = new FileReader();
        //2. attach events
        reader.addEventListener('load', function (ev) {
            const dataUrl = ev.target.result;

            const img = document.createElement("img");
            img.addEventListener("load", function () {
                imageEditor.changeImage(img);
            });
            img.src = dataUrl;
        });
        //3. start loading the file
        reader.readAsDataURL(ev.target.files[0]);
    });
    ```

13. Let's add a way for the user to save the processed image by implementing the `saveImage` public method:

    ```JavaScript
    saveImage () {
        const a = document.createElement("a");

        // You can also use the `toBlob` and `URL.createObjectURL(blob)` methods
        a.href = this.#visibleCanvas.toDataURL("image/png", 1);
        
        // Download attribute: download file when clicking on the link (instead of navigating to the file)
        // http://www.w3schools.com/tags/att_a_download.asp
        a.download = "image.png";
        
        // Simulate a click on the link
        a.click();
    }
    ```

14. Let's call this method when the user clicks on the appropriate button in the UI:

    ```JavaScript
    document.getElementById("btnSave").addEventListener("click", function () {
        imageEditor.saveImage();
    })
    ```

15. Let's make the application more mobile friendly by defining icons, theme-color, etc.

    ```HTML
    <meta name="theme-color" content="#2F3BA2">
    <link rel="apple-touch-icon" href="img/icons/icon-152x152.png">
    ```

16. Add a manifest file, called `manifest.json`. 

    ```JSON
    {
        "short_name": "Image Editor",
        "name": "Image Editor",
        "description": "HTML5 Image Editor",
        "icons": [
            {
            "src": "img/icons/icon-128x128.png",
            "sizes": "128x128",
            "type": "image/png"
            },
            {
            "src": "img/icons/icon-144x144.png",
            "sizes": "144x144",
            "type": "image/png"
            },
            {
            "src": "img/icons/icon-152x152.png",
            "sizes": "152x152",
            "type": "image/png"
            },
            {
            "src": "img/icons/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
            },
            {
            "src": "img/icons/icon-256x256.png",
            "sizes": "256x256",
            "type": "image/png"
            },
            {
            "src": "img/icons/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
            },
            {
            "src": "img/icons/maskable_icon.png",
            "sizes": "1024x1024",
            "type": "image/png",
            "purpose": "maskable"
            }
        ],
        "start_url": "index.html",
        "background_color": "#3E4EB8",
        "display": "standalone",
        "scope": "https://ase-multimedia.azurewebsites.net/canvas-image-editor/",
        "theme_color": "#2F3BA2"  
    }
    ```

17. Finish converting the application into a progressive web app (PWA) by:
    - adding a Service Worker
    - handling HTTP requests using the `caches` API
    - passing the audits in Lighthouse
    - allowing the user to install the application

##  5. Bibliography
- HTML5 Canvas: <https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images>
-   [Canvas Pocket Reference](http://ase.softmentor.ro/Multimedia/resurse/OReilly%20-%20Canvas%20Pocket%20Reference.pdf) -  Chapter 1.
- (optional) HTML Living Standard: <https://html.spec.whatwg.org/#the-canvas-element>
- Graphics on the web: <https://developer.mozilla.org/en-US/docs/Web/Guide/Graphics>
- Progressive Web Apps (PWAs): <https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps>