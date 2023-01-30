import { tracksFetching, tracksFetchingError, tracksFetched, tracksDataForLyricsFetched } from "../components/page-music/helpers/tracksSlice";
import { songsFetched, songsFetching, songsFetchingError } from "../components/page-music/helpers/songsSlice";

export const fetchTracks = (request) => (dispatch) => {
    dispatch(tracksFetching());
    request("https://yrysmusic.onrender.com/tracks/data")
        .then(res => dispatch(tracksFetched(res)))
        .catch(e => dispatch(tracksFetchingError()));
}

export const fetchLyrics = (request, songIndex) => (dispatch) => {
    dispatch(songsFetching());
    request(`https://yrysmusic.onrender.com/track/lyrics/${songIndex}`)
        .then(res => {
            dispatch(tracksDataForLyricsFetched(res));
            dispatch(songsFetched());
        }).catch(e => dispatch(songsFetchingError()));
}



