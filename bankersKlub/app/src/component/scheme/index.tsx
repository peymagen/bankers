import Image from "next/image";
import styles from "./Scheme.module.css";
import Div from "../animation/Div";

interface SchemeProps {
  active: string;
  image: string;
  data: { id: number; min: string; max: string; profit: string }[];
}

export default function Scheme({ active, image, data }: SchemeProps) {
  const toNumberMin = (num: string) => {
    return num.replace(/\D/g, ""); // "123456789"
  };
  return (
    <div className={styles.container}>
      <div className={`${styles.left}`}>
        <Div direction="left" delay={0.5}>
          <p>Meaningful engagement to business with disruptive pricing</p>
          <div className={`${styles.left_div} ${styles?.[active]}`}>
            <Image
              src={process.env.NEXT_PUBLIC_BACKEND_API_URL + image}
              alt={image}
              height={250}
              width={800}
            />
          </div>
        </Div>
      </div>
      <Div direction="right">
        <div className={`${styles.right} ${styles?.[active]}`}>
          {data?.map((d) => (
            <div key={d.id}>
              <p className={styles.head1}>
                <Div direction="right" delay={0.5 * d.id}>
                  You Raise Fund <br />
                </Div>
                <Div direction="right" delay={0.7 * d.id}>
                  {d.max === "-" && "upto"}{" "}
                  <span className={styles.raise_amount}>
                    {d.max === "-" ? d.min : toNumberMin(d.min) + "-" + d.max}
                  </span>
                </Div>
              </p>

              <p className={styles.head2}>
                <Div direction="right" delay={0.8 * d.id}>
                  Our Fixed Success <br /> Fees
                </Div>
                <Div direction="right" delay={0.9 * d.id}>
                  <span className={styles.success_amount}>{d.profit}</span>
                </Div>
              </p>
            </div>
          ))}
        </div>
      </Div>
    </div>
  );
}
