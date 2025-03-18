import { Metadata } from "next";
import ServiceDetail from "./detail";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `BankersKlub | Financial  welness report | Service `,
    description: "bankersklub.com: Bankers & Corporate Professionals Community",
  };
}

export default async function ServicePost() {
  return <ServiceDetail />;
}
