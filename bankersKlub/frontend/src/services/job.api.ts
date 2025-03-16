import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiJob = createApi({
  reducerPath: "apiJob",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getJobById: builder.query<IJob, string>({
      query: (id) => `jobs/${id}`,
    }),
    getJobs: builder.query({
      query: () => "jobs",
    }),
    createJob: builder.mutation({
      query: (newJob) => ({
        url: "jobs",
        method: "POST",
        body: newJob,
      }),
    }),
    updateJob: builder.mutation({
      query: (updatedJob) => ({
        url: `jobs/${updatedJob.get("id")}`,
        method: "PUT",
        body: updatedJob,
      }),
    }),
    patchJob: builder.mutation<IJob, Partial<IJob>>({
      query: (updatedJob) => ({
        url: `jobs/${updatedJob.id}`,
        method: "PATCH",
        body: updatedJob,
      }),
    }),
    deleteJob: builder.mutation<IJob, Partial<IJob>>({
      query: (id) => ({
        url: `jobs/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetJobByIdQuery,
  useGetJobsQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  usePatchJobMutation,
  useDeleteJobMutation,
} = apiJob;
