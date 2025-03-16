import { useState } from "react";
import { Box, Typography } from "@mui/material";
import MotionButton from "../../component/Animation/motion-button";
import MotionBlock from "../../component/Animation/motion-block";
import ManipulateDialog from "./manipulate";
import ConfirmDeleteDialog from "./confirmDelete";
import {
  useCreateTestimonialMutation,
  useDeleteTestimonialMutation,
  useGetTestimonialsQuery,
  useUpdateTestimonialMutation,
} from "../../services/testimonial.api";

import { toast } from "react-toastify";
import DataTable from "../../component/DataTable";

/**
 * TestimonialsPage component for displaying a list of testimonials, adding new testimonials, editing, and deleting existing testimonials.
 *
 * @returns {JSX.Element} - The rendered TestimonialsPage component.
 */
const Testimonial = () => {
  const {
    data: testimonials,

    isLoading,
    refetch,
  } = useGetTestimonialsQuery(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [testimonialToEdit, setTestimonialToEdit] = useState<any | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState<any | null>(
    null
  );
  const [createTestimonial] = useCreateTestimonialMutation();
  const [updateTestimonial] = useUpdateTestimonialMutation();
  const [deleteTestimonial] = useDeleteTestimonialMutation();

  const storedTestimonials = testimonials?.data || [];

  /**
   * Opens the testimonial manipulation dialog to add or edit a testimonial.
   *
   * @param {Testimonial} [testimonial] - Optional testimonial object to edit.
   */
  const handleOpenDialog = (testimonial?: ITestimonial) => {
    setTestimonialToEdit(testimonial || null);
    setOpenDialog(true);
  };

  /**
   * Closes the testimonial manipulation dialog.
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTestimonialToEdit(null);
  };

  /**
   * Handles the process of adding or editing a testimonial.
   *
   * @param {Testimonial} data - The testimonial data to be added or edited.
   */
  const handleAddEditTestimonial = async (data: FormData) => {
    if (testimonialToEdit) {
      const response = await updateTestimonial(data).unwrap();
      if (response?.success) {
        refetch();
        toast.success(response?.message);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      const response = await createTestimonial(data).unwrap();
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
   * Handles the process of deleting a testimonial.
   */
  const handleDeleteTestimonial = async () => {
    const response: IResponse = (await deleteTestimonial(
      testimonialToDelete.id
    ).unwrap()) as unknown as IResponse;
    if (response?.success) {
      toast.success(response?.message);
      refetch();
    } else {
      toast.error("Something went wrong");
    }
    setOpenConfirmDelete(false);
    setTestimonialToDelete(null);
  };

  const columns: IColumn[] = [
    { field: "name", label: "Name" },
    { field: "description", label: "Description" },
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
            Testimonial List
          </Typography>
          <MotionButton onClick={() => handleOpenDialog()} type="submit">
            Add Testimonial
          </MotionButton>
        </Box>

        <DataTable
          columns={columns}
          data={storedTestimonials}
          isLoading={isLoading}
          onEdit={(row) => handleOpenDialog(row)}
          onDelete={(row) => {
            setTestimonialToDelete(row);
            setOpenConfirmDelete(true);
          }}
        />

        {/* Testimonial Dialog */}
        <ManipulateDialog
          open={openDialog}
          testimonialToEdit={testimonialToEdit}
          handleCloseDialog={handleCloseDialog}
          handleAddEditTestimonial={handleAddEditTestimonial}
        />

        {/* Confirmation Dialog for Delete */}
        <ConfirmDeleteDialog
          open={openConfirmDelete}
          handleClose={() => setOpenConfirmDelete(false)}
          handleDeleteTestimonial={handleDeleteTestimonial}
        />
      </Box>
    </MotionBlock>
  );
};

export default Testimonial;
