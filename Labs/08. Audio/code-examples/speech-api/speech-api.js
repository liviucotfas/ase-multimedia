// Documentation for the speech recognition API:
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
//
// This application requires HTTPS, including on localhost:
// https://stackoverflow.com/questions/47226889/speechrecognition-network-error-when-working-with-electron-chromium-browser
// 
// How to set up https on localhost:
// https://github.com/liviucotfas/ase-multimedia/blob/master/Labs/08.%20Audio/https-on-localhost.md
//
const app = {
    interimSpan: null,
    recognition: null, //webkitSpeechRecognition object
    recognizing: false,
    ignoreOnend: null, // set to true when an error has been encountered
    startTimestamp: null // used for detecting errors
};

app.init = function (interimSpan) {
    if (!('webkitSpeechRecognition' in window)) {
        console.error('app.init: Your browser does not support the Speech Recognition API.');
    } else {
        app.interimSpan = interimSpan;
        app.recognition = new webkitSpeechRecognition();
        app.recognition.continuous = true;
        app.recognition.interimResults = true;

        app.recognition.onstart = function () {
            app.recognizing = true;
            app.changeState('info_speak_now');
        };

        app.recognition.onerror = function (event) {
            if (event.error == 'no-speech') {
                app.changeState('info_no_speech');
                app.ignoreOnend = true;
            }
            if (event.error == 'audio-capture') {
                app.changeState('info_no_microphone');
                app.ignoreOnend = true;
            }
            if (event.error == 'not-allowed') {
                if (event.timeStamp - app.startTimestamp < 100) {
                    app.changeState('info_blocked');
                } else {
                    app.changeState('info_denied');
                }
                app.ignoreOnend = true;
            }
        };

        app.recognition.onend = function () {
            app.recognizing = false;
            if (app.ignoreOnend) {
                return;
            }

            app.changeState('info_start');

            if (window.getSelection) {
                window.getSelection().removeAllRanges();
                var range = document.createRange();
                range.selectNode(document.getElementById('final_span'));
                window.getSelection().addRange(range);
            }
        };

        app.recognition.onresult = function (event) {
            let interimTranscript = '';
            if (typeof (event.results) == 'undefined') {
                app.recognition.onend = null;
                app.recognition.stop();
                return;
            }

            let finalTranscript = '';

            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            finalTranscript = app.capitalize(finalTranscript);

            const finalSpan = document.getElementById('final_span');
            finalSpan.innerText = finalSpan.innerText + finalTranscript;

            app.interimSpan.innerHTML = interimTranscript;
        };
    }
}

app.startButton = function (event) {
    if (app.recognizing) {
        app.recognition.stop();
        return;
    }

    app.interimSpan.innerHTML = '';

    app.recognition.lang = 'ro-ro';
    app.recognition.start();
    app.ignoreOnend = false;

    app.startTimestamp = event.timeStamp;
}

app.changeState = function (s) {
    const infoSection = document.getElementById('info');
    for (let i = 0; i < infoSection.children.length; i++) {
        infoSection.children[i].classList.add('hidden');
    }
    const sTextElement = document.getElementById(s);
    sTextElement.classList.remove('hidden');

    const image = document.getElementById('start_img');
    if (s === "info_speak_now") {
        image.src = 'img/mic-animate.gif';
    } else {
        image.src = 'img/mic.gif';
    }
}

// Helper Methods
app.capitalize = function (s) {
    return s.replace(/\S/, function (m) { return m.toUpperCase(); });
}

window.addEventListener('load', () => {
    const span = document.getElementById('interim_span');
    app.init(span);
    app.changeState('info_start');
});