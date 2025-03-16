import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import MotionButton from "../../component/Animation/motion-button";
import MotionBlock from "../../component/Animation/motion-block";
import ManipulateDialog from "./manipulate";
import ConfirmDeleteDialog from "./confirmDelete";
import {
  useCreateHomeMutation,
  useDeleteHomeMutation,
  useGetHomesQuery,
  useUpdateHomeMutation,
} from "../../services/home.api";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addHome } from "../../store/reducers/homeReducer";
import { toast } from "react-toastify";
import DataTable from "../../component/DataTable";

const HomePage = () => {
  const {
    data: homes,
    error,
    isLoading,
    refetch,
  } = useGetHomesQuery(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [homeToEdit, setHomeToEdit] = useState<any | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [homeToDelete, setHomeToDelete] = useState<any | null>(null);
  const [createHome] = useCreateHomeMutation();
  const [updateHome] = useUpdateHomeMutation();
  const [deleteHome] = useDeleteHomeMutation();

  const dispatch = useAppDispatch();
  const storedHomes = useAppSelector((state) => state.home.homes);

  useEffect(() => {
    if (homes) {
      dispatch(addHome(homes.data));
    }
  }, [homes, dispatch]);

  const handleOpenDialog = (home?: {
    title: string;
    description: string;
    image: null | File;
  }) => {
    setHomeToEdit(home || null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setHomeToEdit(null);
  };

  const handleAddEditHome = async (data: FormData) => {
    if (homeToEdit) {
      const response = await updateHome(data).unwrap();
      if (response?.success) {
        refetch();
        toast.success(response?.message);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      const response = await createHome(data).unwrap();
      if (response?.success) {
        toast.success(response?.message);
        refetch();
      } else {
        toast.error("Something went wrong");
      }
    }

    handleCloseDialog();
  };

  const handleDeleteHome = async () => {
    const response: { success: boolean; message: string } = (await deleteHome(
      homeToDelete.id
    ).unwrap()) as unknown as {
      success: boolean;
      message: string;
    };
    if (response?.success) {
      toast.success(response?.message);
      refetch();
    } else {
      toast.error("Something went wrong");
    }
    setOpenConfirmDelete(false);
    setHomeToDelete(null);
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
          <Typography variant="h4" gutterBottom>
            Home Page List
          </Typography>
          <MotionButton onClick={() => handleOpenDialog()} type="submit">
            Add Page
          </MotionButton>
        </Box>

        <DataTable
          columns={columns}
          data={storedHomes}
          isLoading={isLoading}
          onEdit={handleOpenDialog}
          onDelete={(home) => {
            setHomeToDelete(home);
            setOpenConfirmDelete(true);
          }}
        />

        {/* Home Dialog */}
        <ManipulateDialog
          open={openDialog}
          homeToEdit={homeToEdit}
          handleCloseDialog={handleCloseDialog}
          handleAddEditHome={handleAddEditHome}
        />

        {/* Confirmation Dialog for Delete */}
        <ConfirmDeleteDialog
          open={openConfirmDelete}
          handleClose={() => setOpenConfirmDelete(false)}
          handleDeleteHome={handleDeleteHome}
        />
      </Box>
    </MotionBlock>
  );
};

export default HomePage;
