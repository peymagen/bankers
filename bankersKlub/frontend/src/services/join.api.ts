import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiJoin = createApi({
  reducerPath: "apiJoin",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getJoinById: builder.query<IJoin, string>({
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
    patchJoin: builder.mutation<IJoin, Partial<IJoin>>({
      query: (updatedJoin) => ({
        url: `joins/${updatedJoin.id}`,
        method: "PATCH",
        body: updatedJoin,
      }),
    }),
    deleteJoin: builder.mutation<IJoin, Partial<IJoin>>({
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
