import { JSX } from "react";
import style from "./middle.module.css";
import Image from "next/image";
import Div from "../animation/Div";
interface MiddleProps {
  title: string;
  content: { icon: JSX.Element; title: string }[];
}

export default function Middle({ title, content }: MiddleProps) {
  return (
    <div className={style.middle}>
      <Div direction="left">
        <h1>{title}</h1>
      </Div>
      <Div direction="right">
        <div className={style.middle_box}>
          {content.map(
            (
              d: { icon?: JSX.Element; image?: string; title: string },
              i: number
            ) => (
              <div key={i} className={style.symbol_box}>
                {d.icon ? (
                  <Image
                    src={
                      (process.env.NEXT_PUBLIC_BACKEND_API_URL ?? "") +
                        d.icon || ""
                    }
                    alt={d.title}
                    height={100}
                    width={100}
                  />
                ) : (
                  ""
                )}
                <h2>{d.title}</h2>
              </div>
            )
          )}
        </div>
      </Div>
    </div>
  );
}
