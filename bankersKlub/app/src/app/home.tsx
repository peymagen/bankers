"use client";
import styles from "./home.module.css";
import Slider from "@/component/slider";
import { useGetHomesQuery } from "@/services/home.api";
import { FaArrowDown } from "react-icons/fa";
import Image from "next/image";
import { useMemo, useState } from "react";
import VideoTemplate from "@/component/videoTemplate";
import Middle from "@/component/middle";
import { useGetFundingsQuery } from "@/services/funding.api";
import { useGetWorkflowsQuery } from "@/services/workflow.api";
import Hero from "@/component/hero";
import Steps from "@/component/steps";
import { useGetServicesQuery } from "@/services/service.api";
import ImageReveal from "@/component/imageReveal/page";
import Journey from "@/component/journey";
import FundingCalculator from "@/component/fundingCalculator";
import { useGetPartnersQuery } from "@/services/partner.api";
import Partner from "@/component/partner";
import { useGetFundSchemesQuery } from "@/services/fundScheme.api";
import Scheme from "@/component/scheme";
import { useGetSectorsQuery } from "@/services/sector.api";
import Sector from "@/component/sector";
import Faq from "@/component/faq";
import HomeBlog from "@/component/blogCard/home";
import Testimonial from "@/component/testimonial";
import { useGetBankersQuery } from "@/services/banker.api";
import Opportunity from "@/component/opportunity";
import VideoGallery from "@/component/videoGallery";
import Div from "@/component/animation/Div";

export default function HomePage() {
  const { data: home, isLoading } = useGetHomesQuery(undefined);
  const { data: fund, isLoading: isLoad } = useGetFundingsQuery(undefined);
  const { data: flow, isLoading: isFlowLoad } = useGetWorkflowsQuery(undefined);
  const { data: sector, isLoading: isSectorLoad } =
    useGetSectorsQuery(undefined);
  const { data: scheme, isLoading: isSchemeLoad } =
    useGetFundSchemesQuery(undefined);
  const { data: partner, isLoading: isPartnerLoad } =
    useGetPartnersQuery(undefined);
  const { data: service, isLoading: isServiceLoad } =
    useGetServicesQuery(undefined);
  const { data: bankers, isLoading: isBankerLoad } =
    useGetBankersQuery(undefined);
  const homeData: { [key in "BANKERS" | "CORPORATIONS"]: IHome } = {
    BANKERS: home?.data?.find((D: IPageInfo) => D.key_value === "BANKERS"),
    CORPORATIONS: home?.data?.find(
      (D: IPageInfo) => D.key_value === "CORPORATIONS"
    ),
  };
  const [active, setActive] = useState<"BANKERS" | "CORPORATIONS">(
    "CORPORATIONS"
  );

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

  if (!isLoading)
    return (
      <>
        <Div>
          <Hero
            title={homeData[active]?.title}
            description={homeData[active]?.description}
            active={active}
            setActive={setActive}
            banner={homeData[active]?.banner}
          />
        </Div>
        <Div>
          <div
            className={
              active === "BANKERS"
                ? styles.banker_video
                : styles.corporation_video
            }
          >
            <VideoTemplate data={homeData?.[active]?.video} />
            <h2 className={styles.title}>WE HELP OUR CLIENT TO GROW FAST</h2>
          </div>
        </Div>
        <Div>
          {active === "CORPORATIONS" && (
            <div className={styles.container}>
              <div className={styles.gridContainer}>
                <div className={styles.card}>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>Markets →</h3>
                    <div className={styles.marketData}>
                      {["DOW", "S&P 500", "NASDAQ"].map((index, i) => (
                        <div key={i} className={styles.marketRow}>
                          <span>{index}</span>
                          <span>XX,XXX.XX</span>
                          <span className={styles.marketChange}>
                            {(Math.random() * 2).toFixed(2)}%{" "}
                            <FaArrowDown className={styles.downIcon} />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.card}>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>Fear & Greed Index →</h3>
                    <div className={styles.circularProgress}>
                      <svg width="80" height="80" viewBox="0 0 36 36">
                        <path
                          className={styles.circleBg}
                          d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#ddd"
                          strokeWidth="3"
                        />
                        <path
                          className={styles.circleProgress}
                          d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831"
                          fill="none"
                          stroke="red"
                          strokeWidth="3"
                          strokeDasharray="36, 100"
                        />
                      </svg>
                      <p className={styles.fearText}>
                        Fear is driving the US market
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* News and Fundings */}
              <div className={styles.gridContainer}>
                <div className={styles.card}>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>Latest Market News →</h3>
                    {[1, 2, 3].map((_, i) => (
                      <p key={i} className={styles.newsText}>
                        Lorem ipsum dolor sit amet...
                      </p>
                    ))}
                  </div>
                </div>
                <div className={styles.card}>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>
                      Latest Market Fundings →
                    </h3>
                    {[
                      "BankersKlub secures 50Cr",
                      "Kalari invested 1M",
                      "Kunal Shah's new startup",
                    ].map((news, i) => (
                      <p key={i} className={styles.newsText}>
                        {news}...
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Div>
        <Div>
          {active === "CORPORATIONS" && !isServiceLoad && (
            <div className={styles.center_content}>
              <h1>Advisory services for corporates</h1>
              <p>
                Defining a financial expert ecosystem for sustained business
                growth
              </p>
              <Slider data={service?.data} row={3} />
            </div>
          )}
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
          {homeData[active]?.quotes_slider.length > 1 && (
            <div
              className={`${styles.quotes_box} ${
                active === "BANKERS" ? styles.banker_bg : styles.corporation_bg
              }`}
            >
              <p>{homeData[active]?.quotes_slider}</p>
            </div>
          )}
        </Div>
        <Div>{active === "BANKERS" && <Opportunity />}</Div>
        <Div>{active === "BANKERS" && <VideoGallery />}</Div>

        <Div>
          {!isFlowLoad && (
            <Steps
              flow={flow?.data?.filter((d: IWorkflow) => d.type === active)}
              active={active}
            />
          )}
        </Div>

        <Div>
          <ImageReveal
            before={homeData[active]?.before_image}
            after={homeData[active]?.after_image}
          />
        </Div>
        <Div>
          {active === "CORPORATIONS" && (
            <>
              <Journey />
              <FundingCalculator />
            </>
          )}
        </Div>
        <Div>{!isPartnerLoad && <Partner data={partner?.data} />}</Div>
        <Div>
          {active === "CORPORATIONS" && !isSchemeLoad && (
            <Scheme
              active="DEFAULT"
              image={homeData[active]?.image}
              data={scheme?.data}
            />
          )}
        </Div>
        <Div>
          {active === "CORPORATIONS" && !isSectorLoad && (
            <Sector sector={sector?.data} />
          )}
        </Div>
        <Div>
          {homeData[active]?.slider && (
            <Image
              src={
                process.env.NEXT_PUBLIC_BACKEND_API_URL +
                homeData[active]?.slider
              }
              height={1000}
              width={2000}
              className={styles.slider_image}
              alt={homeData[active]?.slider}
            />
          )}
        </Div>
        <Div>
          <HomeBlog active={active} />
        </Div>
        <Div>
          <Testimonial />
        </Div>
        <Div>
          <Faq page={active} />
        </Div>
      </>
    );
}
