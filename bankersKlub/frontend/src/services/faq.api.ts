import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiFaq = createApi({
  reducerPath: "apiFaq",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getFaqById: builder.query<IFaq, string>({
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
    patchFaq: builder.mutation<IFaq, Partial<IFaq>>({
      query: (updatedFaq) => ({
        url: `faqs/${updatedFaq.id}`,
        method: "PATCH",
        body: updatedFaq,
      }),
    }),
    deleteFaq: builder.mutation<IFaq, Partial<IFaq>>({
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
