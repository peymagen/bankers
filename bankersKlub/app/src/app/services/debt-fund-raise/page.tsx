import { Metadata } from "next";
import ServiceDetail from "./detail";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `BankersKlub | Debt Fund Raise | Service `,
    description: "bankersklub.com: Bankers & Corporate Professionals Community",
  };
}

export default async function ServicePost() {
  return <ServiceDetail />;
}
