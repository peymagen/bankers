"use client";
import { useGetFaqByIdQuery } from "@/services/faq.api";
import style from "./faq.module.css";
import { useState } from "react";
import bottomRight from "@/assets/image/faq/bottomRight.png";
import Image from "next/image";
import Div from "../animation/Div";

export default function Faq({ page }) {
  const [select, setSelect] = useState(-1);
  const { data, isLoading } = useGetFaqByIdQuery(page);
  const faqs = data?.data || [];
  if (!isLoading)
    return (
      <div className={style.end_container}>
        <div className={style.container}>
          <h1 className={style.header}>Frequently Asked Questions</h1>
          <div className={style.box}>
            {faqs?.map((d, i) => {
              return (
                <Div key={i} delay={i * 0.1}>
                  <div className={style.border}>
                    <div
                      onClick={() => {
                        i === select ? setSelect(-1) : setSelect(i);
                      }}
                      className={select === i ? style.shown : style.hidden}
                    >
                      <div className={style.question}>
                        <h2>{d?.ques}</h2>
                        <span className={style.plus_icon}>
                          {select === i ? "-" : "+"}
                        </span>
                      </div>
                      <div>
                        <p className={style.answer}>{d?.ans} </p>
                      </div>
                    </div>
                  </div>
                </Div>
              );
            })}
          </div>
        </div>
        <Div direction="right">
          <div className={style.end_box}>
            <Image
              src={bottomRight || ""}
              alt="Decoration"
              width={350}
              height={400}
              unoptimized={true}
            />
          </div>
        </Div>
      </div>
    );
}
