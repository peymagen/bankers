import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import MotionButton from "../../component/Animation/motion-button";
import MotionBlock from "../../component/Animation/motion-block";
import ManipulateDialog from "./manipulate";
import ConfirmDeleteDialog from "./confirmDelete";
import {
  useCreateFundingMutation,
  useDeleteFundingMutation,
  useGetFundingsQuery,
  useUpdateFundingMutation,
} from "../../services/funding.api";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addFunding } from "../../store/reducers/fundingReducer";
import { toast } from "react-toastify";
import DataTable from "../../component/DataTable";

const Funding = () => {
  const {
    data: fundings,
    error,
    isLoading,
    refetch,
  } = useGetFundingsQuery(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [fundingToEdit, setFundingToEdit] = useState<any | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [fundingToDelete, setFundingToDelete] = useState<any | null>(null);
  const [createFunding] = useCreateFundingMutation();
  const [updateFunding] = useUpdateFundingMutation();
  const [deleteFunding] = useDeleteFundingMutation();

  const dispatch = useAppDispatch();
  const storedFundings = useAppSelector((state) => state.funding.fundings);

  useEffect(() => {
    if (fundings) {
      dispatch(addFunding(fundings.data));
    }
  }, [fundings, dispatch]);

  const handleOpenDialog = (funding?: {
    name: string;
    amount: number;
    image: null | File | string;
  }) => {
    setFundingToEdit(funding || null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFundingToEdit(null);
  };

  const handleAddEditFunding = async (data: FormData) => {
    if (fundingToEdit) {
      const response = await updateFunding(data).unwrap();
      if (response?.success) {
        refetch();
        toast.success(response?.message);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      const response = await createFunding(data).unwrap();
      if (response?.success) {
        toast.success(response?.message);
        refetch();
      } else {
        toast.error("Something went wrong");
      }
    }

    handleCloseDialog();
  };

  const handleDeleteFunding = async () => {
    const response: { success: boolean; message: string } =
      (await deleteFunding(fundingToDelete.id).unwrap()) as unknown as {
        success: boolean;
        message: string;
      };
    if (response?.success) {
      toast.success(response?.message);
      refetch();
    } else {
      toast.error("Something went wrong");
    }
    setOpenConfirmDelete(false);
    setFundingToDelete(null);
  };

  const columns: IColumn[] = [
    { field: "name", label: "Name" },
    { field: "amount", label: "Amount" },
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
            Funding List
          </Typography>
          <MotionButton onClick={() => handleOpenDialog()} type="submit">
            Add Funding
          </MotionButton>
        </Box>

        <DataTable
          columns={columns}
          data={storedFundings}
          isLoading={isLoading}
          onEdit={handleOpenDialog}
          onDelete={(funding) => {
            setFundingToDelete(funding);
            setOpenConfirmDelete(true);
          }}
        />

        {/* Funding Dialog */}
        <ManipulateDialog
          open={openDialog}
          fundingToEdit={fundingToEdit}
          handleCloseDialog={handleCloseDialog}
          handleAddEditFunding={handleAddEditFunding}
        />

        {/* Confirmation Dialog for Delete */}
        <ConfirmDeleteDialog
          open={openConfirmDelete}
          handleClose={() => setOpenConfirmDelete(false)}
          handleDeleteFunding={handleDeleteFunding}
        />
      </Box>
    </MotionBlock>
  );
};

export default Funding;
