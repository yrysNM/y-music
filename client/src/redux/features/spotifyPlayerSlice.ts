import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type tInitialState = {
  uris: string[], 
  isActiveSong: boolean
  isPlayingSong: boolean,
  spotifySongActive: {
    name: string
  }
}

const initialState: tInitialState = {
  uris: [],
  isActiveSong: false,
  isPlayingSong: false,
  spotifySongActive: {
    name: ''
  }
};


const spotifyPlayerSlice = createSlice({
  name: 'spotifyPlayer',
  initialState,
  reducers: {
    setSpotifySong: (state, action: PayloadAction<{spotifySongActive: {name: string}, dataUris: string[]}>) => {
      state.spotifySongActive = action.payload.spotifySongActive;
      state.isActiveSong = true;

      if(action.payload.dataUris.length > 0) {
        action.payload.dataUris = action.payload.dataUris;
      }
    },
    playPauseSongSpotify: (state, {payload}: PayloadAction<boolean>) =>  {
      state.isPlayingSong = payload;
    }
  },
});

const {actions, reducer} = spotifyPlayerSlice; 

export const {setSpotifySong, playPauseSongSpotify} = actions;

export default reducer;
