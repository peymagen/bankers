"use client";
import { JSX } from "react";
import Div from "../animation/Div";
import style from "./alcaline.module.css";
import AlcalineCard from "./card";

interface AlcalineProps {
  title: JSX.Element;
  data: IAdvantage[];
}

export default function Alcaline({ title, data }: AlcalineProps) {
  return (
    <div className={style.container}>
      <div className={style.top_bar}></div>
      {title}

      <div className={style.d_flex}>
        <div className={style.parent_box}>
          <div className={style.card_container_top}>
            {data?.map((d, i) => {
              if ((i + 1) % 2 === 1)
                return (
                  <Div direction="left" delay={0.3 * i} key={i}>
                    <AlcalineCard alcaline={d} />
                  </Div>
                );
            })}
          </div>
          <div className={style.horizontal_line}></div>
          <div className={style.card_container_bottom}>
            {data?.map((d, i) => {
              if ((i + 1) % 2 === 0)
                return (
                  <Div direction="left" delay={0.3 * i} key={i}>
                    <AlcalineCard alcaline={d} />
                  </Div>
                );
            })}
          </div>
        </div>
        <span className={style.trophy}>🏆</span>
      </div>
    </div>
  );
}
