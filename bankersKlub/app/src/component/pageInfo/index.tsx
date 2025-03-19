import { useGetPageInfoByIdQuery } from "@/services/pageInfo.api";
import style from "./pageInfo.module.css";
import { ReactElement } from "react";
import Button from "../animation/Button";
import { useRouter } from "next/navigation";
import Div from "../animation/Div";

interface PageInfoProps {
  page?: string;
  data?: { [key: string]: string };
  position?: string;
  action?: {
    title: string;
    to: string;
    class: string;
    outline?: boolean;
  }[];
  rightElement?: ReactElement;
}

export default function PageInfo({
  page,
  data,
  position = "middle",
  action = [],
  rightElement,
}: PageInfoProps) {
  const { data: pageInfos, isLoading } = useGetPageInfoByIdQuery(page);
  const { push } = useRouter();
  const storedPageInfos = page ? pageInfos?.data : data || [];
  const height = position.includes("_") ? "min_box" : "head_box";
  if (!isLoading)
    return (
      <div
        className={style[height]}
        style={{
          backgroundImage: `url(${
            process.env.NEXT_PUBLIC_BACKEND_API_URL + storedPageInfos?.image
          })`,
        }}
      >
        <div className={style[position]}>
          <div className={style.div}>
            <Div direction="top">
              <h1>{storedPageInfos?.title}</h1>
            </Div>
            <Div direction="left" delay={0.2}>
              <h3>{storedPageInfos?.description}</h3>
            </Div>
            <Div direction="bottom" delay={0.2}>
              <div className={style.btn_box}>
                {action?.map((data, index) => (
                  <Button
                    onClick={() => push(data.to)}
                    key={index}
                    className={data.class}
                    outline={data.outline}
                  >
                    {data.title}
                  </Button>
                ))}
                {/* {action?.map((data, index) => (
                <Link key={index} href={data.to} className={style[data?.class]}>
                  {data.title}
                </Link>
              ))} */}
              </div>
            </Div>
          </div>
          <Div direction="right" delay={0.5}>
            {rightElement}
          </Div>
        </div>
      </div>
    );
}
