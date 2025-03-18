import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL + "api/",
});

export const apiService = createApi({
  reducerPath: "apiService",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getServiceById: builder.query({
      query: (id) => `services/${id}`,
    }),
    getServices: builder.query({
      query: () => "services",
    }),
    createService: builder.mutation({
      query: (newService) => ({
        url: "services",
        method: "POST",
        body: newService,
      }),
    }),
    updateService: builder.mutation({
      query: (updatedService) => ({
        url: `services/${updatedService.get("id")}`,
        method: "PUT",
        body: updatedService,
      }),
    }),
    patchService: builder.mutation({
      query: (updatedService) => ({
        url: `services/${updatedService._id}`,
        method: "PATCH",
        body: updatedService,
      }),
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `services/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetServiceByIdQuery,
  useGetServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  usePatchServiceMutation,
  useDeleteServiceMutation,
} = apiService;
