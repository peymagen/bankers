import React, { useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import MotionButton from "../../component/Animation/motion-button";
import MotionBlock from "../../component/Animation/motion-block";
import FileUploader from "../../component/FileUploader";
import { useGetCategorysQuery } from "../../services/category.api";

const blogSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  body: Yup.string().required("Body is required"),
  content: Yup.string().required("Content is required"),
  image: Yup.mixed().nullable(),
  category: Yup.number().required("Category is required"),
  meta_key: Yup.string().required("Meta key is required"),
  meta_description: Yup.string().required("Meta description is required"),
});

interface BlogDialogProps {
  open: boolean;
  blogToEdit: IBlog | null;
  handleCloseDialog: () => void;
  handleAddEditBlog: (data: FormData) => void;
}

const ManipulateDialog: React.FC<BlogDialogProps> = ({
  open,
  blogToEdit,
  handleCloseDialog,
  handleAddEditBlog,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(blogSchema) });
  const { data } = useGetCategorysQuery(undefined);
  const categories = data?.data || [];
  console.log(categories);
  useEffect(() => {
    if (blogToEdit) {
      reset(blogToEdit);
    } else {
      reset({
        title: "",
        description: "",
        body: "",
        content: "",
        image: null,
        category: 0,
        meta_key: "",
        meta_description: "",
      });
    }
  }, [blogToEdit, reset]);

  const onSubmit = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof IBlog];
      if (value) {
        formData.append(key, value as any);
      }
    });
    handleAddEditBlog(formData);
    reset({});
  };

  return (
    <Dialog open={open} fullWidth maxWidth="lg" onClose={handleCloseDialog}>
      <MotionBlock>
        <DialogTitle>{blogToEdit ? "Edit Blog" : "Add Blog"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <Grid container spacing={2}>
              <Grid item xs={12} md={9}>
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
              <Grid item xs={12} md={3}>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.category}>
                      <InputLabel>Category</InputLabel>
                      <Select {...field} label="Category">
                        <MenuItem value={0}>Select Category</MenuItem>
                        {categories.map((cat: ICategory) => (
                          <MenuItem key={cat.id} value={cat.id}>
                            {cat.title}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.category && (
                        <FormHelperText>
                          {errors.category.message}
                        </FormHelperText>
                      )}
                    </FormControl>
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
                      rows={3}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="body"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Body"
                      fullWidth
                      multiline
                      rows={3}
                      error={!!errors.body}
                      helperText={errors.body?.message}
                    />
                  )}
                />
              </Grid>
              {/* Rich Text Editor for Content */}
              <Grid item xs={12}>
                <Controller
                  name="content"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      error={!!errors.content}
                      sx={{ mb: 5 }}
                    >
                      <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        Content
                      </Typography>
                      <ReactQuill
                        theme="snow"
                        value={field.value}
                        onChange={field.onChange}
                        style={{ height: "100px" }}
                      />
                      {errors.content && (
                        <FormHelperText>
                          {errors.content.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>
              {/* Image Upload */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <FileUploader
                      label="Image"
                      accept={{ "image/*": [] }}
                      isMultiple={false}
                      defaultFileUrl={blogToEdit?.image}
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
                  name="meta_key"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Meta Key"
                      fullWidth
                      error={!!errors.meta_key}
                      helperText={errors.meta_key?.message}
                    />
                  )}
                />
                <Controller
                  name="meta_description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      sx={{ mt: 1 }}
                      label="Meta Description"
                      fullWidth
                      multiline
                      rows={1}
                      error={!!errors.meta_description}
                      helperText={errors.meta_description?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}></Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <MotionButton type="submit">
                {blogToEdit ? "Save Changes" : "Add Blog"}
              </MotionButton>
            </DialogActions>
          </form>
        </DialogContent>
      </MotionBlock>
    </Dialog>
  );
};

export default ManipulateDialog;
