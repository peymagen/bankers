import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiJourney = createApi({
  reducerPath: "apiJourney",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getJourneyById: builder.query<IJourney, string>({
      query: (id) => `journeys/${id}`,
    }),
    getJourneys: builder.query({
      query: () => "journeys",
    }),
    createJourney: builder.mutation({
      query: (newJourney) => ({
        url: "journeys",
        method: "POST",
        body: newJourney,
      }),
    }),
    updateJourney: builder.mutation({
      query: (updatedJourney) => ({
        url: `journeys/${updatedJourney.get("id")}`,
        method: "PUT",
        body: updatedJourney,
      }),
    }),
    patchJourney: builder.mutation<IJourney, Partial<IJourney>>({
      query: (updatedJourney) => ({
        url: `journeys/${updatedJourney.id}`,
        method: "PATCH",
        body: updatedJourney,
      }),
    }),
    deleteJourney: builder.mutation<IJourney, Partial<IJourney>>({
      query: (id) => ({
        url: `journeys/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetJourneyByIdQuery,
  useGetJourneysQuery,
  useCreateJourneyMutation,
  useUpdateJourneyMutation,
  usePatchJourneyMutation,
  useDeleteJourneyMutation,
} = apiJourney;
