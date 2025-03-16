import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiBankerVideo = createApi({
  reducerPath: "apiBankerVideo",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getBankerVideoById: builder.query<IBankerVideo, string>({
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
    patchBankerVideo: builder.mutation<IBankerVideo, Partial<IBankerVideo>>({
      query: (updatedBankerVideo) => ({
        url: `banker-videos/${updatedBankerVideo.id}`,
        method: "PATCH",
        body: updatedBankerVideo,
      }),
    }),
    deleteBankerVideo: builder.mutation<IBankerVideo, Partial<IBankerVideo>>({
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
