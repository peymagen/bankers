import style from "./sliders.module.css";

// Define or import the TestimonialCardProps type
interface TestimonialCardProps {
  testimonial: {
    video: string;
    name: string;
    content: string;
    position: string;
  };
  innerRef?: React.Ref<HTMLDivElement>;
}

export default function TestimonialCard({
  testimonial,
  innerRef,
}: TestimonialCardProps) {
  return (
    <div ref={innerRef} className={style.testimonial_container}>
      <video
        src={testimonial?.video}
        className={style.video}
        autoPlay
        loop
        muted
        playsInline
      ></video>
      <div className={style.testimonial_box}>
        <h3 className={style.head}>{testimonial?.content}</h3>
        <div className={style.testimonial_person}>
          <p>{testimonial?.name}</p>
          <p>{testimonial?.position}</p>
        </div>
      </div>
    </div>
  );
}
