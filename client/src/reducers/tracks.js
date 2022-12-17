const initialState = {
    tracks: [],
    isUpload: "",
    tracksLoadingStatus: "idle",
    indexTrack: 0,
    dataForLyrics: {}
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
        case "TRACK_IS_UPLOADED":
            return {
                ...state,
                isUpload: action.payload,
                tracksLoadingStatus: "idle"
            }
        case "TRACK_INDEX_FETCHED":
            return {
                ...state,
                indexTrack: action.payload
            }
        case "TRACK_DATAFORLYRICS_FETCHED":
            return {
                ...state,
                dataForLyrics: action.payload
            }
        default: return state;
    }
}

export default tracks;