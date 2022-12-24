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


// const songs = (state = initialState, action) => {
//     switch (action.type) {
//         case "SONGS_FETCHING":
//             return {
//                 ...state,
//                 songsLoadingStatus: "loading"
//             }
//         case "SONGS_FETCHED":
//             return {
//                 ...state,
//                 songsLoadingStatus: "idle"
//             }
//         case "SONGS_FETCHING_ERROR":
//             return {
//                 ...state,
//                 songsLoadingStatus: "error"
//             }
//         default: return state;
//     }
// }

export default songs;