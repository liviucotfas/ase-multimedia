class AudioPlayer{
    #tracks
    #currentTrack
    
    #ulTracks
    
    /**
     * 
     * @param {HTMLUListElement} ulTracks 
     */
    constructor(){
        this.#ulTracks = document.getElementById('ul-tracks');

        const audio = document.getElementById('audio');
        const btnPlayPause = document.getElementById('btn-play-pause');
        const currentTime = document.getElementById("currentTime");
        const duration = document.querySelector('#duration'); // equivalent to getElementById
                
        // Handle the durationchange event
        audio.addEventListener('durationchange', () => {
            duration.textContent = this.secondsToString(audio.duration);
        });
            
        // Handle the timeupdate event
        audio.addEventListener('timeupdate', () => {
            if (audio.duration) {
                currentTime.textContent = this.secondsToString(audio.currentTime);
            }
            else {
                //innerText can also be used
                //differences https://www.w3schools.com/jsref/prop_html_innerhtml.asp
                currentTime.textContent = '...';
            };
        });
            
        // Handle the play event
        audio.addEventListener('play', function () {
            //alternative: btnPlayPause.children[0].classList.replace('fa-play', 'fa-pause');
            btnPlayPause.children[0].classList.remove('fa-play');
            btnPlayPause.children[0].classList.add('fa-pause');
        });

        // Handle the pause event
        audio.addEventListener('pause', function () {
            btnPlayPause.children[0].classList.add('fa-play');
            btnPlayPause.children[0].classList.remove('fa-pause');
        });

        // Handle the ended event
        audio.addEventListener('ended', ()=> this.next());
            
        // Handle the click event on btnPlayPause
        btnPlayPause.addEventListener('click', () => {
            if (audio.src === '' && this.tracks.length > 0) {
                this.play(this.#tracks[0]);
            } else {
                if (audio.paused) {
                    audio.play();
                }
                else {
                    audio.pause();
                }
            }
        });

        // Handle the click event on btnForward
        document.getElementById('btn-forward').addEventListener('click', () => {
            audio.currentTime += 10;
        });

        // Handle the click event on btnNext
        document.getElementById('btn-next').addEventListener('click', () => {
            this.next()
        });

    }

    loadTracks(tracks){
        this.tracks = tracks;

        for(let i = 0; i < this.#tracks.length; i++){
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.dataset.url = this.#tracks[i].url;
            li.innerText = this.#tracks[i].title;
            li.addEventListener('click', () => {
                this.play(this.#tracks[i]);
            })
            this.#ulTracks.appendChild(li);
        }
    }

    /** Plays a song 
     * @param {string} url - The url of the song 
     */
    play(track) {
        // Remove the `active` class from the li corresponding to the previous song
        let element = document.querySelector('[data-url].active');
        if (element !== null)
            element.classList.remove('active');

        // Change the song
        this.#currentTrack = track;
        audio.src = this.#currentTrack.url;
        audio.play();

        // Add the `active` class to the li corresponding to the current song
        element = document.querySelector('[data-url="' + this.#currentTrack.url + '"]');
        element.classList.add('active');
    }
    
    /** Changes the current song */
    next() {
        if (this.#tracks.length === 0)
        return;

        let index = this.#tracks.indexOf(this.#currentTrack) + 1;
        if (index >= this.#tracks.length) {
            index = 0;
        }
        this.play(this.#tracks[index]);
    }
    
    /**
    * A utility function for converting a time in miliseconds to a readable time of minutes and seconds.
    * @param {number} seconds The time in seconds.
    * @return {string} The time in minutes and/or seconds.
    **/
    secondsToString(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
        const formattedMinutes = String(minutes).padStart(2,'0');
        const formattedSeconds = String(remainingSeconds).padStart(2,'0');
        
        return `${formattedMinutes}:${formattedSeconds}`;
    };
}