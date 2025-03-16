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

const joinSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  icon: Yup.mixed().nullable(),
});

interface DialogProps {
  open: boolean;
  joinToEdit: IJoin | null;
  handleCloseDialog: () => void;
  handleAddEditJoin: (data: FormData) => void;
}

const ManipulateDialog: React.FC<DialogProps> = ({
  open,
  joinToEdit,
  handleCloseDialog,
  handleAddEditJoin,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(joinSchema) });

  useEffect(() => {
    if (joinToEdit) {
      reset(joinToEdit);
    } else {
      reset({
        title: "",
        description: "",
        icon: null,
      });
    }
  }, [joinToEdit, reset]);

  const onSubmit = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof IContact];
      if (value) {
        formData.append(key, value as any);
      }
    });

    handleAddEditJoin(formData);
    reset({});
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={handleCloseDialog}>
      <MotionBlock>
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
          {joinToEdit ? "Edit Item" : "Add Item"}
        </DialogTitle>
        <DialogContent sx={{ py: 2 }}>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <Grid container spacing={3}>
              {/* Title Field */}
              <Grid item xs={12}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Title"
                      fullWidth
                      variant="outlined"
                      error={!!errors.title}
                      helperText={errors.title?.message}
                    />
                  )}
                />
              </Grid>

              {/* Description Field */}
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
                      variant="outlined"
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  )}
                />
              </Grid>

              {/* File Upload Field */}
              <Grid item xs={12}>
                <Controller
                  name="icon"
                  control={control}
                  render={({ field }) => (
                    <FileUploader
                      label="Icon"
                      accept={{ "image/*": [] }}
                      isMultiple={false}
                      defaultFileUrl={joinToEdit?.icon}
                      onDropFile={(acceptedFiles) => {
                        if (acceptedFiles?.length > 0) {
                          field.onChange(acceptedFiles[0]);
                        }
                      }}
                      error={!!errors.icon}
                      helperText={errors.icon?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <MotionButton type="submit">
                {joinToEdit ? "Save Changes" : "Add Join"}
              </MotionButton>
            </DialogActions>
          </form>
        </DialogContent>
      </MotionBlock>
    </Dialog>
  );
};

export default ManipulateDialog;
