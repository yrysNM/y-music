import { createReducer } from "@reduxjs/toolkit";
import {
    tracksFetched,
    tracksFetching,
    tracksFetchingError,
    tracIsUploadedkFetched,
    tracksDataForLyricsFetched,
    tracksIndexFetched
} from "../actions";


const initialState = {
    tracks: [],
    isUpload: "",
    tracksLoadingStatus: "idle",
    indexTrack: 0,
    dataForLyrics: {}
};

const tracks = createReducer(initialState, {
    [tracksFetching]: state => {
        state.tracksLoadingStatus = "loading";
    },
    [tracksFetched]: (state, action) => {
        state.tracksLoadingStatus = "idle";
        state.tracks = action.payload;
    },
    [tracksFetchingError]: (state) => {
        state.tracksLoadingStatus = 'error';
    },
    [tracIsUploadedkFetched]: (state, action) => {
        state.tracksLoadingStatus = 'idle';
        state.isUpload = action.payload;
    },
    [tracksDataForLyricsFetched]: (state, action) => {
        state.dataForLyrics = action.payload
    },
    [tracksIndexFetched]: (state, action) => {
        state.indexTrack = action.payload;
    }
},
    [],
    state => state
)


export default tracks;