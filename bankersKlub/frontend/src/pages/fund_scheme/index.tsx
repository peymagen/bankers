import { useState } from "react";
import { Box, Typography } from "@mui/material";
import MotionButton from "../../component/Animation/motion-button";
import MotionBlock from "../../component/Animation/motion-block";
import DataTable from "../../component/DataTable";
import ManipulateDialog from "./manipulate";
import ConfirmDeleteDialog from "./confirmDelete";
import {
  useCreateFundSchemeMutation,
  useDeleteFundSchemeMutation,
  useGetFundSchemesQuery,
  useUpdateFundSchemeMutation,
} from "../../services/fund_scheme.api";
import { toast } from "react-toastify";

const FundScheme = () => {
  const {
    data: fundSchemes,
    isLoading,
    refetch,
  } = useGetFundSchemesQuery(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [schemeToEdit, setSchemeToEdit] = useState<any | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [schemeToDelete, setSchemeToDelete] = useState<any | null>(null);
  const [createFundScheme] = useCreateFundSchemeMutation();
  const [updateFundScheme] = useUpdateFundSchemeMutation();
  const [deleteFundScheme] = useDeleteFundSchemeMutation();

  const storedSchemes = fundSchemes?.data || [];

  const handleOpenDialog = (scheme?: any) => {
    setSchemeToEdit(scheme || null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSchemeToEdit(null);
  };

  const handleAddEditScheme = async (data: FormData) => {
    if (schemeToEdit) {
      const response = await updateFundScheme(data).unwrap();
      if (response?.success) {
        refetch();
        toast.success(response?.message);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      const response = await createFundScheme(data).unwrap();
      if (response?.success) {
        toast.success(response?.message);
        refetch();
      } else {
        toast.error("Something went wrong");
      }
    }
    handleCloseDialog();
  };

  const handleDeleteScheme = async () => {
    const response: IResponse = (await deleteFundScheme(
      schemeToDelete.id
    ).unwrap()) as unknown as IResponse;
    if (response?.success) {
      toast.success(response?.message);
      refetch();
    } else {
      toast.error("Something went wrong");
    }
    setOpenConfirmDelete(false);
    setSchemeToDelete(null);
  };

  const columns = [
    { field: "min", label: "Minimum Amount" },
    { field: "max", label: "Maximum Amount" },
    { field: "profit", label: "Profit Percentage" },
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
            Fund Scheme List
          </Typography>
          <MotionButton onClick={() => handleOpenDialog()}>
            Add Fund Scheme
          </MotionButton>
        </Box>

        <DataTable
          columns={columns}
          data={storedSchemes}
          isLoading={isLoading}
          onEdit={(row) => handleOpenDialog(row)}
          onDelete={(row) => {
            setSchemeToDelete(row);
            setOpenConfirmDelete(true);
          }}
        />

        <ManipulateDialog
          open={openDialog}
          schemeToEdit={schemeToEdit}
          handleCloseDialog={handleCloseDialog}
          handleAddEditFundScheme={handleAddEditScheme}
        />

        <ConfirmDeleteDialog
          open={openConfirmDelete}
          handleClose={() => setOpenConfirmDelete(false)}
          handleDeleteFundScheme={handleDeleteScheme}
        />
      </Box>
    </MotionBlock>
  );
};

export default FundScheme;
