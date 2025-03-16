import { useState } from "react";
import { Box, Typography } from "@mui/material";
import MotionButton from "../../component/Animation/motion-button";
import MotionBlock from "../../component/Animation/motion-block";
import ManipulateDialog from "./manipulate";
import ConfirmDeleteDialog from "./confirmDelete";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../services/user.api";
import { toast } from "react-toastify";
import DataTable from "../../component/DataTable";

/**
 * UsersPage component for displaying a list of users, adding new users, editing, and deleting existing users.
 *
 * @returns {JSX.Element} - The rendered UsersPage component.
 */
const User = () => {
  const { data: users, isLoading, refetch } = useGetUsersQuery("");
  const [openDialog, setOpenDialog] = useState(false);
  const [userToEdit, setUserToEdit] = useState<any | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any | null>(null);
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const storedUsers = users?.data || [];
  console.log(storedUsers);
  /**
   * Opens the user manipulation dialog to add or edit a user.
   *
   * @param {User} [user] - Optional user object to edit.
   */
  const handleOpenDialog = (user?: User) => {
    setUserToEdit(user || null);
    setOpenDialog(true);
  };

  /**
   * Closes the user manipulation dialog.
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setUserToEdit(null);
  };

  /**
   * Handles the process of adding or editing a user.
   *
   * @param {User} data - The user data to be added or edited.
   */
  const handleAddEditUser = async (data: FormData) => {
    if (userToEdit) {
      const response = await updateUser(data).unwrap();
      if (response?.success) {
        refetch();
        toast.success(response?.message);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      const response = await createUser(data).unwrap();
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
   * Handles the process of deleting a user.
   */
  const handleDeleteUser = async () => {
    const response: IResponse = (await deleteUser(
      userToDelete.id
    ).unwrap()) as unknown as IResponse;
    if (response?.success) {
      toast.success(response?.message);
      refetch();
    } else {
      toast.error("Something went wrong");
    }
    setOpenConfirmDelete(false);
    setUserToDelete(null);
  };

  const columns: IColumn[] = [{ field: "email", label: "E Mail" }];

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
            User List
          </Typography>
          <MotionButton onClick={() => handleOpenDialog()} type="submit">
            Add User
          </MotionButton>
        </Box>

        <DataTable
          columns={columns}
          data={storedUsers}
          isLoading={isLoading}
          onEdit={(row) => handleOpenDialog(row)}
          onDelete={(row) => {
            setUserToDelete(row);
            setOpenConfirmDelete(true);
          }}
        />

        {/* User Dialog */}
        <ManipulateDialog
          open={openDialog}
          userToEdit={userToEdit}
          handleCloseDialog={handleCloseDialog}
          handleAddEditUser={handleAddEditUser}
        />

        {/* Confirmation Dialog for Delete */}
        <ConfirmDeleteDialog
          open={openConfirmDelete}
          handleClose={() => setOpenConfirmDelete(false)}
          handleDeleteUser={handleDeleteUser}
        />
      </Box>
    </MotionBlock>
  );
};

export default User;
