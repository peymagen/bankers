import Image from "next/image";
import styles from "./Partner.module.css";
import Marquee from "../marquee";
interface PartnerProps {
  data: IPartner[];
}
export default function Partner({ data }: PartnerProps) {
  return (
    <div className={styles.partner_box}>
      <h1>Our trusted partners</h1>
      <div className={styles.partner_list}>
        <Marquee>
          {data?.map((d) => (
            <Image
              key={d?.id}
              src={process.env.NEXT_PUBLIC_BACKEND_API_URL + d?.image}
              alt={d?.image}
              width={180}
              height={38}
              priority
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
}
