import { useState, useRef } from "react";
import { FaPlayCircle } from "react-icons/fa";
import styles from "./VideoTemplate.module.css";

const VideoTemplate = ({ data }: { data: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div>
      <div className={styles.heroSection}>
        <video
          ref={videoRef}
          controls
          src={process.env.NEXT_PUBLIC_BACKEND_API_URL + data}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {!isPlaying && (
          <div className={styles.playIcon} onClick={handlePlayVideo}>
            <FaPlayCircle />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoTemplate;
