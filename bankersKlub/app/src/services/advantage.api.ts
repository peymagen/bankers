import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL + "api/",
});

export const apiAdvantage = createApi({
  reducerPath: "apiAdvantage",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getAdvantageById: builder.query({
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
    patchAdvantage: builder.mutation({
      query: (updatedAdvantage) => ({
        url: `advantages/${updatedAdvantage.id}`,
        method: "PATCH",
        body: updatedAdvantage,
      }),
    }),
    deleteAdvantage: builder.mutation({
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
