import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiPartner = createApi({
  reducerPath: "apiPartner",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getPartnerById: builder.query<IPartner, string>({
      query: (id) => `partners/${id}`,
    }),
    getPartners: builder.query({
      query: () => "partners",
    }),
    createPartner: builder.mutation({
      query: (newPartner) => ({
        url: "partners",
        method: "POST",
        body: newPartner,
      }),
    }),
    updatePartner: builder.mutation({
      query: (updatedPartner) => ({
        url: `partners/${updatedPartner.get("id")}`,
        method: "PUT",
        body: updatedPartner,
      }),
    }),
    patchPartner: builder.mutation<IPartner, Partial<IPartner>>({
      query: (updatedPartner) => ({
        url: `partners/${updatedPartner.id}`,
        method: "PATCH",
        body: updatedPartner,
      }),
    }),
    deletePartner: builder.mutation<IPartner, Partial<IPartner>>({
      query: (id) => ({
        url: `partners/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPartnerByIdQuery,
  useGetPartnersQuery,
  useCreatePartnerMutation,
  useUpdatePartnerMutation,
  usePatchPartnerMutation,
  useDeletePartnerMutation,
} = apiPartner;
