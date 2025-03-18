import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL + "api/",
});

export const apiAddress = createApi({
  reducerPath: "apiAddress",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getAddressById: builder.query({
      query: (id) => `address/${id}`,
    }),
    getAddress: builder.query({
      query: () => "address",
    }),
    createAddress: builder.mutation({
      query: (newAddress) => ({
        url: "address",
        method: "POST",
        body: newAddress,
      }),
    }),
    updateAddress: builder.mutation({
      query: (updatedAddress) => ({
        url: `address/${updatedAddress.get("id")}`,
        method: "PUT",
        body: updatedAddress,
      }),
    }),
    patchAddress: builder.mutation({
      query: (updatedAddress) => ({
        url: `address/${updatedAddress._id}`,
        method: "PATCH",
        body: updatedAddress,
      }),
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `address/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAddressByIdQuery,
  useGetAddressQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  usePatchAddressMutation,
  useDeleteAddressMutation,
} = apiAddress;
