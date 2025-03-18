import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL + "api/",
});

export const apiOpportunity = createApi({
  reducerPath: "apiOpportunity",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getOpportunityById: builder.query({
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
    patchOpportunity: builder.mutation({
      query: (updatedOpportunity) => ({
        url: `opportunitys/${updatedOpportunity.id}`,
        method: "PATCH",
        body: updatedOpportunity,
      }),
    }),
    deleteOpportunity: builder.mutation({
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
