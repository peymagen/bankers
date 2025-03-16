import { useState } from "react";
import { Box, Typography } from "@mui/material";
import MotionButton from "../../component/Animation/motion-button";
import MotionBlock from "../../component/Animation/motion-block";
import ManipulateDialog from "./manipulate";
import ConfirmDeleteDialog from "./confirmDelete";
import {
  useCreateAboutMutation,
  useDeleteAboutMutation,
  useGetAboutsQuery,
  useUpdateAboutMutation,
} from "../../services/about.api";
import { toast } from "react-toastify";
import DataTable from "../../component/DataTable";

/**
 * AboutsPage component for displaying a list of abouts, adding new abouts, editing, and deleting existing abouts.
 *
 * @returns {JSX.Element} - The rendered AboutsPage component.
 */
const About = () => {
  const { data: abouts, isLoading, refetch } = useGetAboutsQuery(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [aboutToEdit, setAboutToEdit] = useState<any | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [aboutToDelete, setAboutToDelete] = useState<any | null>(null);
  const [createAbout] = useCreateAboutMutation();
  const [updateAbout] = useUpdateAboutMutation();
  const [deleteAbout] = useDeleteAboutMutation();

  const storedAbouts = abouts?.data || [];

  /**
   * Opens the about manipulation dialog to add or edit a about.
   *
   * @param {About} [about] - Optional about object to edit.
   */
  const handleOpenDialog = (about?: IAbout) => {
    setAboutToEdit(about || null);
    setOpenDialog(true);
  };

  /**
   * Closes the about manipulation dialog.
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setAboutToEdit(null);
  };

  /**
   * Handles the process of adding or editing a about.
   *
   * @param {About} data - The about data to be added or edited.
   */
  const handleAddEditAbout = async (data: FormData) => {
    if (aboutToEdit) {
      const response = await updateAbout(data).unwrap();
      if (response?.success) {
        refetch();
        toast.success(response?.message);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      const response = await createAbout(data).unwrap();
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
   * Handles the process of deleting a about.
   */
  const handleDeleteAbout = async () => {
    const response: IResponse = (await deleteAbout(
      aboutToDelete.id
    ).unwrap()) as unknown as IResponse;
    if (response?.success) {
      toast.success(response?.message);
      refetch();
    } else {
      toast.error("Something went wrong");
    }
    setOpenConfirmDelete(false);
    setAboutToDelete(null);
  };

  const columns: IColumn[] = [
    { field: "description", label: "Description" },
    { field: "title1", label: "Title 1" },
    { field: "title2", label: "Title 2" },
    { field: "title3", label: "Title 3" },
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
            About List
          </Typography>
          <MotionButton onClick={() => handleOpenDialog()} type="submit">
            Add About
          </MotionButton>
        </Box>

        <DataTable
          columns={columns}
          data={storedAbouts}
          isLoading={isLoading}
          onEdit={(row) => handleOpenDialog(row)}
          onDelete={(row) => {
            setAboutToDelete(row);
            setOpenConfirmDelete(true);
          }}
        />

        {/* About Dialog */}
        <ManipulateDialog
          open={openDialog}
          aboutToEdit={aboutToEdit}
          handleCloseDialog={handleCloseDialog}
          handleAddEditAbout={handleAddEditAbout}
        />

        {/* Confirmation Dialog for Delete */}
        <ConfirmDeleteDialog
          open={openConfirmDelete}
          handleClose={() => setOpenConfirmDelete(false)}
          handleDeleteAbout={handleDeleteAbout}
        />
      </Box>
    </MotionBlock>
  );
};

export default About;
