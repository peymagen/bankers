import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiAbout = createApi({
  reducerPath: "apiAbout",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAboutById: builder.query<IAbout, string>({
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
    patchAbout: builder.mutation<IAbout, Partial<IAbout>>({
      query: (updatedAbout) => ({
        url: `abouts/${updatedAbout.id}`,
        method: "PATCH",
        body: updatedAbout,
      }),
    }),
    deleteAbout: builder.mutation<IAbout, Partial<IAbout>>({
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
