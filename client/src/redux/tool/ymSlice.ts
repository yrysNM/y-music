import { createSlice } from "@reduxjs/toolkit";
import { Playlist, Track } from "ym-api/dist/types";
import { fetchYmUserPlaylists, fetchYmLikeFromRadioPlaylist, fetchTrackMp3 } from "../services/ymCore";


type hub = {
    hub?: {
        actions: ({ uri: string, i: number })[]
    },
}

interface IYmData {
    ymUserPlaylists: Playlist[],
    ymLikeRadioPlaylist: Playlist,
    track: Track & hub
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
        lastOwnerPlaylists: [],
    },
    track: {
        id: 0,
        available: false,
        availableAsRbt: false,
        availableForPremiumUsers: false,
        lyricsAvailable: false,
        rememberPosition: false,
        coverUri: "",
        durationMs: 0,
        explicit: false,
        title: "",
        albums: [],
        artists: [],
        regions: []
    }
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
            .addCase(fetchTrackMp3.fulfilled, (state, { payload }) => {

                const trackData = state.ymLikeRadioPlaylist.tracks?.filter(tr => tr.id === payload.id)[0];

                if (trackData?.track) {

                    state.track = trackData?.track;
                    state.track.hub = {
                        actions: [{ uri: "", i: -1, }, {
                            uri: payload.uri,
                            i: payload.i
                        }]
                    }
                }
            })
    }
})

const { reducer } = ymSlice;

export default reducer; 