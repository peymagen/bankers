import BlogPage from "./blog";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BankersKlub | Blog",
  description: "bankersklub.com: Bankers & Corporate Professionals Community",
};

export default function Blog() {
  return <BlogPage />;
}
