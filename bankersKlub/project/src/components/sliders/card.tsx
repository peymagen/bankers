import style from "./sliders.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Service {
  id: string;
  image: string;
  title: string;
  description: string;
}

interface ServiceCardProps {
  service: Service;
  innerRef: React.RefObject<HTMLDivElement>;
}

export default function ServiceCard({ service, innerRef }: ServiceCardProps) {
  const route = useRouter();
  return (
    <div
      onClick={() => route.push("/service/" + service?.id)}
      ref={innerRef}
      className={style.carsouel_box}
    >
      <Image
        src={
          service?.image &&
          process.env.NEXT_PUBLIC_BASE_IMG_URL + service?.image
        }
        className={style.icon}
        alt="Service"
        width={100}
        height={100}
      />
      <h3 className={style.head}>{service?.title}</h3>
      <p>{service?.description}</p>
    </div>
  );
}
