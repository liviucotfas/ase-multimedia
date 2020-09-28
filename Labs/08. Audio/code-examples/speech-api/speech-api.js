"use strict";

changeState('info_start');

var recognition; //webkitSpeechRecognition object

var recognizing = false;
var ignore_onend; // set to true when an error has been encountered
var start_timestamp; // used for detecting errors

$(document).ready(function () {

    if (!('webkitSpeechRecognition' in window)) {
        upgrade();
    } else {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = function () {
            recognizing = true;
            changeState('info_speak_now');
        };

        recognition.onerror = function (event) {
            if (event.error == 'no-speech') {
                changeState('info_no_speech');
                ignore_onend = true;
            }
            if (event.error == 'audio-capture') {
                changeState('info_no_microphone');
                ignore_onend = true;
            }
            if (event.error == 'not-allowed') {
                if (event.timeStamp - start_timestamp < 100) {
                    changeState('info_blocked');
                } else {
                    changeState('info_denied');
                }
                ignore_onend = true;
            }
        };

        recognition.onend = function () {
            recognizing = false;
            if (ignore_onend) {
                return;
            }

            changeState('info_start');
            
            if (window.getSelection) {
                window.getSelection().removeAllRanges();
                var range = document.createRange();
                range.selectNode(document.getElementById('final_span'));
                window.getSelection().addRange(range);
            }
        };

        recognition.onresult = function (event) {
            var interim_transcript = '';
            if (typeof (event.results) == 'undefined') {
                recognition.onend = null;
                recognition.stop();
                return;
            }

            var final_transcript = '';

            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    final_transcript += event.results[i][0].transcript;
                } else {
                    interim_transcript += event.results[i][0].transcript;
                }
            }
            final_transcript = capitalize(final_transcript);

            $("#final_span").val($("#final_span").val() + final_transcript);

            interim_span.innerHTML = interim_transcript;
        };
    }
});

function startButton(event) {
    if (recognizing) {
        recognition.stop();
        return;
    }

    interim_span.innerHTML = '';

    recognition.lang = 'ro-ro';
    recognition.start();
    ignore_onend = false;

    start_timestamp = event.timeStamp;
}

function changeState(s) {
    $("#info").children().hide();
    $("#" + s).show();

    if(s === "info_speak_now"){
        $("#start_img").attr("src",'img/mic-animate.gif');
    } else{
        $("#start_img").attr("src",'/img/mic.gif');
    }
}

// Helper Methods
function capitalize(s) {
    return s.replace( /\S/, function (m) { return m.toUpperCase(); });
}

