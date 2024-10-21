//http://exploringjs.com/es6/ch_classes.html
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
class BarChart{
    #svgns = "http://www.w3.org/2000/svg";
    #svg;

    /**
     * Creates a new bar chart
     * @param {HTMLElement} domElement 
     */
    constructor(domElement) {
        this.#createSVG();
        domElement.appendChild(this.#svg);
    }

    /**
     * Displays the bar chart
     * @param {Array<Array<>} data 
     */
    draw(data){
        // Clear the chart
        this.#svg.replaceChildren();

        // Add the bars
        const barWidth = this.#svg.clientWidth / data.length;

        const f = this.#svg.clientHeight / Math.max(...data.map(x=>x[1]));

        for(let i=0; i<data.length; i++){
            const element = data[i];

            const label = element[0];
            const value = element[1];

            const barHeight = value * f * 0.9;
            const barY = this.#svg.clientHeight - barHeight;
            const barX = i * barWidth + barWidth/4;

            const bar = document.createElementNS(this.#svgns, 'rect');
            bar.classList.add('bar');
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
    #createSVG(){
        this.#svg = document.createElementNS(this.#svgns, "svg");
             
        this.#svg.style.borderColor = 'black';
        this.#svg.style.borderWidth = '1px';
        this.#svg.style.borderStyle = 'solid';
        this.#svg.style.backgroundColor = 'WhiteSmoke';
        //or
        //this.#svg.setAttribute('style', 'border: 1px solid black'); 
        
        this.#svg.setAttribute('width', '100%'); //note: this.#svg.width is readonly
        this.#svg.setAttribute('height', '100%');
    }
}