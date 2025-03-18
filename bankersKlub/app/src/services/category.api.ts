import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL + "api/",
});

export const apiCategory = createApi({
  reducerPath: "apiCategory",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getCategoryById: builder.query({
      query: (id) => `categorys/${id}`,
    }),
    getCategorys: builder.query({
      query: () => "categorys",
    }),
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: "categorys",
        method: "POST",
        body: newCategory,
      }),
    }),
    updateCategory: builder.mutation({
      query: (updatedCategory) => ({
        url: `categorys/${updatedCategory.get("id")}`,
        method: "PUT",
        body: updatedCategory,
      }),
    }),
    patchCategory: builder.mutation({
      query: (updatedCategory) => ({
        url: `categorys/${updatedCategory._id}`,
        method: "PATCH",
        body: updatedCategory,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `categorys/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCategoryByIdQuery,
  useGetCategorysQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  usePatchCategoryMutation,
  useDeleteCategoryMutation,
} = apiCategory;
