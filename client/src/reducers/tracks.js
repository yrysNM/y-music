const initialState = {
    tracks: [],
    id3: "",
    tracksLoadingStatus: "idle",
};

const tracks = (state = initialState, action) => {
    switch (action.type) {
        case "TRACKS_FETCHING":
            return {
                ...state,
                tracksLoadingStatus: "loading"
            }
        case "TRACKS_FETCHED":
            return {
                ...state,
                tracks: action.payload,
                tracksLoadingStatus: "idle",
            }
        case "TRACKS_FETCHING_ERROR":
            return {
                ...state,
                tracksLoadingStatus: "error"
            }
        case "TRACKS_FETCHED_ID3":
            return {
                ...state,
                id3: action.payload,
            }
        case "TRACKS_FETCHED_ID3Loading":
            return {
                ...state,
                id3: action.payload,
                tracksLoadingStatus: "idle"
            }
        default: return state;
    }
}

export default tracks;