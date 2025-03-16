import { useState } from "react";
import { Box, Typography } from "@mui/material";
import MotionButton from "../../component/Animation/motion-button";
import MotionBlock from "../../component/Animation/motion-block";
import ManipulateDialog from "./manipulate";
import ConfirmDeleteDialog from "./confirmDelete";
import {
  useCreatePageInfoMutation,
  useDeletePageInfoMutation,
  useGetPageInfosQuery,
  useUpdatePageInfoMutation,
} from "../../services/pageInfo.api";
import { toast } from "react-toastify";
import DataTable from "../../component/DataTable";

/**
 * PageInfosPage component for displaying a list of pageInfos, adding new pageInfos, editing, and deleting existing pageInfos.
 *
 * @returns {JSX.Element} - The rendered PageInfosPage component.
 */
const PageInfo = () => {
  const {
    data: pageInfos,

    isLoading,
    refetch,
  } = useGetPageInfosQuery(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [pageInfoToEdit, setPageInfoToEdit] = useState<any | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [pageInfoToDelete, setPageInfoToDelete] = useState<any | null>(null);
  const [createPageInfo] = useCreatePageInfoMutation();
  const [updatePageInfo] = useUpdatePageInfoMutation();
  const [deletePageInfo] = useDeletePageInfoMutation();

  const storedPageInfos = pageInfos?.data || [];

  /**
   * Opens the pageInfo manipulation dialog to add or edit a pageInfo.
   *
   * @param {PageInfo} [pageInfo] - Optional pageInfo object to edit.
   */
  const handleOpenDialog = (pageInfo?: IPageInfo) => {
    setPageInfoToEdit(pageInfo || null);
    setOpenDialog(true);
  };

  /**
   * Closes the pageInfo manipulation dialog.
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setPageInfoToEdit(null);
  };

  /**
   * Handles the process of adding or editing a pageInfo.
   *
   * @param {PageInfo} data - The pageInfo data to be added or edited.
   */
  const handleAddEditPageInfo = async (data: FormData) => {
    if (pageInfoToEdit) {
      const response = await updatePageInfo(data).unwrap();
      if (response?.success) {
        refetch();
        toast.success(response?.message);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      const response = await createPageInfo(data).unwrap();
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
   * Handles the process of deleting a pageInfo.
   */
  const handleDeletePageInfo = async () => {
    const response: IResponse = (await deletePageInfo(
      pageInfoToDelete.id
    ).unwrap()) as unknown as IResponse;
    if (response?.success) {
      toast.success(response?.message);
      refetch();
    } else {
      toast.error("Something went wrong");
    }
    setOpenConfirmDelete(false);
    setPageInfoToDelete(null);
  };

  const columns: IColumn[] = [
    { field: "title", label: "Title" },
    { field: "description", label: "Description" },
    { field: "key_value", label: "Key" },
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
            PageInfo List
          </Typography>
          <MotionButton onClick={() => handleOpenDialog()} type="submit">
            Add Page Information
          </MotionButton>
        </Box>

        <DataTable
          columns={columns}
          data={storedPageInfos}
          isLoading={isLoading}
          onEdit={(row) => handleOpenDialog(row)}
          onDelete={(row) => {
            setPageInfoToDelete(row);
            setOpenConfirmDelete(true);
          }}
        />

        {/* PageInfo Dialog */}
        <ManipulateDialog
          open={openDialog}
          pageInfoToEdit={pageInfoToEdit}
          handleCloseDialog={handleCloseDialog}
          handleAddEditPageInfo={handleAddEditPageInfo}
        />

        {/* Confirmation Dialog for Delete */}
        <ConfirmDeleteDialog
          open={openConfirmDelete}
          handleClose={() => setOpenConfirmDelete(false)}
          handleDeletePageInfo={handleDeletePageInfo}
        />
      </Box>
    </MotionBlock>
  );
};

export default PageInfo;
