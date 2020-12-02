# HTML5 Audio

<!-- vscode-markdown-toc -->
* 1. [Objectives](#Objectives)
* 2. [Documentation](#Documentation)
* 3. [Demos](#Demos)
* 4. [Assignments (Solved)](#AssignmentsSolved)
	* 4.1. [Assignment 1](#Assignment1)
	* 4.2. [Assignment 2](#Assignment2)
	* 4.3. [Assignment 3](#Assignment3)
* 5. [Bibliography](#Bibliography)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

##  1. <a name='Objectives'></a>Objectives
- playing audio files in the browser using the `<audio>` element;
- controlling the audio playback (play/pause/stop/etc.) using the `HTMLAudioElement` interface;
- capturing sound from the microphone using the `Web RTC API`;
- analyzing the sound using the `Web Audio API` and displaying sound visualisations;
- performing speech recognition using the `Speech API`.

##  2. <a name='Documentation'></a>Documentation
- Video and audio content: <https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content>
-   HTML Audio Element (HTML):
    <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio>
-   HTMLAudioElement interface (JavaScript - HTML Media API):
    <https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement>
-   Web Audio API:
    <https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API>
-   Web RTC API:
    <https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia>
- Speech API: <https://w3c.github.io/speech-api/webspeechapi.html>, <https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition>
- Audio and Video Delivery: https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery
- Audio and Video Manipulation: https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_manipulation

##  3. <a name='Demos'></a>Demos

-   Processing sound
    <https://www.html5rocks.com/en/tutorials/webaudio/intro/>
-   Sound visualization and music composition:
    <https://googlechromelabs.github.io/web-audio-samples>
-   Creating visualizations:
    <https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API>
-   Record and save as MP3:
    <http://audior.ec/blog/recording-mp3-using-only-html5-and-javascript-recordmp3-js/>
    , <https://www.html5rocks.com/en/tutorials/getusermedia/intro/>
- Various demos: https://www.chromestatus.com/samples

##  4. <a name='AssignmentsSolved'></a>Assignments

> A large collection of stock audio that you can use in your applications is available at: https://www.pond5.com

###  4.1. <a name='Assignment1'></a>Assignment 1
1. Try the "audio-playlist" sample by clicking [here](https://ase-multimedia.azurewebsites.net/audio-playlist).
2. Check the source code.
	> Similar examples: https://521dimensions.com/open-source/amplitudejs, https://codepen.io/markhillard/pen/Hjcwu, https://codepen.io/craigstroman/pen/aOyRYx
3. Allow the user to change the volume level using a slider.
4. Allow the user to change the current position inside the track with the help of a slider.
5. Instead of declaring the playlist in the `HTML` file, declare it as an array in your `JavaScript` file. The playlist in the interface should be constructed from this array.
   
	> The same approach is used for example by [AmplitudeJS](https://521dimensions.com/open-source/amplitudejs/docs/configuration/playlists.html)

	```JavaScript
	songs: [
	{
		"name": "Risin' High (feat Raashan Ahmad)",
		"artist": "Ancient Astronauts",
		"album": "We Are to Answer",
		"url": "../songs/Ancient Astronauts - Risin' High (feat Raashan Ahmad).mp3",
		"cover_art_url": "../album-art/we-are-to-answer.jpg"
	},
	{
		"name": "The Gun",
		"artist": "Lorn",
		"album": "Ask The Dust",
		"url": "../songs/08 The Gun.mp3",
		"cover_art_url": "../album-art/ask-the-dust.jpg",
	},
	{
		"name": "Anvil",
		"artist": "Lorn",
		"album": "Anvil",
		"url": "../songs/LORN - ANVIL.mp3",
		"cover_art_url": "../album-art/anvil.jpg",
	}]
	```

###  4.2. <a name='Assignment2'></a>Assignment 2
1. Try the "audio-web-audio-api" sample by clicking [here](https://ase-multimedia.azurewebsites.net/audio-web-audio-api).
2. Check the source code.

###  4.3. <a name='Assignment3'></a>Assignment 3
1. Try the "speech-api" sample by clicking [here](https://ase-multimedia.azurewebsites.net/speech-api).
2. Check the source code.

##  5. <a name='Bibliography'></a>Bibliography
-   HTML Audio Element (HTML):
    <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio>
-   HTMLAudioElement interface (JavaScript - HTML Media API):
    <https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement>
-   Web Audio API:
    <https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API>
-   Web RTC API:
    <https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia>
- Speech API: <https://w3c.github.io/speech-api/webspeechapi.html>, <https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition>
