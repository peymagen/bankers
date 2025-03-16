import { useState } from "react";
import { Box, Typography } from "@mui/material";
import MotionButton from "../../component/Animation/motion-button";
import MotionBlock from "../../component/Animation/motion-block";
import ManipulateDialog from "./manipulate";
import ConfirmDeleteDialog from "./confirmDelete";
import {
  useCreateFaqMutation,
  useDeleteFaqMutation,
  useGetFaqsQuery,
  useUpdateFaqMutation,
} from "../../services/faq.api";
import { toast } from "react-toastify";
import DataTable from "../../component/DataTable";

/**
 * FaqsPage component for displaying a list of faqs, adding new faqs, editing, and deleting existing faqs.
 *
 * @returns {JSX.Element} - The rendered FaqsPage component.
 */
const Faq = () => {
  const { data: faqs, error, isLoading, refetch } = useGetFaqsQuery(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [faqToEdit, setFaqToEdit] = useState<any | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState<any | null>(null);
  const [createFaq] = useCreateFaqMutation();
  const [updateFaq] = useUpdateFaqMutation();
  const [deleteFaq] = useDeleteFaqMutation();

  const storedFaqs = faqs?.data || [];

  /**
   * Opens the faq manipulation dialog to add or edit a faq.
   *
   * @param {Faq} [faq] - Optional faq object to edit.
   */
  const handleOpenDialog = (faq?: IFaq) => {
    setFaqToEdit(faq || null);
    setOpenDialog(true);
  };

  /**
   * Closes the faq manipulation dialog.
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFaqToEdit(null);
  };

  /**
   * Handles the process of adding or editing a faq.
   *
   * @param {IFaq} data - The faq data to be added or edited.
   */
  const handleAddEditFaq = async (data: FormData) => {
    if (faqToEdit) {
      const response = await updateFaq(data).unwrap();
      if (response?.success) {
        refetch();
        toast.success(response?.message);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      const response = await createFaq(data).unwrap();
      if (response?.success) {
        toast.success(response?.message);
        refetch();
      } else {
        toast.error("Something went wrong");
      }
    }

    handleCloseDialog();
  };

  /**
   * Handles the process of deleting a faq.
   */
  const handleDeleteFaq = async () => {
    const response: IResponse = (await deleteFaq(
      faqToDelete.id
    ).unwrap()) as unknown as IResponse;
    if (response?.success) {
      toast.success(response?.message);
      refetch();
    } else {
      toast.error("Something went wrong");
    }
    setOpenConfirmDelete(false);
    setFaqToDelete(null);
  };

  const columns: IColumn[] = [
    { field: "ques", label: "Question" },
    { field: "ans", label: "Answer" },
    { field: "type", label: "Type" },
  ];

  return (
    <MotionBlock>
      <Box sx={{ margin: "0 auto" }}>
        <Box
          my={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom>
            Faq List
          </Typography>
          <MotionButton onClick={() => handleOpenDialog()} type="submit">
            Add Faq
          </MotionButton>
        </Box>

        <DataTable
          columns={columns}
          data={storedFaqs}
          isLoading={isLoading}
          onEdit={(row) => handleOpenDialog(row)}
          onDelete={(row) => {
            setFaqToDelete(row);
            setOpenConfirmDelete(true);
          }}
        />

        {/* Faq Dialog */}
        <ManipulateDialog
          open={openDialog}
          faqToEdit={faqToEdit}
          handleCloseDialog={handleCloseDialog}
          handleAddEditFaq={handleAddEditFaq}
        />

        {/* Confirmation Dialog for Delete */}
        <ConfirmDeleteDialog
          open={openConfirmDelete}
          handleClose={() => setOpenConfirmDelete(false)}
          handleDeleteFaq={handleDeleteFaq}
        />
      </Box>
    </MotionBlock>
  );
};

export default Faq;
