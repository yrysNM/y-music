import { createAsyncThunk } from "@reduxjs/toolkit";

import { ymApi } from "../../api/ym";

export const fetchYmUserPlaylists = createAsyncThunk(
    "ym/fetchUserPlaylist",
    async () => {
        return await ymApi().getUserPlaylists();
    }
)

export const fetchYmLikeFromRadioPlaylist = createAsyncThunk(
    "ym/fetchLikeFromRadioPlayList",
    async (playlistData: {
        kind: number,
        uid: number
    }) => {
        return await ymApi().getPlaylist(playlistData.kind, playlistData.uid);
    }
)