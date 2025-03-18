import { motion } from "framer-motion";
import { useInView } from "framer-motion";

import { useRef, ReactNode } from "react";

import Styles from "./Button.module.css";

const buttonVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.05, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" },
  tap: { scale: 0.95 },
};

const Button = ({
  children,
  className,
  outline,
  ...props
}: {
  children: ReactNode;
  className: string;
  outline?: boolean;
  [key: string]: unknown;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const buttonClass = outline
    ? Styles?.["outline_" + className]
    : Styles?.["solid_" + className];
  return (
    <motion.button
      ref={ref}
      className={`${buttonClass} ${Styles.button}`}
      variants={buttonVariants}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      whileHover="hover"
      whileTap="tap"
      {...props}
    >
      {children}
      {isInView && (
        <motion.div
          className={Styles.shine}
          initial={{ left: "-100%" }}
          animate={{ left: "110%", transition: { duration: 1 } }}
        />
      )}
    </motion.button>
  );
};

export default Button;
