import { useEffect, useState } from "react";
import styles from "./VideoGallery.module.css";
import { useGetBankerVideosQuery } from "@/services/banker_video.api";
import Div from "../animation/Div";

const VideoGallery = () => {
  const { data, isLoading } = useGetBankerVideosQuery(undefined);
  const [activeVideo, setActiveVideo] = useState<IBankerVideo | null>(null);

  useEffect(() => {
    if (data?.data?.length) {
      setActiveVideo(data.data[0]);
    }
  }, [data]);

  const handleMouseEnter = (
    video: IBankerVideo,
    event: React.MouseEvent<HTMLVideoElement>
  ) => {
    const videoElement = event.target as HTMLVideoElement;

    if (activeVideo?.id !== video.id) {
      document
        .querySelectorAll(`.${styles.video}`)
        .forEach((vid) => (vid as HTMLVideoElement).pause());
    }

    videoElement.play(); // Play hovered video
    setActiveVideo(video); // Set active video
  };

  if (isLoading) return <p>Loading...</p>;

  if (!data?.data?.length) return <p>No videos available</p>;

  return (
    <div className={styles.container}>
      {/* Video Row */}
      <Div delay={0.1} direction="left">
        <div className={styles.videoRow}>
          {data.data.map((video: IBankerVideo) => (
            <video
              key={video.id}
              src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${video.video}`}
              controls
              className={
                video.id === activeVideo?.id ? styles.activeVideo : styles.video
              }
              onMouseEnter={(e) => handleMouseEnter(video, e)}
              muted
            />
          ))}
        </div>
      </Div>

      {/* Video Details */}
      <Div direction="right" delay={0.5}>
        <div className={styles.details}>
          <h2>{activeVideo?.title || "Select a video"}</h2>
          <p>{activeVideo?.description || "No description available"}</p>
        </div>
      </Div>
    </div>
  );
};

export default VideoGallery;
