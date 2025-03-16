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

const serviceSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  quotes: Yup.string().nullable("Quotes Must be String"),
  video: Yup.mixed().nullable(),
  image: Yup.mixed().nullable(),
  main_image: Yup.mixed().nullable(),
});

interface ServiceDialogProps {
  open: boolean;
  serviceToEdit: IService | null;
  handleCloseDialog: () => void;
  handleAddEditService: (data: FormData) => void;
}

const ManipulateDialog: React.FC<ServiceDialogProps> = ({
  open,
  serviceToEdit,
  handleCloseDialog,
  handleAddEditService,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(serviceSchema) });

  useEffect(() => {
    if (serviceToEdit) {
      reset(serviceToEdit);
    } else {
      reset({
        title: "",
        description: "",
        quotes: null,
        video: null,
        image: null,
        main_image: null,
      });
    }
  }, [serviceToEdit, reset]);

  const onSubmit = (data: any) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      const value = data[key as keyof typeof data];

      if (value) {
        if (Array.isArray(value)) {
          // Handle multiple file uploads
          value.forEach((file) => {
            formData.append(key, file);
          });
        } else {
          formData.append(key, value as any);
        }
      }
    });
    handleAddEditService(formData);
    reset({});
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={handleCloseDialog}>
      <MotionBlock>
        <DialogTitle>
          {serviceToEdit ? "Edit Service" : "Add Service"}
        </DialogTitle>
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
                  name="quotes"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Quotes"
                      fullWidth
                      multiline
                      rows={4}
                      error={!!errors.quotes}
                      helperText={errors.quotes?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="main_image"
                  control={control}
                  render={({ field }) => (
                    <FileUploader
                      label="Banner"
                      accept={{ "image/*": [] }}
                      isMultiple={true}
                      defaultFileUrl={serviceToEdit?.main_image}
                      onDropFile={(acceptedFiles) => {
                        if (acceptedFiles?.length > 0) {
                          field.onChange(acceptedFiles[0]);
                        }
                      }}
                      error={!!errors.main_image}
                      helperText={errors.main_image?.message}
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
                      accept={{ "image/*": [] }}
                      isMultiple={true}
                      defaultFileUrl={
                        typeof serviceToEdit?.image === "string"
                          ? serviceToEdit.image.split(",")
                          : undefined
                      }
                      onDropFile={(acceptedFiles) => {
                        if (acceptedFiles?.length > 0) {
                          field.onChange(acceptedFiles);
                        }
                      }}
                      error={!!errors.image}
                      helperText={errors.image?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="video"
                  control={control}
                  render={({ field }) => (
                    <FileUploader
                      label="Vidoe"
                      accept={{ "video/*": [] }}
                      isMultiple={true}
                      defaultFileUrl={serviceToEdit?.video}
                      onDropFile={(acceptedFiles) => {
                        if (acceptedFiles?.length > 0) {
                          field.onChange(acceptedFiles[0]);
                        }
                      }}
                      error={!!errors.video}
                      helperText={errors.video?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <MotionButton type="submit">
                {serviceToEdit ? "Save Changes" : "Add Service"}
              </MotionButton>
            </DialogActions>
          </form>
        </DialogContent>
      </MotionBlock>
    </Dialog>
  );
};

export default ManipulateDialog;
