import { configureStore } from "@reduxjs/toolkit";

import tracks from "../components/page-music/helpers/tracksSlice";
import songs from "../components/page-music/helpers/songsSlice";


const stringMiddleware = (store) => (next) => (action) => {
    if (typeof action === "string") {
        return next({
            type: action
        });
    }
    return next(action);
}



const store = configureStore({
    reducer: { tracks, songs },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
