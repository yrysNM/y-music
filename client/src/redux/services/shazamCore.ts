import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { IShazamTopTracks } from '../../interfaces/interfaceShazamTopTracks';

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
  }),
});

export const { useGetTopChartsQuery } = shazamCoreApi;
