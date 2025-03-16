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

const categorySchema = Yup.object({
  title: Yup.string().required("Title is required"),
});

interface CategoryDialogProps {
  open: boolean;
  categoryToEdit: ICategory | null;
  handleCloseDialog: () => void;
  handleAddEditCategory: (data: FormData) => void;
}

const ManipulateDialog: React.FC<CategoryDialogProps> = ({
  open,
  categoryToEdit,
  handleCloseDialog,
  handleAddEditCategory,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(categorySchema) });

  useEffect(() => {
    if (categoryToEdit) {
      reset(categoryToEdit);
    } else {
      reset({
        title: "",
      });
    }
  }, [categoryToEdit, reset]);

  const onSubmit = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof ICategory];
      if (value) {
        formData.append(key, value as any);
      }
    });
    handleAddEditCategory(formData);
    reset({});
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={handleCloseDialog}>
      <MotionBlock>
        <DialogTitle>
          {categoryToEdit ? "Edit Category" : "Add Category"}
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
            </Grid>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <MotionButton type="submit">
                {categoryToEdit ? "Save Changes" : "Add Category"}
              </MotionButton>
            </DialogActions>
          </form>
        </DialogContent>
      </MotionBlock>
    </Dialog>
  );
};

export default ManipulateDialog;
