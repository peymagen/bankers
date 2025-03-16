import { useState } from "react";
import { Box, Typography } from "@mui/material";
import MotionButton from "../../component/Animation/motion-button";
import MotionBlock from "../../component/Animation/motion-block";
import ManipulateDialog from "./manipulate";
import ConfirmDeleteDialog from "./confirmDelete";
import {
  useCreateWorkflowMutation,
  useDeleteWorkflowMutation,
  useGetWorkflowsQuery,
  useUpdateWorkflowMutation,
} from "../../services/workflow.api";
import { useAppDispatch } from "../../store/store";
import { toast } from "react-toastify";
import DataTable from "../../component/DataTable";

/**
 * WorkflowsPage component for displaying a list of workflows, adding new workflows, editing, and deleting existing workflows.
 *
 * @returns {JSX.Element} - The rendered WorkflowsPage component.
 */
const Workflow = () => {
  const {
    data: workflows,
    error,
    isLoading,
    refetch,
  } = useGetWorkflowsQuery(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [workflowToEdit, setWorkflowToEdit] = useState<any | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [workflowToDelete, setWorkflowToDelete] = useState<any | null>(null);
  const [createWorkflow] = useCreateWorkflowMutation();
  const [updateWorkflow] = useUpdateWorkflowMutation();
  const [deleteWorkflow] = useDeleteWorkflowMutation();

  const dispatch = useAppDispatch();
  const storedWorkflows = workflows?.data || [];

  /**
   * Opens the workflow manipulation dialog to add or edit a workflow.
   *
   * @param {Workflow} [workflow] - Optional workflow object to edit.
   */
  const handleOpenDialog = (workflow?: IWorkflow) => {
    setWorkflowToEdit(workflow || null);
    setOpenDialog(true);
  };

  /**
   * Closes the workflow manipulation dialog.
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setWorkflowToEdit(null);
  };

  /**
   * Handles the process of adding or editing a workflow.
   *
   * @param {Workflow} data - The workflow data to be added or edited.
   */
  const handleAddEditWorkflow = async (data: FormData) => {
    if (workflowToEdit) {
      const response = await updateWorkflow(data).unwrap();
      if (response?.success) {
        refetch();
        toast.success(response?.message);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      const response = await createWorkflow(data).unwrap();
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
   * Handles the process of deleting a workflow.
   */
  const handleDeleteWorkflow = async () => {
    const response: IResponse = (await deleteWorkflow(
      workflowToDelete.id
    ).unwrap()) as unknown as IResponse;
    if (response?.success) {
      toast.success(response?.message);
      refetch();
    } else {
      toast.error("Something went wrong");
    }
    setOpenConfirmDelete(false);
    setWorkflowToDelete(null);
  };

  const columns: IColumn[] = [
    { field: "name", label: "Name" },
    { field: "description", label: "Description" },
    { field: "type", label: "Type" },
    { field: "svg", label: "SVG", type: "image" },
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
            Workflow List
          </Typography>
          <MotionButton onClick={() => handleOpenDialog()} type="submit">
            Add Workflow
          </MotionButton>
        </Box>

        <DataTable
          columns={columns}
          data={storedWorkflows}
          isLoading={isLoading}
          onEdit={(row) => handleOpenDialog(row)}
          onDelete={(row) => {
            setWorkflowToDelete(row);
            setOpenConfirmDelete(true);
          }}
        />

        {/* Workflow Dialog */}
        <ManipulateDialog
          open={openDialog}
          workflowToEdit={workflowToEdit}
          handleCloseDialog={handleCloseDialog}
          handleAddEditWorkflow={handleAddEditWorkflow}
        />

        {/* Confirmation Dialog for Delete */}
        <ConfirmDeleteDialog
          open={openConfirmDelete}
          handleClose={() => setOpenConfirmDelete(false)}
          handleDeleteWorkflow={handleDeleteWorkflow}
        />
      </Box>
    </MotionBlock>
  );
};

export default Workflow;
