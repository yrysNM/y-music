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

export const tracksFetchedId3 = (id3) => {
    return {
        type: "TRACKS_FETCHED_ID3",
        payload: id3
    }
}

export const tracksFetchedId3Loading = (id3 = "") => {
    return {
        type: "TRACKS_FETCHED_ID3Loading",
        payload: id3
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