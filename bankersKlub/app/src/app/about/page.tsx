import type { Metadata } from "next";
import AboutPage from "./about";
export const metadata: Metadata = {
  title: "BankersKlub | About Us",
  description: "bankersklub.com: Bankers & Corporate Professionals Community",
};
export default function About() {
  return <AboutPage />;
}
