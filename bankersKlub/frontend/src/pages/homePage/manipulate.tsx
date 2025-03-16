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

const homeSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  key_value: Yup.string().required("Key is required"),
  description: Yup.string().required("Description is required"),
  banner: Yup.mixed().nullable(),
  video: Yup.mixed().nullable(),
  market: Yup.string(),
  index_section: Yup.string(),
  news: Yup.string(),
  market_news: Yup.string(),
  before_image: Yup.mixed().nullable(),
  after_image: Yup.mixed().nullable(),
  image: Yup.mixed().nullable(),
  quotes_slider: Yup.string(),
  slider: Yup.mixed().nullable(),
});

interface HomeDialogProps {
  open: boolean;
  homeToEdit: IHome | null;
  handleCloseDialog: () => void;
  handleAddEditHome: (data: FormData) => void;
}

const ManipulateDialog: React.FC<HomeDialogProps> = ({
  open,
  homeToEdit,
  handleCloseDialog,
  handleAddEditHome,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(homeSchema) });

  useEffect(() => {
    if (homeToEdit) {
      reset(homeToEdit);
    } else {
      reset({
        title: "",
        key_value: "",
        description: "",
        banner: null,
        video: null,
        market: "",
        index_section: "",
        news: "",
        market_news: "",
        before_image: null,
        after_image: null,
        image: null,
        quotes_slider: "",
        slider: null,
      });
    }
  }, [homeToEdit, reset]);

  const onSubmit = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    });
    handleAddEditHome(formData);
    reset({});
  };

  return (
    <Dialog open={open} fullWidth maxWidth="lg" onClose={handleCloseDialog}>
      <MotionBlock>
        <DialogTitle>{homeToEdit ? "Edit Home" : "Add Home"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <Grid container spacing={2}>
              <Grid item xs={12} md={10}>
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
                      sx={{ marginBottom: 2 }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Controller
                  name="key_value"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Key"
                      fullWidth
                      error={!!errors.key_value}
                      helperText={errors.key_value?.message}
                      sx={{ marginBottom: 2 }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
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
                      sx={{ marginBottom: 2 }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="quotes_slider"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Quotes"
                      fullWidth
                      multiline
                      rows={4}
                      error={!!errors.quotes_slider}
                      helperText={errors.quotes_slider?.message}
                      sx={{ marginBottom: 2 }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="market"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Market"
                      fullWidth
                      error={!!errors.market}
                      helperText={errors.market?.message}
                      sx={{ marginBottom: 2 }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="market_news"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Market News"
                      fullWidth
                      error={!!errors.market_news}
                      helperText={errors.market_news?.message}
                      sx={{ marginBottom: 2 }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="news"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="News"
                      fullWidth
                      error={!!errors.news}
                      helperText={errors.news?.message}
                      sx={{ marginBottom: 2 }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="index_section"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Index Section"
                      fullWidth
                      error={!!errors.index_section}
                      helperText={errors.index_section?.message}
                      sx={{ marginBottom: 2 }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="banner"
                  control={control}
                  render={({ field }) => (
                    <FileUploader
                      label="Banner"
                      accept={{ "image/*": [] }}
                      isMultiple={false}
                      defaultFileUrl={homeToEdit?.banner}
                      onDropFile={(acceptedFiles) => {
                        if (acceptedFiles?.length > 0) {
                          field.onChange(acceptedFiles[0]);
                        }
                      }}
                      error={!!errors.banner}
                      helperText={errors.banner?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="video"
                  control={control}
                  render={({ field }) => (
                    <FileUploader
                      label="Video"
                      accept={{ "video/*": [] }}
                      isMultiple={false}
                      defaultFileUrl={homeToEdit?.video}
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
              <Grid item xs={12} md={6}>
                <Controller
                  name="before_image"
                  control={control}
                  render={({ field }) => (
                    <FileUploader
                      label="Before Image"
                      accept={{ "image/*": [] }}
                      isMultiple={false}
                      defaultFileUrl={homeToEdit?.before_image}
                      onDropFile={(acceptedFiles) => {
                        if (acceptedFiles?.length > 0) {
                          field.onChange(acceptedFiles[0]);
                        }
                      }}
                      error={!!errors.before_image}
                      helperText={errors.before_image?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="after_image"
                  control={control}
                  render={({ field }) => (
                    <FileUploader
                      label="After Image"
                      accept={{ "image/*": [] }}
                      isMultiple={false}
                      defaultFileUrl={homeToEdit?.after_image}
                      onDropFile={(acceptedFiles) => {
                        if (acceptedFiles?.length > 0) {
                          field.onChange(acceptedFiles[0]);
                        }
                      }}
                      error={!!errors.after_image}
                      helperText={errors.after_image?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <FileUploader
                      label="Image"
                      accept={{ "image/*": [] }}
                      isMultiple={false}
                      defaultFileUrl={homeToEdit?.image}
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
              <Grid item xs={12} md={6}>
                <Controller
                  name="slider"
                  control={control}
                  render={({ field }) => (
                    <FileUploader
                      label="Slider"
                      accept={{ "image/*": [] }}
                      isMultiple={false}
                      defaultFileUrl={homeToEdit?.slider}
                      onDropFile={(acceptedFiles) => {
                        if (acceptedFiles?.length > 0) {
                          field.onChange(acceptedFiles[0]);
                        }
                      }}
                      error={!!errors.slider}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <MotionButton type="submit">
                {homeToEdit ? "Save Changes" : "Add Home"}
              </MotionButton>
            </DialogActions>
          </form>
        </DialogContent>
      </MotionBlock>
    </Dialog>
  );
};

export default ManipulateDialog;
