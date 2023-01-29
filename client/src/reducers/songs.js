import { createReducer } from "@reduxjs/toolkit";
import {
    songsFetched,
    songsFetchingError,
    songsFetching,
    songsIndexFetched
} from "../actions";

const initialState = {
    songsLoadingStatus: "idle",
    songIndex: ""
};


const songs = createReducer(initialState, {
    [songsFetched]: (state, action) => {
        state.songsLoadingStatus = 'idle';
    },
    [songsFetching]: (state) => {
        state.songsLoadingStatus = "loading";
    },
    [songsFetchingError]: (state) => {
        state.songsLoadingStatus = 'error';
    },
    [songsIndexFetched]: (state, action) => {
        state.songIndex = action.payload;
    }
},
    [],
    state => state
)


export default songs;