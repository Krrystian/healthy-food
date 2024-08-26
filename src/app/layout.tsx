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
  metadataBase: new URL("localhost:3000"), // Change this to your domain
  title: {
    default: "Healthy You",
    template: "%s | Healthy You",
  },
  description:
    "Kompleksowe podejście do zdrowego odżywiania. Zdrowy ty, szczęśliwy ty.",
  openGraph: {
    title: "Healthy You",
    description:
      "Kompleksowe podejście do zdrowego odżywiania. Zdrowy ty, szczęśliwy ty.",
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
      <body className={font.className}>
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
