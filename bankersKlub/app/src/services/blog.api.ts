import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL + "api/",
});

export const apiBlog = createApi({
  reducerPath: "apiBlog",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getBlogById: builder.query({
      query: (id) => `blogs/${id}`,
    }),
    getBlogs: builder.query({
      query: (query = "") => `blogs${query}`,
    }),
    createBlog: builder.mutation({
      query: (newBlog) => ({
        url: "blogs",
        method: "POST",
        body: newBlog,
      }),
    }),
    updateBlog: builder.mutation({
      query: (updatedBlog) => ({
        url: `blogs/${updatedBlog.get("id")}`,
        method: "PUT",
        body: updatedBlog,
      }),
    }),
    patchBlog: builder.mutation({
      query: (updatedBlog) => ({
        url: `blogs/${updatedBlog._id}`,
        method: "PATCH",
        body: updatedBlog,
      }),
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `blogs/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBlogByIdQuery,
  useGetBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  usePatchBlogMutation,
  useDeleteBlogMutation,
} = apiBlog;
