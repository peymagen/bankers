"use client";

import { useState } from "react";
import styles from "./ImageReveal.module.css";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";

interface ImageRevealProps {
  before: string;
  after: string;
}

export default function ImageReveal({ before, after }: ImageRevealProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Single Curtain */}
        <div className={`${styles.curtain} ${revealed ? styles.revealed : ""}`}>
          <Image
            height={500}
            width={900}
            src={process.env.NEXT_PUBLIC_BACKEND_API_URL + before}
            alt="Curtain"
            className={styles.curtainImage}
          />
        </div>

        {/* Wall Image behind the curtain */}
        <Image
          height={500}
          width={900}
          src={process.env.NEXT_PUBLIC_BACKEND_API_URL + after}
          alt="Wall Image"
          className={styles.wallImage}
        />
      </div>

      {/* Button to trigger the animation */}
      {!revealed && (
        <div onClick={() => setRevealed(true)} className={styles.revealButton}>
          <FaArrowRightLong />
        </div>
      )}
    </div>
  );
}
