import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL + "api/",
});

export const apiTestimonial = createApi({
  reducerPath: "apiTestimonial",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getTestimonialById: builder.query({
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
    patchTestimonial: builder.mutation({
      query: (updatedTestimonial) => ({
        url: `testimonials/${updatedTestimonial._id}`,
        method: "PATCH",
        body: updatedTestimonial,
      }),
    }),
    deleteTestimonial: builder.mutation({
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
