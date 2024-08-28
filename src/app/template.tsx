"use client";
import React, { useRef, useEffect } from "react";
import { animatePageIn, animatePageInForce } from "./lib/pageTransition";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const previousPathname = useRef<string | null>(null);
  useEffect(() => {
    if (
      previousPathname.current !== null &&
      previousPathname.current !== pathname
    )
      previousPathname.current = pathname;
    const isRootPage = pathname === "/";
    if (isRootPage) {
      animatePageInForce();
    } else {
      animatePageIn();
    }
  }, [pathname]);

  return (
    <div>
      <div
        id="banner-1"
        className="h-screen bg-[#219ebc] z-50 fixed top-0 left-0 w-0 md:w-1/4"
      />
      <div
        id="banner-2"
        className="h-screen bg-[#219ebc] z-50 fixed top-0 left-1/4 w-0 md:w-1/4"
      />
      <div
        id="banner-3"
        className="h-screen bg-[#219ebc] z-50 fixed top-0 left-2/4 w-0 md:w-1/4"
      />
      <div
        id="banner-4"
        className="h-screen bg-[#219ebc] z-50 fixed top-0 left-3/4 w-0 md:w-1/4"
      />
      {children}
    </div>
  );
}
