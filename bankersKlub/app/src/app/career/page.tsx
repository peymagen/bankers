import type { Metadata } from "next";
import CareerPage from "./career";
export const metadata: Metadata = {
  title: "BankersKlub | Career",
  description: "bankersklub.com: Bankers & Corporate Professionals Community",
};
export default function Career() {
  return <CareerPage />;
}
