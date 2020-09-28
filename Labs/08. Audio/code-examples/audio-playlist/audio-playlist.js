'use strict';

const app = {
    audio: null,
    tracks: [], //track list
    //UI
    audioTime: null,
    btnPlayPause: null
};

/** Plays a song 
 * @param {string} url - The url of the song 
 */
app.play = function (url) {
    let elements = document.querySelectorAll('#playlist li.active');
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('active');
    }

    let selectedElement = document.querySelector('#playlist li[data-url="' + url + '"]');
    selectedElement.classList.add('active');

    app.audio.src = url;
    app.audio.load();
    app.audio.play();
}

/** Changes the current song */
app.next = function () {
    let index = app.tracks.indexOf(app.audio.src) + 1;
    if (index >= app.tracks.length) {
        index = 0;
    }

    app.play(app.tracks[index]);
}

app.load = function () {
    app.audio = document.getElementById('audio');
    app.audioTime = document.querySelector('#audioTime');
    app.btnPlayPause = document.getElementById('btnPlayPause');

    // Iterate over the playlist in order to associate events
    let elements = document.querySelectorAll('#playlist li');
    for (let i = 0; i < elements.length; i++) {

        let url = elements[i].dataset.url;
        app.tracks.push(url);

        elements[i].addEventListener('click', function () {
            app.play(this.dataset.url);
        });
    }

    // Handle the timeupdate event
    app.audio.addEventListener('timeupdate', function () {
        let currentTime = app.audio.currentTime;
        let duration = app.audio.duration;

        if (app.audio.duration) {
            app.audioTime.textContent = app.secondsToString(currentTime) + ' / ' + app.secondsToString(duration);
        }
        else {
            app.audioTime.textContent = '...';
        };
    });

    // Handle the play event
    app.audio.addEventListener('play', function () {
        app.btnPlayPause.children[0].classList.remove('fa-play');
        app.btnPlayPause.children[0].classList.add('fa-pause');
    });

    // Handle the pause event
    app.audio.addEventListener('pause', function () {
        app.btnPlayPause.children[0].classList.add('fa-play');
        app.btnPlayPause.children[0].classList.remove('fa-pause');
    });

    // Handle the ended event
    app.audio.addEventListener('ended', app.next);

    // Handle the click event btnPlayPause
    document.getElementById('btnPlayPause').addEventListener('click', function () {
        if (app.audio.src === "") {
            app.play(app.tracks[0]);
        } else {
            if (app.audio.paused) {
                app.audio.play();
            }
            else {
                app.audio.pause();
            }
        }
    });

    // Handle the click event on btnForward
    document.getElementById('btnForward').addEventListener('click', function () {
        app.audio.currentTime += 10;
    });

    // Handle the click event on btnNext
    document.getElementById('btnNext').addEventListener('click', app.next);


};

/**
* A utility function for converting a time in miliseconds to a readable time of minutes and seconds.
* @param {number} seconds The time in seconds.
* @return {string} The time in minutes and/or seconds.
**/
app.secondsToString = function (seconds) {
    let min = 0;
    let sec = Math.floor(seconds);
    let time = 0;

    min = Math.floor(sec / 60);
    min = min >= 10 ? min : '0' + min;

    sec = Math.floor(sec % 60);
    sec = sec >= 10 ? sec : '0' + sec;
    time = min + ':' + sec;

    return time;
};