import styles from "./OtherServices.module.css";
import Image from "next/image";
import { useGetServicesQuery } from "@/services/service.api";
import Div from "../animation/Div";

interface OtherServicesProps {
  id: number;
}

export default function OtherServices({ id }: OtherServicesProps) {
  const { data, isLoading } = useGetServicesQuery(undefined);
  return (
    <div className={styles.opportunity_box}>
      <div>
        <h1 className={styles.opportunity_title}>Our Other Services</h1>
        <Div>
          <Image
            src="/serviceChat.png"
            alt="imagechart"
            height={500}
            width={500}
          />
        </Div>
      </div>
      <hr />
      <div>
        {!isLoading &&
          data?.data
            ?.filter((d: IService) => d.id !== id)
            ?.map((data: IService) => (
              <Div
                key={data.id}
                direction="right"
                delay={Number(data.id) * 0.2}
              >
                <div className={styles.opportunity_card}>
                  <h3>{data.title}</h3>
                  <p>{data.description}</p>
                  <button>Read More</button>
                </div>
              </Div>
            ))}
      </div>
    </div>
  );
}
