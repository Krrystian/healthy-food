"use client";
import Menu from "@/app/components/Admin/Menu";
import Options from "@/app/components/Admin/Options";
import BackgroundPattern from "@/app/components/BackgroundPattern";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session, router]);

  if (!session) {
    return null;
  }

  return (
    <div className="w-screen min-h-screen xl:pt-[80px] relative xl:grid xl:grid-cols-12">
      <BackgroundPattern />
      <Menu />
      <Options />
    </div>
  );
};

export default Page;
