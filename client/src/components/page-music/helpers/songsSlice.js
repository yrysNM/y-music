import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { useHttp } from "../../../hooks/http.hook";
import { tracksDataForLyricsFetched } from "./tracksSlice";

const initialState = {
    songsLoadingStatus: "idle",
    songIndex: ""
};

/**
 * @function requestData 
 */
const fetchSongs = createAsyncThunk(
    "songs/fetchSongs",
    async (songId) => {
        const { request } = useHttp();
        return request(`https://yrysmusic.onrender.com/track/lyrics/${songId}`);
    }
);

const songsSlice = createSlice({
    name: "songs",
    initialState,
    reducers: {
        songsFetched: (state, action) => {
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
            .addCase(fetchSongs.pending, state => { state.songsLoadingStatus = "loading" })
            .addCase(fetchSongs.fulfilled, (state, action) => {
                tracksDataForLyricsFetched(action.payload);
            })
            .addCase(fetchSongs.rejected, state => state.songsLoadingStatus = "error")
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