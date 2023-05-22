import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { INewRepeaseAlbum } from '../../interfaces/interfaceSpotifyNewReleases';

export const spotifyCoreApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.spotify.com/v1/`,
    prepareHeaders: (headers) => {
      headers.set(
        'Authorization',
        import.meta.env.VITE_SPOTIFY_TOKEN
      );

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getNewReleases: builder.query<INewRepeaseAlbum, null>({
      query: () => `browse/new-releases`,
    }),
  }),
});

export const { useGetNewReleasesQuery } = spotifyCoreApi;
