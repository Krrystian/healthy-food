"use client";
import React from "react";
import { animatePageIn } from "./lib/pageTransition";

export default function Template({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    animatePageIn();
  }, []);
  return (
    <div>
      <div
        id="banner-1"
        className="min-h-screen bg-[#219ebc] z-50 fixed top-0 left-0 w-0 md:w-1/4"
      />
      <div
        id="banner-2"
        className="min-h-screen bg-[#219ebc] z-50 fixed top-0 left-1/4 w-0 md:w-1/4"
      />
      <div
        id="banner-3"
        className="min-h-screen bg-[#219ebc] z-50 fixed top-0 left-2/4 w-0 md:w-1/4"
      />
      <div
        id="banner-4"
        className="min-h-screen bg-[#219ebc] z-50 fixed top-0 left-3/4 w-0 md:w-1/4"
      />
      {children}
    </div>
  );
}
