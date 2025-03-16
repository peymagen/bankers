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

const fundSchemeSchema = Yup.object({
  min: Yup.string().required("Minimum value is required"),
  max: Yup.string().required("Maximum value is required"),
  profit: Yup.string().required("Profit value is required"),
});

interface FundSchemeDialogProps {
  open: boolean;
  schemeToEdit: IFundScheme | null;
  handleCloseDialog: () => void;
  handleAddEditFundScheme: (data: FormData) => void;
}

const ManipulateDialog: React.FC<FundSchemeDialogProps> = ({
  open,
  schemeToEdit,
  handleCloseDialog,
  handleAddEditFundScheme,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(fundSchemeSchema) });

  useEffect(() => {
    if (schemeToEdit) {
      reset(schemeToEdit);
    } else {
      reset({
        min: "",
        max: "",
        profit: "",
      });
    }
  }, [schemeToEdit, reset]);

  const onSubmit = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof IFundScheme];
      if (value) {
        formData.append(key, value as any);
      }
    });
    handleAddEditFundScheme(formData);
    reset({});
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={handleCloseDialog}>
      <MotionBlock>
        <DialogTitle>
          {schemeToEdit ? "Edit FundScheme" : "Add FundScheme"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="min"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Minimum Amount"
                      fullWidth
                      error={!!errors.min}
                      helperText={errors.min?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="max"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Maximum Amount"
                      fullWidth
                      error={!!errors.max}
                      helperText={errors.max?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="profit"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Profit Percentage"
                      fullWidth
                      error={!!errors.profit}
                      helperText={errors.profit?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <MotionButton type="submit">
                {schemeToEdit ? "Save Changes" : "Add FundScheme"}
              </MotionButton>
            </DialogActions>
          </form>
        </DialogContent>
      </MotionBlock>
    </Dialog>
  );
};

export default ManipulateDialog;
