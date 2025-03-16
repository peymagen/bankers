import React from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  DialogContent,
} from "@mui/material";
import MotionButton from "../../component/Animation/motion-button";

/**
 * Props interface for ConfirmDeleteDialog component.
 *
 * @interface ConfirmDeleteDialogProps
 * @property {boolean} open - Determines whether the dialog is open or not.
 * @property {() => void} handleClose - Function to handle closing the dialog.
 * @property {() => void} handleDeleteOpportunity - Function to handle the delete action.
 */
interface ConfirmDeleteDialogProps {
  open: boolean;
  handleClose: () => void;
  handleDeleteOpportunity: () => void;
}

/**
 * ConfirmDeleteDialog component used to confirm the deletion of a opportunity.
 *
 * Displays a dialog asking the user to confirm if they really want to delete the opportunity.
 * The dialog includes a "Cancel" button to close the dialog and a "Delete" button
 * to confirm and perform the deletion.
 *
 * @param {ConfirmDeleteDialogProps} props - The props for the confirmation dialog.
 * @returns {JSX.Element} The ConfirmDeleteDialog component.
 */
const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  handleClose,
  handleDeleteOpportunity,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        Are you sure, you want to delete this opportunity?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <MotionButton onClick={handleDeleteOpportunity}>Delete</MotionButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
