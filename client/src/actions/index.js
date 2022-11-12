import { createAction } from "@reduxjs/toolkit";


export const tracksFetched = (tracks) => {
    return {
        type: "TRACKS_FETCHED",
        payload: tracks
    }
}

export const tracksFetching = () => {
    return {
        type: "TRACKS_FETCHING"
    }
}

export const tracksFetchingError = () => {
    return {
        type: "TRACKS_FETCHING_ERROR"
    }
}

export const tracIsUploadedkFetched = (textIsSucces) => {
    return {
        type: "TRACK_IS_UPLOADED",
        payload: textIsSucces
    }
}


export const songsFetching = () => {
    return {
        type: "SONGS_FETCHING"
    }
}

export const songsFetched = () => {
    return {
        type: "SONGS_FETCHED"
    }
}

export const songsFetchingError = () => {
    return {
        type: "SONGS_FETCHING_ERROR"
    }
}

export const tracksDataFetched = (data) => {
    return {
        type: "TRACK_DATA_FETCHED",
        payload: data
    }
}