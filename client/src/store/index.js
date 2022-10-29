import { configureStore } from "@reduxjs/toolkit";
import tracks from "../reducers/tracks";
import songs from "../reducers/songs";


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
