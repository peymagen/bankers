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

const schema = Yup.object({
  title: Yup.string().required("Title is required"),
  sub: Yup.string().required("Subtitle is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  contact: Yup.string().required("Contact is required"),
  maps: Yup.string().required("maps link is required"),
  image: Yup.mixed().nullable(),
});

interface ContactDialogProps {
  open: boolean;
  contactToEdit: IContact | null;
  handleCloseDialog: () => void;
  handleAddEditContact: (data: FormData) => void;
}

const ManipulateDialog: React.FC<ContactDialogProps> = ({
  open,
  contactToEdit,
  handleCloseDialog,
  handleAddEditContact,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (contactToEdit) {
      reset(contactToEdit);
    } else {
      reset({
        title: "",
        sub: "",
        email: "",
        contact: "",
        maps: "",
        image: null,
      });
    }
  }, [contactToEdit, reset]);

  const onSubmit = (data: any) => {
    console.log(data);
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof ICategory];
      if (value) {
        formData.append(key, value as any);
      }
    });
    handleAddEditContact(formData);
    reset({});
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={handleCloseDialog}>
      <MotionBlock>
        <DialogTitle>
          {contactToEdit ? "Edit Contact" : "Add Contact"}
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
                  name="sub"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Subtitle"
                      fullWidth
                      error={!!errors.sub}
                      helperText={errors.sub?.message}
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
                  name="contact"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Contact"
                      fullWidth
                      error={!!errors.contact}
                      helperText={errors.contact?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="maps"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Maps"
                      fullWidth
                      error={!!errors.maps}
                      helperText={errors.maps?.message}
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
                      defaultFileUrl={contactToEdit?.image}
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
                {contactToEdit ? "Save Changes" : "Add Contact"}
              </MotionButton>
            </DialogActions>
          </form>
        </DialogContent>
      </MotionBlock>
    </Dialog>
  );
};

export default ManipulateDialog;
