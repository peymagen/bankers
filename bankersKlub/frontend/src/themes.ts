import { createTheme, responsiveFontSizes } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    button?: {
      main: string;
      contrastText: string;
    };
  }
  interface PaletteOptions {
    button?: {
      main: string;
      contrastText: string;
    };
  }
}

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
    // ✅ Add button color to the palette
    button: {
      main: mode === "light" ? "#3A6D66" : "#162B28",
      contrastText: mode === "light" ? "#ffffff" : "#cccccc",
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
