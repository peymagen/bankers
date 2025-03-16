import { useState } from "react";
import { Box, Typography } from "@mui/material";
import MotionButton from "../../component/Animation/motion-button";
import MotionBlock from "../../component/Animation/motion-block";
import ManipulateDialog from "./manipulate";
import ConfirmDeleteDialog from "./confirmDelete";
import {
  useCreateSectorMutation,
  useDeleteSectorMutation,
  useGetSectorsQuery,
  useUpdateSectorMutation,
} from "../../services/sector.api";
import { toast } from "react-toastify";
import DataTable from "../../component/DataTable";

/**
 * SectorsPage component for displaying a list of sectors, adding new sectors, editing, and deleting existing sectors.
 *
 * @returns {JSX.Element} - The rendered SectorsPage component.
 */
const Sector = () => {
  const {
    data: sectors,

    isLoading,
    refetch,
  } = useGetSectorsQuery(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [sectorToEdit, setSectorToEdit] = useState<any | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [sectorToDelete, setSectorToDelete] = useState<any | null>(null);
  const [createSector] = useCreateSectorMutation();
  const [updateSector] = useUpdateSectorMutation();
  const [deleteSector] = useDeleteSectorMutation();

  const storedSectors = sectors?.data || [];

  /**
   * Opens the sector manipulation dialog to add or edit a sector.
   *
   * @param {Sector} [sector] - Optional sector object to edit.
   */
  const handleOpenDialog = (sector?: ISector) => {
    setSectorToEdit(sector || null);
    setOpenDialog(true);
  };

  /**
   * Closes the sector manipulation dialog.
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSectorToEdit(null);
  };

  /**
   * Handles the process of adding or editing a sector.
   *
   * @param {Sector} data - The sector data to be added or edited.
   */
  const handleAddEditSector = async (data: FormData) => {
    if (sectorToEdit) {
      const response = await updateSector(data).unwrap();
      if (response?.success) {
        refetch();
        toast.success(response?.message);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      const response = await createSector(data).unwrap();
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
   * Handles the process of deleting a sector.
   */
  const handleDeleteSector = async () => {
    const response: IResponse = (await deleteSector(
      sectorToDelete.id
    ).unwrap()) as unknown as IResponse;
    if (response?.success) {
      toast.success(response?.message);
      refetch();
    } else {
      toast.error("Something went wrong");
    }
    setOpenConfirmDelete(false);
    setSectorToDelete(null);
  };

  const columns: IColumn[] = [
    { field: "title", label: "Tile" },
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
            Sector List
          </Typography>
          <MotionButton onClick={() => handleOpenDialog()} type="submit">
            Add Sector
          </MotionButton>
        </Box>

        <DataTable
          columns={columns}
          data={storedSectors}
          isLoading={isLoading}
          onEdit={handleOpenDialog}
          onDelete={(sector) => {
            setSectorToDelete(sector);
            setOpenConfirmDelete(true);
          }}
        />

        {/* Sector Dialog */}
        <ManipulateDialog
          open={openDialog}
          sectorToEdit={sectorToEdit}
          handleCloseDialog={handleCloseDialog}
          handleAddEditSector={handleAddEditSector}
        />

        {/* Confirmation Dialog for Delete */}
        <ConfirmDeleteDialog
          open={openConfirmDelete}
          handleClose={() => setOpenConfirmDelete(false)}
          handleDeleteSector={handleDeleteSector}
        />
      </Box>
    </MotionBlock>
  );
};

export default Sector;
