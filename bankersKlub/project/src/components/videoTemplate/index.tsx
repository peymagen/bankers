"use client";
import { useState, useRef, useEffect } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import styles from "./VideoTemplate.module.css";

const VideoTemplate = ({ data }: { data: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsVisible(entry.isIntersecting));
      },
      { threshold: 0.5 }
    );

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, []);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div>
      <motion.div
        ref={containerRef}
        className={styles.heroSection}
        initial={{ width: "80vw", height: "70vh" }}
        animate={{
          width: isVisible ? "100vw" : "70vw",
          height: isVisible ? "100vh" : "70vh",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <video
          ref={videoRef}
          controls
          src={data}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {!isPlaying && (
          <div className={styles.playIcon} onClick={handlePlayVideo}>
            <FaPlayCircle />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default VideoTemplate;
