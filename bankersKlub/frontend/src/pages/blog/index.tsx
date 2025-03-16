import { useState } from "react";
import { Box, Typography } from "@mui/material";
import MotionButton from "../../component/Animation/motion-button";
import MotionBlock from "../../component/Animation/motion-block";
import ManipulateDialog from "./manipulate";
import ConfirmDeleteDialog from "./confirmDelete";
import {
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useGetBlogsQuery,
  useUpdateBlogMutation,
} from "../../services/blog.api";
import { toast } from "react-toastify";
import DataTable from "../../component/DataTable";

/**
 * BlogsPage component for displaying a list of blogs, adding new blogs, editing, and deleting existing blogs.
 *
 * @returns {JSX.Element} - The rendered BlogsPage component.
 */
const Blog = () => {
  const {
    data: blogs,
    error,
    isLoading,
    refetch,
  } = useGetBlogsQuery(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [blogToEdit, setBlogToEdit] = useState<any | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<any | null>(null);
  const [createBlog] = useCreateBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  const storedBlogs = blogs?.data || [];

  /**
   * Opens the blog manipulation dialog to add or edit a blog.
   *
   * @param {Blog} [blog] - Optional blog object to edit.
   */
  const handleOpenDialog = (blog?: IBlog) => {
    setBlogToEdit(blog || null);
    setOpenDialog(true);
  };

  /**
   * Closes the blog manipulation dialog.
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setBlogToEdit(null);
  };

  /**
   * Handles the process of adding or editing a blog.
   *
   * @param {Blog} data - The blog data to be added or edited.
   */
  const handleAddEditBlog = async (data: FormData) => {
    if (blogToEdit) {
      const response = await updateBlog(data).unwrap();
      if (response?.success) {
        refetch();
        toast.success(response?.message);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      const response = await createBlog(data).unwrap();
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
   * Handles the process of deleting a blog.
   */
  const handleDeleteBlog = async () => {
    const response: IResponse = (await deleteBlog(
      blogToDelete.id
    ).unwrap()) as unknown as IResponse;
    if (response?.success) {
      toast.success(response?.message);
      refetch();
    } else {
      toast.error("Something went wrong");
    }
    setOpenConfirmDelete(false);
    setBlogToDelete(null);
  };

  const columns: IColumn[] = [
    { field: "title", label: "Title" },
    { field: "description", label: "Description" },
    { field: "body", label: "Body" },
    { field: "content", label: "Content", type: "richText" },
    { field: "category_name", label: "Category" },
    { field: "meta_key", label: "Meta Key" },
    { field: "meta_description", label: "Meta Description" },
    { field: "image", label: "Image", type: "image" },
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
            Blog List
          </Typography>
          <MotionButton onClick={() => handleOpenDialog()} type="submit">
            Add Blog
          </MotionButton>
        </Box>

        <DataTable
          columns={columns}
          data={storedBlogs}
          isLoading={isLoading}
          onEdit={(row) => handleOpenDialog(row)}
          onDelete={(row) => {
            setBlogToDelete(row);
            setOpenConfirmDelete(true);
          }}
        />

        {/* Blog Dialog */}
        <ManipulateDialog
          open={openDialog}
          blogToEdit={blogToEdit}
          handleCloseDialog={handleCloseDialog}
          handleAddEditBlog={handleAddEditBlog}
        />

        {/* Confirmation Dialog for Delete */}
        <ConfirmDeleteDialog
          open={openConfirmDelete}
          handleClose={() => setOpenConfirmDelete(false)}
          handleDeleteBlog={handleDeleteBlog}
        />
      </Box>
    </MotionBlock>
  );
};

export default Blog;
