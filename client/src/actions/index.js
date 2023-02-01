import { tracksFetching, tracksFetchingError, tracksFetched } from "../components/page-music/helpers/tracksSlice";

export const fetchTracks = (request) => (dispatch) => {
    dispatch(tracksFetching());
    request("https://yrysmusic.onrender.com/tracks/data")
        .then(res => dispatch(tracksFetched(res)))
        .catch(e => dispatch(tracksFetchingError()));
}




