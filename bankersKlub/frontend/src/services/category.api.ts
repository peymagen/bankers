import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiCategory = createApi({
  reducerPath: "apiCategory",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getCategoryById: builder.query<ICategory, string>({
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
    patchCategory: builder.mutation<ICategory, Partial<ICategory>>({
      query: (updatedCategory) => ({
        url: `categorys/${updatedCategory.id}`,
        method: "PATCH",
        body: updatedCategory,
      }),
    }),
    deleteCategory: builder.mutation<ICategory, Partial<ICategory>>({
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
