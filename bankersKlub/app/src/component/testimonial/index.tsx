import { useGetTestimonialsQuery } from "@/services/testimonial.api";
import styles from "./Testimonial.module.css";
import { useState } from "react";
import Image from "next/image";
import Div from "../animation/Div";
import useBreakpoint from "@/hooks/useBreakPoints";

export default function Testimonial() {
  const { data, isLoading } = useGetTestimonialsQuery(undefined);
  const testimonialData = data?.data;
  const [activeTestomonial, setActiveTestomonial] = useState(0);
  const isMobile = useBreakpoint("md");

  if (!isLoading)
    return (
      <div className={styles.container}>
        <h1>Your words means a world to us</h1>
        <div className={styles.testimonial_list}>
          {testimonialData
            ?.slice(activeTestomonial, activeTestomonial + (isMobile ? 1 : 2))
            ?.map((data: ITestimonial, i: number) => (
              <Div direction="right" duration={1} delay={0.5 * i} key={i}>
                <div key={i} className={styles.testimonial_div}>
                  <Image
                    src={process.env.NEXT_PUBLIC_BACKEND_API_URL + data.image}
                    alt="logo"
                    width={180}
                    height={38}
                    priority
                  />
                  <div>
                    <h1>{data.name}</h1>
                    <p>{data.description}</p>
                  </div>
                </div>
              </Div>
            ))}
        </div>
        <div className={styles.testimonial_page}>
          {[...Array(testimonialData?.length - (isMobile ? 0 : 1))]?.map(
            (_, index) => (
              <div
                key={index}
                onClick={() => setActiveTestomonial(index)}
                className={styles.dot}
              ></div>
            )
          )}
        </div>
      </div>
    );
}
