import { Metadata } from "next";
import BlogDetail from "./blogDetail";

import { use } from "react";

type Params = Promise<{ id: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  //const { id } = params; // ✅ No await needed
  const { id } = await params;

  const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // Truncated for security

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/blogs/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const data = await response.json();
    return {
      title: `BankersKlub | ` + (data?.data?.meta_key || `Blog Post - ${id}`),
      description: data?.data?.meta_description || id,
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);

    return {
      title: `Blog Post - ${id}`,
      description: "Failed to load metadata.",
    };
  }
}

export default function BlogPost({ params }: { params: Params }) {
  const fetchedParams = use(params);
  const id = fetchedParams.id;

  return <BlogDetail id={id} />;
}
