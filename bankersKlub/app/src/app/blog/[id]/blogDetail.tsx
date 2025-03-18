"use client";
import Image from "next/image";
import styles from "./BlogDetail.module.css";
import { useGetBlogByIdQuery, useGetBlogsQuery } from "@/services/blog.api";
import useRelativeTime from "@/hooks/useRelativeTime";
import BlogCard from "@/component/blogCard";

interface BlogDetailProps {
  id: string | number;
}

export default function BlogDetail({ id }: BlogDetailProps) {
  const { data: blogData, isLoading } = useGetBlogByIdQuery(id);
  const blog = blogData?.data || {};
  const { data: rlatedData, isLoading: isLoad } = useGetBlogsQuery(
    `?id=${id}&category=${blog.category}`
  );
  const relatedBlogs = rlatedData?.data || [];
  const relativeTime = useRelativeTime(blog?.created_at || new Date());

  if (!isLoad || !isLoading)
    return (
      <>
        <div className={styles.blogHeader}>
          <Image
            src={process.env.NEXT_PUBLIC_BACKEND_API_URL + blog.image}
            alt={blog.title}
            className={styles.blogImage}
            width={2000}
            height={500}
          />
          <div className={styles.overlay}>
            <h1 className={styles.title}>{blog.title}</h1>
            <p className={styles.description}>{blog.description}</p>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.contentContainer}>
            <div className={styles.detail}>
              <p className={styles.category}>
                {blog.category_name} {" | "} {relativeTime}
              </p>
              <div className={styles.blogContent}>
                <p className={styles.category}>{blog.body}</p>
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              </div>
            </div>
            <aside className={styles.relatedBlogs}>
              <h2>Related Blogs</h2>
              {relatedBlogs.map((related: IBlog) => (
                <BlogCard data={related} key={related.id} />
              ))}
            </aside>
          </div>
        </div>
      </>
    );
}
