import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

// Function to Generate Theme Tokens Based on Mode
const getDesignTokens = (mode: "light" | "dark") => ({
  palette: {
    mode,
    primary: {
      main: "#244B45",
    },
    secondary: {
      main: "#FF0059",
    },
    background: {
      default: "#fbfbff",
      paper: mode === "light" ? "#ffffff" : "#1e1e1e",
    },
    text: {
      primary: mode === "light" ? "#000000" : "#ffffff",
      secondary: mode === "light" ? "#333333" : "#cccccc",
    },
    button: {
      default: "#ffffff",
      primary: mode === "light" ? "#ffffff" : "#000000",
      secondary: mode === "light" ? "#cccccc" : "#333333",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          backgroundColor: mode === "light" ? "#ffffff" : "#1e1e1e",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: mode === "light" ? "#bdbdbd" : "#444",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: mode === "light" ? "#3A6D66" : "#4CAF50",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: mode === "light" ? "#244B45" : "#66ff99",
          },
        },
        input: {
          color: mode === "light" ? "#000" : "#fff",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: mode === "light" ? "#666" : "#bbb",
          "&.Mui-focused": {
            color: mode === "light" ? "#244B45" : "#66ff99",
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: mode === "light" ? "#3A6D66" : "#162B28",
          "& .MuiTableCell-head": {
            color: "#000000",
            fontWeight: "bold",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
        },
        variants: [],
      },
    },
  },
});

// **🔥 Function to Get Theme Based on System Preference**
const ThemeConfig = () => {
  // Check for system preference (avoiding hooks inside this function)
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  return responsiveFontSizes(
    createTheme(getDesignTokens(prefersDarkMode ? "dark" : "light"))
  );
};

export default ThemeConfig;
