import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { useHttp } from "../../../hooks/http.hook";


const initialState = {
    songsLoadingStatus: "idle",
    songIndex: "",
    dataForLyrics: ""
};



/**
 * @function requestDataLyrics
 */
export const fetchSongLyrics = createAsyncThunk(
    "songs/fetchSongs",
    async (songId) => {
        const { request } = useHttp();
        return request(`https://yrysmusic.onrender.com/track/lyrics/${songId}`);
    }
);

/**
 * @function requestTrack feature dynamic progress for music load like yandex
 */
export const fetchSong = createAsyncThunk(
    "songs/fetchSong",
    async (_url, setTrackProgress, setDurationTrack, audioRef) => {
        return (
            axios(_url)
                .then(() => {
                    getDuration(_url, (duration) => {
                        setDurationTrack(duration);
                    });

                    audioRef.current.pause();

                    audioRef.current = new Audio(_url);
                    audioRef.current.setAttribute("type", "audio/mp3");
                    audioRef.current.setAttribute("codecs", "mp3");
                    audioRef.current.setAttribute("preload", "metadata");
                    audioRef.current.load();

                    setTrackProgress(audioRef.current.currentTime);

                    function getDuration(url, next) {
                        let _player = new Audio(url);

                        _player.addEventListener("durationchange", function (e) {
                            if (this.duration !== Infinity && !isNaN(this.duration) && this.duration) {
                                let duration = this.duration;
                                audioRef.current.remove();
                                next(duration);
                            }
                        }, true);

                        _player.load();
                        _player.currentTime = 24 * 60 * 60;
                        _player.volume = 0;
                    }
                }).catch(e => console.log(e.message))
        );
    }
)

const songsSlice = createSlice({
    name: "songs",
    initialState,
    reducers: {
        songsFetched: (state) => {
            state.songsLoadingStatus = 'idle';
        },
        songsFetching: (state) => {
            state.songsLoadingStatus = "loading";
        },
        songsFetchingError: (state) => {
            state.songsLoadingStatus = 'error';
        },
        songsIndexFetched: (state, action) => {
            state.songIndex = action.payload;
        }
    },
    // function for action
    extraReducers: (builder) => {
        /**
         * @action pending begin loading
         * @action fulfilled request done success 
         * @action rejected something is wrong => error
         */
        builder
            .addCase(fetchSongLyrics.pending, state => { state.songsLoadingStatus = "loading" })
            .addCase(fetchSongLyrics.fulfilled, (state, action) => {
                state.dataForLyrics = action.payload;
                state.songsLoadingStatus = 'idle';
            })
            .addCase(fetchSongLyrics.rejected, state => state.songsLoadingStatus = "error")
            .addCase(fetchSong.pending, state => { state.songsLoadingStatus = "loading" })
            .addCase(fetchSong.fulfilled, (state, action) => {
                state.songsLoadingStatus = "idle";
            })
            .addCase(fetchSong.rejected, state => { state.songsLoadingStatus = "error" })
            .addDefaultCase(() => { })
    }
});

const { actions, reducer } = songsSlice;

export default reducer;

export const {
    songsFetched,
    songsFetching,
    songsFetchingError,
    songsIndexFetched
} = actions;