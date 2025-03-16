import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiTeam = createApi({
  reducerPath: "apiTeam",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getTeamById: builder.query<ITeam, string>({
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
    patchTeam: builder.mutation<ITeam, Partial<ITeam>>({
      query: (updatedTeam) => ({
        url: `teams/${updatedTeam.id}`,
        method: "PATCH",
        body: updatedTeam,
      }),
    }),
    deleteTeam: builder.mutation<ITeam, Partial<ITeam>>({
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
