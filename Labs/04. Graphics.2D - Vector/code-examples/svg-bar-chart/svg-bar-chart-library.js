//http://exploringjs.com/es6/ch_classes.html
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
class BarChart{
    #svgns;
    #domElement;
    #svg;
    #width;
    #height;

    /**
     * Creates a new bar chart
     * @param {HTMLElement} domElement 
     */
    constructor(domElement) {
        this.#domElement = domElement;
        this.#svgns  = "http://www.w3.org/2000/svg";
    }

    /**
     * Displays the bar chart
     * @param {Array} data 
     */
    draw(data){
        this.data = data;
        this.#width = this.#domElement.clientWidth;
        this.#height = this.#domElement.clientHeight;

        this.#createSVG();
        this.#drawBackground();
        this.#drawBars();

        this.#domElement.appendChild(this.#svg);
    }
    #createSVG(){
        this.#svg = document.createElementNS(this.#svgns, "svg");
             
        this.#svg.style.borderColor = 'black';
        this.#svg.style.borderWidth = '1px';
        this.#svg.style.borderStyle = 'solid';
        //or
        //this.#svg.setAttribute('style', 'border: 1px solid black'); 
        
        this.#svg.setAttribute('width', this.#width); //note: this.#svg.width is readonly
        this.#svg.setAttribute('height', this.#height);
    }
    #drawBackground(){
        const rect = document.createElementNS(this.#svgns, 'rect');
        rect.setAttribute('x', 0);
        rect.setAttribute('y', 0);
        rect.setAttribute('height', this.#height);
        rect.setAttribute('width', this.#width);
        
        rect.style.fill = 'WhiteSmoke';
        //rect.setAttribute("fill", 'WhiteSmoke'); //! not recommended
        
        this.#svg.appendChild(rect);
    }
    #drawBars(){
        const barWidth = this.#width / this.data.length;

        const f = this.#height / Math.max(...this.data.map(x=>x[1]));

        for(let i=0; i<this.data.length; i++){

            const label = this.data[i][0];
            const value = this.data[i][1];

            const barHeight = value * f * 0.9;
            const barY = this.#height - barHeight;
            const barX = i * barWidth + barWidth/4;

            const bar = document.createElementNS(this.#svgns, 'rect');
            bar.setAttribute('class','bar');
            //or
            //bar.classList.add('bar'); //!recommended
            bar.setAttribute('x', barX);
            bar.setAttribute('y', barY);
            bar.setAttribute('height', barHeight);
            bar.setAttribute('width', barWidth/2);

            //note: if the styles are set using CSS .bar:hover {...} will only work if marked as !important
            //the styling should be moved to the .bar {...} instead
            bar.style.fill = '#db4437';
            bar.style.strokeWidth = 2;
            bar.style.stroke = "black";
            this.#svg.appendChild(bar);

            const text = document.createElementNS(this.#svgns, 'text');
            text.appendChild(document.createTextNode(label));
            text.setAttribute('x', barX);
            text.setAttribute('y', barY - 10);
            this.#svg.appendChild(text);
        }
    }
}