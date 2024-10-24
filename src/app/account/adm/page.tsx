"use client";
import Menu from "@/app/components/admin/Menu";
import Options from "@/app/components/admin/Options";
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
    <div className="grid grid-cols-12 pt-16 h-screen">
      <BackgroundPattern />
      <Menu />
      <Options />
    </div>
  );
};

export default Page;
