import { useState } from "react";
import { Box, Typography } from "@mui/material";
import MotionButton from "../../component/Animation/motion-button";
import MotionBlock from "../../component/Animation/motion-block";
import ManipulateDialog from "./manipulate";
import ConfirmDeleteDialog from "./confirmDelete";
import {
  useCreateAdvantageMutation,
  useDeleteAdvantageMutation,
  useGetAdvantagesQuery,
  useUpdateAdvantageMutation,
} from "../../services/advantage.api";
import { toast } from "react-toastify";
import DataTable from "../../component/DataTable";

/**
 * AdvantagesPage component for displaying a list of advantages, adding new advantages, editing, and deleting existing advantages.
 *
 * @returns {JSX.Element} - The rendered AdvantagesPage component.
 */
const Advantage = () => {
  const {
    data: advantages,
    isLoading,
    refetch,
  } = useGetAdvantagesQuery(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [advantageToEdit, setAdvantageToEdit] = useState<any | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [advantageToDelete, setAdvantageToDelete] = useState<any | null>(null);
  const [createAdvantage] = useCreateAdvantageMutation();
  const [updateAdvantage] = useUpdateAdvantageMutation();
  const [deleteAdvantage] = useDeleteAdvantageMutation();

  const storedAdvantages = advantages?.data || [];

  /**
   * Opens the advantage manipulation dialog to add or edit a advantage.
   *
   * @param {Advantage} [advantage] - Optional advantage object to edit.
   */
  const handleOpenDialog = (advantage?: IAdvantage) => {
    setAdvantageToEdit(advantage || null);
    setOpenDialog(true);
  };

  /**
   * Closes the advantage manipulation dialog.
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setAdvantageToEdit(null);
  };

  /**
   * Handles the process of adding or editing a advantage.
   *
   * @param {Advantage} data - The advantage data to be added or edited.
   */
  const handleAddEditAdvantage = async (data: FormData) => {
    if (advantageToEdit) {
      const response = await updateAdvantage(data).unwrap();
      if (response?.success) {
        refetch();
        toast.success(response?.message);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      const response = await createAdvantage(data).unwrap();
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
   * Handles the process of deleting a advantage.
   */
  const handleDeleteAdvantage = async () => {
    const response: IResponse = (await deleteAdvantage(
      advantageToDelete.id
    ).unwrap()) as unknown as IResponse;
    if (response?.success) {
      toast.success(response?.message);
      refetch();
    } else {
      toast.error("Something went wrong");
    }
    setOpenConfirmDelete(false);
    setAdvantageToDelete(null);
  };

  const columns: IColumn[] = [
    { field: "title", label: "Title" },
    { field: "description", label: "Description" },
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
            Advantage List
          </Typography>
          <MotionButton onClick={() => handleOpenDialog()} type="submit">
            Add Advantage
          </MotionButton>
        </Box>

        <DataTable
          columns={columns}
          data={storedAdvantages}
          isLoading={isLoading}
          onEdit={(row) => handleOpenDialog(row)}
          onDelete={(row) => {
            setAdvantageToDelete(row);
            setOpenConfirmDelete(true);
          }}
        />

        {/* Advantage Dialog */}
        <ManipulateDialog
          open={openDialog}
          advantageToEdit={advantageToEdit}
          handleCloseDialog={handleCloseDialog}
          handleAddEditAdvantage={handleAddEditAdvantage}
        />

        {/* Confirmation Dialog for Delete */}
        <ConfirmDeleteDialog
          open={openConfirmDelete}
          handleClose={() => setOpenConfirmDelete(false)}
          handleDeleteAdvantage={handleDeleteAdvantage}
        />
      </Box>
    </MotionBlock>
  );
};

export default Advantage;
