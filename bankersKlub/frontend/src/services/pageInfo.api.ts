import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiPageInfo = createApi({
  reducerPath: "apiPageInfo",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getPageInfoById: builder.query<IPageInfo, string>({
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
    patchPageInfo: builder.mutation<IPageInfo, Partial<IPageInfo>>({
      query: (updatedPageInfo) => ({
        url: `page-infos/${updatedPageInfo.id}`,
        method: "PATCH",
        body: updatedPageInfo,
      }),
    }),
    deletePageInfo: builder.mutation<IPageInfo, Partial<IPageInfo>>({
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
