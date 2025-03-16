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

const pageInfoSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  image: Yup.mixed().nullable(),
  key_value: Yup.string(),
});

interface PageInfoDialogProps {
  open: boolean;
  pageInfoToEdit: IPageInfo | null;
  handleCloseDialog: () => void;
  handleAddEditPageInfo: (data: FormData) => void;
}

const ManipulateDialog: React.FC<PageInfoDialogProps> = ({
  open,
  pageInfoToEdit,
  handleCloseDialog,
  handleAddEditPageInfo,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(pageInfoSchema) });

  useEffect(() => {
    if (pageInfoToEdit) {
      reset(pageInfoToEdit);
    } else {
      reset({
        title: "",
        description: "",
        image: null,
        key_value: "",
      });
    }
  }, [pageInfoToEdit, reset]);

  const onSubmit = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof IPageInfo];
      if (value) {
        formData.append(key, value as any);
      }
    });
    handleAddEditPageInfo(formData);
    reset({});
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={handleCloseDialog}>
      <MotionBlock>
        <DialogTitle>
          {pageInfoToEdit ? "Edit PageInfo" : "Add PageInfo"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <Grid container spacing={2}>
              {/* Title */}
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

              {/* Description */}
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
                      rows={3}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  )}
                />
              </Grid>

              {/* Key Value */}
              <Grid item xs={12}>
                <Controller
                  name="key_value"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Key Value"
                      fullWidth
                      error={!!errors.key_value}
                      helperText={errors.key_value?.message}
                    />
                  )}
                />
              </Grid>

              {/* Image Upload */}
              <Grid item xs={12}>
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <FileUploader
                      label="Image"
                      accept={{ "image/*": [] }}
                      isMultiple={false}
                      defaultFileUrl={pageInfoToEdit?.image}
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

            {/* Actions */}
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <MotionButton type="submit">
                {pageInfoToEdit ? "Save Changes" : "Add Page Infomation"}
              </MotionButton>
            </DialogActions>
          </form>
        </DialogContent>
      </MotionBlock>
    </Dialog>
  );
};

export default ManipulateDialog;
