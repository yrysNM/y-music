const initialState = {
    songsLoadingStatus: "idle"
};

const songs = (state = initialState, action) => {
    switch (action.type) {
        case "SONGS_FETCHING":
            return {
                ...state,
                songsLoadingStatus: "loading"
            }
        case "SONGS_FETCHED":
            return {
                ...state,
                songsLoadingStatus: "idle"
            }
        case "SONGS_FETCHING_ERROR":
            return {
                ...state,
                songsLoadingStatus: "error"
            }
        default: return state;
    }
}

export default songs;