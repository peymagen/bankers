import { Box } from "@mui/material";
import Sidebar from "./Sidebar"; // Path to your Sidebar component
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar role="ADMIN">
        <Box
          component="main"
          sx={{
            backgroundColor: "red",
            flexGrow: 1,
            bgcolor: "background.default",
            padding: { xs: "30px 5px", md: 3 },
          }}
        >
          <Outlet />
        </Box>
      </Sidebar>
    </Box>
  );
};

export default Layout;
