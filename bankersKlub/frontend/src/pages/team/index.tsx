import { useState } from "react";
import { Box, Typography } from "@mui/material";
import MotionButton from "../../component/Animation/motion-button";
import MotionBlock from "../../component/Animation/motion-block";
import ManipulateDialog from "./manipulate";
import ConfirmDeleteDialog from "./confirmDelete";
import {
  useCreateTeamMutation,
  useDeleteTeamMutation,
  useGetTeamsQuery,
  useUpdateTeamMutation,
} from "../../services/team.api";

import { toast } from "react-toastify";
import DataTable from "../../component/DataTable";

/**
 * TeamsPage component for displaying a list of teams, adding new teams, editing, and deleting existing teams.
 *
 * @returns {JSX.Element} - The rendered TeamsPage component.
 */
const Team = () => {
  const {
    data: teams,

    isLoading,
    refetch,
  } = useGetTeamsQuery(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [teamToEdit, setTeamToEdit] = useState<any | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState<any | null>(null);
  const [createTeam] = useCreateTeamMutation();
  const [updateTeam] = useUpdateTeamMutation();
  const [deleteTeam] = useDeleteTeamMutation();

  const storedTeams = teams?.data || [];

  /**
   * Opens the team manipulation dialog to add or edit a team.
   *
   * @param {Team} [team] - Optional team object to edit.
   */
  const handleOpenDialog = (team?: ITeam) => {
    setTeamToEdit(team || null);
    setOpenDialog(true);
  };

  /**
   * Closes the team manipulation dialog.
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTeamToEdit(null);
  };

  /**
   * Handles the process of adding or editing a team.
   *
   * @param {Team} data - The team data to be added or edited.
   */
  const handleAddEditTeam = async (data: FormData) => {
    if (teamToEdit) {
      const response = await updateTeam(data).unwrap();
      if (response?.success) {
        refetch();
        toast.success(response?.message);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      const response = await createTeam(data).unwrap();
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
   * Handles the process of deleting a team.
   */
  const handleDeleteTeam = async () => {
    const response: IResponse = (await deleteTeam(
      teamToDelete.id
    ).unwrap()) as unknown as IResponse;
    if (response?.success) {
      toast.success(response?.message);
      refetch();
    } else {
      toast.error("Something went wrong");
    }
    setOpenConfirmDelete(false);
    setTeamToDelete(null);
  };

  const columns: IColumn[] = [
    { field: "name", label: "Name" },
    { field: "description", label: "Description" },
    { field: "position", label: "Position" },
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
            Team List
          </Typography>
          <MotionButton onClick={() => handleOpenDialog()} type="submit">
            Add Team
          </MotionButton>
        </Box>

        <DataTable
          columns={columns}
          data={storedTeams}
          isLoading={isLoading}
          onEdit={(row) => handleOpenDialog(row)}
          onDelete={(row) => {
            setTeamToDelete(row);
            setOpenConfirmDelete(true);
          }}
        />

        {/* Team Dialog */}
        <ManipulateDialog
          open={openDialog}
          teamToEdit={teamToEdit}
          handleCloseDialog={handleCloseDialog}
          handleAddEditTeam={handleAddEditTeam}
        />

        {/* Confirmation Dialog for Delete */}
        <ConfirmDeleteDialog
          open={openConfirmDelete}
          handleClose={() => setOpenConfirmDelete(false)}
          handleDeleteTeam={handleDeleteTeam}
        />
      </Box>
    </MotionBlock>
  );
};

export default Team;
