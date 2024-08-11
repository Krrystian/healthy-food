"use client";
import React from "react";
import useSmoothScroll from "./hooks/useSmoothScroll";
import { useSession } from "next-auth/react";
import BackgroundPattern from "./components/BackgroundPattern";

export default function Home() {
  const session = useSession();
  useSmoothScroll();

  return (
    <main className="flex flex-col gap-4 min-h-[200vh] justify-center items-center">
      <BackgroundPattern />
      <p className="text-7xl text-white">TEST TEST TEST TEST</p>
      <p className="text-7xl text-white">{session.data?.user?.id}</p>
    </main>
  );
}
