import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { INewRepeaseAlbum } from '../../interfaces/interfaceSpotifyNewReleases';
import { getItem } from '../../helpers/persistanceStorage';

export const spotifyCoreApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SPOTIFY_BASE_URL}`,
    prepareHeaders: (headers) => {
      headers.set(
        'Authorization',
        `Bearer ${getItem<string>("accessToken")}`
      );

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getNewReleases: builder.query<INewRepeaseAlbum, void>({
      query: () => `browse/new-releases`,
    }),
  }),
});

export const { useGetNewReleasesQuery } = spotifyCoreApi;
