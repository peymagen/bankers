import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL + "api/",
});

export const apiJoin = createApi({
  reducerPath: "apiJoin",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getJoinById: builder.query({
      query: (id) => `joins/${id}`,
    }),
    getJoins: builder.query({
      query: () => "joins",
    }),
    createJoin: builder.mutation({
      query: (newJoin) => ({
        url: "joins",
        method: "POST",
        body: newJoin,
      }),
    }),
    updateJoin: builder.mutation({
      query: (updatedJoin) => ({
        url: `joins/${updatedJoin.get("id")}`,
        method: "PUT",
        body: updatedJoin,
      }),
    }),
    patchJoin: builder.mutation({
      query: (updatedJoin) => ({
        url: `joins/${updatedJoin.id}`,
        method: "PATCH",
        body: updatedJoin,
      }),
    }),
    deleteJoin: builder.mutation({
      query: (id) => ({
        url: `joins/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetJoinByIdQuery,
  useGetJoinsQuery,
  useCreateJoinMutation,
  useUpdateJoinMutation,
  usePatchJoinMutation,
  useDeleteJoinMutation,
} = apiJoin;
