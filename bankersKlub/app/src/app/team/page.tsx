import type { Metadata } from "next";
import TeamPage from "./team";
export const metadata: Metadata = {
  title: "BankersKlub | Our Team",
  description: "bankersklub.com: Bankers & Corporate Professionals Community",
};
export default function Team() {
  return <TeamPage />;
}
