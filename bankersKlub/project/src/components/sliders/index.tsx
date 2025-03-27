"use client";
import style from "./sliders.module.css";
import { useRef } from "react";
import TestimonialCard from "./testimonialCard";

export default function Slider() {
  const ref = useRef<HTMLDivElement>(null);
  const refs = useRef<HTMLDivElement>(null);
  const efs = useRef<HTMLDivElement>(null);
  interface Testimonial {
    // Define the properties of the testimonial object here
    id: string;
    name: string;
    content: string;
    position: string;
    video: string;
    // Add other properties as needed
  }

  const testimonial: Testimonial[] = [
    {
      id: "1",
      name: "Sudeep Goenka",
      position: "CEO, Goenka Group",
      content: "“bankersklub give me a cnfidence I needed”",
      video:
        "https://api-bankers.basukalaiti.com/uploads/video-1740683257339.mp4",
    },
    {
      id: "2",
      name: "Sudeep Goenka",
      position: "CEO, Goenka Group",
      content: "“bankersklub give me a cnfidence I needed”",
      video:
        "https://api-bankers.basukalaiti.com/uploads/video-1740683257339.mp4",
    },
    {
      id: "3",
      name: "Sudeep Goenka",
      position: "CEO, Goenka Group",
      content: "“bankersklub give me a cnfidence I needed”",
      video:
        "https://api-bankers.basukalaiti.com/uploads/video-1740683257339.mp4",
    },
    {
      id: "4",
      name: "Sudeep Goenka",
      position: "CEO, Goenka Group",
      content: "“bankersklub give me a cnfidence I needed”",
      video:
        "https://api-bankers.basukalaiti.com/uploads/video-1740683257339.mp4",
    },
    {
      id: "5",
      name: "Sudeep Goenka",
      position: "CEO, Goenka Group",
      content: "“bankersklub give me a cnfidence I needed”",
      video:
        "https://api-bankers.basukalaiti.com/uploads/video-1740683257339.mp4",
    },
  ];

  const btnpressprev = () => {
    console.log("Prev");
    const singleBox = refs.current;
    if (singleBox) {
      const styleBox = window.getComputedStyle(singleBox);
      if (ref.current) {
        ref.current.scrollLeft =
          ref.current.scrollLeft - parseInt(styleBox.width, 10);
      }
    }
  };

  const btnpressnext = () => {
    console.log("Next");
    const singleBox = refs.current;
    if (singleBox) {
      const styleBox = window.getComputedStyle(singleBox);
      if (ref.current) {
        ref.current.scrollLeft =
          ref.current.scrollLeft + parseInt(styleBox.width, 10);
      }
    }
  };

  return (
    <div>
      <div className={`${style.container}`}>
        <div ref={ref} className={style.carsouel_container}>
          {testimonial?.map((data, index) => (
            <TestimonialCard
              testimonial={data}
              innerRef={index === 0 ? refs : efs}
              key={index}
            />
          ))}
        </div>
        <div className={style.arrow_box}>
          <button className={style.arrow_icon} onClick={btnpressprev}>
            {"<"}
          </button>
          <button className={style.arrow_icon} onClick={btnpressnext}>
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
