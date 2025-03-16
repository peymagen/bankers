import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiApplicant = createApi({
  reducerPath: "apiApplicant",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getApplicantById: builder.query<IApplicant, string>({
      query: (id) => `applicants/${id}`,
    }),
    getApplicants: builder.query({
      query: () => "applicants",
    }),
    createApplicant: builder.mutation({
      query: (newApplicant) => ({
        url: "applicants",
        method: "POST",
        body: newApplicant,
      }),
    }),
    updateApplicant: builder.mutation({
      query: (updatedApplicant) => ({
        url: `applicants/${updatedApplicant.get("id")}`,
        method: "PUT",
        body: updatedApplicant,
      }),
    }),
    patchApplicant: builder.mutation<IApplicant, Partial<IApplicant>>({
      query: (updatedApplicant) => ({
        url: `applicants/${updatedApplicant.id}`,
        method: "PATCH",
        body: updatedApplicant,
      }),
    }),
    deleteApplicant: builder.mutation<IApplicant, Partial<IApplicant>>({
      query: (id) => ({
        url: `applicants/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetApplicantByIdQuery,
  useGetApplicantsQuery,
  useCreateApplicantMutation,
  useUpdateApplicantMutation,
  usePatchApplicantMutation,
  useDeleteApplicantMutation,
} = apiApplicant;
