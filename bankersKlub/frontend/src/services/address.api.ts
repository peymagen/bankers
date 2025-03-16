import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiAddress = createApi({
  reducerPath: "apiAddress",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAddressById: builder.query<IAddress, string>({
      query: (id) => `address/${id}`,
    }),
    getAddresss: builder.query({
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
    patchAddress: builder.mutation<IAddress, Partial<IAddress>>({
      query: (updatedAddress) => ({
        url: `address/${updatedAddress.id}`,
        method: "PATCH",
        body: updatedAddress,
      }),
    }),
    deleteAddress: builder.mutation<IAddress, Partial<IAddress>>({
      query: (id) => ({
        url: `address/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAddressByIdQuery,
  useGetAddresssQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  usePatchAddressMutation,
  useDeleteAddressMutation,
} = apiAddress;
