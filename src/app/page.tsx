"use client";
import React from "react";
import { auth } from "./auth";
import SmoothScroll from "./hooks/useSmoothScroll";

export default function Home() {
  const [user, setUser] = React.useState<any>();
  const getSession = async () => {
    let session = await auth();
    return session;
  };
  React.useEffect(() => {
    const session = getSession();
  }, []);

  SmoothScroll();
  return (
    <main className="flex flex-col gap-4 min-h-[200vh] bg-[#023047] justify-center items-center">
      {/* <LoadingScreen /> */}
      <p className="text-7xl text-white">TEST TEST TEST TEST</p>
    </main>
  );
}
