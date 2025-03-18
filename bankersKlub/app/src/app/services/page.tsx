import type { Metadata } from "next";
import ServicePage from "./service";

export const metadata: Metadata = {
  title: "BankersKlub | Service",
  description: "bankersklub.com: Bankers & Corporate Professionals Community",
};

export default function Blog() {
  return <ServicePage />;
}
