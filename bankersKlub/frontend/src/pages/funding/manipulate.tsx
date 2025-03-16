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

const fundingSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  amount: Yup.number()
    .typeError("Amount must be a number") // Ensures input is a number
    .positive("Amount must be a positive number") // Ensures positive value
    .required("Amount is required"),
  image: Yup.mixed().nullable(),
});

interface FundingDialogProps {
  open: boolean;
  fundingToEdit: IFunding | null;
  handleCloseDialog: () => void;
  handleAddEditFunding: (data: FormData) => void;
}

const ManipulateDialog: React.FC<FundingDialogProps> = ({
  open,
  fundingToEdit,
  handleCloseDialog,
  handleAddEditFunding,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(fundingSchema) });

  useEffect(() => {
    if (fundingToEdit) {
      reset(fundingToEdit);
    } else {
      reset({
        name: "",
        amount: 0,
        image: null,
      });
    }
  }, [fundingToEdit, reset]);

  const onSubmit = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof IFunding];
      if (value) {
        formData.append(key, value as any);
      }
    });
    handleAddEditFunding(formData);
    reset({});
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={handleCloseDialog}>
      <MotionBlock>
        <DialogTitle>
          {fundingToEdit ? "Edit Funding" : "Add Funding"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
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
                  name="amount"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Amount"
                      fullWidth
                      error={!!errors.amount}
                      helperText={errors.amount?.message}
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
                      defaultFileUrl={fundingToEdit?.image}
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
                {fundingToEdit ? "Save Changes" : "Add Funding"}
              </MotionButton>
            </DialogActions>
          </form>
        </DialogContent>
      </MotionBlock>
    </Dialog>
  );
};

export default ManipulateDialog;
