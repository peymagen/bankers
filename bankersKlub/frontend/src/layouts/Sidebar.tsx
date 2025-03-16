import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Drawer,
  Typography,
  useMediaQuery,
  Box,
  IconButton,
  Toolbar,
} from "@mui/material";
import { NavLink } from "react-router-dom"; // Use NavLink for active link styling
import { useTheme } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../store/store";

import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { resetTokens } from "../store/reducers/authReducer";

const sidebarItems = {
  ADMIN: [
    { label: "Home Page", path: "/home-page" },
    { label: "Page Information", path: "/page-info" },
    { label: "Jobs", path: "/jobs" },
    { label: "Applicants", path: "/applicants" },
    { label: "Join", path: "/joins" },
    { label: "Contact", path: "/contacts" },
    { label: "Social", path: "/social" },
    { label: "Address", path: "/address" },
    { label: "About", path: "/about" },
    { label: "Advantage", path: "/advantages" },
    { label: "Team", path: "/team" },
    { label: "Fundings", path: "/fundings" },
    { label: "Workflows", path: "/workflows" },
    { label: "Services", path: "/services" },
    { label: "Sectors", path: "/sectors" },
    { label: "Journey", path: "/journey" },
    { label: "Partners", path: "/partners" },
    { label: "Fund Scheme", path: "/fund-scheme" },
    { label: "FAQs", path: "/faqs" },
    { label: "Categories", path: "/categories" },
    { label: "Companies", path: "/companies" },
    { label: "Testimonial", path: "/testimonial" },
    { label: "Bankers", path: "/bankers" },
    { label: "Banker's Video", path: "/banker-video" },
    { label: "Opportunity", path: "/opportunity" },
    { label: "Blogs", path: "/blogs" },
    { label: "Users", path: "/user" },
  ],
};

interface SidebarProps {
  role: "ADMIN";
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ role, children }) => {
  const items = sidebarItems[role];
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => {
    const user = state.auth.user;
    return typeof user === "string" ? JSON.parse(user) : null;
  });

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const content = (
    <>
      <Box sx={{ backgroundColor: theme.palette.background.paper }}>
        <img
          src="/bankerKlub-logo.svg"
          alt="logo"
          style={{ width: "100%", height: "34px", padding: "20px 0 10px" }}
        />
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{
              position: "absolute",
              top: "16px",
              left: "16px",
              zIndex: 1000,
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Box>
      <List
        sx={{
          paddingTop: "10px",
          width: isMobile ? "280px" : "240px",
          overflowY: "auto",
          scrollbarWidth: "none", // Hide scrollbar in Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar in Webkit browsers
          },
        }}
      >
        {items.map((item) => (
          <ListItem key={item.label} sx={{ p: 0 }}>
            <NavLink
              to={item.path}
              style={({ isActive }) => ({
                display: "flex",
                width: "100%",
                backgroundColor: isActive
                  ? theme.palette.primary.main
                  : "transparent",
                color: isActive
                  ? theme.palette.primary.contrastText
                  : theme.palette.text.primary,
                textDecoration: "none",
                transition: "background-color 0.3s ease",
              })}
            >
              <Box
                sx={{
                  width: "100%",
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.light, // Use secondary light color for hover
                    color: theme.palette.secondary.contrastText,
                    cursor: "pointer",
                  },
                  padding: "8px 16px",
                }}
              >
                <ListItemText primary={item.label} />
              </Box>
            </NavLink>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: isMobile ? 280 : 240,
          height: "calc(100% - 64px)",
        }}
      >
        {content}
      </Drawer>
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          flexGrow: 1,
          width: "100%",
        }}
      >
        <Box
          sx={{
            borderBottom: `1px solid ${theme.palette.divider}`,
            padding: isMobile ? "5px 0" : "5px 20px",
          }}
        >
          <Toolbar
            sx={{ justifyContent: isMobile ? "space-between" : "flex-end" }}
          >
            {isMobile && (
              <Box sx={{ display: "contents" }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={() => setMobileOpen(true)}
                  sx={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    zIndex: 1000,
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <img
                  src="/bankerKlub-logo.svg"
                  alt="logo"
                  style={{
                    width: "100%",
                    height: "34px",
                    padding: "20px 0 10px",
                  }}
                />
              </Box>
            )}

            <Typography variant="body2" color="text.primary" sx={{ mr: 1 }}>
              {!isMobile && userData?.email}
            </Typography>
            <IconButton color="primary" onClick={() => dispatch(resetTokens())}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </Box>
        <Box sx={{ background: theme.palette.background.default }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
