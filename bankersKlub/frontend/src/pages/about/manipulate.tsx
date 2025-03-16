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

const aboutSchema = Yup.object({
  description: Yup.string().required("Description is required"),
  title1: Yup.string().nullable(),
  title2: Yup.string().nullable(),
  title3: Yup.string().nullable(),
  image: Yup.mixed().nullable(),
});

interface AboutDialogProps {
  open: boolean;
  aboutToEdit: IAbout | null;
  handleCloseDialog: () => void;
  handleAddEditAbout: (data: FormData) => void;
}

const ManipulateDialog: React.FC<AboutDialogProps> = ({
  open,
  aboutToEdit,
  handleCloseDialog,
  handleAddEditAbout,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(aboutSchema) });

  useEffect(() => {
    if (aboutToEdit) {
      reset(aboutToEdit);
    } else {
      reset({
        description: "",
        title1: "",
        title2: "",
        title3: "",
        image: null,
      });
    }
  }, [aboutToEdit, reset]);

  const onSubmit = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof IAbout];
      if (value) {
        formData.append(key, value as any);
      }
    });
    handleAddEditAbout(formData);
    reset({});
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={handleCloseDialog}>
      <MotionBlock>
        <DialogTitle>{aboutToEdit ? "Edit About" : "Add About"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <Grid container spacing={2}>
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
                  name="title1"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Title 1"
                      fullWidth
                      error={!!errors.title1}
                      helperText={errors.title1?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="title2"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Title 2"
                      fullWidth
                      error={!!errors.title2}
                      helperText={errors.title2?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="title3"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Title 3"
                      fullWidth
                      error={!!errors.title3}
                      helperText={errors.title3?.message}
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
                      isMultiple={false}
                      defaultFileUrl={aboutToEdit?.image}
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
                {aboutToEdit ? "Save Changes" : "Add About"}
              </MotionButton>
            </DialogActions>
          </form>
        </DialogContent>
      </MotionBlock>
    </Dialog>
  );
};

export default ManipulateDialog;
