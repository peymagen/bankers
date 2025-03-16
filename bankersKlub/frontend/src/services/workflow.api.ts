import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiWorkflow = createApi({
  reducerPath: "apiWorkflow",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getWorkflowById: builder.query<IWorkflow, string>({
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
    patchWorkflow: builder.mutation<IWorkflow, Partial<IWorkflow>>({
      query: (updatedWorkflow) => ({
        url: `workflows/${updatedWorkflow.id}`,
        method: "PATCH",
        body: updatedWorkflow,
      }),
    }),
    deleteWorkflow: builder.mutation<IWorkflow, Partial<IWorkflow>>({
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
