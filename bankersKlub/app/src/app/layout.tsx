"use client";
import { Geist, Geist_Mono, Rufina } from "next/font/google";
import "./globals.css";
import Header from "@/component/header";
import { useEffect } from "react";
import Footer from "@/component/footer";
import { Provider } from "react-redux";
import { store } from "../../store";
import useHighlightText from "@/hooks/useHighlightText";
import Div from "@/component/animation/Div";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rufina = Rufina({
  variable: "--font-rufina",
  subsets: ["latin"],
  weight: ["400", "700"], // You can adjust the weights as needed
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setColors = () => {
    document.documentElement.style.setProperty(
      "--primaryBankerColor",
      "#6c7bc8"
    );
    document.documentElement.style.setProperty(
      "--secondaryBankerColor",
      "#3465C4"
    );
    document.documentElement.style.setProperty(
      "--primaryCorporationColor",
      "#E6007E"
    );
    document.documentElement.style.setProperty(
      "--secondaryCorporationColor",
      "#1EB469"
    );
    document.documentElement.style.setProperty(
      "--primaryDefaultColor",
      "#E6007E"
    );
    document.documentElement.style.setProperty(
      "--secondaryDefaultColor",
      "#1EB469"
    );
    document.documentElement.style.setProperty("--footer", "#244B45");
  };

  useHighlightText("BankersKlub");

  useEffect(() => {
    setColors();
  }, []);

  return (
    <html lang="en">
      <body
        className={`${rufina.variable} ${geistSans.variable} ${geistMono.variable}`}
      >
        <Provider store={store}>
          <Header />
          <Div delay={0.1}>{children}</Div>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
