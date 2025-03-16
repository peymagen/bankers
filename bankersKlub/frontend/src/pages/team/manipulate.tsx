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

// Validation Schema
const teamSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  position: Yup.string().required("Position is required"),
  image: Yup.mixed().nullable(),
});

// Props Interface
interface TeamDialogProps {
  open: boolean;
  teamToEdit: ITeam | null;
  handleCloseDialog: () => void;
  handleAddEditTeam: (data: FormData) => void;
}

// Component
const ManipulateDialog: React.FC<TeamDialogProps> = ({
  open,
  teamToEdit,
  handleCloseDialog,
  handleAddEditTeam,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(teamSchema) });

  useEffect(() => {
    if (teamToEdit) {
      reset(teamToEdit);
    } else {
      reset({
        name: "",
        description: "",
        position: "",
        image: null,
      });
    }
  }, [teamToEdit, reset]);

  // Form Submit Handler
  const onSubmit = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof ITeam];
      if (value) {
        formData.append(key, value as any);
      }
    });
    handleAddEditTeam(formData);
    reset({});
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={handleCloseDialog}>
      <MotionBlock>
        <DialogTitle>{teamToEdit ? "Edit Team" : "Add Team"}</DialogTitle>
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
                  name="position"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Position"
                      fullWidth
                      error={!!errors.position}
                      helperText={errors.position?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <FileUploader
                      label="Image"
                      accept={{ "image/png": [], "image/jpeg": [] }}
                      isMultiple={false}
                      defaultFileUrl={teamToEdit?.image}
                      onDropFile={(acceptedFiles) => {
                        if (acceptedFiles?.length > 0) {
                          field.onChange(acceptedFiles[0]);
                        }
                      }}
                      error={!!errors.image}
                      helperText={errors.image?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <MotionButton type="submit">
                {teamToEdit ? "Save Changes" : "Add Team"}
              </MotionButton>
            </DialogActions>
          </form>
        </DialogContent>
      </MotionBlock>
    </Dialog>
  );
};

export default ManipulateDialog;
