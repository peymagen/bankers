import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiSocial = createApi({
  reducerPath: "apiSocial",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getSocialById: builder.query<ISocial, string>({
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
    patchSocial: builder.mutation<ISocial, Partial<ISocial>>({
      query: (updatedSocial) => ({
        url: `socials/${updatedSocial.id}`,
        method: "PATCH",
        body: updatedSocial,
      }),
    }),
    deleteSocial: builder.mutation<ISocial, Partial<ISocial>>({
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
