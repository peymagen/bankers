"use client";
import { useGetJobsQuery } from "@/services/job.api";
import style from "./carrer.module.css";
import PageInfo from "@/component/pageInfo";
import { useGetJoinsQuery } from "@/services/join.api";
import Image from "next/image";
import { useState } from "react";
import Alcaline from "@/component/alcaline";
import Button from "@/component/animation/Button";
import Div from "@/component/animation/Div";

export default function CarrerPage() {
  const { data: join, isLoading } = useGetJoinsQuery(undefined);
  const comapny = join?.data || [];

  const { data: jobList, isLoading: isLoad } = useGetJobsQuery(undefined);
  const job = jobList?.data;

  const flowData = [
    {
      id: "1",
      title: "Application and recruiter screen",
      description:
        "Candidates begin by submitting applications online. Our recruiters carefully screen each application to assess qualifications and cultural fit, ensuring alignment with our team values and job requirements.",
    },
    {
      id: "2",
      title: "First round interview",
      description:
        "Selected candidates participate in a first-round interview conducted by HR or hiring managers. This interview focuses on evaluating skills, experience, and enthusiasm for the role, aiming to identify potential matches for our team.",
    },
    {
      id: "3",
      title: "Task or challenge",
      description:
        "Shortlisted candidates are assigned a task or challenge relevant to the position. This step allows us to gauge problem-solving abilities, creativity, and practical skills necessary for success in the role.",
    },
    {
      id: "4",
      title: "Final interview",
      description:
        "Candidates who excel in the task or challenge proceed to a final interview with senior leadership or department heads. This interview assesses alignment with Peymagen's mission, vision, and long-term goals, ensuring a mutual fit for both the candidate and the company.",
    },
  ];

  const [jobDescription, setJobDescription] = useState<number | null>(null);

  const infoAction = [
    { title: "Apply Here", to: "#join", class: "secondary", outline: false },
  ];
  if (!isLoading && !isLoad)
    return (
      <>
        <Div>
          <PageInfo page="CAREER" position="middle" action={infoAction} />
        </Div>
        <Div direction="bottom" delay={1.5}>
          <div id="culture" className={style.content}>
            <Div direction="left">
              <div className={style.description}>
                <b>BENEFITS</b>
                <h1>Why you Should Join Our Awesome Team</h1>
                <p>
                  we want to feel like home when you are working at JMC(Japan
                  Marketing & Consultancy Limited) & for that we have curated a
                  great set of benefits for you.It all starts with the free
                  lunch!
                </p>
              </div>
            </Div>
            <div className={style.content_element}>
              {comapny?.map((data: IJoin, i: number) => {
                return (
                  <Div key={data.id} direction="right" delay={i * 0.5}>
                    <div>
                      <div className={style.icon_content}>
                        <Image
                          src={
                            process.env.NEXT_PUBLIC_BACKEND_API_URL + data?.icon
                          }
                          width={70}
                          height={70}
                          alt={data.title}
                        />
                      </div>
                      <p>
                        <b>{data?.title}</b>
                      </p>
                      <p>{data?.description}</p>
                    </div>
                  </Div>
                );
              })}
            </div>
          </div>
        </Div>
        <Div>
          <div id="join" className={style.blue_bg}>
            <div className={style.container}>
              <b>Come Join Us</b>
              <h1>Career Openings</h1>
              <p>
                We’re always looking for creative, talented self-starters to
                join the Peymagen Informatics and Automation family. Check out
                our open roles below and fill out an application.
              </p>
              <div className={style.job_container}>
                {job?.map((d: IJob, i: number) => {
                  return (
                    <Div key={i} delay={0.2 * i}>
                      <div className={style.wrap}>
                        <div
                          onClick={() =>
                            jobDescription === i
                              ? setJobDescription(null)
                              : setJobDescription(i)
                          }
                          className={style.job_box}
                        >
                          <b>{d?.title}</b>
                          <div>
                            <p className={style.silent}>Experience</p>
                            <p>{d?.experience}</p>
                          </div>
                          <div>
                            <p className={style.silent}>Deadline</p>
                            <p>{d?.end}</p>
                          </div>
                          <Button
                            onClick={() => console.log("click")}
                            className="secondary"
                          >
                            Apply Here
                          </Button>
                        </div>
                        {jobDescription === i && (
                          <p className={style.job_description}>
                            {d.description}
                          </p>
                        )}
                      </div>
                    </Div>
                  );
                })}
              </div>
            </div>
          </div>
        </Div>
        <Div>
          <Alcaline
            title={
              <p className={style.top_text}>
                <h1>
                  <b>How we hire our team</b>
                </h1>
                <p>
                  We like to keep things as simple as possible so we can get to
                  what’s <br />
                  really important - finding out more about you
                </p>
              </p>
            }
            data={flowData}
          />
        </Div>
      </>
    );
}
