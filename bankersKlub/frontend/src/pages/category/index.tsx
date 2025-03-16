import { useState } from "react";
import { Box, Typography } from "@mui/material";
import MotionButton from "../../component/Animation/motion-button";
import MotionBlock from "../../component/Animation/motion-block";
import ManipulateDialog from "./manipulate";
import ConfirmDeleteDialog from "./confirmDelete";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategorysQuery,
  useUpdateCategoryMutation,
} from "../../services/category.api";
import { toast } from "react-toastify";
import DataTable from "../../component/DataTable";

/**
 * CategorysPage component for displaying a list of categorys, adding new categorys, editing, and deleting existing categorys.
 *
 * @returns {JSX.Element} - The rendered CategorysPage component.
 */
const Category = () => {
  const {
    data: categorys,

    isLoading,
    refetch,
  } = useGetCategorysQuery(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<any | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<any | null>(null);
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const storedCategorys = categorys?.data || [];

  /**
   * Opens the category manipulation dialog to add or edit a category.
   *
   * @param {Category} [category] - Optional category object to edit.
   */
  const handleOpenDialog = (category?: ICategory) => {
    setCategoryToEdit(category || null);
    setOpenDialog(true);
  };

  /**
   * Closes the category manipulation dialog.
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCategoryToEdit(null);
  };

  /**
   * Handles the process of adding or editing a category.
   *
   * @param {Category} data - The category data to be added or edited.
   */
  const handleAddEditCategory = async (data: FormData) => {
    if (categoryToEdit) {
      const response = await updateCategory(data).unwrap();
      if (response?.success) {
        refetch();
        toast.success(response?.message);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      const response = await createCategory(data).unwrap();
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
   * Handles the process of deleting a category.
   */
  const handleDeleteCategory = async () => {
    const response: IResponse = (await deleteCategory(
      categoryToDelete.id
    ).unwrap()) as unknown as IResponse;
    if (response?.success) {
      toast.success(response?.message);
      refetch();
    } else {
      toast.error("Something went wrong");
    }
    setOpenConfirmDelete(false);
    setCategoryToDelete(null);
  };

  const columns: IColumn[] = [{ field: "title", label: "Title" }];

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
            Category List
          </Typography>
          <MotionButton onClick={() => handleOpenDialog()} type="submit">
            Add Category
          </MotionButton>
        </Box>

        <DataTable
          columns={columns}
          data={storedCategorys}
          isLoading={isLoading}
          onEdit={(row) => handleOpenDialog(row)}
          onDelete={(row) => {
            setCategoryToDelete(row);
            setOpenConfirmDelete(true);
          }}
        />

        {/* Category Dialog */}
        <ManipulateDialog
          open={openDialog}
          categoryToEdit={categoryToEdit}
          handleCloseDialog={handleCloseDialog}
          handleAddEditCategory={handleAddEditCategory}
        />

        {/* Confirmation Dialog for Delete */}
        <ConfirmDeleteDialog
          open={openConfirmDelete}
          handleClose={() => setOpenConfirmDelete(false)}
          handleDeleteCategory={handleDeleteCategory}
        />
      </Box>
    </MotionBlock>
  );
};

export default Category;
