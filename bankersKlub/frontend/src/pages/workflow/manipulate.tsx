import React, { useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import MotionButton from "../../component/Animation/motion-button";
import MotionBlock from "../../component/Animation/motion-block";
import FileUploader from "../../component/FileUploader";

const workflowSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  type: Yup.string().required("Type is required"),
  svg: Yup.mixed().nullable(),
});

interface WorkflowDialogProps {
  open: boolean;
  workflowToEdit: IWorkflow | null;
  handleCloseDialog: () => void;
  handleAddEditWorkflow: (data: FormData) => void;
}

const ManipulateDialog: React.FC<WorkflowDialogProps> = ({
  open,
  workflowToEdit,
  handleCloseDialog,
  handleAddEditWorkflow,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(workflowSchema) });

  useEffect(() => {
    if (workflowToEdit) {
      reset(workflowToEdit);
    } else {
      reset({
        name: "",
        description: "",
        type: "",
        svg: null,
      });
    }
  }, [workflowToEdit, reset]);

  const onSubmit = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof IWorkflow];
      if (value) {
        formData.append(key, value as any);
      }
    });
    handleAddEditWorkflow(formData);
    reset({});
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={handleCloseDialog}>
      <MotionBlock>
        <DialogTitle>
          {workflowToEdit ? "Edit Workflow" : "Add Workflow"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Name"
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Description"
                      fullWidth
                      multiline
                      rows={4}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Type"
                      fullWidth
                      error={!!errors.type}
                      helperText={errors.type?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="svg"
                  control={control}
                  render={({ field }) => (
                    <FileUploader
                      label="SVG"
                      accept={{ "image/*": [] }}
                      isMultiple={false}
                      defaultFileUrl={workflowToEdit?.svg}
                      onDropFile={(acceptedFiles) => {
                        if (acceptedFiles?.length > 0) {
                          field.onChange(acceptedFiles[0]);
                        }
                      }}
                      error={!!errors.svg}
                      helperText={errors.svg?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <MotionButton type="submit">
                {workflowToEdit ? "Save Changes" : "Add Workflow"}
              </MotionButton>
            </DialogActions>
          </form>
        </DialogContent>
      </MotionBlock>
    </Dialog>
  );
};

export default ManipulateDialog;
