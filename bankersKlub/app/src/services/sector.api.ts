import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL + "api/",
});

export const apiSector = createApi({
  reducerPath: "apiSector",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getSectorById: builder.query({
      query: (id) => `sectors/${id}`,
    }),
    getSectors: builder.query({
      query: () => "sectors",
    }),
    createSector: builder.mutation({
      query: (newSector) => ({
        url: "sectors",
        method: "POST",
        body: newSector,
      }),
    }),
    updateSector: builder.mutation({
      query: (updatedSector) => ({
        url: `sectors/${updatedSector.get("id")}`,
        method: "PUT",
        body: updatedSector,
      }),
    }),
    patchSector: builder.mutation({
      query: (updatedSector) => ({
        url: `sectors/${updatedSector._id}`,
        method: "PATCH",
        body: updatedSector,
      }),
    }),
    deleteSector: builder.mutation({
      query: (id) => ({
        url: `sectors/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetSectorByIdQuery,
  useGetSectorsQuery,
  useCreateSectorMutation,
  useUpdateSectorMutation,
  usePatchSectorMutation,
  useDeleteSectorMutation,
} = apiSector;
