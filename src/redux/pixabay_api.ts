import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = '47069026-ccba9e2693c7ddfdd1adea335';
const BASE_URL = 'https://pixabay.com/api/';

export const pixabayApi = createApi({
  reducerPath: 'pixabayApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getImages: builder.query({
      query: ({ query, page }) => ({
        url: '',
        params: {
          key: API_KEY,
          q: query, 
          page, 
        },
      }),
    }),
  }),
});

export const { useGetImagesQuery } = pixabayApi;
