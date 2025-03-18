import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL + "api/",
});

export const apiBankerVideo = createApi({
  reducerPath: "apiBankerVideo",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getBankerVideoById: builder.query({
      query: (id) => `banker-videos/${id}`,
    }),
    getBankerVideos: builder.query({
      query: () => "banker-videos",
    }),
    createBankerVideo: builder.mutation({
      query: (newBankerVideo) => ({
        url: "banker-videos",
        method: "POST",
        body: newBankerVideo,
      }),
    }),
    updateBankerVideo: builder.mutation({
      query: (updatedBankerVideo) => ({
        url: `banker-videos/${updatedBankerVideo.get("id")}`,
        method: "PUT",
        body: updatedBankerVideo,
      }),
    }),
    patchBankerVideo: builder.mutation({
      query: (updatedBankerVideo) => ({
        url: `banker-videos/${updatedBankerVideo.id}`,
        method: "PATCH",
        body: updatedBankerVideo,
      }),
    }),
    deleteBankerVideo: builder.mutation({
      query: (id) => ({
        url: `banker-videos/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBankerVideoByIdQuery,
  useGetBankerVideosQuery,
  useCreateBankerVideoMutation,
  useUpdateBankerVideoMutation,
  usePatchBankerVideoMutation,
  useDeleteBankerVideoMutation,
} = apiBankerVideo;
