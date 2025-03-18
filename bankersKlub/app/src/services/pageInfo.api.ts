import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL + "api/",
});

export const apiPageInfo = createApi({
  reducerPath: "apiPageInfo",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getPageInfoById: builder.query({
      query: (id) => `page-infos/${id}`,
    }),
    getPageInfos: builder.query({
      query: () => "page-infos",
    }),
    createPageInfo: builder.mutation({
      query: (newPageInfo) => ({
        url: "page-infos",
        method: "POST",
        body: newPageInfo,
      }),
    }),
    updatePageInfo: builder.mutation({
      query: (updatedPageInfo) => ({
        url: `page-infos/${updatedPageInfo.get("id")}`,
        method: "PUT",
        body: updatedPageInfo,
      }),
    }),
    patchPageInfo: builder.mutation({
      query: (updatedPageInfo) => ({
        url: `page-infos/${updatedPageInfo._id}`,
        method: "PATCH",
        body: updatedPageInfo,
      }),
    }),
    deletePageInfo: builder.mutation({
      query: (id) => ({
        url: `page-infos/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPageInfoByIdQuery,
  useGetPageInfosQuery,
  useCreatePageInfoMutation,
  useUpdatePageInfoMutation,
  usePatchPageInfoMutation,
  useDeletePageInfoMutation,
} = apiPageInfo;
