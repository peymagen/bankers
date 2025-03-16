import { useState } from "react";
import { Box, Typography } from "@mui/material";
import MotionButton from "../../component/Animation/motion-button";
import MotionBlock from "../../component/Animation/motion-block";
import ManipulateDialog from "./manipulate";
import ConfirmDeleteDialog from "./confirmDelete";
import {
  useCreateAddressMutation,
  useDeleteAddressMutation,
  useGetAddresssQuery,
  useUpdateAddressMutation,
} from "../../services/address.api";
import { useAppDispatch } from "../../store/store";
import { toast } from "react-toastify";
import DataTable from "../../component/DataTable";

/**
 * AddresssPage component for displaying a list of addresss, adding new addresss, editing, and deleting existing addresss.
 *
 * @returns {JSX.Element} - The rendered AddresssPage component.
 */
const Address = () => {
  const {
    data: addresss,
    error,
    isLoading,
    refetch,
  } = useGetAddresssQuery(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState<any | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<any | null>(null);
  const [createAddress] = useCreateAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();

  const dispatch = useAppDispatch();
  const storedAddresss = addresss?.data || [];

  /**
   * Opens the address manipulation dialog to add or edit a address.
   *
   * @param {Address} [address] - Optional address object to edit.
   */
  const handleOpenDialog = (address?: IAddress) => {
    setAddressToEdit(address || null);
    setOpenDialog(true);
  };

  /**
   * Closes the address manipulation dialog.
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setAddressToEdit(null);
  };

  /**
   * Handles the process of adding or editing a address.
   *
   * @param {Address} data - The address data to be added or edited.
   */
  const handleAddEditAddress = async (data: FormData) => {
    if (addressToEdit) {
      const response = await updateAddress(data).unwrap();
      if (response?.success) {
        refetch();
        toast.success(response?.message);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      const response = await createAddress(data).unwrap();
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
   * Handles the process of deleting a address.
   */
  const handleDeleteAddress = async () => {
    const response: IResponse = (await deleteAddress(
      addressToDelete.id
    ).unwrap()) as unknown as IResponse;
    if (response?.success) {
      toast.success(response?.message);
      refetch();
    } else {
      toast.error("Something went wrong");
    }
    setOpenConfirmDelete(false);
    setAddressToDelete(null);
  };

  const columns: IColumn[] = [
    { field: "street", label: "Street" },
    { field: "city", label: "City" },
    { field: "state", label: "State" },
    { field: "pincode", label: "Pincode" },
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
            Address List
          </Typography>
          <MotionButton onClick={() => handleOpenDialog()} type="submit">
            Add Address
          </MotionButton>
        </Box>

        <DataTable
          columns={columns}
          data={storedAddresss}
          isLoading={isLoading}
          onEdit={(row) => handleOpenDialog(row)}
          onDelete={(row) => {
            setAddressToDelete(row);
            setOpenConfirmDelete(true);
          }}
        />

        {/* Address Dialog */}
        <ManipulateDialog
          open={openDialog}
          addressToEdit={addressToEdit}
          handleCloseDialog={handleCloseDialog}
          handleAddEditAddress={handleAddEditAddress}
        />

        {/* Confirmation Dialog for Delete */}
        <ConfirmDeleteDialog
          open={openConfirmDelete}
          handleClose={() => setOpenConfirmDelete(false)}
          handleDeleteAddress={handleDeleteAddress}
        />
      </Box>
    </MotionBlock>
  );
};

export default Address;
