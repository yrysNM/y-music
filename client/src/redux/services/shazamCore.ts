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
        import.meta.env.VITE_Shazam_CORE_RAPID_API_KEY
      );

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSongsByGenre: builder.query<IShazamTopTracks, string>({
      query: (genre) => {
        return {
          url: 'charts/track',
          params: { listId: genre },
        };
      },
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) => `/search?term=${searchTerm}`,
    }),
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
    getSongByCountry: builder.query<IShazamTopTracks, { countryCode: string }>({
      query: ({ countryCode }) => {
        return {
          url: 'charts/track',
          params: { listId: `ip-country-chart-${countryCode}` },
        };
      },
    }),
  }),
});

export const {
  useGetSongsBySearchQuery,
  useGetSongsByGenreQuery,
  useGetSongByCountryQuery,
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistTopSongsQuery,
  useGetArtistDetailsQuery,
} = shazamCoreApi;
