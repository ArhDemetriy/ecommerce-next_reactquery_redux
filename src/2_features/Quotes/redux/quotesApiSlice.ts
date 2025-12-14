import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Quote {
  id: number;
  quote: string;
  author: string;
}

interface QuotesApiResponse {
  quotes: Quote[];
  total: number;
  skip: number;
  limit: number;
}

export const quotesApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/quotes' }),
  reducerPath: 'quotesApi',
  tagTypes: ['Quotes'],
  endpoints: build => ({
    getQuotes: build.query<QuotesApiResponse, number>({
      query: (limit = 10) => `?limit=${limit}`,
      providesTags: (_result, _error, id) => [{ type: 'Quotes', id }],
    }),
  }),
});

export const { useGetQuotesQuery } = quotesApiSlice;
