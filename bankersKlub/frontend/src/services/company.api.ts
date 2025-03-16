import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiCompany = createApi({
  reducerPath: "apiCompany",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getCompanyById: builder.query<ICompany, string>({
      query: (id) => `companys/${id}`,
    }),
    getCompanys: builder.query({
      query: () => "companys",
    }),
    createCompany: builder.mutation({
      query: (newCompany) => ({
        url: "companys",
        method: "POST",
        body: newCompany,
      }),
    }),
    updateCompany: builder.mutation({
      query: (updatedCompany) => ({
        url: `companys/${updatedCompany.get("id")}`,
        method: "PUT",
        body: updatedCompany,
      }),
    }),
    patchCompany: builder.mutation<ICompany, Partial<ICompany>>({
      query: (updatedCompany) => ({
        url: `companys/${updatedCompany.id}`,
        method: "PATCH",
        body: updatedCompany,
      }),
    }),
    deleteCompany: builder.mutation<ICompany, Partial<ICompany>>({
      query: (id) => ({
        url: `companys/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCompanyByIdQuery,
  useGetCompanysQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  usePatchCompanyMutation,
  useDeleteCompanyMutation,
} = apiCompany;
