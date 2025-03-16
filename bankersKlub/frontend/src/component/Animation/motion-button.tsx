import React, { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { useTheme } from "@mui/material/styles";

interface MotionButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
}

const MotionButton: React.FC<MotionButtonProps> = ({ children, ...props }) => {
  const theme = useTheme(); // ✅ Get the current theme

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.button
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      {...props} // Pass all other props
      style={{
        ...props.style,
        marginTop: 16,
        marginBottom: 16,
        padding: "12px 25px",
        border: "none",
        borderRadius: "8px",
        backgroundColor: theme.palette.primary.main, // ✅ Use button color if exists
        color: theme.palette.button?.contrastText || "#fff", // ✅ Use contrast text color
        cursor: "pointer",
      }}
    >
      {children}
    </motion.button>
  );
};

export default MotionButton;
