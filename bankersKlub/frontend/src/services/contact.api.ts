import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiContact = createApi({
  reducerPath: "apiContact",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getContactById: builder.query<IContact, string>({
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
    patchContact: builder.mutation<IContact, Partial<IContact>>({
      query: (updatedContact) => ({
        url: `contacts/${updatedContact.id}`,
        method: "PATCH",
        body: updatedContact,
      }),
    }),
    deleteContact: builder.mutation<IContact, Partial<IContact>>({
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
