import { createAction } from "@reduxjs/toolkit";



export const tracksFetched = createAction("TRACKS_FETCHED");

export const tracksFetching = createAction("TRACKS_FETCHING");

export const tracksFetchingError = createAction("TRACKS_FETCHING_ERROR");

export const tracIsUploadedkFetched = createAction("TRACK_IS_UPLOADED");

export const tracksIndexFetched = createAction("TRACK_INDEX_FETCHED");

export const tracksDataForLyricsFetched = createAction("TRACK_DATAFORLYRICS_FETCHED");

export const songsFetched = createAction("SONGS_FETCHED");

export const songsFetching = createAction("SONGS_FETCHING");

export const songsFetchingError = createAction("SONGS_FETCHING_ERROR");


