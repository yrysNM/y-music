import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

import { useHttp } from "../../../hooks/http.hook";


// const initialState = {
//     tracks: [],
//     isUpload: "",
//     tracksLoadingStatus: "idle",
//     indexTrack: 0,
// };

const tracksAdapter = createEntityAdapter({
    selectId: (e) => e._id
});

const initialState = tracksAdapter.getInitialState({
    tracksLoadingStatus: "idle",
    indexTrack: 0,
    isUpload: "",
});


/**
 * @function requestData
 */
export const fetchTracks = createAsyncThunk(
    "tracks/fetchTracks",
    async () => {
        const { request } = useHttp();
        return request("https://yrysmusic.onrender.com/tracks/data");
    }
);


const tracksSlice = createSlice({
    name: "tracks",
    initialState,
    reducers: {
        tracksFetching: state => { state.tracksLoadingStatus = "loading" },
        tracksFetched: (state, action) => {
            state.tracksLoadingStatus = "idle";
            state.tracks = action.payload;
        },
        tracksFetchingError: (state) => {
            state.tracksLoadingStatus = 'error';
        },
        tracIsUploadedkFetched: (state, action) => {
            state.tracksLoadingStatus = 'idle';
            state.isUpload = action.payload;

            tracksAdapter.setOne(state.isUpload, action.payload);
        },
        tracksIndexFetched: (state, action) => {
            state.indexTrack = action.payload;

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTracks.pending, state => { state.tracksLoadingStatus = "loading" })
            .addCase(fetchTracks.fulfilled, (state, action) => {
                state.tracksLoadingStatus = "idle";

                tracksAdapter.setAll(state, action.payload);
            })
            .addCase(fetchTracks.rejected, state => state.tracksLoadingStatus = "error")
            .addDefaultCase(() => { })
    }
});

const { actions, reducer } = tracksSlice;

export default reducer;

export const { selectAll } = tracksAdapter.getSelectors((state) => { return state.tracks; });

export const {
    tracksFetching,
    tracksFetched,
    tracksFetchingError,
    tracIsUploadedkFetched,
    tracksIndexFetched
} = actions;