import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL + "api/",
});

export const apiBanker = createApi({
  reducerPath: "apiBanker",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getBankerById: builder.query({
      query: (id) => `bankers/${id}`,
    }),
    getBankers: builder.query({
      query: () => "bankers",
    }),
    createBanker: builder.mutation({
      query: (newBanker) => ({
        url: "bankers",
        method: "POST",
        body: newBanker,
      }),
    }),
    updateBanker: builder.mutation({
      query: (updatedBanker) => ({
        url: `bankers/${updatedBanker.get("id")}`,
        method: "PUT",
        body: updatedBanker,
      }),
    }),
    patchBanker: builder.mutation({
      query: (updatedBanker) => ({
        url: `bankers/${updatedBanker._id}`,
        method: "PATCH",
        body: updatedBanker,
      }),
    }),
    deleteBanker: builder.mutation({
      query: (id) => ({
        url: `bankers/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBankerByIdQuery,
  useGetBankersQuery,
  useCreateBankerMutation,
  useUpdateBankerMutation,
  usePatchBankerMutation,
  useDeleteBankerMutation,
} = apiBanker;
