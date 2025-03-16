import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiAdvantage = createApi({
  reducerPath: "apiAdvantage",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAdvantageById: builder.query<IAdvantage, string>({
      query: (id) => `advantages/${id}`,
    }),
    getAdvantages: builder.query({
      query: () => "advantages",
    }),
    createAdvantage: builder.mutation({
      query: (newAdvantage) => ({
        url: "advantages",
        method: "POST",
        body: newAdvantage,
      }),
    }),
    updateAdvantage: builder.mutation({
      query: (updatedAdvantage) => ({
        url: `advantages/${updatedAdvantage.get("id")}`,
        method: "PUT",
        body: updatedAdvantage,
      }),
    }),
    patchAdvantage: builder.mutation<IAdvantage, Partial<IAdvantage>>({
      query: (updatedAdvantage) => ({
        url: `advantages/${updatedAdvantage.id}`,
        method: "PATCH",
        body: updatedAdvantage,
      }),
    }),
    deleteAdvantage: builder.mutation<IAdvantage, Partial<IAdvantage>>({
      query: (id) => ({
        url: `advantages/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAdvantageByIdQuery,
  useGetAdvantagesQuery,
  useCreateAdvantageMutation,
  useUpdateAdvantageMutation,
  usePatchAdvantageMutation,
  useDeleteAdvantageMutation,
} = apiAdvantage;
