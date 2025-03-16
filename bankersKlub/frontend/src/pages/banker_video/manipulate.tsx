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

const bankerVideoSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  video: Yup.mixed().nullable(),
});

interface BankerVideoDialogProps {
  open: boolean;
  bankerVideoToEdit: IBankerVideo | null;
  handleCloseDialog: () => void;
  handleAddEditBankerVideo: (data: FormData) => void;
}

const ManipulateDialog: React.FC<BankerVideoDialogProps> = ({
  open,
  bankerVideoToEdit,
  handleCloseDialog,
  handleAddEditBankerVideo,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(bankerVideoSchema) });

  useEffect(() => {
    if (bankerVideoToEdit) {
      reset(bankerVideoToEdit);
    } else {
      reset({
        title: "",
        description: "",
        video: null,
      });
    }
  }, [bankerVideoToEdit, reset]);

  const onSubmit = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof IBankerVideo];
      if (value) {
        formData.append(key, value as any);
      }
    });
    handleAddEditBankerVideo(formData);
    reset({});
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={handleCloseDialog}>
      <MotionBlock>
        <DialogTitle>
          {bankerVideoToEdit ? "Edit Banker Video" : "Add Banker Video"}
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
                      rows={3}
                      error={!!errors.description}
                      helperText={errors.description?.message}
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
                      label="Video"
                      accept={{ "video/*": [] }}
                      isMultiple={false}
                      defaultFileUrl={bankerVideoToEdit?.video}
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
                {bankerVideoToEdit ? "Save Changes" : "Add Banker Video"}
              </MotionButton>
            </DialogActions>
          </form>
        </DialogContent>
      </MotionBlock>
    </Dialog>
  );
};

export default ManipulateDialog;
