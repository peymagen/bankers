import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiService = createApi({
  reducerPath: "apiService",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getServiceById: builder.query<IService, string>({
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
    patchService: builder.mutation<IService, Partial<IService>>({
      query: (updatedService) => ({
        url: `services/${updatedService.id}`,
        method: "PATCH",
        body: updatedService,
      }),
    }),
    deleteService: builder.mutation<IService, Partial<IService>>({
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
