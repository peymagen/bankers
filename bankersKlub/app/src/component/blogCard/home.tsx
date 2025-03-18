import Image from "next/image";
import styles from "./homeBlog.module.css";
import BlogCard from ".";
import { useGetBlogsQuery } from "@/services/blog.api";
import Div from "../animation/Div";
interface HomeBlogProps {
  active: "BANKERS" | "CORPORATIONS";
}

export default function HomeBlog({ active }: HomeBlogProps) {
  const { data: blog, isLoading } = useGetBlogsQuery(undefined);

  const article = blog?.data || [];

  if (!isLoading)
    return (
      <div className={styles.blog_container}>
        <div
          className={`${styles.blog_box} ${
            active === "BANKERS"
              ? styles.banker_shadow
              : styles.corporation_shadow
          }`}
        >
          <div className={styles.blog_head}>
            <div>
              <Div direction="top">
                <p>category</p>
                <h1>{article[0].title}</h1>
              </Div>
              <Div>
                <p>{article[0].desc}</p>
              </Div>
            </div>
            <Div direction="right">
              <Image
                src={process.env.NEXT_PUBLIC_BACKEND_API_URL + article[0].image}
                alt="logo"
                width={580}
                height={38}
                priority
              />
            </Div>
          </div>
          <div className={styles.blog_tail}>
            {article?.slice(1, 4)?.map((data: IBlog, index: number) => (
              <Div
                key={index}
                delay={index * 0.5}
                duration={1}
                direction="bottom"
              >
                <BlogCard key={index} data={data} />
              </Div>
            ))}
          </div>
        </div>
      </div>
    );
}
