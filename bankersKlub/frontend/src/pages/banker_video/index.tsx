import { useState } from "react";
import { Box, Typography } from "@mui/material";
import MotionButton from "../../component/Animation/motion-button";
import MotionBlock from "../../component/Animation/motion-block";
import ManipulateDialog from "./manipulate";
import ConfirmDeleteDialog from "./confirmDelete";
import {
  useCreateBankerVideoMutation,
  useDeleteBankerVideoMutation,
  useGetBankerVideosQuery,
  useUpdateBankerVideoMutation,
} from "../../services/banker_video.api";

import { toast } from "react-toastify";
import DataTable from "../../component/DataTable";

/**
 * BankerVideosPage component for displaying a list of bankerVideos, adding new bankerVideos, editing, and deleting existing bankerVideos.
 *
 * @returns {JSX.Element} - The rendered BankerVideosPage component.
 */
const BankerVideo = () => {
  const {
    data: bankerVideos,

    isLoading,
    refetch,
  } = useGetBankerVideosQuery(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [bankerVideoToEdit, setBankerVideoToEdit] = useState<any | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [bankerVideoToDelete, setBankerVideoToDelete] = useState<any | null>(
    null
  );
  const [createBankerVideo] = useCreateBankerVideoMutation();
  const [updateBankerVideo] = useUpdateBankerVideoMutation();
  const [deleteBankerVideo] = useDeleteBankerVideoMutation();

  const storedBankerVideos = bankerVideos?.data || [];

  /**
   * Opens the bankerVideo manipulation dialog to add or edit a bankerVideo.
   *
   * @param {BankerVideo} [bankerVideo] - Optional bankerVideo object to edit.
   */
  const handleOpenDialog = (bankerVideo?: IBankerVideo) => {
    setBankerVideoToEdit(bankerVideo || null);
    setOpenDialog(true);
  };

  /**
   * Closes the bankerVideo manipulation dialog.
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setBankerVideoToEdit(null);
  };

  /**
   * Handles the process of adding or editing a bankerVideo.
   *
   * @param {BankerVideo} data - The bankerVideo data to be added or edited.
   */
  const handleAddEditBankerVideo = async (data: FormData) => {
    if (bankerVideoToEdit) {
      const response = await updateBankerVideo(data).unwrap();
      if (response?.success) {
        refetch();
        toast.success(response?.message);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      const response = await createBankerVideo(data).unwrap();
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
   * Handles the process of deleting a bankerVideo.
   */
  const handleDeleteBankerVideo = async () => {
    const response: IResponse = (await deleteBankerVideo(
      bankerVideoToDelete.id
    ).unwrap()) as unknown as IResponse;
    if (response?.success) {
      toast.success(response?.message);
      refetch();
    } else {
      toast.error("Something went wrong");
    }
    setOpenConfirmDelete(false);
    setBankerVideoToDelete(null);
  };

  const columns: IColumn[] = [
    { field: "title", label: "Title" },
    { field: "description", label: "Description" },
    { field: "video", label: "Video", type: "video" },
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
            BankerVideo List
          </Typography>
          <MotionButton onClick={() => handleOpenDialog()} type="submit">
            Add BankerVideo
          </MotionButton>
        </Box>

        <DataTable
          columns={columns}
          data={storedBankerVideos}
          isLoading={isLoading}
          onEdit={(row) => handleOpenDialog(row)}
          onDelete={(row) => {
            setBankerVideoToDelete(row);
            setOpenConfirmDelete(true);
          }}
        />

        {/* BankerVideo Dialog */}
        <ManipulateDialog
          open={openDialog}
          bankerVideoToEdit={bankerVideoToEdit}
          handleCloseDialog={handleCloseDialog}
          handleAddEditBankerVideo={handleAddEditBankerVideo}
        />

        {/* Confirmation Dialog for Delete */}
        <ConfirmDeleteDialog
          open={openConfirmDelete}
          handleClose={() => setOpenConfirmDelete(false)}
          handleDeleteBankerVideo={handleDeleteBankerVideo}
        />
      </Box>
    </MotionBlock>
  );
};

export default BankerVideo;
