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
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const jobSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  experience: Yup.string().nullable(),
  end: Yup.date().nullable(),
});

interface JobDialogProps {
  open: boolean;
  jobToEdit: IJob | null;
  handleCloseDialog: () => void;
  handleAddEditJob: (data: FormData) => void;
}

const ManipulateDialog: React.FC<JobDialogProps> = ({
  open,
  jobToEdit,
  handleCloseDialog,
  handleAddEditJob,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(jobSchema) });

  useEffect(() => {
    if (jobToEdit) {
      reset({
        ...jobToEdit,
        end: jobToEdit.end ? dayjs(jobToEdit.end).toDate() : null,
      });
    } else {
      reset({
        title: "",
        description: "",
        experience: "",
        end: null,
      });
    }
  }, [jobToEdit, reset]);

  const onSubmit = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof IJob];
      if (value) {
        formData.append(
          key,
          key === "end" ? dayjs(value).format("YYYY-MM-DD") : (value as any)
        );
      }
    });
    handleAddEditJob(formData);
    reset({});
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={handleCloseDialog}>
      <MotionBlock>
        <DialogTitle>{jobToEdit ? "Edit Job" : "Add Job"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Title"
                      fullWidth
                      error={!!errors.title}
                      helperText={errors.title?.message}
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
                  name="experience"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Experience"
                      fullWidth
                      error={!!errors.experience}
                      helperText={errors.experience?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="end"
                  control={control}
                  render={({ field }) => (
                    <DesktopDatePicker
                      label="End Date"
                      format="YYYY-MM-DD"
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) => field.onChange(date)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.end,
                          helperText: errors.end?.message,
                        },
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <MotionButton type="submit">
                {jobToEdit ? "Save Changes" : "Add Job"}
              </MotionButton>
            </DialogActions>
          </form>
        </DialogContent>
      </MotionBlock>
    </Dialog>
  );
};

export default ManipulateDialog;
