import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import playerSpotify from "./features/spotifyPlayerSlice";
import { spotifyCoreApi } from './services/spotifyCore';
import { shazamCoreApi } from './services/shazamCore';

export const store = configureStore({
  reducer: {
    [spotifyCoreApi.reducerPath]: spotifyCoreApi.reducer,
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    player: playerReducer,
    playerSpotify
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      spotifyCoreApi.middleware,
      shazamCoreApi.middleware
    ),
  devTools: import.meta.env.DEV === true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
