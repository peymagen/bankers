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

const companySchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  turnaround: Yup.string().required("Turnaround time is required"),
  grid: Yup.string().required("Grid is required"),
});

interface CompanyDialogProps {
  open: boolean;
  companyToEdit: ICompany | null;
  handleCloseDialog: () => void;
  handleAddEditCompany: (data: FormData) => void;
}

const ManipulateDialog: React.FC<CompanyDialogProps> = ({
  open,
  companyToEdit,
  handleCloseDialog,
  handleAddEditCompany,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(companySchema) });

  useEffect(() => {
    if (companyToEdit) {
      reset(companyToEdit);
    } else {
      reset({
        name: "",
        email: "",
        phone: "",
        turnaround: "",
        grid: "",
      });
    }
  }, [companyToEdit, reset]);

  const onSubmit = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof ICompany];
      if (value) {
        formData.append(key, value as any);
      }
    });
    handleAddEditCompany(formData);
    reset({});
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={handleCloseDialog}>
      <MotionBlock>
        <DialogTitle>
          {companyToEdit ? "Edit Company" : "Add Company"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Name"
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone"
                      fullWidth
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="turnaround"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Turnaround Time"
                      fullWidth
                      error={!!errors.turnaround}
                      helperText={errors.turnaround?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="grid"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Grid"
                      fullWidth
                      error={!!errors.grid}
                      helperText={errors.grid?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <MotionButton type="submit">
                {companyToEdit ? "Save Changes" : "Add Company"}
              </MotionButton>
            </DialogActions>
          </form>
        </DialogContent>
      </MotionBlock>
    </Dialog>
  );
};

export default ManipulateDialog;
