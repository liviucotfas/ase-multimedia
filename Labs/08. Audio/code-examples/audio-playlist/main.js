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
]

const audioPlayer = new AudioPlayer();
audioPlayer.loadTracks(tracks);