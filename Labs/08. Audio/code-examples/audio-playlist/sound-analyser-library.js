"use strict";

//Details regarding building Visualizations using Web Audio API
//https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API

class SoundAnalyser {
  /**
   * 
   * @param {HTMLCanvasElement} canvas 
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");

    //The AudioContext interface represents an audio-processing graph built from audio modules linked together, each represented by an AudioNode. An audio context controls both the creation of the nodes it contains and the execution of the audio processing, or decoding. You need to create an AudioContext before you do anything else, as everything happens inside a context.
    this.audioCtx = new AudioContext();

    //Creates an AnalyserNode, which can be used to expose audio time and frequency data and for example to create data visualisations.
    //More details: https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createAnalyser
    this.analyser = this.audioCtx.createAnalyser();
  }
  /**
   * 
   * @param {string} visualSetting 
   */
  display(visualSetting) {
    window.cancelAnimationFrame(this.drawVisual);

    this.audioCtx.resume();  

    if (visualSetting == "frequencybars") {
      //Is an unsigned long value representing the size of the FFT (Fast Fourier Transform) to be used to determine the frequency domain.
      //More info: https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize
      this.analyser.fftSize = 256;
      this.drawFrequencyBars();
    } else if (visualSetting == "sinewave") {
      this.analyser.fftSize = 1024;
      this.drawSineWave();
    }
  }

  /**
   * 
   * @param {MediaStream} stream 
   */
  setStreamSource(stream) {
    const source = this.audioCtx.createMediaStreamSource(stream);
    // Connect the output of the source to the input of the analyser
    source.connect(this.analyser);
  }
  /**
   * 
   * @param {HTMLMediaElement} mediaElement 
   */
  setMediaElementSource(mediaElement){
    const source = this.audioCtx.createMediaElementSource(mediaElement);
    // Connect the output of the source to the input of the analyser
    source.connect(this.analyser)
    // Connect the output of the analyser to the destination
    this.analyser.connect(this.audioCtx.destination);
  }
  drawFrequencyBars() {
    this.context.fillStyle = 'rgb(0, 0, 0)';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    //Is an unsigned long value half that of the FFT size. 
    let bufferLength = this.analyser.frequencyBinCount;

    //Copies the current frequency data into a Uint8Array array passed into it.
    let dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray); //Value btween 0 and 255
    //http://stackoverflow.com/questions/14789283/what-does-the-fft-data-in-the-web-audio-api-correspond-to/14789992#14789992

    let barWidth = this.canvas.width / bufferLength;
    let barHeight;

    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] + 10;

      this.context.fillStyle = 'rgb(' + Math.min(barHeight * 2, 255) + ',50,50)';
      this.context.fillRect(barWidth * i, this.canvas.height - barHeight, barWidth, barHeight);
    }

    //The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint. The method takes as an argument a callback to be invoked before the repaint.
    //Return value: A long integer value, the request id, that uniquely identifies the entry in the callback list. This is a non-zero value, but you may not make any other assumptions about its value. You can pass this value to window.cancelAnimationFrame() to cancel the refresh callback request.
    //More info: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    this.drawVisual = requestAnimationFrame(() => this.drawFrequencyBars());
  }
  drawSineWave() {
    let bufferLength = this.analyser.fftSize;
    let dataArray = new Float32Array(bufferLength);
    this.analyser.getFloatTimeDomainData(dataArray);

    this.context.fillStyle = 'rgb(200, 200, 200)';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.lineWidth = 2;
    this.context.strokeStyle = 'rgb(0, 0, 0)';

    this.context.beginPath();

    let sliceWidth = this.canvas.width * 1.0 / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {

      let v = dataArray[i] * 200.0;
      let y = this.canvas.height / 2 + v;

      if (i === 0) {
        this.context.moveTo(x, y);
      } else {
        this.context.lineTo(x, y);
      }

      x += sliceWidth;
    }

    this.context.lineTo(this.canvas.width, this.canvas.height / 2);
    this.context.stroke();

    this.drawVisual = requestAnimationFrame(() => this.drawSineWave());
  }
}