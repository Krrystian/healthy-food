"use client";
import React from "react";
import useSmoothScroll from "./hooks/useSmoothScroll";
import { useSession } from "next-auth/react";
import BackgroundPattern from "./components/BackgroundPattern";

export default function Home() {
  const session = useSession();
  useSmoothScroll();

  return (
    <main className="flex flex-col gap-4 min-h-[100vh] justify-center items-center">
      <BackgroundPattern />
      <div className="w-screen h-[200vh] flex justify-center items-center relative">
        <div className="sticky border-black border">
          <video autoPlay muted loop>
            <source src="/background-video.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </main>
  );
}
