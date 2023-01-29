import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tracks: [],
    isUpload: "",
    tracksLoadingStatus: "idle",
    indexTrack: 0,
    dataForLyrics: {}
};

const tracksSlice = createSlice({
    name: "tracks",
    initialState,
    reducers: {
        tracksFetching: state => { state.tracksLoadingStatus = "loading" },
        tracksFetched: (state, action) => {
            state.tracksLoadingStatus = "idle";
            state.tracks = action.payload;
        },
        tracksFetchingError: (state) => {
            state.tracksLoadingStatus = 'error';
        },
        tracIsUploadedkFetched: (state, action) => {
            state.tracksLoadingStatus = 'idle';
            state.isUpload = action.payload;
        },
        tracksDataForLyricsFetched: (state, action) => {
            state.dataForLyrics = action.payload
        },
        tracksIndexFetched: (state, action) => {
            state.indexTrack = action.payload;
        }
    }
});

const { actions, reducer } = tracksSlice;

export default reducer;

export const {
    tracksFetching,
    tracksFetched,
    tracksFetchingError,
    tracIsUploadedkFetched,
    tracksDataForLyricsFetched,
    tracksIndexFetched
} = actions;