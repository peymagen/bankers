import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL + "api/",
});

export const apiFundScheme = createApi({
  reducerPath: "apiFundScheme",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getFundSchemeById: builder.query({
      query: (id) => `fund-schemes/${id}`,
    }),
    getFundSchemes: builder.query({
      query: () => "fund-schemes",
    }),
    createFundScheme: builder.mutation({
      query: (newFundScheme) => ({
        url: "fund-schemes",
        method: "POST",
        body: newFundScheme,
      }),
    }),
    updateFundScheme: builder.mutation({
      query: (updatedFundScheme) => ({
        url: `fund-schemes/${updatedFundScheme.get("id")}`,
        method: "PUT",
        body: updatedFundScheme,
      }),
    }),
    patchFundScheme: builder.mutation({
      query: (updatedFundScheme) => ({
        url: `fund-schemes/${updatedFundScheme._id}`,
        method: "PATCH",
        body: updatedFundScheme,
      }),
    }),
    deleteFundScheme: builder.mutation({
      query: (id) => ({
        url: `fund-schemes/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetFundSchemeByIdQuery,
  useGetFundSchemesQuery,
  useCreateFundSchemeMutation,
  useUpdateFundSchemeMutation,
  usePatchFundSchemeMutation,
  useDeleteFundSchemeMutation,
} = apiFundScheme;
