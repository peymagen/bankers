import React, { useState } from "react";
import style from "./Journey.module.css";
import { useGetJorneysQuery } from "@/services/journey.api";
import readTitle from "@/assets/image/svg/journey/readTitle.svg";
import unreadTitle from "@/assets/image/svg/journey/unreadTitle.svg";
import readContent from "@/assets/image/svg/journey/readContent.svg";
import unreadContent from "@/assets/image/svg/journey/unreadContent.svg";
import Image from "next/image";
import Div from "../animation/Div";

interface IJourney {
  title: string;
  description: string;
}
export default function Journey() {
  const { data, isLoading } = useGetJorneysQuery(undefined);
  const storeData = data?.data || [];
  const [active, setActive] = useState(0);
  const unprogress = <div className={style.unprogress}></div>;
  const progress = <div className={style.progress}></div>;
  if (!isLoading)
    return (
      <div className={style.container}>
        <h1 className={style.heading}>Our Journey</h1>
        <div className={style.journey}>
          <div className={style.d_flex}>
            {progress}
            {storeData?.map((d: IJourney, i: number) => (
              <Div key={i} direction="bottom" delay={0.2 * i}>
                <div className={style.d_flex}>
                  <div onClick={() => setActive(i)}>
                    {i <= active ? (
                      <Image
                        src={readTitle}
                        alt="active-tab"
                        height={30}
                        width={50}
                        className={style.margin_img}
                      />
                    ) : (
                      <Image
                        src={unreadTitle}
                        alt="inactive-tab"
                        height={40}
                        width={50}
                        className={style.unmargin_img}
                      />
                    )}
                    <p>{d?.title}</p>
                  </div>
                  {i < active ? progress : unprogress}
                </div>
              </Div>
            ))}
          </div>
          <div className={style.description}>
            <Div direction="left" delay={1}>
              <div className={style.content}>
                {Array.from({ length: storeData?.length }).map((_, index) => (
                  <div key={index}>
                    {Array.from({ length: storeData?.length }).map((_, i) => (
                      <React.Fragment key={i}>
                        {i <= active &&
                        index + active > storeData?.length - 2 ? (
                          <Image
                            src={readContent}
                            alt="active-content"
                            height={30}
                            width={50}
                            className={style.margin_img}
                          />
                        ) : (
                          <Image
                            src={unreadContent}
                            alt="inactive-content"
                            height={40}
                            width={50}
                            className={style.unmargin_img}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                ))}
              </div>
            </Div>
            <hr />
            <Div direction="right" delay={1.2}>
              <div className={style.content_text}>
                <h3>{storeData?.[active]?.title}</h3>
                <p>{storeData?.[active]?.description}</p>
              </div>
            </Div>
          </div>
        </div>
      </div>
    );
}
