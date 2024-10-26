"use client";
import React, { useEffect } from "react";
import Card from "../Settings/Card";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Notifications, Statistics, Users } from "./Forms";

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
    <div className="w-full xl:col-span-9 xl:p-8 p-4 xl:grid xl:grid-cols-2 flex flex-col gap-8">
      {menuOption === "Users" || menuOption === null ? (
        <>
          <Card title="Użytkownicy" className="col-span-2">
            <Users />
          </Card>
        </>
      ) : menuOption === "Notifications" ? (
        <>
          <Card title="Powiadomienia" className="col-span-2">
            <Notifications />
          </Card>
        </>
      ) : menuOption === "Statistics" ? (
        <>
          <Card title="Statistics" className="col-span-2">
            <Statistics />
          </Card>
        </>
      ) : null}
    </div>
  );
};

export default Options;
