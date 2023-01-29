import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    songsLoadingStatus: "idle",
    songIndex: ""
};

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