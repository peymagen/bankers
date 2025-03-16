import { useState } from "react";
import { Box, Typography } from "@mui/material";
import MotionButton from "../../component/Animation/motion-button";
import MotionBlock from "../../component/Animation/motion-block";
import ManipulateDialog from "./manipulate";
import ConfirmDeleteDialog from "./confirmDelete";
import {
  useCreateSocialMutation,
  useDeleteSocialMutation,
  useGetSocialsQuery,
  useUpdateSocialMutation,
} from "../../services/social.api";
import { useAppDispatch } from "../../store/store";
import { toast } from "react-toastify";
import DataTable from "../../component/DataTable";

/**
 * SocialsPage component for displaying a list of socials, adding new socials, editing, and deleting existing socials.
 *
 * @returns {JSX.Element} - The rendered SocialsPage component.
 */
const Social = () => {
  const {
    data: socials,
    error,
    isLoading,
    refetch,
  } = useGetSocialsQuery(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [socialToEdit, setSocialToEdit] = useState<any | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [socialToDelete, setSocialToDelete] = useState<any | null>(null);
  const [createSocial] = useCreateSocialMutation();
  const [updateSocial] = useUpdateSocialMutation();
  const [deleteSocial] = useDeleteSocialMutation();

  const dispatch = useAppDispatch();
  const storedSocials = socials?.data || [];

  /**
   * Opens the social manipulation dialog to add or edit a social.
   *
   * @param {Social} [social] - Optional social object to edit.
   */
  const handleOpenDialog = (social?: ISocial) => {
    setSocialToEdit(social || null);
    setOpenDialog(true);
  };

  /**
   * Closes the social manipulation dialog.
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSocialToEdit(null);
  };

  /**
   * Handles the process of adding or editing a social.
   *
   * @param {Social} data - The social data to be added or edited.
   */
  const handleAddEditSocial = async (data: FormData) => {
    if (socialToEdit) {
      const response = await updateSocial(data).unwrap();
      if (response?.success) {
        refetch();
        toast.success(response?.message);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      const response = await createSocial(data).unwrap();
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
   * Handles the process of deleting a social.
   */
  const handleDeleteSocial = async () => {
    const response: IResponse = (await deleteSocial(
      socialToDelete.id
    ).unwrap()) as unknown as IResponse;
    if (response?.success) {
      toast.success(response?.message);
      refetch();
    } else {
      toast.error("Something went wrong");
    }
    setOpenConfirmDelete(false);
    setSocialToDelete(null);
  };

  const columns: IColumn[] = [
    { field: "icon", label: "Icon", type: "image" },
    { field: "link", label: "Link" },
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
            Social List
          </Typography>
          <MotionButton onClick={() => handleOpenDialog()} type="submit">
            Add Social
          </MotionButton>
        </Box>

        <DataTable
          columns={columns}
          data={storedSocials}
          isLoading={isLoading}
          onEdit={(row) => handleOpenDialog(row)}
          onDelete={(row) => {
            setSocialToDelete(row);
            setOpenConfirmDelete(true);
          }}
        />

        {/* Social Dialog */}
        <ManipulateDialog
          open={openDialog}
          socialToEdit={socialToEdit}
          handleCloseDialog={handleCloseDialog}
          handleAddEditSocial={handleAddEditSocial}
        />

        {/* Confirmation Dialog for Delete */}
        <ConfirmDeleteDialog
          open={openConfirmDelete}
          handleClose={() => setOpenConfirmDelete(false)}
          handleDeleteSocial={handleDeleteSocial}
        />
      </Box>
    </MotionBlock>
  );
};

export default Social;
