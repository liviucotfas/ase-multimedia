import { AudioPlayer } from './modules/audio-player.js';

const tracks = [
    {
        title: 'Moonlight Sonata',
        url: 'media/Beethoven-Moonlight-Sonata.mp3'
    },
    {
        title: 'Canon in D Major',
        url: 'media/Pachelbel-Canon-in-D-Major.mp3'
    },
    {
        title: 'Bolero',
        url: 'media/Ravel-Bolero.mp3'
    }
];

const audioElement = document.getElementById('audio-player');
const playlistElement = document.getElementById('playlist');
const playPauseButton = document.getElementById('play-pause');
const currentTimeLabel = document.getElementById('time-current');
const durationLabel = document.getElementById('time-duration');
const skipForwardButton = document.getElementById('skip-forward');
const nextTrackButton = document.getElementById('next-track');

const audioPlayerOptions = {
    audioElement,
    playlistElement,
    playPauseButton,
    currentTimeLabel,
    durationLabel,
    skipForwardButton,
    nextTrackButton
};

const audioPlayer = new AudioPlayer(audioPlayerOptions);
audioPlayer.loadTracks(tracks);
