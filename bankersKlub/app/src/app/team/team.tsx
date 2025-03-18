"use client";

import Styles from "./team.module.css";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { PiShootingStarLight } from "react-icons/pi";
import { RiTeamLine } from "react-icons/ri";
import { IoShieldHalfSharp } from "react-icons/io5";
import Middle from "@/component/middle";
import PageInfo from "@/component/pageInfo";
import { useGetTeamsQuery } from "@/services/team.api";

const choose = [
  { icon: <PiShootingStarLight />, title: "High Quality Product" },
  { icon: <RiTeamLine />, title: "Great Team Members" },
  { icon: <IoShieldHalfSharp />, title: "Service Assistance" },
];

export default function TeamPage() {
  const { data, isLoading } = useGetTeamsQuery(undefined);
  const team = useMemo(() => data?.data || [], [data]);

  const [person, setPerson] = useState(team?.[0]);
  const [advisor, setAdvisor] = useState(
    team?.filter((item: ITeam) => item.position !== "Advisory Board")?.[0]
  );

  useEffect(() => {
    setPerson(team?.[0]);
    setAdvisor(
      team?.filter((item: ITeam) => item.position !== "Advisory Board")?.[0]
    );
  }, [team]);

  if (!isLoading)
    return (
      <>
        <PageInfo page="TEAM" position="middle" />
        <div>
          <div className={Styles.upperContainer}>
            <div>
              {[
                ...new Set<string>(
                  team
                    .filter((item: ITeam) => item.position !== "Advisory Board")
                    .map((item: ITeam) => item.position)
                ),
              ].map((data: string, index: number) => (
                <p key={index}>{data}</p>
              ))}
            </div>
            <hr />
            <div>
              <div className={Styles.outerDiv}>
                <div className={Styles.innerDiv}>
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_BACKEND_API_URL + person?.image
                    }
                    alt={person?.name || ""}
                    height={100}
                    width={100}
                  />
                  <div>
                    <div>
                      <b>{person?.name}</b>
                      <p>{person?.position}</p>
                    </div>
                    <p>{person?.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={Styles.listContainer}>
            {team
              ?.filter((item: ITeam) => item.position !== "Advisory Board")
              .map((data: ITeam, index: number) => (
                <div
                  key={index}
                  className={Styles.person}
                  onClick={() => setPerson(data)}
                >
                  <Image
                    src={process.env.NEXT_PUBLIC_BACKEND_API_URL + data?.image}
                    alt={data?.name}
                    height={100}
                    width={100}
                  />
                  <div>
                    <b>{data.name}</b>
                    <p>{data.position}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <Middle title="Why our team is best?" content={choose} />
        <div className={Styles.lowerContainer}>
          <h1>Advisory Board</h1>
          <div className={Styles.outerDiv}>
            <div className={Styles.innerDiv}>
              <Image
                src={process.env.NEXT_PUBLIC_BACKEND_API_URL + advisor?.image}
                alt={advisor?.name || ""}
                height={100}
                width={100}
              />
              <div>
                <div>
                  <b>{advisor?.name}</b>
                  <p>{advisor?.position}</p>
                </div>
                <p>{advisor?.description}</p>
              </div>
            </div>
          </div>
          <div className={Styles.listContainer}>
            {team
              ?.filter((item: ITeam) => item.position === "Advisory Board")
              .map((data: ITeam, index: number) => (
                <div
                  key={index}
                  className={Styles.person}
                  onClick={() => setAdvisor(data)}
                >
                  <Image
                    src={process.env.NEXT_PUBLIC_BACKEND_API_URL + data?.image}
                    alt={data?.name}
                    height={100}
                    width={100}
                  />
                  <div>
                    <b>{data.name}</b>
                    <p>{data.position}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </>
    );
}
