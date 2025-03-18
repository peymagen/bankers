import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL + "api/",
});

export const apiJob = createApi({
  reducerPath: "apiJob",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getJobById: builder.query({
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
    patchJob: builder.mutation({
      query: (updatedJob) => ({
        url: `jobs/${updatedJob.id}`,
        method: "PATCH",
        body: updatedJob,
      }),
    }),
    deleteJob: builder.mutation({
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
