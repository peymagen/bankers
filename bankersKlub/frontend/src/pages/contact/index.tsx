import { useState } from "react";
import { Box, Typography } from "@mui/material";
import MotionButton from "../../component/Animation/motion-button";
import MotionBlock from "../../component/Animation/motion-block";
import ManipulateDialog from "./manipulate";
import ConfirmDeleteDialog from "./confirmDelete";
import {
  useCreateContactMutation,
  useDeleteContactMutation,
  useGetContactsQuery,
  useUpdateContactMutation,
} from "../../services/contact.api";
import { toast } from "react-toastify";
import DataTable from "../../component/DataTable";

/**
 * ContactsPage component for displaying a list of contacts, adding new contacts, editing, and deleting existing contacts.
 *
 * @returns {JSX.Element} - The rendered ContactsPage component.
 */
const Contact = () => {
  const {
    data: contacts,
    error,
    isLoading,
    refetch,
  } = useGetContactsQuery(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [contactToEdit, setContactToEdit] = useState<any | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<any | null>(null);
  const [createContact] = useCreateContactMutation();
  const [updateContact] = useUpdateContactMutation();
  const [deleteContact] = useDeleteContactMutation();

  const storedContacts = contacts?.data || [];

  /**
   * Opens the contact manipulation dialog to add or edit a contact.
   *
   * @param {Contact} [contact] - Optional contact object to edit.
   */
  const handleOpenDialog = (contact?: IContact) => {
    setContactToEdit(contact || null);
    setOpenDialog(true);
  };

  /**
   * Closes the contact manipulation dialog.
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setContactToEdit(null);
  };

  /**
   * Handles the process of adding or editing a contact.
   *
   * @param {Contact} data - The contact data to be added or edited.
   */
  const handleAddEditContact = async (data: FormData) => {
    if (contactToEdit) {
      const response = await updateContact(data).unwrap();
      if (response?.success) {
        refetch();
        toast.success(response?.message);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      const response = await createContact(data).unwrap();
      if (response?.success) {
        toast.success(response?.message);
        refetch();
      } else {
        toast.error("Something went wrong");
      }
    }

    handleCloseDialog();
  };

  /**
   * Handles the process of deleting a contact.
   */
  const handleDeleteContact = async () => {
    const response: IResponse = (await deleteContact(
      contactToDelete.id
    ).unwrap()) as unknown as IResponse;
    if (response?.success) {
      toast.success(response?.message);
      refetch();
    } else {
      toast.error("Something went wrong");
    }
    setOpenConfirmDelete(false);
    setContactToDelete(null);
  };

  const columns: IColumn[] = [
    { field: "title", label: "Title" },
    { field: "sub", label: "Subtitle" },
    { field: "email", label: "Email" },
    { field: "contact", label: "Contact" },
    { field: "maps", label: "map" },
    { field: "image", label: "Image", type: "image" },
  ];

  return (
    <MotionBlock>
      <Box sx={{ margin: "0 auto" }}>
        <Box
          my={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom>
            Contact List
          </Typography>
          <MotionButton onClick={() => handleOpenDialog()} type="submit">
            Add Contact
          </MotionButton>
        </Box>

        <DataTable
          columns={columns}
          data={storedContacts}
          isLoading={isLoading}
          onEdit={(row) => handleOpenDialog(row)}
          onDelete={(row) => {
            setContactToDelete(row);
            setOpenConfirmDelete(true);
          }}
        />

        {/* Contact Dialog */}
        <ManipulateDialog
          open={openDialog}
          contactToEdit={contactToEdit}
          handleCloseDialog={handleCloseDialog}
          handleAddEditContact={handleAddEditContact}
        />

        {/* Confirmation Dialog for Delete */}
        <ConfirmDeleteDialog
          open={openConfirmDelete}
          handleClose={() => setOpenConfirmDelete(false)}
          handleDeleteContact={handleDeleteContact}
        />
      </Box>
    </MotionBlock>
  );
};

export default Contact;
