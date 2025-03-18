import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL + "api/",
});

export const apiTeam = createApi({
  reducerPath: "apiTeam",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getTeamById: builder.query({
      query: (id) => `teams/${id}`,
    }),
    getTeams: builder.query({
      query: () => "teams",
    }),
    createTeam: builder.mutation({
      query: (newTeam) => ({
        url: "teams",
        method: "POST",
        body: newTeam,
      }),
    }),
    updateTeam: builder.mutation({
      query: (updatedTeam) => ({
        url: `teams/${updatedTeam.get("id")}`,
        method: "PUT",
        body: updatedTeam,
      }),
    }),
    patchTeam: builder.mutation({
      query: (updatedTeam) => ({
        url: `teams/${updatedTeam.id}`,
        method: "PATCH",
        body: updatedTeam,
      }),
    }),
    deleteTeam: builder.mutation({
      query: (id) => ({
        url: `teams/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTeamByIdQuery,
  useGetTeamsQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  usePatchTeamMutation,
  useDeleteTeamMutation,
} = apiTeam;
