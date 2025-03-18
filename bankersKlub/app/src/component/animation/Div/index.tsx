import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface DivProps {
  direction?: "left" | "right" | "top" | "bottom";
  duration?: number;
  delay?: number;
  children?: React.ReactNode;
}

const Div: React.FC<DivProps> = ({
  direction = "bottom",
  duration = 0.9,
  delay = 0.1,
  children,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  // Define initial positions based on direction
  const variants = {
    left: { x: -100, opacity: 0 },
    right: { x: 100, opacity: 0 },
    top: { y: -100, opacity: 0 },
    bottom: { y: 100, opacity: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={variants[direction]} // Set initial animation state
      animate={
        isInView
          ? {
              x: 0,
              y: 0,
              opacity: 1,
              transition: { duration, delay },
            }
          : variants[direction] // Reset animation when out of view
      }
    >
      {children}
    </motion.div>
  );
};

export default Div;
