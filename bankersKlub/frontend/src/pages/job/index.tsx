import { useState } from "react";
import { Box, Typography } from "@mui/material";
import MotionButton from "../../component/Animation/motion-button";
import MotionBlock from "../../component/Animation/motion-block";
import ManipulateDialog from "./manipulate";
import ConfirmDeleteDialog from "./confirmDelete";
import {
  useCreateJobMutation,
  useDeleteJobMutation,
  useGetJobsQuery,
  useUpdateJobMutation,
} from "../../services/job.api";
import { useAppDispatch } from "../../store/store";
import { toast } from "react-toastify";
import DataTable from "../../component/DataTable";

/**
 * JobsPage component for displaying a list of jobs, adding new jobs, editing, and deleting existing jobs.
 *
 * @returns {JSX.Element} - The rendered JobsPage component.
 */
const Job = () => {
  const { data: jobs, error, isLoading, refetch } = useGetJobsQuery(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [jobToEdit, setJobToEdit] = useState<any | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<any | null>(null);
  const [createJob] = useCreateJobMutation();
  const [updateJob] = useUpdateJobMutation();
  const [deleteJob] = useDeleteJobMutation();

  const dispatch = useAppDispatch();
  const storedJobs = jobs?.data || [];

  /**
   * Opens the job manipulation dialog to add or edit a job.
   *
   * @param {Job} [job] - Optional job object to edit.
   */
  const handleOpenDialog = (job?: IJob) => {
    setJobToEdit(job || null);
    setOpenDialog(true);
  };

  /**
   * Closes the job manipulation dialog.
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setJobToEdit(null);
  };

  /**
   * Handles the process of adding or editing a job.
   *
   * @param {Job} data - The job data to be added or edited.
   */
  const handleAddEditJob = async (data: FormData) => {
    if (jobToEdit) {
      const response = await updateJob(data).unwrap();
      if (response?.success) {
        refetch();
        toast.success(response?.message);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      const response = await createJob(data).unwrap();
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
   * Handles the process of deleting a job.
   */
  const handleDeleteJob = async () => {
    const response: IResponse = (await deleteJob(
      jobToDelete.id
    ).unwrap()) as unknown as IResponse;
    if (response?.success) {
      toast.success(response?.message);
      refetch();
    } else {
      toast.error("Something went wrong");
    }
    setOpenConfirmDelete(false);
    setJobToDelete(null);
  };

  const columns: IColumn[] = [
    { field: "title", label: "Title" },
    { field: "description", label: "Description" },
    { field: "experience", label: "Experience" },
    { field: "end", label: "End Date" },
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
            Job List
          </Typography>
          <MotionButton onClick={() => handleOpenDialog()} type="submit">
            Add Job
          </MotionButton>
        </Box>

        <DataTable
          columns={columns}
          data={storedJobs}
          isLoading={isLoading}
          onEdit={(row) => handleOpenDialog(row)}
          onDelete={(row) => {
            setJobToDelete(row);
            setOpenConfirmDelete(true);
          }}
        />

        {/* Job Dialog */}
        <ManipulateDialog
          open={openDialog}
          jobToEdit={jobToEdit}
          handleCloseDialog={handleCloseDialog}
          handleAddEditJob={handleAddEditJob}
        />

        {/* Confirmation Dialog for Delete */}
        <ConfirmDeleteDialog
          open={openConfirmDelete}
          handleClose={() => setOpenConfirmDelete(false)}
          handleDeleteJob={handleDeleteJob}
        />
      </Box>
    </MotionBlock>
  );
};

export default Job;
