import React, { useMemo, useState } from "react";
import styles from "./Slider.module.css";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import ServiceCard from "../service/card";
import Div from "../animation/Div";

interface SliderProps {
  data: IService[];
  row: number;
}

export default function Slider({ data, row }: SliderProps) {
  const [card, setCard] = useState(0);
  const showData = useMemo(
    () => data?.slice(card < 0 ? 0 : card, card + row) || [],
    [data, card, row]
  );

  return (
    <div className={styles.sliderContainer}>
      {/* Navigation Buttons */}
      <button
        className={`${styles.button} ${styles.leftButton}`}
        onClick={() => card >= 0 && setCard(card - 1)}
        disabled={card < 0}
      >
        <FaArrowLeftLong />
      </button>

      <div className={styles.cards}>
        {showData.map((d: IService, index) => (
          <Div key={index} delay={index * 0.5}>
            <ServiceCard
              active={
                card < 0
                  ? index === 0 && true
                  : index === Math.floor(row / 2) && true
              }
              d={d}
              key={index}
            />
          </Div>
        ))}
      </div>

      <button
        className={`${styles.button} ${styles.rightButton}`}
        onClick={() => card + row < data?.length + 1 && setCard(card + 1)}
        disabled={card + row >= data?.length + 1}
      >
        <FaArrowRightLong />
      </button>
    </div>
  );
}
