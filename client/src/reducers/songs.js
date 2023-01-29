import { createReducer } from "@reduxjs/toolkit";
import {
    songsFetched,
    songsFetchingError,
    songsFetching
} from "../actions";

const initialState = {
    songsLoadingStatus: "idle"
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
    }
},
    [],
    state => state
)


export default songs;