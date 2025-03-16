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

const addressSchema = Yup.object({
  street: Yup.string().required("Street is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().nullable(),
  pincode: Yup.string().nullable(),
});

interface AddressDialogProps {
  open: boolean;
  addressToEdit: {
    street: string;
    city: string;
    state?: string;
    pincode?: string;
  } | null;
  handleCloseDialog: () => void;
  handleAddEditAddress: (data: FormData) => void;
}

const ManipulateDialog: React.FC<AddressDialogProps> = ({
  open,
  addressToEdit,
  handleCloseDialog,
  handleAddEditAddress,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addressSchema) });

  useEffect(() => {
    if (addressToEdit) {
      reset(addressToEdit);
    } else {
      reset({
        street: "",
        city: "",
        state: "",
        pincode: "",
      });
    }
  }, [addressToEdit, reset]);

  const onSubmit = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof typeof addressToEdit];
      if (value) {
        formData.append(key, value as any);
      }
    });
    handleAddEditAddress(formData);
    reset({});
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={handleCloseDialog}>
      <MotionBlock>
        <DialogTitle>
          {addressToEdit ? "Edit Address" : "Add Address"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="street"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Street"
                      fullWidth
                      error={!!errors.street}
                      helperText={errors.street?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="City"
                      fullWidth
                      error={!!errors.city}
                      helperText={errors.city?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="State"
                      fullWidth
                      error={!!errors.state}
                      helperText={errors.state?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="pincode"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Pincode"
                      fullWidth
                      error={!!errors.pincode}
                      helperText={errors.pincode?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <MotionButton type="submit">
                {addressToEdit ? "Save Changes" : "Add Address"}
              </MotionButton>
            </DialogActions>
          </form>
        </DialogContent>
      </MotionBlock>
    </Dialog>
  );
};

export default ManipulateDialog;
