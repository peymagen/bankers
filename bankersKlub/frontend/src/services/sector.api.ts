import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiSector = createApi({
  reducerPath: "apiSector",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getSectorById: builder.query<ISector, string>({
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
    patchSector: builder.mutation<ISector, Partial<ISector>>({
      query: (updatedSector) => ({
        url: `sectors/${updatedSector.id}`,
        method: "PATCH",
        body: updatedSector,
      }),
    }),
    deleteSector: builder.mutation<ISector, Partial<ISector>>({
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
