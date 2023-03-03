import { configureStore } from "@reduxjs/toolkit";

import tracks from "../components/page-music/helpers/tracksSlice";
import songs from "../components/page-music/helpers/songsSlice";
import { apiSlice } from "../api/apiSlice";


const stringMiddleware = (store) => (next) => (action) => {
    if (typeof action === "string") {
        return next({
            type: action
        });
    }
    return next(action);
}



const store = configureStore({
    reducer: { tracks, songs, [apiSlice.reducerPath]: apiSlice.reducer },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
