import { useState } from "react";
import { Box, Typography } from "@mui/material";
import MotionButton from "../../component/Animation/motion-button";
import MotionBlock from "../../component/Animation/motion-block";
import ManipulateDialog from "./manipulate";
import ConfirmDeleteDialog from "./confirmDelete";
import {
  useCreateCompanyMutation,
  useDeleteCompanyMutation,
  useGetCompanysQuery,
  useUpdateCompanyMutation,
} from "../../services/company.api";

import { toast } from "react-toastify";
import DataTable from "../../component/DataTable";

/**
 * CompanysPage component for displaying a list of companys, adding new companys, editing, and deleting existing companys.
 *
 * @returns {JSX.Element} - The rendered CompanysPage component.
 */
const Company = () => {
  const {
    data: companys,

    isLoading,
    refetch,
  } = useGetCompanysQuery(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [companyToEdit, setCompanyToEdit] = useState<any | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<any | null>(null);
  const [createCompany] = useCreateCompanyMutation();
  const [updateCompany] = useUpdateCompanyMutation();
  const [deleteCompany] = useDeleteCompanyMutation();

  const storedCompanys = companys?.data || [];

  /**
   * Opens the company manipulation dialog to add or edit a company.
   *
   * @param {Company} [company] - Optional company object to edit.
   */
  const handleOpenDialog = (company?: ICompany) => {
    setCompanyToEdit(company || null);
    setOpenDialog(true);
  };

  /**
   * Closes the company manipulation dialog.
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCompanyToEdit(null);
  };

  /**
   * Handles the process of adding or editing a company.
   *
   * @param {Company} data - The company data to be added or edited.
   */
  const handleAddEditCompany = async (data: FormData) => {
    if (companyToEdit) {
      const response = await updateCompany(data).unwrap();
      if (response?.success) {
        refetch();
        toast.success(response?.message);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      const response = await createCompany(data).unwrap();
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
   * Handles the process of deleting a company.
   */
  const handleDeleteCompany = async () => {
    const response: IResponse = (await deleteCompany(
      companyToDelete.id
    ).unwrap()) as unknown as IResponse;
    if (response?.success) {
      toast.success(response?.message);
      refetch();
    } else {
      toast.error("Something went wrong");
    }
    setOpenConfirmDelete(false);
    setCompanyToDelete(null);
  };

  const columns: IColumn[] = [
    { field: "name", label: "Name" },
    { field: "email", label: "Email" },
    { field: "phone", label: "Phone" },
    { field: "turnaround", label: "Turnaround Time" },
    { field: "grid", label: "Grid" },
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
            Company List
          </Typography>
          <MotionButton onClick={() => handleOpenDialog()} type="submit">
            Add Company
          </MotionButton>
        </Box>

        <DataTable
          columns={columns}
          data={storedCompanys}
          isLoading={isLoading}
          onEdit={(row) => handleOpenDialog(row)}
          onDelete={(row) => {
            setCompanyToDelete(row);
            setOpenConfirmDelete(true);
          }}
        />

        {/* Company Dialog */}
        <ManipulateDialog
          open={openDialog}
          companyToEdit={companyToEdit}
          handleCloseDialog={handleCloseDialog}
          handleAddEditCompany={handleAddEditCompany}
        />

        {/* Confirmation Dialog for Delete */}
        <ConfirmDeleteDialog
          open={openConfirmDelete}
          handleClose={() => setOpenConfirmDelete(false)}
          handleDeleteCompany={handleDeleteCompany}
        />
      </Box>
    </MotionBlock>
  );
};

export default Company;
