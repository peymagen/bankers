import useRelativeTime from "@/hooks/useRelativeTime";
import React from "react";
import style from "./Blogcard.module.css";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function BlogCard({ data }: { data: IBlog }) {
  const routes = useRouter();
  const path = usePathname();
  console.log(path);
  return (
    <div
      className={style.blog_box}
      onClick={() =>
        routes.push(
          path === "/blog"
            ? `/blog/${data.title.replace(/ /g, "-")}`
            : data.title.replace(/ /g, "-")
        )
      }
    >
      <Image
        className={style.img}
        src={process.env.NEXT_PUBLIC_BACKEND_API_URL + data.image}
        alt={data.title}
        height={150}
        width={350}
      />
      <p>{useRelativeTime(data.created_at || new Date().toISOString())}</p>
      <b>{data.title}</b>
    </div>
  );
}
