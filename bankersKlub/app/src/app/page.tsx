import type { Metadata } from "next";
import HomePage from "./home";

export const metadata: Metadata = {
  title: "BankersKlub | Home",
  description: "bankersklub.com: Bankers & Corporate Professionals Community",
};

export default function Home() {
  return <HomePage />;
}
