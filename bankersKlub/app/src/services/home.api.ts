import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL + "api/",
});

export const apiHome = createApi({
  reducerPath: "apiHome",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getHomeById: builder.query({
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
    patchHome: builder.mutation({
      query: (updatedHome) => ({
        url: `homes/${updatedHome._id}`,
        method: "PATCH",
        body: updatedHome,
      }),
    }),
    deleteHome: builder.mutation({
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
