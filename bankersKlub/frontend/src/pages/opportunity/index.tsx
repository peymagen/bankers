import { useState } from "react";
import { Box, Typography } from "@mui/material";
import MotionButton from "../../component/Animation/motion-button";
import MotionBlock from "../../component/Animation/motion-block";
import ManipulateDialog from "./manipulate";
import ConfirmDeleteDialog from "./confirmDelete";
import {
  useCreateOpportunityMutation,
  useDeleteOpportunityMutation,
  useGetOpportunitysQuery,
  useUpdateOpportunityMutation,
} from "../../services/opportunity.api";
import { useAppDispatch } from "../../store/store";
import { toast } from "react-toastify";
import DataTable from "../../component/DataTable";

/**
 * OpportunitysPage component for displaying a list of opportunitys, adding new opportunitys, editing, and deleting existing opportunitys.
 *
 * @returns {JSX.Element} - The rendered OpportunitysPage component.
 */
const Opportunity = () => {
  const {
    data: opportunitys,

    isLoading,
    refetch,
  } = useGetOpportunitysQuery(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [opportunityToEdit, setOpportunityToEdit] = useState<any | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [opportunityToDelete, setOpportunityToDelete] = useState<any | null>(
    null
  );
  const [createOpportunity] = useCreateOpportunityMutation();
  const [updateOpportunity] = useUpdateOpportunityMutation();
  const [deleteOpportunity] = useDeleteOpportunityMutation();

  const storedOpportunitys = opportunitys?.data || [];

  /**
   * Opens the opportunity manipulation dialog to add or edit a opportunity.
   *
   * @param {Opportunity} [opportunity] - Optional opportunity object to edit.
   */
  const handleOpenDialog = (opportunity?: IOpportunity) => {
    setOpportunityToEdit(opportunity || null);
    setOpenDialog(true);
  };

  /**
   * Closes the opportunity manipulation dialog.
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setOpportunityToEdit(null);
  };

  /**
   * Handles the process of adding or editing a opportunity.
   *
   * @param {Opportunity} data - The opportunity data to be added or edited.
   */
  const handleAddEditOpportunity = async (data: FormData) => {
    if (opportunityToEdit) {
      const response = await updateOpportunity(data).unwrap();
      if (response?.success) {
        refetch();
        toast.success(response?.message);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      const response = await createOpportunity(data).unwrap();
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
   * Handles the process of deleting a opportunity.
   */
  const handleDeleteOpportunity = async () => {
    const response: IResponse = (await deleteOpportunity(
      opportunityToDelete.id
    ).unwrap()) as unknown as IResponse;
    if (response?.success) {
      toast.success(response?.message);
      refetch();
    } else {
      toast.error("Something went wrong");
    }
    setOpenConfirmDelete(false);
    setOpportunityToDelete(null);
  };

  const columns: IColumn[] = [
    { field: "title", label: "Tile" },
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
            Opportunity List
          </Typography>
          <MotionButton onClick={() => handleOpenDialog()} type="submit">
            Add Opportunity
          </MotionButton>
        </Box>

        <DataTable
          columns={columns}
          data={storedOpportunitys}
          isLoading={isLoading}
          onEdit={(row) => handleOpenDialog(row)}
          onDelete={(row) => {
            setOpportunityToDelete(row);
            setOpenConfirmDelete(true);
          }}
        />

        {/* Opportunity Dialog */}
        <ManipulateDialog
          open={openDialog}
          opportunityToEdit={opportunityToEdit}
          handleCloseDialog={handleCloseDialog}
          handleAddEditOpportunity={handleAddEditOpportunity}
        />

        {/* Confirmation Dialog for Delete */}
        <ConfirmDeleteDialog
          open={openConfirmDelete}
          handleClose={() => setOpenConfirmDelete(false)}
          handleDeleteOpportunity={handleDeleteOpportunity}
        />
      </Box>
    </MotionBlock>
  );
};

export default Opportunity;
