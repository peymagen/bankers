import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiFundScheme = createApi({
  reducerPath: "apiFundScheme",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getFundSchemeById: builder.query<IFundScheme, string>({
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
    patchFundScheme: builder.mutation<IFundScheme, Partial<IFundScheme>>({
      query: (updatedFundScheme) => ({
        url: `fund-schemes/${updatedFundScheme.id}`,
        method: "PATCH",
        body: updatedFundScheme,
      }),
    }),
    deleteFundScheme: builder.mutation<IFundScheme, Partial<IFundScheme>>({
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
