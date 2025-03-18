import React from "react";
import styles from "./Marquee.module.css";

import { ReactNode } from "react";

const Marquee = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marqueeWrapper}>
        <div className={styles.marqueeContent}>{children}</div>
      </div>
    </div>
  );
};

export default Marquee;
