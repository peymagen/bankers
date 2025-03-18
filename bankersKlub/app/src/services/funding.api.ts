import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL + "api/",
});

export const apiFunding = createApi({
  reducerPath: "apiFunding",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getFundingById: builder.query({
      query: (id) => `fundings/${id}`,
    }),
    getFundings: builder.query({
      query: () => "fundings",
    }),
    createFunding: builder.mutation({
      query: (newFunding) => ({
        url: "fundings",
        method: "POST",
        body: newFunding,
      }),
    }),
    updateFunding: builder.mutation({
      query: (updatedFunding) => ({
        url: `fundings/${updatedFunding.get("id")}`,
        method: "PUT",
        body: updatedFunding,
      }),
    }),
    patchFunding: builder.mutation({
      query: (updatedFunding) => ({
        url: `fundings/${updatedFunding.id}`,
        method: "PATCH",
        body: updatedFunding,
      }),
    }),
    deleteFunding: builder.mutation({
      query: (id) => ({
        url: `fundings/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetFundingByIdQuery,
  useGetFundingsQuery,
  useCreateFundingMutation,
  useUpdateFundingMutation,
  usePatchFundingMutation,
  useDeleteFundingMutation,
} = apiFunding;
