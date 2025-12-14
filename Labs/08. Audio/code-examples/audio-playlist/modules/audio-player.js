import {formatTime} from './utils.js';

/**
 * @typedef {Object} Track
 * @property {string} title - The title of the track
 * @property {string} url - The URL of the audio file
 */

/**
 * @typedef {Object} AudioPlayerOptions
 * @property {HTMLAudioElement} audioElement - The audio element to control
 * @property {HTMLElement} playlistElement - The playlist container element
 * @property {HTMLButtonElement} playPauseButton - The play/pause toggle button
 * @property {HTMLElement} currentTimeLabel - The element displaying current playback time
 * @property {HTMLElement} durationLabel - The element displaying track duration
 * @property {HTMLButtonElement} skipForwardButton - The skip forward 10 seconds button
 * @property {HTMLButtonElement} nextTrackButton - The next track button
 */

export class AudioPlayer {
    /** @type {Track[]} */
    #tracks = [];
    #currentUrl = null;
    #audioElement;              // or keep #audio (it's clear)
    #playlistElement;           // or keep #playlist
    #playPauseButton;          // ✓ improved
    #currentTimeElement;        // ✓ improved (more generic than Label)
    #durationElement;           // ✓ improved
    #skipForwardButton;         // ✓ already good
    #nextTrackButton;           // ✓ already good

    /**
     * Create an AudioPlayer instance.
     * @param {AudioPlayerOptions} options - Configuration object with required DOM elements
     */
    constructor(options) {
        this.#audioElement = options.audioElement;
        this.#playlistElement = options.playlistElement;
        this.#playPauseButton = options.playPauseButton;
        this.#currentTimeElement = options.currentTimeLabel;
        this.#durationElement = options.durationLabel;
        this.#skipForwardButton = options.skipForwardButton;
        this.#nextTrackButton = options.nextTrackButton;

        this.#bindAudioEvents();
        this.#bindControlEvents();
    }

    /**
     * Replace the playlist contents and render clickable items.
     * @param {Track[]} tracks Array of track descriptors.
     */
    loadTracks(tracks) {
        this.#tracks = tracks;

        this.#playlistElement.innerHTML = '';
        const fragment = document.createDocumentFragment();

        this.#tracks.forEach(track => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.dataset['url'] = track.url;
            li.textContent = track.title;
            li.addEventListener('click', () => {
                this.playByUrl(track.url);
            });
            
            fragment.appendChild(li);
        });

        this.#playlistElement.appendChild(fragment);
    }

    /**
     * Play a track by its unique URL, updating UI state.
     * @param {string} url Unique track URL.
     */
    playByUrl(url) {
        const track = this.#tracks.find(track => track.url === url);
        if (!track) {
            return;
        }

        this.#currentUrl = this.#audioElement.src = track.url;
        this.#audioElement.play();
        this.#syncActiveTrack();
    }

    /** Advance to the next track, looping to the first when needed. */
    next() {
        if (this.#tracks.length === 0) {
            return;
        }

        const currentIndex = this.#currentUrl
            ? this.#tracks.findIndex(track => track.url === this.#currentUrl)
            : -1;

        const nextIndex = (currentIndex + 1) % this.#tracks.length;
        const nextTrack = this.#tracks[nextIndex];
        if (nextTrack) {
            this.playByUrl(nextTrack.url);
        }
    }

    #bindAudioEvents() {
        this.#audioElement.addEventListener('durationchange', () => {
            this.#durationElement.textContent = formatTime(this.#audioElement.duration);
        });

        this.#audioElement.addEventListener('timeupdate', () => {
            if (Number.isFinite(this.#audioElement.duration)) {
                this.#currentTimeElement.textContent = formatTime(this.#audioElement.currentTime);
            } else {
                this.#currentTimeElement.textContent = '...';
            }
        });

        this.#audioElement.addEventListener('play', () => this.#syncPlayPauseButton());
        this.#audioElement.addEventListener('pause', () => this.#syncPlayPauseButton());
        this.#audioElement.addEventListener('ended', () => this.next());
    }

    #bindControlEvents() {
        this.#playPauseButton.addEventListener('click', () => {
            if (!this.#audioElement.src && this.#tracks.length > 0) {
                this.#playFirstTrack();
                return;
            }

            if (this.#audioElement.paused) {
                this.#audioElement.play();
            } else {
                this.#audioElement.pause();
            }
        });

        this.#skipForwardButton.addEventListener('click', () => {
            const jumpTarget = this.#audioElement.currentTime + 10;
            this.#audioElement.currentTime = Math.min(jumpTarget, this.#audioElement.duration);
        });

        this.#nextTrackButton.addEventListener('click', () => {
            this.next();
        });
    }

    /**
     * Update the play/pause button icon based on playback state.
     */
    #syncPlayPauseButton() {
        const icon = this.#playPauseButton.children[0];
        if (!icon) {
            return;
        }
        icon.classList.toggle('fa-play', this.#audioElement.paused);
        icon.classList.toggle('fa-pause', !this.#audioElement.paused);
    }

    #syncActiveTrack() {
        this.#playlistElement.querySelectorAll('[data-url]').forEach(li => {
            const isActive = this.#currentUrl === li.dataset['url'];
            li.classList.toggle('active', Boolean(isActive));
        });
    }

    #playFirstTrack() {
        const firstTrack = this.#tracks[0];
        if (firstTrack) {
            this.playByUrl(firstTrack.url);
        }
    }
}