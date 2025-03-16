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

const faqSchema = Yup.object({
  ques: Yup.string().required("Question is required"),
  ans: Yup.string().required("Answer is required"),
  type: Yup.string().required("Type is required"),
});

interface FAQDialogProps {
  open: boolean;
  faqToEdit: IFaq | null;
  handleCloseDialog: () => void;
  handleAddEditFaq: (data: FormData) => void;
}

const ManipulateDialog: React.FC<FAQDialogProps> = ({
  open,
  faqToEdit,
  handleCloseDialog,
  handleAddEditFaq,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(faqSchema) });

  useEffect(() => {
    if (faqToEdit) {
      reset(faqToEdit);
    } else {
      reset({
        ques: "",
        ans: "",
        type: "",
      });
    }
  }, [faqToEdit, reset]);

  const onSubmit = (data: IFaq) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof IFaq];
      if (value) {
        formData.append(key, value as any);
      }
    });
    handleAddEditFaq(formData);
    reset({});
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={handleCloseDialog}>
      <MotionBlock>
        <DialogTitle>{faqToEdit ? "Edit FAQ" : "Add FAQ"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="ques"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Question"
                      fullWidth
                      error={!!errors.ques}
                      helperText={errors.ques?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="ans"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Answer"
                      fullWidth
                      multiline
                      rows={3}
                      error={!!errors.ans}
                      helperText={errors.ans?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Type"
                      fullWidth
                      error={!!errors.type}
                      helperText={errors.type?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <MotionButton type="submit">
                {faqToEdit ? "Save Changes" : "Add FAQ"}
              </MotionButton>
            </DialogActions>
          </form>
        </DialogContent>
      </MotionBlock>
    </Dialog>
  );
};

export default ManipulateDialog;
