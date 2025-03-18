import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL + "api/",
});

export const apiFaq = createApi({
  reducerPath: "apiFaq",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getFaqById: builder.query({
      query: (id) => `faqs/${id}`,
    }),
    getFaqs: builder.query({
      query: () => "faqs",
    }),
    createFaq: builder.mutation({
      query: (newFaq) => ({
        url: "faqs",
        method: "POST",
        body: newFaq,
      }),
    }),
    updateFaq: builder.mutation({
      query: (updatedFaq) => ({
        url: `faqs/${updatedFaq.get("id")}`,
        method: "PUT",
        body: updatedFaq,
      }),
    }),
    patchFaq: builder.mutation({
      query: (updatedFaq) => ({
        url: `faqs/${updatedFaq._id}`,
        method: "PATCH",
        body: updatedFaq,
      }),
    }),
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `faqs/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetFaqByIdQuery,
  useGetFaqsQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  usePatchFaqMutation,
  useDeleteFaqMutation,
} = apiFaq;
