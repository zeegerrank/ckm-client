import { apiSlice } from "../../app/apiSlice";import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

const stocksAdapter = createEntityAdapter();

const initialState = stocksAdapter.getInitialState({});

export const stocksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStocks: builder.query({
      query: () => ({
        url: "/stocks",
        method: "GET",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
    }),
  }),
});
