import { useState } from "react";
import { Box, Typography } from "@mui/material";
import MotionButton from "../../component/Animation/motion-button";
import MotionBlock from "../../component/Animation/motion-block";
import ManipulateDialog from "./manipulate";
import ConfirmDeleteDialog from "./confirmDelete";
import {
  useCreateJourneyMutation,
  useDeleteJourneyMutation,
  useGetJourneysQuery,
  useUpdateJourneyMutation,
} from "../../services/journey.api";
import { toast } from "react-toastify";
import DataTable from "../../component/DataTable";

/**
 * JourneysPage component for displaying a list of journeys, adding new journeys, editing, and deleting existing journeys.
 *
 * @returns {JSX.Element} - The rendered JourneysPage component.
 */
const Journey = () => {
  const {
    data: journeys,
    error,
    isLoading,
    refetch,
  } = useGetJourneysQuery(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [journeyToEdit, setJourneyToEdit] = useState<any | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [journeyToDelete, setJourneyToDelete] = useState<any | null>(null);
  const [createJourney] = useCreateJourneyMutation();
  const [updateJourney] = useUpdateJourneyMutation();
  const [deleteJourney] = useDeleteJourneyMutation();

  const storedJourneys = journeys?.data || [];

  /**
   * Opens the journey manipulation dialog to add or edit a journey.
   *
   * @param {Journey} [journey] - Optional journey object to edit.
   */
  const handleOpenDialog = (journey?: IJourney) => {
    setJourneyToEdit(journey || null);
    setOpenDialog(true);
  };

  /**
   * Closes the journey manipulation dialog.
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setJourneyToEdit(null);
  };

  /**
   * Handles the process of adding or editing a journey.
   *
   * @param {Journey} data - The journey data to be added or edited.
   */
  const handleAddEditJourney = async (data: FormData) => {
    if (journeyToEdit) {
      const response = await updateJourney(data).unwrap();
      if (response?.success) {
        refetch();
        toast.success(response?.message);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      const response = await createJourney(data).unwrap();
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
   * Handles the process of deleting a journey.
   */
  const handleDeleteJourney = async () => {
    const response: IResponse = (await deleteJourney(
      journeyToDelete.id
    ).unwrap()) as unknown as IResponse;
    if (response?.success) {
      toast.success(response?.message);
      refetch();
    } else {
      toast.error("Something went wrong");
    }
    setOpenConfirmDelete(false);
    setJourneyToDelete(null);
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
            Journey List
          </Typography>
          <MotionButton onClick={() => handleOpenDialog()} type="submit">
            Add Journey
          </MotionButton>
        </Box>

        <DataTable
          columns={columns}
          data={storedJourneys}
          isLoading={isLoading}
          onEdit={handleOpenDialog}
          onDelete={(journey) => {
            setJourneyToDelete(journey);
            setOpenConfirmDelete(true);
          }}
        />

        {/* Journey Dialog */}
        <ManipulateDialog
          open={openDialog}
          journeyToEdit={journeyToEdit}
          handleCloseDialog={handleCloseDialog}
          handleAddEditJourney={handleAddEditJourney}
        />

        {/* Confirmation Dialog for Delete */}
        <ConfirmDeleteDialog
          open={openConfirmDelete}
          handleClose={() => setOpenConfirmDelete(false)}
          handleDeleteJourney={handleDeleteJourney}
        />
      </Box>
    </MotionBlock>
  );
};

export default Journey;
