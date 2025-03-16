import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiBanker = createApi({
  reducerPath: "apiBanker",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getBankerById: builder.query<IBanker, string>({
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
    patchBanker: builder.mutation<IBanker, Partial<IBanker>>({
      query: (updatedBanker) => ({
        url: `bankers/${updatedBanker.id}`,
        method: "PATCH",
        body: updatedBanker,
      }),
    }),
    deleteBanker: builder.mutation<IBanker, Partial<IBanker>>({
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
