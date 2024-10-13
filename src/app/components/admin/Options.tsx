"use client";

import React, { useEffect } from "react";
import Card from "../Settings/Card";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

const Options = () => {
  const searchParams = useSearchParams();
  const menuOption = searchParams.get("menu");
  const { data: session, status } = useSession() as {
    data: { roles: string[] } | null;
    status: string;
  };
  const router = useRouter();

  useEffect(() => {}, [session, status]);

  if (status === "loading") {
    return <p>Ładowanie...</p>;
  }

  if (
    status !== "authenticated" ||
    !session ||
    !session.roles.includes("admin")
  ) {
    router.push("/");
    return null;
  }

  return (
    <div className="w-full col-span-9 p-16 grid grid-cols-2 gap-8">
      {menuOption === "Users" || menuOption === null ? (
        <>
          <Card title="Zmień zdjęcie profilowe"></Card>
        </>
      ) : null}
    </div>
  );
};

export default Options;
