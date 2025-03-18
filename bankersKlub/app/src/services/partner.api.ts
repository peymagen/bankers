import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL + "api/",
});

export const apiPartner = createApi({
  reducerPath: "apiPartner",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getPartnerById: builder.query({
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
    patchPartner: builder.mutation({
      query: (updatedPartner) => ({
        url: `partners/${updatedPartner._id}`,
        method: "PATCH",
        body: updatedPartner,
      }),
    }),
    deletePartner: builder.mutation({
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
