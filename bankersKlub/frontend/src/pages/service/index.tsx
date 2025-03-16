import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import MotionButton from "../../component/Animation/motion-button";
import MotionBlock from "../../component/Animation/motion-block";
import TableSkeleton from "../../component/Skeleton/table-skeleton";
import ManipulateDialog from "./manipulate";
import ConfirmDeleteDialog from "./confirmDelete";
import {
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useGetServicesQuery,
  useUpdateServiceMutation,
} from "../../services/service.api";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { toast } from "react-toastify";

/**
 * ServicesPage component for displaying a list of services, adding new services, editing, and deleting existing services.
 *
 * @returns {JSX.Element} - The rendered ServicesPage component.
 */
const Service = () => {
  const {
    data: services,
    error,
    isLoading,
    refetch,
  } = useGetServicesQuery(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<any | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<any | null>(null);
  const [createService] = useCreateServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();

  const dispatch = useAppDispatch();
  const storedServices = services?.data || [];

  /**
   * Opens the service manipulation dialog to add or edit a service.
   *
   * @param {Service} [service] - Optional service object to edit.
   */
  const handleOpenDialog = (service?: IService) => {
    setServiceToEdit(service || null);
    setOpenDialog(true);
  };

  /**
   * Closes the service manipulation dialog.
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setServiceToEdit(null);
  };

  /**
   * Handles the process of adding or editing a service.
   *
   * @param {Service} data - The service data to be added or edited.
   */
  const handleAddEditService = async (data: FormData) => {
    if (serviceToEdit) {
      const response = await updateService(data).unwrap();
      if (response?.success) {
        refetch();
        toast.success(response?.message);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      const response = await createService(data).unwrap();
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
   * Handles the process of deleting a service.
   */
  const handleDeleteService = async () => {
    const response: IResponse = (await deleteService(
      serviceToDelete.id
    ).unwrap()) as unknown as IResponse;
    if (response?.success) {
      toast.success(response?.message);
      refetch();
    } else {
      toast.error("Something went wrong");
    }
    setOpenConfirmDelete(false);
    setServiceToDelete(null);
  };

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
            Service List
          </Typography>
          <MotionButton onClick={() => handleOpenDialog()} type="submit">
            Add Service
          </MotionButton>
        </Box>

        {isLoading && <TableSkeleton column={5} />}
        {/* Table to display Service Page */}
        {!isLoading && (
          <Grid container spacing={2}>
            <TableContainer
              component={Paper}
              sx={{ boxShadow: 3, borderRadius: 2 }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="services table">
                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {storedServices?.map((service: IService) => (
                    <TableRow key={service.id}>
                      <TableCell>{service.title}</TableCell>
                      <TableCell>{service.description}</TableCell>
                      <TableCell sx={{ width: "8rem" }}>
                        <Tooltip title="Edit">
                          <IconButton onClick={() => handleOpenDialog(service)}>
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            onClick={() => {
                              setServiceToDelete(service);
                              setOpenConfirmDelete(true);
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {storedServices?.length === 0 && (
                <Typography
                  variant="h6"
                  component="h6"
                  gutterBottom
                  sx={{ justifySelf: "center", padding: "10px" }}
                >
                  No Data available
                </Typography>
              )}
            </TableContainer>
          </Grid>
        )}

        {/* Service Dialog */}
        <ManipulateDialog
          open={openDialog}
          serviceToEdit={serviceToEdit}
          handleCloseDialog={handleCloseDialog}
          handleAddEditService={handleAddEditService}
        />

        {/* Confirmation Dialog for Delete */}
        <ConfirmDeleteDialog
          open={openConfirmDelete}
          handleClose={() => setOpenConfirmDelete(false)}
          handleDeleteService={handleDeleteService}
        />
      </Box>
    </MotionBlock>
  );
};

export default Service;
