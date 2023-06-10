import { createSlice } from "@reduxjs/toolkit";
import { Playlist } from "ym-api/dist/types";
import { fetchYmUserPlaylists, fetchYmLikeFromRadioPlaylist } from "../services/ymCore";

interface IYmData {
    ymUserPlaylists: Playlist[],
    ymLikeRadioPlaylist: Playlist,
}

const initialState: IYmData = {
    ymUserPlaylists: [],
    ymLikeRadioPlaylist: {
        owner: {
            uid: 0,
            login: "",
            name: "",
            verified: false,
            sex: ""
        },
        playlistUuid: "",
        available: false,
        uid: 0,
        kind: 0,
        title: "",
        revision: 0,
        snapshot: 0,
        trackCount: 0,
        visibility: "",
        collective: false,
        created: "",
        modified: "",
        isBanner: false,
        isPremiere: false,
        durationMs: 0,
        cover: {
            error: undefined,
            type: undefined,
            itemsUri: undefined,
            custom: undefined
        },
        ogImage: "",
        tags: [],
        tracks: [],
        prerolls: [],
        lastOwnerPlaylists: []
    },
}


const ymSlice = createSlice({
    name: "ym",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchYmUserPlaylists.fulfilled, (state, action) => {
                state.ymUserPlaylists = action.payload;
            })
            .addCase(fetchYmLikeFromRadioPlaylist.fulfilled, (state, { payload }) => {
                state.ymLikeRadioPlaylist = payload;
            })
    }
})

const { reducer } = ymSlice;

export default reducer; 