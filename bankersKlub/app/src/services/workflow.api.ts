import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL + "api/",
});

export const apiWorkflow = createApi({
  reducerPath: "apiWorkflow",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getWorkflowById: builder.query({
      query: (id) => `workflows/${id}`,
    }),
    getWorkflows: builder.query({
      query: () => "workflows",
    }),
    createWorkflow: builder.mutation({
      query: (newWorkflow) => ({
        url: "workflows",
        method: "POST",
        body: newWorkflow,
      }),
    }),
    updateWorkflow: builder.mutation({
      query: (updatedWorkflow) => ({
        url: `workflows/${updatedWorkflow.get("id")}`,
        method: "PUT",
        body: updatedWorkflow,
      }),
    }),
    patchWorkflow: builder.mutation({
      query: (updatedWorkflow) => ({
        url: `workflows/${updatedWorkflow.id}`,
        method: "PATCH",
        body: updatedWorkflow,
      }),
    }),
    deleteWorkflow: builder.mutation({
      query: (id) => ({
        url: `workflows/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetWorkflowByIdQuery,
  useGetWorkflowsQuery,
  useCreateWorkflowMutation,
  useUpdateWorkflowMutation,
  usePatchWorkflowMutation,
  useDeleteWorkflowMutation,
} = apiWorkflow;
