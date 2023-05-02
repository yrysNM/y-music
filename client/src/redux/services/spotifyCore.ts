import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { IPlaylistSpotify } from '../../interfaces/interfacePlaylistsSpotify';

export const spotifyCoreApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://spotify23.p.rapidapi.com/`,
    prepareHeaders: (headers) => {
      headers.set(
        'X-RapidAPI-Key',
        'd8a63f1f3bmsh9ef73f09d3e3ed7p165374jsn380b8dd9d99d'
      );

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPlaylistTracks: builder.query<IPlaylistSpotify, number>({
      query: (id) => `/playlist/?id=${id}`,
    }),
  }),
});

export const { useGetPlaylistTracksQuery } = spotifyCoreApi;
