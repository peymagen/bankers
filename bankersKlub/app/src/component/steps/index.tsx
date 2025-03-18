import Image from "next/image";
import styles from "./Steps.module.css";
import Button from "../animation/Button";
import Div from "../animation/Div";

interface StepsProps {
  flow: IWorkflow[];
  active: string;
}

export default function Steps({ flow, active }: StepsProps) {
  return (
    <div className={styles.steps}>
      <div className={styles.flow_box}>
        {flow?.map((data, index) => (
          <Div key={index} delay={index * 0.5} duration={1} direction="bottom">
            <div
              key={data.id}
              className={`${styles.flow} ${
                active === "BANKERS"
                  ? styles.banker_shadow
                  : styles.corporation_shadow
              }`}
            >
              <Image
                src={process.env.NEXT_PUBLIC_BACKEND_API_URL + data.svg}
                alt={data?.name}
                className={styles.hero_banner}
                height={40}
                width={40}
              />
              <h1>{index + 1 + ". " + data?.name}</h1>
              <p>{data?.description}</p>
            </div>
          </Div>
        ))}
      </div>
      <div className={styles.start_center}>
        <Button className="secondary">Get Started</Button>
      </div>
    </div>
  );
}
