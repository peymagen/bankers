import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiOpportunity = createApi({
  reducerPath: "apiOpportunity",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getOpportunityById: builder.query<IOpportunity, string>({
      query: (id) => `opportunitys/${id}`,
    }),
    getOpportunitys: builder.query({
      query: () => "opportunitys",
    }),
    createOpportunity: builder.mutation({
      query: (newOpportunity) => ({
        url: "opportunitys",
        method: "POST",
        body: newOpportunity,
      }),
    }),
    updateOpportunity: builder.mutation({
      query: (updatedOpportunity) => ({
        url: `opportunitys/${updatedOpportunity.get("id")}`,
        method: "PUT",
        body: updatedOpportunity,
      }),
    }),
    patchOpportunity: builder.mutation<IOpportunity, Partial<IOpportunity>>({
      query: (updatedOpportunity) => ({
        url: `opportunitys/${updatedOpportunity.id}`,
        method: "PATCH",
        body: updatedOpportunity,
      }),
    }),
    deleteOpportunity: builder.mutation<IOpportunity, Partial<IOpportunity>>({
      query: (id) => ({
        url: `opportunitys/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetOpportunityByIdQuery,
  useGetOpportunitysQuery,
  useCreateOpportunityMutation,
  useUpdateOpportunityMutation,
  usePatchOpportunityMutation,
  useDeleteOpportunityMutation,
} = apiOpportunity;
