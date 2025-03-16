import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiFunding = createApi({
  reducerPath: "apiFunding",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getFundingById: builder.query<IFunding, string>({
      query: (id) => `fundings/${id}`,
    }),
    getFundings: builder.query({
      query: () => "fundings",
    }),
    createFunding: builder.mutation({
      query: (newFunding) => ({
        url: "fundings",
        method: "POST",
        body: newFunding,
      }),
    }),
    updateFunding: builder.mutation({
      query: (updatedFunding) => ({
        url: `fundings/${updatedFunding.get("id")}`,
        method: "PUT",
        body: updatedFunding,
      }),
    }),
    patchFunding: builder.mutation<IFunding, Partial<IFunding>>({
      query: (updatedFunding) => ({
        url: `fundings/${updatedFunding.id}`,
        method: "PATCH",
        body: updatedFunding,
      }),
    }),
    deleteFunding: builder.mutation<IFunding, Partial<IFunding>>({
      query: (id) => ({
        url: `fundings/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetFundingByIdQuery,
  useGetFundingsQuery,
  useCreateFundingMutation,
  useUpdateFundingMutation,
  usePatchFundingMutation,
  useDeleteFundingMutation,
} = apiFunding;
