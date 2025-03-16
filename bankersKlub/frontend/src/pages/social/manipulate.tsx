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

const socialSchema = Yup.object({
  icon: Yup.mixed().nullable().required("Icon is required"),
  link: Yup.string().url("Invalid URL format").required("Link is required"),
});

interface SocialDialogProps {
  open: boolean;
  socialToEdit: ISocial | null;
  handleCloseDialog: () => void;
  handleAddEditSocial: (data: FormData) => void;
}

const ManipulateDialog: React.FC<SocialDialogProps> = ({
  open,
  socialToEdit,
  handleCloseDialog,
  handleAddEditSocial,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(socialSchema) });

  useEffect(() => {
    if (socialToEdit) {
      reset({
        ...socialToEdit,
        icon: socialToEdit.icon || {},
      });
    } else {
      reset({
        icon: {},
        link: "",
      });
    }
  }, [socialToEdit, reset]);

  const onSubmit = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof typeof socialToEdit];
      if (value) {
        formData.append(key, value as any);
      }
    });
    handleAddEditSocial(formData);
    reset({});
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={handleCloseDialog}>
      <MotionBlock>
        <DialogTitle>{socialToEdit ? "Edit Social" : "Add Social"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="link"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Link"
                      fullWidth
                      error={!!errors.link}
                      helperText={errors.link?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="icon"
                  control={control}
                  render={({ field }) => (
                    <FileUploader
                      label="Icon"
                      accept={{ "image/*": [] }}
                      isMultiple={false}
                      defaultFileUrl={socialToEdit?.icon as any}
                      onDropFile={(acceptedFiles) => {
                        if (acceptedFiles?.length > 0) {
                          field.onChange(acceptedFiles[0]);
                        }
                      }}
                      error={!!errors.icon}
                      helperText={errors.icon?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <MotionButton type="submit">
                {socialToEdit ? "Save Changes" : "Add Social"}
              </MotionButton>
            </DialogActions>
          </form>
        </DialogContent>
      </MotionBlock>
    </Dialog>
  );
};

export default ManipulateDialog;
