import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Styles from "./Text.module.css";

interface TypingTextProps {
  className: string;
  text: string;
  speed?: number;
}

const TypingText = ({ className, text, speed = 100 }: TypingTextProps) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText(""); // Reset text before typing starts
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className={Styles?.[className]}>{displayedText}</h1>
    </motion.div>
  );
};

export default TypingText;
