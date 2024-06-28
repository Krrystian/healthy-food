import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";

const font = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Black.woff2",
      weight: "900",
    },
    {
      path: "../../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
    },
    {
      path: "../../public/fonts/Satoshi-Regular.woff2",
      weight: "400",
    },
    {
      path: "../../public/fonts/Satoshi-Light.woff2",
      weight: "300",
    },
    {
      path: "../../public/fonts/Satoshi-Medium.woff2",
      weight: "500",
    },
  ],
});

export const metadata: Metadata = {
  title: "Healthy Food",
  description: "Healthy food, blog, recipes, products, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
