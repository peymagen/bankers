"use client";
import React, { useState } from "react";
import style from "./Blog.module.css";
import BlogCard from "@/component/blogCard";
import PageInfo from "@/component/pageInfo";
import { useGetCategorysQuery } from "@/services/category.api";
import { useGetBlogsQuery } from "@/services/blog.api";
import Div from "@/component/animation/Div";

export default function BlogPage() {
  const { data: cat, isLoading } = useGetCategorysQuery(undefined);
  const { data: blog, isLoading: isLoad } = useGetBlogsQuery(undefined);

  const article = blog?.data || [];
  const categories = cat?.data || [];
  const [category, setCategory] = useState(0);
  const filter = (catId: number) => {
    category === catId ? setCategory(0) : setCategory(catId);
  };
  const filterData =
    article?.filter(
      (d: IBlog) => category === 0 || Number(d.category) === category
    ) || [];
  if (!isLoad && !isLoading)
    return (
      <>
        <Div>
          <PageInfo page="BLOG" position="middle" />
        </Div>
        <Div delay={0.2}>
          <div className={style.container}>
            <div className={style.flex_wrap}>
              {categories?.map((data: { id: number; title: string }) => (
                <Div
                  key={data.id}
                  direction="right"
                  delay={data.id * 0.5}
                  duration={0.5}
                >
                  <div
                    className={
                      category === data.id
                        ? style.category_active
                        : style.category
                    }
                    onClick={() => filter(data.id)}
                  >
                    {data.title}
                  </div>
                </Div>
              ))}
            </div>
            <div className={style.flex_wrap}>
              {filterData.length > 0 ? (
                filterData?.map((data: IBlog, index: number) => (
                  <Div key={index} direction="bottom" delay={index * 1}>
                    <BlogCard data={data} />
                  </Div>
                ))
              ) : (
                <p className={style.no_data}>No Blog Found</p>
              )}
            </div>
          </div>
        </Div>
      </>
    );
}
