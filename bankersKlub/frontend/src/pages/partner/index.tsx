import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import MotionButton from "../../component/Animation/motion-button";
import MotionBlock from "../../component/Animation/motion-block";
import TableSkeleton from "../../component/Skeleton/table-skeleton";
import ManipulateDialog from "./manipulate";
import ConfirmDeleteDialog from "./confirmDelete";
import {
  useCreatePartnerMutation,
  useDeletePartnerMutation,
  useGetPartnersQuery,
  useUpdatePartnerMutation,
} from "../../services/partner.api";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { toast } from "react-toastify";
import DataTable from "../../component/DataTable";

/**
 * PartnersPage component for displaying a list of partners, adding new partners, editing, and deleting existing partners.
 *
 * @returns {JSX.Element} - The rendered PartnersPage component.
 */
const Partner = () => {
  const {
    data: partners,
    error,
    isLoading,
    refetch,
  } = useGetPartnersQuery(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [partnerToEdit, setPartnerToEdit] = useState<any | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [partnerToDelete, setPartnerToDelete] = useState<any | null>(null);
  const [createPartner] = useCreatePartnerMutation();
  const [updatePartner] = useUpdatePartnerMutation();
  const [deletePartner] = useDeletePartnerMutation();

  const dispatch = useAppDispatch();
  const storedPartners = partners?.data || [];

  /**
   * Opens the partner manipulation dialog to add or edit a partner.
   *
   * @param {Partner} [partner] - Optional partner object to edit.
   */
  const handleOpenDialog = (partner?: IPartner) => {
    setPartnerToEdit(partner || null);
    setOpenDialog(true);
  };

  /**
   * Closes the partner manipulation dialog.
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setPartnerToEdit(null);
  };

  /**
   * Handles the process of adding or editing a partner.
   *
   * @param {Partner} data - The partner data to be added or edited.
   */
  const handleAddEditPartner = async (data: FormData) => {
    if (partnerToEdit) {
      const response = await updatePartner(data).unwrap();
      if (response?.success) {
        refetch();
        toast.success(response?.message);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      const response = await createPartner(data).unwrap();
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
   * Handles the process of deleting a partner.
   */
  const handleDeletePartner = async () => {
    const response: IResponse = (await deletePartner(
      partnerToDelete.id
    ).unwrap()) as unknown as IResponse;
    if (response?.success) {
      toast.success(response?.message);
      refetch();
    } else {
      toast.error("Something went wrong");
    }
    setOpenConfirmDelete(false);
    setPartnerToDelete(null);
  };

  const columns: IColumn[] = [
    { field: "name", label: "Name" },
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
            Partner List
          </Typography>
          <MotionButton onClick={() => handleOpenDialog()} type="submit">
            Add Partner
          </MotionButton>
        </Box>

        <DataTable
          columns={columns}
          data={storedPartners}
          isLoading={isLoading}
          onEdit={(row) => handleOpenDialog(row)}
          onDelete={(row) => {
            setPartnerToDelete(row);
            setOpenConfirmDelete(true);
          }}
        />

        {/* Partner Dialog */}
        <ManipulateDialog
          open={openDialog}
          partnerToEdit={partnerToEdit}
          handleCloseDialog={handleCloseDialog}
          handleAddEditPartner={handleAddEditPartner}
        />

        {/* Confirmation Dialog for Delete */}
        <ConfirmDeleteDialog
          open={openConfirmDelete}
          handleClose={() => setOpenConfirmDelete(false)}
          handleDeletePartner={handleDeletePartner}
        />
      </Box>
    </MotionBlock>
  );
};

export default Partner;
