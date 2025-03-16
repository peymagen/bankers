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

const applicantSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone is required"),
  email: Yup.string().required("E Mail is required"),
  cv: Yup.mixed().nullable(),
  cover_letter: Yup.mixed().nullable(),
});

interface ApplicantDialogProps {
  open: boolean;
  applicantToEdit: IApplicant | null;
  handleCloseDialog: () => void;
  handleAddEditApplicant: (data: FormData) => void;
}

const ManipulateDialog: React.FC<ApplicantDialogProps> = ({
  open,
  applicantToEdit,
  handleCloseDialog,
  handleAddEditApplicant,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(applicantSchema) });

  useEffect(() => {
    if (applicantToEdit) {
      reset(applicantToEdit);
    } else {
      reset({
        name: "",
        phone: "",
        email: "",
        cv: null,
        cover_letter: null,
      });
    }
  }, [applicantToEdit, reset]);

  const onSubmit = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof IApplicant];
      if (value) {
        formData.append(key, value as any);
      }
    });
    handleAddEditApplicant(formData);
    reset({});
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={handleCloseDialog}>
      <MotionBlock>
        <DialogTitle>
          {applicantToEdit ? "Edit Applicant" : "Add Applicant"}
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
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone Number"
                      fullWidth
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
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
                      label="E-Mail"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="cv"
                  control={control}
                  render={({ field }) => (
                    <FileUploader
                      label="CV"
                      accept={{ "application/pdf": [] }}
                      isMultiple={false}
                      defaultFileUrl={applicantToEdit?.cv}
                      onDropFile={(acceptedFiles) => {
                        if (acceptedFiles?.length > 0) {
                          field.onChange(acceptedFiles[0]);
                        }
                      }}
                      error={!!errors.cv}
                      helperText={errors.cv?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="cover_letter"
                  control={control}
                  render={({ field }) => (
                    <FileUploader
                      label="Cover Letter"
                      accept={{ "application/pdf": [] }}
                      isMultiple={false}
                      defaultFileUrl={applicantToEdit?.cover_letter}
                      onDropFile={(acceptedFiles) => {
                        if (acceptedFiles?.length > 0) {
                          field.onChange(acceptedFiles[0]);
                        }
                      }}
                      error={!!errors.cover_letter}
                      helperText={errors.cover_letter?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <MotionButton type="submit">
                {applicantToEdit ? "Save Changes" : "Add Applicant"}
              </MotionButton>
            </DialogActions>
          </form>
        </DialogContent>
      </MotionBlock>
    </Dialog>
  );
};

export default ManipulateDialog;
