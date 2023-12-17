import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

export interface Track {
  _id: string;
  album: string;
  artistName: string;
  genre: string;
  picture: Picture;
  title: string;
  trackId: string;
  year: string;
}

export interface Picture {
  data: number[];
  description: string;
  format: Format;
  type: Type;
}

export enum Format {
  ImageJPEG = 'image/jpeg',
  ImagePNG = 'image/png',
}

export enum Type {
  CoverFront = 'Cover (front)',
}

export const localCoreApi = createApi({
  reducerPath: 'localApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_LOCAL_URL + 'tracks/',
  }),
  endpoints: (builder) => ({
    getTracks: builder.query<Track[], void>({
      query: () => 'data',
    }),
  }),
});

export const {useGetTracksQuery} = localCoreApi;
