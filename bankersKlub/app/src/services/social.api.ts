import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL + "api/",
});

export const apiSocial = createApi({
  reducerPath: "apiSocial",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getSocialById: builder.query({
      query: (id) => `socials/${id}`,
    }),
    getSocials: builder.query({
      query: () => "socials",
    }),
    createSocial: builder.mutation({
      query: (newSocial) => ({
        url: "socials",
        method: "POST",
        body: newSocial,
      }),
    }),
    updateSocial: builder.mutation({
      query: (updatedSocial) => ({
        url: `socials/${updatedSocial.get("id")}`,
        method: "PUT",
        body: updatedSocial,
      }),
    }),
    patchSocial: builder.mutation({
      query: (updatedSocial) => ({
        url: `socials/${updatedSocial._id}`,
        method: "PATCH",
        body: updatedSocial,
      }),
    }),
    deleteSocial: builder.mutation({
      query: (id) => ({
        url: `socials/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetSocialByIdQuery,
  useGetSocialsQuery,
  useCreateSocialMutation,
  useUpdateSocialMutation,
  usePatchSocialMutation,
  useDeleteSocialMutation,
} = apiSocial;
