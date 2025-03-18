import { useGetSocialsQuery } from "@/services/social.api";
import Image from "next/image";
import Link from "next/link";
import style from "./SocialMedia.module.css";
import Div from "../animation/Div";

type SizeType = "small" | "large";

export default function SocialMedia({ size }: { size: SizeType }) {
  const { data, isLoading } = useGetSocialsQuery(undefined);

  if (!isLoading)
    return (
      <div className={style.flex}>
        {data?.data?.map((d: { link: string; icon: string }, i: number) => (
          <Div direction="left" delay={0.1 * i} key={i}>
            <div className={size === "small" ? style.small_cover : style.cover}>
              <Link href={d.link}>
                <Image
                  src={process.env.NEXT_PUBLIC_BACKEND_API_URL + d.icon}
                  alt={d.link}
                  height={size === "small" ? 20 : 30}
                  width={size === "small" ? 20 : 30}
                />
              </Link>
            </div>
          </Div>
        ))}
      </div>
    );
}
