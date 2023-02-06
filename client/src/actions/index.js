import axios from "axios";


import { tracksFetching, tracksFetchingError, tracksFetched } from "../components/page-music/helpers/tracksSlice";
import { songsFetching, songsFetched, songsFetchingError } from "../components/page-music/helpers/songsSlice";

export const fetchTracks = (request) => (dispatch) => {
    dispatch(tracksFetching());
    request("https://yrysmusic.onrender.com/tracks/data")
        .then(res => dispatch(tracksFetched(res)))
        .catch(e => dispatch(tracksFetchingError()));
}


/**
 * 
 * @param {fetch data} request 
 * @param {url for request} _url 
 * @param {current time for progress bar} setTrackProgress 
 * @param {track duration time} setDurationTrack 
 * @param {audio tag element} audioRef 
 * @returns audio 
 */
export const fetchTrack = (request, _url, setTrackProgress, setDurationTrack, audioRef) => (dispatch) => {

    dispatch(songsFetching());
    axios(_url)
        .then(() => {

            getDuration(_url, (duration) => {
                setDurationTrack(duration);
                dispatch(songsFetched());
            });

            audioRef.current.pause();


            audioRef.current = new Audio(_url);
            audioRef.current.setAttribute("type", "audio/mp3");
            audioRef.current.setAttribute("codecs", "mp3");
            audioRef.current.setAttribute("preload", "metadata");
            audioRef.current.load();

            setTrackProgress(audioRef.current.currentTime);

        }).catch(e => { dispatch(songsFetchingError()); console.log(e.message) });


    function getDuration(url, next) {
        let _player = new Audio(url);

        _player.addEventListener("durationchange", function (e) {
            if (this.duration !== Infinity && !isNaN(this.duration) && this.duration) {
                let duration = this.duration;
                audioRef.current.remove();
                next(duration);
            };
        }, true);
        _player.load();
        _player.currentTime = 24 * 60 * 60;
        _player.volume = 0;
    };
}

