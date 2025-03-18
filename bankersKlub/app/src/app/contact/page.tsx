import type { Metadata } from "next";
import ContactPage from "./contact";
export const metadata: Metadata = {
  title: "BankersKlub | Contact Us",
  description: "bankersklub.com: Bankers & Corporate Professionals Community",
};
export default function Contact() {
  return <ContactPage />;
}
