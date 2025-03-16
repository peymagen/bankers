import { useState } from "react";
import { Box, Typography } from "@mui/material";
import MotionButton from "../../component/Animation/motion-button";
import MotionBlock from "../../component/Animation/motion-block";
import ManipulateDialog from "./manipulate";
import ConfirmDeleteDialog from "./confirmDelete";
import {
  useCreateJoinMutation,
  useDeleteJoinMutation,
  useGetJoinsQuery,
  useUpdateJoinMutation,
} from "../../services/join.api";

import { toast } from "react-toastify";
import DataTable from "../../component/DataTable";

/**
 * JoinsPage component for displaying a list of joins, adding new joins, editing, and deleting existing joins.
 *
 * @returns {JSX.Element} - The rendered JoinsPage component.
 */
const Join = () => {
  const {
    data: joins,

    isLoading,
    refetch,
  } = useGetJoinsQuery(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [joinToEdit, setJoinToEdit] = useState<any | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [joinToDelete, setJoinToDelete] = useState<any | null>(null);
  const [createJoin] = useCreateJoinMutation();
  const [updateJoin] = useUpdateJoinMutation();
  const [deleteJoin] = useDeleteJoinMutation();

  const storedJoins = joins?.data || [];

  /**
   * Opens the join manipulation dialog to add or edit a join.
   *
   * @param {Join} [join] - Optional join object to edit.
   */
  const handleOpenDialog = (join?: IJoin) => {
    setJoinToEdit(join || null);
    setOpenDialog(true);
  };

  /**
   * Closes the join manipulation dialog.
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setJoinToEdit(null);
  };

  /**
   * Handles the process of adding or editing a join.
   *
   * @param {Join} data - The join data to be added or edited.
   */
  const handleAddEditJoin = async (data: FormData) => {
    if (joinToEdit) {
      const response = await updateJoin(data).unwrap();
      if (response?.success) {
        refetch();
        toast.success(response?.message);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      const response = await createJoin(data).unwrap();
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
   * Handles the process of deleting a join.
   */
  const handleDeleteJoin = async () => {
    const response: IResponse = (await deleteJoin(
      joinToDelete.id
    ).unwrap()) as unknown as IResponse;
    if (response?.success) {
      toast.success(response?.message);
      refetch();
    } else {
      toast.error("Something went wrong");
    }
    setOpenConfirmDelete(false);
    setJoinToDelete(null);
  };

  const columns: IColumn[] = [
    { field: "title", label: "Title" },
    { field: "description", label: "Description" },
    { field: "icon", label: "Icon", type: "image" },
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
            Join List
          </Typography>
          <MotionButton onClick={() => handleOpenDialog()} type="submit">
            Add Join
          </MotionButton>
        </Box>

        <DataTable
          columns={columns}
          data={storedJoins}
          isLoading={isLoading}
          onEdit={(row) => handleOpenDialog(row)}
          onDelete={(row) => {
            setJoinToDelete(row);
            setOpenConfirmDelete(true);
          }}
        />

        {/* Join Dialog */}
        <ManipulateDialog
          open={openDialog}
          joinToEdit={joinToEdit}
          handleCloseDialog={handleCloseDialog}
          handleAddEditJoin={handleAddEditJoin}
        />

        {/* Confirmation Dialog for Delete */}
        <ConfirmDeleteDialog
          open={openConfirmDelete}
          handleClose={() => setOpenConfirmDelete(false)}
          handleDeleteJoin={handleDeleteJoin}
        />
      </Box>
    </MotionBlock>
  );
};

export default Join;
