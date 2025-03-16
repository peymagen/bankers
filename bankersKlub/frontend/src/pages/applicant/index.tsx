import { useState } from "react";
import { Box, Typography } from "@mui/material";
import MotionButton from "../../component/Animation/motion-button";
import MotionBlock from "../../component/Animation/motion-block";
import ManipulateDialog from "./manipulate";
import ConfirmDeleteDialog from "./confirmDelete";
import {
  useCreateApplicantMutation,
  useDeleteApplicantMutation,
  useGetApplicantsQuery,
  useUpdateApplicantMutation,
} from "../../services/applicant.api";

import { toast } from "react-toastify";
import DataTable from "../../component/DataTable";

/**
 * ApplicantsPage component for displaying a list of applicants, adding new applicants, editing, and deleting existing applicants.
 *
 * @returns {JSX.Element} - The rendered ApplicantsPage component.
 */
const Applicant = () => {
  const {
    data: applicants,

    isLoading,
    refetch,
  } = useGetApplicantsQuery(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [applicantToEdit, setApplicantToEdit] = useState<any | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [applicantToDelete, setApplicantToDelete] = useState<any | null>(null);
  const [createApplicant] = useCreateApplicantMutation();
  const [updateApplicant] = useUpdateApplicantMutation();
  const [deleteApplicant] = useDeleteApplicantMutation();

  const storedApplicants = applicants?.data || [];

  /**
   * Opens the applicant manipulation dialog to add or edit a applicant.
   *
   * @param {Applicant} [applicant] - Optional applicant object to edit.
   */
  const handleOpenDialog = (applicant?: IApplicant) => {
    setApplicantToEdit(applicant || null);
    setOpenDialog(true);
  };

  /**
   * Closes the applicant manipulation dialog.
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setApplicantToEdit(null);
  };

  /**
   * Handles the process of adding or editing a applicant.
   *
   * @param {Applicant} data - The applicant data to be added or edited.
   */
  const handleAddEditApplicant = async (data: FormData) => {
    if (applicantToEdit) {
      const response = await updateApplicant(data).unwrap();
      if (response?.success) {
        refetch();
        toast.success(response?.message);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      const response = await createApplicant(data).unwrap();
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
   * Handles the process of deleting a applicant.
   */
  const handleDeleteApplicant = async () => {
    const response: IResponse = (await deleteApplicant(
      applicantToDelete.id
    ).unwrap()) as unknown as IResponse;
    if (response?.success) {
      toast.success(response?.message);
      refetch();
    } else {
      toast.error("Something went wrong");
    }
    setOpenConfirmDelete(false);
    setApplicantToDelete(null);
  };

  const columns: IColumn[] = [
    { field: "name", label: "Name" },
    { field: "phone", label: "Phone" },
    { field: "email", label: "E Mail" },
    { field: "cv", label: "CV", type: "file" },
    { field: "cover_letter", label: "Cover Letter", type: "file" },
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
            Applicant List
          </Typography>
          <MotionButton onClick={() => handleOpenDialog()} type="submit">
            Add Applicant
          </MotionButton>
        </Box>

        <DataTable
          columns={columns}
          data={storedApplicants}
          isLoading={isLoading}
          onEdit={(row) => handleOpenDialog(row)}
          onDelete={(row) => {
            setApplicantToDelete(row);
            setOpenConfirmDelete(true);
          }}
        />

        {/* Applicant Dialog */}
        <ManipulateDialog
          open={openDialog}
          applicantToEdit={applicantToEdit}
          handleCloseDialog={handleCloseDialog}
          handleAddEditApplicant={handleAddEditApplicant}
        />

        {/* Confirmation Dialog for Delete */}
        <ConfirmDeleteDialog
          open={openConfirmDelete}
          handleClose={() => setOpenConfirmDelete(false)}
          handleDeleteApplicant={handleDeleteApplicant}
        />
      </Box>
    </MotionBlock>
  );
};

export default Applicant;
