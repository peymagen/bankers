"use client";
import styles from "./ServiceDetail.module.css";
import {
  useGetServiceByIdQuery,
  useGetServicesQuery,
} from "@/services/service.api";
import PageInfo from "@/component/pageInfo";
import VideoTemplate from "@/component/videoTemplate";
import OtherServices from "@/component/otherServices";
import Faq from "@/component/faq";
import Slider from "@/component/slider";
import Image from "next/image";
import Alcaline from "@/component/alcaline";
import { useGetAdvantagesQuery } from "@/services/advantage.api";
import Div from "@/component/animation/Div";

export default function ServiceDetail() {
  const { data, isLoading } = useGetServiceByIdQuery(2);
  const { data: service, isLoading: isServiceLoad } =
    useGetServicesQuery(undefined);
  const { data: advantage, isLoading: isAdvantageLoad } =
    useGetAdvantagesQuery<{ data: { data: IAdvantage[] }; isLoading: boolean }>(
      undefined
    );
  const serviceDetail = data?.data || [];
  const infoAction = [{ title: "Raise Fund", to: "#", class: "primary" }];

  const rEle = (
    <div
      className={styles.rightPanel}
      style={{ backgroundImage: `url('/design.png')` }}
    >
      <div className={styles.content}>
        <p>{serviceDetail?.quotes}</p>
      </div>
    </div>
  );

  if (isAdvantageLoad)
    advantage?.data?.map?.((data: IAdvantage) => {
      return {
        id: data?.id,
        title: "Application and recruiter screen",
        description:
          "Candidates begin by submitting applications online. Our recruiters carefully screen each application to assess qualifications and cultural fit, ensuring alignment with our team values and job requirements.",
      };
    });

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

        {serviceDetail?.video && (
          <Div>
            <VideoTemplate data={serviceDetail?.video} />
          </Div>
        )}
        <Div>
          <Alcaline
            title={
              <h1>
                <b>Discover the advantage of BankersKlub</b>
              </h1>
            }
            data={advantage?.data}
          />
        </Div>
        <Div>
          <div className={styles?.Green}>
            {!isServiceLoad && (
              <div className={styles.center_content}>
                <h1>Advisory services for corporates</h1>
                <p>
                  Defining a financial expert ecosystem for sustained business
                  growth
                </p>
                <Slider data={service?.data} row={3} />
              </div>
            )}
            <Div delay={1}>
              <Image
                src={
                  process.env.NEXT_PUBLIC_BACKEND_API_URL + serviceDetail?.image
                }
                alt={serviceDetail?.image}
                height={400}
                width={700}
              />
            </Div>
          </div>
        </Div>
        <Div>
          <OtherServices id={serviceDetail?.id} />
        </Div>
        <Div>
          <Faq page={"Financial-welness-report"} />
        </Div>
      </>
    );
}
