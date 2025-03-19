"use client";

import { useGetAboutByIdQuery } from "@/services/about.api";
import style from "./about.module.css";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { PiShootingStarLight } from "react-icons/pi";
import { RiTeamLine } from "react-icons/ri";
import { IoShieldHalfSharp } from "react-icons/io5";
import Middle from "@/component/middle";
import Journey from "@/component/journey";
import Faq from "@/component/faq";
import PageInfo from "@/component/pageInfo";
import Button from "@/component/animation/Button";
import Div from "@/component/animation/Div";

const choose = [
  { icon: <PiShootingStarLight />, title: "High Quality Product" },
  { icon: <RiTeamLine />, title: "Great Team Members" },
  { icon: <IoShieldHalfSharp />, title: "Service Assistance" },
];

export default function About() {
  const { data: companyInfos, isLoading: isLoad } = useGetAboutByIdQuery(1);

  const storedCompanyInfos = useMemo(
    () => companyInfos?.data || [],
    [companyInfos]
  );

  const detail = useMemo(() => {
    if (!isLoad) {
      const newDetail: { [key: string]: string } = {};
      const detail1 = JSON.parse(storedCompanyInfos?.title1 || "{}");
      const detail2 = JSON.parse(storedCompanyInfos?.title2 || "{}");
      const detail3 = JSON.parse(storedCompanyInfos?.title3 || "{}");

      newDetail[Object.keys(detail1)[0] || ""] =
        (Object.values(detail1)[0] as string) || "";
      newDetail[Object.keys(detail2)[0] || ""] =
        (Object.values(detail2)[0] as string) || "";
      newDetail[Object.keys(detail3)[0] || ""] =
        (Object.values(detail3)[0] as string) || "";

      return newDetail;
    }
    return {};
  }, [isLoad, storedCompanyInfos]);

  const [dis, setDis] = useState<keyof typeof detail>(Object.keys(detail)?.[0]);

  // Set default value for `dis` when `detail` updates
  useEffect(() => {
    if (Object.keys(detail).length > 0) {
      setDis(Object.keys(detail)[0] as keyof typeof detail);
    }
  }, [detail]);
  const infoAction = [
    {
      title: "Services",
      to: "/services",
      class: "secondary",
      outline: false,
    },
    {
      title: "Contact Us",
      to: "/contact",
      class: "secondary",
      outline: true,
    },
  ];
  if (!isLoad)
    return (
      <>
        <Div>
          <PageInfo page="ABOUT" position="start" action={infoAction} />
        </Div>

        <div className={style.overview_box}>
          <Div direction="left" delay={2}>
            <Image
              src={
                process.env.NEXT_PUBLIC_BACKEND_API_URL +
                storedCompanyInfos?.image
              }
              alt="Company"
              width={500}
              height={300}
              unoptimized={true}
            />
          </Div>

          <div>
            <Div direction="top" delay={2.5}>
              <h2 className={style.overview_head}>Our Company Overview</h2>
            </Div>
            <Div direction="right" delay={3}>
              <p>{storedCompanyInfos?.description}</p>
            </Div>

            <Div direction="bottom" delay={3.0}>
              <div className={style.overview_btn_box}>
                {Object.keys(detail).map((data) => (
                  <Button
                    key={data}
                    onClick={() => setDis(data)}
                    className={dis === data ? "secondary" : "inactive"}
                    outline={false}
                  >
                    {data.charAt(0).toUpperCase() + data.slice(1)}
                  </Button>
                ))}
              </div>
              <p>{detail?.[dis]}</p>
            </Div>
          </div>
        </div>

        <Div direction="bottom" delay={3.2}>
          <Middle title="Why to Choose Our Company" content={choose} />
        </Div>
        <Div direction="bottom" delay={0.4}>
          <Journey />
        </Div>
        <Div direction="bottom" delay={0.5}>
          <Faq page="ABOUT" />
        </Div>
      </>
    );
}
