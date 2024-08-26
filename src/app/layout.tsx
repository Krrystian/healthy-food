import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import { AuthProvider } from "./lib/authProvider";
import { auth } from "./auth";
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
  // metadataBase: new URL("https://5uxonw73zpjz7342oh3txyw5li.srv.us/"),
  title: {
    default: "Healthy You",
    template: "%s | Healthy You",
  },
  description:
    "Kompleksowe podejście do zdrowego odżywiania. Zdrowy ty, szczęśliwy ty.",
  openGraph: {
    images: [
      {
        url: "/opengraph-image.png",
        // url: new URL(
        //   "https://5uxonw73zpjz7342oh3txyw5li.srv.us/opengraph-image.png"
        // ),
        width: 1200,
        height: 630,
        alt: "Healthy You",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={font.className + " "+"overflow-x-hidden"}>
        <AuthProvider session={session}>
          <Navbar />
          {children}
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
