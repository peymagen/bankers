import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiTestimonial = createApi({
  reducerPath: "apiTestimonial",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getTestimonialById: builder.query<ITestimonial, string>({
      query: (id) => `testimonials/${id}`,
    }),
    getTestimonials: builder.query({
      query: () => "testimonials",
    }),
    createTestimonial: builder.mutation({
      query: (newTestimonial) => ({
        url: "testimonials",
        method: "POST",
        body: newTestimonial,
      }),
    }),
    updateTestimonial: builder.mutation({
      query: (updatedTestimonial) => ({
        url: `testimonials/${updatedTestimonial.get("id")}`,
        method: "PUT",
        body: updatedTestimonial,
      }),
    }),
    patchTestimonial: builder.mutation<ITestimonial, Partial<ITestimonial>>({
      query: (updatedTestimonial) => ({
        url: `testimonials/${updatedTestimonial.id}`,
        method: "PATCH",
        body: updatedTestimonial,
      }),
    }),
    deleteTestimonial: builder.mutation<ITestimonial, Partial<ITestimonial>>({
      query: (id) => ({
        url: `testimonials/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTestimonialByIdQuery,
  useGetTestimonialsQuery,
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
  usePatchTestimonialMutation,
  useDeleteTestimonialMutation,
} = apiTestimonial;
