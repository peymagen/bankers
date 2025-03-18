import Image from "next/image";
import styles from "./Sector.module.css";
import Div from "../animation/Div";
interface SectorProps {
  sector: ISector[];
}

export default function Sector({ sector }: SectorProps) {
  return (
    <>
      <div className={styles.container}>
        <h1>Capital for Every Sector</h1>
        <div className={styles.sector_div}>
          <div className={styles.sector_box}>
            {sector?.map((data, index) => (
              <Div key={index} direction="left" delay={index * 0.1}>
                <div className={styles.sector_card}>
                  <Image
                    src={process.env.NEXT_PUBLIC_BACKEND_API_URL + data.image}
                    alt="logo"
                    width={30}
                    height={30}
                    priority
                  />
                  <p>{data.title}</p>
                </div>
              </Div>
            ))}
          </div>
          <Div direction="right" delay={0.5}>
            <Image
              src="/graph.png"
              alt="graph"
              width={380}
              height={538}
              priority
            />
          </Div>
        </div>
      </div>
    </>
  );
}
