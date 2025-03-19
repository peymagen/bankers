import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import styles from "./Slider.module.css";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";
import ServiceCard from "../service/card";
import useBreakpoint from "@/hooks/useBreakPoints";

const Slider = ({ data = [], row = 3 }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const isRow = useBreakpoint("md") ? 1 : row;
  console.log("isMobile", isRow);
  if (!data.length) return null;

  return (
    <div className={styles.sliderContainer}>
      <button
        className={`prevBtn ${styles.button} ${styles.navBtn} ${styles.leftButton}`}
      >
        <FaArrowLeftLong />
      </button>
      <Swiper
        modules={[Navigation]}
        loop={true}
        centeredSlides={true}
        spaceBetween={30}
        slidesPerView={isRow}
        navigation={{
          nextEl: ".nextBtn",
          prevEl: ".prevBtn",
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className={styles.swiper}
      >
        {data.map((d: IService, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <ServiceCard
              active={index === activeIndex ? true : false}
              d={d}
              key={index}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Right Navigation Button */}
      <button
        className={`nextBtn ${styles.button} ${styles.navBtn} ${styles.rightButton}`}
      >
        <FaArrowRightLong />
      </button>
    </div>
  );
};

export default Slider;
