import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiBlog = createApi({
  reducerPath: "apiBlog",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getBlogById: builder.query<IBlog, string>({
      query: (id) => `blogs/${id}`,
    }),
    getBlogs: builder.query({
      query: () => "blogs",
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
    patchBlog: builder.mutation<IBlog, Partial<IBlog>>({
      query: (updatedBlog) => ({
        url: `blogs/${updatedBlog.id}`,
        method: "PATCH",
        body: updatedBlog,
      }),
    }),
    deleteBlog: builder.mutation<IBlog, Partial<IBlog>>({
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
