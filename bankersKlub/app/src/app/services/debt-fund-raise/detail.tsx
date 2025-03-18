"use client";
import styles from "./ServiceDetail.module.css";
import { useGetServiceByIdQuery } from "@/services/service.api";
import PageInfo from "@/component/pageInfo";
import { useMemo, useState } from "react";
import VideoTemplate from "@/component/videoTemplate";
import Middle from "@/component/middle";
import { useGetBankersQuery } from "@/services/banker.api";
import { useGetFundingsQuery } from "@/services/funding.api";
import { useGetFundSchemesQuery } from "@/services/fundScheme.api";
import Scheme from "@/component/scheme";
import { useGetSectorsQuery } from "@/services/sector.api";
import Sector from "@/component/sector";
import VideoGallery from "@/component/videoGallery";
import OtherServices from "@/component/otherServices";
import Div from "@/component/animation/Div";

export default function ServiceDetail() {
  const [active, setActive] = useState<"BANKERS" | "CORPORATIONS">(
    "CORPORATIONS"
  );
  const { data, isLoading } = useGetServiceByIdQuery(1);
  const { data: fund, isLoading: isLoad } = useGetFundingsQuery(undefined);
  const { data: bankers, isLoading: isBankerLoad } =
    useGetBankersQuery(undefined);
  const { data: sector, isLoading: isSectorLoad } =
    useGetSectorsQuery(undefined);

  const { data: scheme, isLoading: isSchemeLoad } =
    useGetFundSchemesQuery(undefined);
  const serviceDetail = data?.data || [];
  const infoAction = [
    { title: "Raise Fund", to: "#", class: "primary", outline: false },
  ];

  const choose = useMemo(() => {
    const filter: IBanker | ICompany =
      active === "BANKERS" ? bankers?.data : fund?.data;
    if (isLoad) return [];
    if (isBankerLoad) return [];

    return (
      Array.isArray(filter) &&
      filter.map((data) => ({
        icon: data.image,
        title: active === "BANKERS" ? data.text : `${data.amount} ${data.name}`,
      }))
    );
  }, [active, bankers?.data, fund?.data, isLoad, isBankerLoad]);

  const act = active === "CORPORATIONS" ? 0 : 1;
  const rEle = (
    <div
      className={styles.rightPanel}
      style={{ backgroundImage: `url('/design.png')` }}
    >
      <div className={styles.content}>
        <p>{serviceDetail?.quotes?.split("//")[act]}</p>
      </div>
    </div>
  );
  if (!isLoading)
    return (
      <>
        <Div>
          <PageInfo
            data={{
              title: serviceDetail.title,
              description: serviceDetail.description,
              image: serviceDetail.main_image,
            }}
            position="start"
            action={infoAction}
            rightElement={rEle}
          />
        </Div>
        <Div delay={0.3}>
          <div className={styles.btnGroup}>
            <button
              onClick={() => setActive("CORPORATIONS")}
              className={active === "CORPORATIONS" ? styles.active : styles.btn}
            >
              For Corporate
            </button>
            <button
              onClick={() => setActive("BANKERS")}
              className={active === "BANKERS" ? styles.active : styles.btn}
            >
              For Banker
            </button>
          </div>
        </Div>
        <Div delay={0.6}>
          <div
            className={
              active === "BANKERS"
                ? styles.banker_video
                : styles.corporation_video
            }
          >
            <VideoTemplate data={serviceDetail?.video} />
            <h2 className={styles.title}>WE HELP OUR CLIENT TO GROW FAST</h2>
          </div>
        </Div>
        <Div>
          {choose && (
            <Middle
              title={
                active === "CORPORATIONS"
                  ? "Our Successful Funding"
                  : "Bankers Earned With Us!"
              }
              content={choose}
            />
          )}
        </Div>
        <Div>
          {active === "CORPORATIONS" && !isSectorLoad && (
            <Sector sector={sector?.data} />
          )}
        </Div>
        <Div>
          <div className={styles?.[active]}>
            {!isSchemeLoad && (
              <Scheme
                active={active}
                image={serviceDetail?.image?.split(",")[act]}
                data={scheme?.data}
              />
            )}

            {active === "BANKERS" && <VideoGallery />}
          </div>
        </Div>
        <Div>
          <OtherServices id={serviceDetail?.id} />
        </Div>
      </>
    );
}
