// import { createAction } from "@reduxjs/toolkit";
import { tracksFetching, tracksFetchingError, tracksFetched } from "../components/page-music/helpers/tracksSlice";

export const fetchTracks = (request) => (dispatch) => {
    dispatch(tracksFetching());
    request("https://yrysmusic.onrender.com/tracks/data")
        .then(res => dispatch(tracksFetched(res)))
        .catch(e => dispatch(tracksFetchingError()));
}

// export const songsFetched = createAction("SONGS_FETCHED");

// export const songsFetching = createAction("SONGS_FETCHING");

// export const songsFetchingError = createAction("SONGS_FETCHING_ERROR");

// export const songsIndexFetched = createAction("SONGS_FETCHED_INDEX");


