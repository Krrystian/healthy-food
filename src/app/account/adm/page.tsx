"use client";
import Menu from "@/app/components/admin/Menu";
import Options from "@/app/components/admin/Options";
import BackgroundPattern from "@/app/components/BackgroundPattern";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) {
    return router.push("/");
  }
  return (
    <div className="grid grid-cols-12 pt-16 h-screen">
      <BackgroundPattern />
      <Menu />
      <Options />
    </div>
  );
};

export default Page;
