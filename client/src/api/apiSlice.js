import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://yrysmusic.onrender.com"
    }),
    endpoints: builder => ({
        getTracks: builder.query({
            query: () => "/tracks/data"
        })
    })
});

export const { useGetTracksQuery } = apiSlice