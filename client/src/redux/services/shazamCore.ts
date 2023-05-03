import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { IShazamTopTracks } from '../../interfaces/interfaceShazamTopTracks';
import type { IShazamSongDetails } from '../../interfaces/interfaceShazamSongDetails';
import { IShazamRelatedSong } from '../../interfaces/interfaceShazamRelatedSong';
import { IShazamArtistTopSongs } from '../../interfaces/interfaceShazamArtistTopSongs';
import { IShazamArtistDetail } from '../../interfaces/interfaceShazamArtistDetail';

type songId = { songid: string };

export const shazamCoreApi = createApi({
  reducerPath: 'shazamApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://shazam.p.rapidapi.com`,
    prepareHeaders: (headers) => {
      headers.set(
        'X-RapidAPI-Key',
        'd8a63f1f3bmsh9ef73f09d3e3ed7p165374jsn380b8dd9d99d'
      );

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query<IShazamTopTracks, void>({
      query: () => `charts/track`,
    }),
    getSongDetails: builder.query<IShazamSongDetails, songId>({
      query: ({ songid }) => `/songs/get-details?key=${songid}`,
    }),
    getSongRelated: builder.query<IShazamRelatedSong, songId>({
      query: ({ songid }) => `/songs/get-related-artist?id=${songid}`,
    }),
    getArtistTopSongs: builder.query<IShazamArtistTopSongs, songId>({
      query: ({ songid }) => `/songs/list-recommendations?key=${songid}`,
    }),
    getArtistDetails: builder.query<IShazamArtistDetail, { artistId: string }>({
      query: ({ artistId }) => `artists/get-summary?id=${artistId}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistTopSongsQuery,
  useGetArtistDetailsQuery,
} = shazamCoreApi;
