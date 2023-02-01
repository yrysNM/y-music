import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { useHttp } from "../../../hooks/http.hook";

const initialState = {
    songsLoadingStatus: "idle",
    songIndex: "",
    dataForLyrics: ""
};

/**
 * @function requestData 
 */
export const fetchSongLyrics = createAsyncThunk(
    "songs/fetchSongs",
    async (songId) => {
        const { request } = useHttp();
        return request(`https://yrysmusic.onrender.com/track/lyrics/${songId}`);
    }
);

/**
 * @function requestTrack
 */
export const fetchSong = createAsyncThunk(
    "songs/fetchSong",
    async (_url, setTrackProgress, setDurationTrack, audioRef) => {
        return await axios(_url);
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
         * @action 
         */
        builder
            .addCase(fetchSongLyrics.pending, state => { state.songsLoadingStatus = "loading" })
            .addCase(fetchSongLyrics.fulfilled, (state, action) => {
                state.dataForLyrics = action.payload;
                state.songsLoadingStatus = 'idle';
            })
            .addCase(fetchSongLyrics.rejected, state => state.songsLoadingStatus = "error")
            .addCase(fetchSong.pending, state => { state.songsLoadingStatus = "loading" })
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