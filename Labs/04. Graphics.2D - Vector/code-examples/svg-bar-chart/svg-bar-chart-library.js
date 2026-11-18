//http://exploringjs.com/es6/ch_classes.html
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
export class BarChart{
    #svgns = "http://www.w3.org/2000/svg";
    #svg;

    /**
     * Creates a new bar chart
     * @param {HTMLElement} domElement The HTML container that will hold the chart.
     */
    constructor(domElement) {
        this.#createSVG();
        domElement.appendChild(this.#svg);
    }

    /**
     * Displays the bar chart
     * @param {Array<[string, number]> | null} [data] An empty array, null, or an omitted value clears the chart.
     * @returns {void}
     */
    draw(data){
        // Clear the chart
        this.#svg.replaceChildren();

        if (data == null || data.length === 0) {
            return;
        }

        // Add the bars
        const barWidth = this.#svg.clientWidth / data.length;

        const maxValue = Math.max(...data.map(([, value]) => value));
        const f = maxValue === 0 ? 0 : this.#svg.clientHeight / maxValue;

        for(let i=0; i<data.length; i++){
            const element = data[i];

            const label = element[0];
            const value = element[1];

            const barHeight = value * f * 0.9;
            const barY = this.#svg.clientHeight - barHeight;
            const barX = i * barWidth;

            const bar = document.createElementNS(this.#svgns, 'rect');
            bar.classList.add('bar');
            bar.setAttribute('x', barX + barWidth / 4);
            bar.setAttribute('y', barY);
            bar.setAttribute('height', barHeight);
            bar.setAttribute('width', barWidth / 2);

            // Presentation attributes provide defaults that page CSS can override.
            bar.setAttribute('fill', '#db4437');
            bar.setAttribute('stroke-width', '2');
            bar.setAttribute('stroke', 'black');
            this.#svg.appendChild(bar);

            const text = document.createElementNS(this.#svgns, 'text');
            text.textContent = label;
            text.setAttribute('x', barX + barWidth / 2);
            text.setAttribute('y', this.#svg.clientHeight - 5);
            text.setAttribute('text-anchor', 'middle');
            this.#svg.appendChild(text);
        }
    }
    #createSVG(){
        this.#svg = document.createElementNS(this.#svgns, "svg");
             
        this.#svg.style.borderColor = 'black';
        this.#svg.style.borderWidth = '1px';
        this.#svg.style.borderStyle = 'solid';
        this.#svg.style.backgroundColor = 'WhiteSmoke';
        
        this.#svg.setAttribute('width', '100%'); //note: this.#svg.width is readonly
        this.#svg.setAttribute('height', '100%');
    }
}