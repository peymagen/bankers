import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL + "api/",
});

export const apiJorney = createApi({
  reducerPath: "apiJorney",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getJorneyById: builder.query({
      query: (id) => `journeys/${id}`,
    }),
    getJorneys: builder.query({
      query: () => "journeys",
    }),
    createJorney: builder.mutation({
      query: (newJorney) => ({
        url: "journeys",
        method: "POST",
        body: newJorney,
      }),
    }),
    updateJorney: builder.mutation({
      query: (updatedJorney) => ({
        url: `journeys/${updatedJorney.get("id")}`,
        method: "PUT",
        body: updatedJorney,
      }),
    }),
    patchJorney: builder.mutation({
      query: (updatedJorney) => ({
        url: `journeys/${updatedJorney._id}`,
        method: "PATCH",
        body: updatedJorney,
      }),
    }),
    deleteJorney: builder.mutation({
      query: (id) => ({
        url: `journeys/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetJorneyByIdQuery,
  useGetJorneysQuery,
  useCreateJorneyMutation,
  useUpdateJorneyMutation,
  usePatchJorneyMutation,
  useDeleteJorneyMutation,
} = apiJorney;
