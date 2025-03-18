import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL + "api/",
});

export const apiAbout = createApi({
  reducerPath: "apiAbout",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getAboutById: builder.query({
      query: (id) => `abouts/${id}`,
    }),
    getAbouts: builder.query({
      query: () => "abouts",
    }),
    createAbout: builder.mutation({
      query: (newAbout) => ({
        url: "abouts",
        method: "POST",
        body: newAbout,
      }),
    }),
    updateAbout: builder.mutation({
      query: (updatedAbout) => ({
        url: `abouts/${updatedAbout.get("id")}`,
        method: "PUT",
        body: updatedAbout,
      }),
    }),
    patchAbout: builder.mutation({
      query: (updatedAbout) => ({
        url: `abouts/${updatedAbout._id}`,
        method: "PATCH",
        body: updatedAbout,
      }),
    }),
    deleteAbout: builder.mutation({
      query: (id) => ({
        url: `abouts/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAboutByIdQuery,
  useGetAboutsQuery,
  useCreateAboutMutation,
  useUpdateAboutMutation,
  usePatchAboutMutation,
  useDeleteAboutMutation,
} = apiAbout;
