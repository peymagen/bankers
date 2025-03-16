import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiHome = createApi({
  reducerPath: "apiHome",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getHomeById: builder.query<IHome, string>({
      query: (id) => `homes/${id}`,
    }),
    getHomes: builder.query({
      query: () => "homes",
    }),
    createHome: builder.mutation({
      query: (newHome) => ({
        url: "homes",
        method: "POST",
        body: newHome,
      }),
    }),
    updateHome: builder.mutation({
      query: (updatedHome) => ({
        url: `homes/${updatedHome.get("id")}`,
        method: "PUT",
        body: updatedHome,
      }),
    }),
    patchHome: builder.mutation<IHome, Partial<IHome>>({
      query: (updatedHome) => ({
        url: `homes/${updatedHome.id}`,
        method: "PATCH",
        body: updatedHome,
      }),
    }),
    deleteHome: builder.mutation<IHome, Partial<IHome>>({
      query: (id) => ({
        url: `homes/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetHomeByIdQuery,
  useGetHomesQuery,
  useCreateHomeMutation,
  useUpdateHomeMutation,
  usePatchHomeMutation,
  useDeleteHomeMutation,
} = apiHome;
