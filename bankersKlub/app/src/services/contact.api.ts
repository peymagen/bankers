import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL + "api/",
});

export const apiContact = createApi({
  reducerPath: "apiContact",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getContactById: builder.query({
      query: (id) => `contacts/${id}`,
    }),
    getContacts: builder.query({
      query: () => "contacts",
    }),
    createContact: builder.mutation({
      query: (newContact) => ({
        url: "contacts",
        method: "POST",
        body: newContact,
      }),
    }),
    updateContact: builder.mutation({
      query: (updatedContact) => ({
        url: `contacts/${updatedContact.get("id")}`,
        method: "PUT",
        body: updatedContact,
      }),
    }),
    patchContact: builder.mutation({
      query: (updatedContact) => ({
        url: `contacts/${updatedContact._id}`,
        method: "PATCH",
        body: updatedContact,
      }),
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `contacts/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetContactByIdQuery,
  useGetContactsQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  usePatchContactMutation,
  useDeleteContactMutation,
} = apiContact;
