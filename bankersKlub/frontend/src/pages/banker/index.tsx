import { useState } from "react";
import { Box, Typography } from "@mui/material";
import MotionButton from "../../component/Animation/motion-button";
import MotionBlock from "../../component/Animation/motion-block";
import ManipulateDialog from "./manipulate";
import ConfirmDeleteDialog from "./confirmDelete";
import {
  useCreateBankerMutation,
  useDeleteBankerMutation,
  useGetBankersQuery,
  useUpdateBankerMutation,
} from "../../services/bankers.api";

import { toast } from "react-toastify";
import DataTable from "../../component/DataTable";

/**
 * BankersPage component for displaying a list of bankers, adding new bankers, editing, and deleting existing bankers.
 *
 * @returns {JSX.Element} - The rendered BankersPage component.
 */
const Banker = () => {
  const {
    data: bankers,

    isLoading,
    refetch,
  } = useGetBankersQuery(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [bankerToEdit, setBankerToEdit] = useState<any | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [bankerToDelete, setBankerToDelete] = useState<any | null>(null);
  const [createBanker] = useCreateBankerMutation();
  const [updateBanker] = useUpdateBankerMutation();
  const [deleteBanker] = useDeleteBankerMutation();

  const storedBankers = bankers?.data || [];

  /**
   * Opens the banker manipulation dialog to add or edit a banker.
   *
   * @param {Banker} [banker] - Optional banker object to edit.
   */
  const handleOpenDialog = (banker?: IBanker) => {
    setBankerToEdit(banker || null);
    setOpenDialog(true);
  };

  /**
   * Closes the banker manipulation dialog.
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setBankerToEdit(null);
  };

  /**
   * Handles the process of adding or editing a banker.
   *
   * @param {Banker} data - The banker data to be added or edited.
   */
  const handleAddEditBanker = async (data: FormData) => {
    if (bankerToEdit) {
      const response = await updateBanker(data).unwrap();
      if (response?.success) {
        refetch();
        toast.success(response?.message);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      const response = await createBanker(data).unwrap();
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
   * Handles the process of deleting a banker.
   */
  const handleDeleteBanker = async () => {
    const response: IResponse = (await deleteBanker(
      bankerToDelete.id
    ).unwrap()) as unknown as IResponse;
    if (response?.success) {
      toast.success(response?.message);
      refetch();
    } else {
      toast.error("Something went wrong");
    }
    setOpenConfirmDelete(false);
    setBankerToDelete(null);
  };

  const columns: IColumn[] = [
    { field: "name", label: "Name" },
    { field: "text", label: "Text" },
    { field: "email", label: "Email" },
    { field: "phone", label: "Phone" },
    { field: "location", label: "Location" },
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
            Banker List
          </Typography>
          <MotionButton onClick={() => handleOpenDialog()} type="submit">
            Add Banker
          </MotionButton>
        </Box>

        <DataTable
          columns={columns}
          data={storedBankers}
          isLoading={isLoading}
          onEdit={(row) => handleOpenDialog(row)}
          onDelete={(row) => {
            setBankerToDelete(row);
            setOpenConfirmDelete(true);
          }}
        />

        {/* Banker Dialog */}
        <ManipulateDialog
          open={openDialog}
          bankerToEdit={bankerToEdit}
          handleCloseDialog={handleCloseDialog}
          handleAddEditBanker={handleAddEditBanker}
        />

        {/* Confirmation Dialog for Delete */}
        <ConfirmDeleteDialog
          open={openConfirmDelete}
          handleClose={() => setOpenConfirmDelete(false)}
          handleDeleteBanker={handleDeleteBanker}
        />
      </Box>
    </MotionBlock>
  );
};

export default Banker;
