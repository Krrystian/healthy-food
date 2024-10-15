"use client";

import React, { useEffect } from "react";
import Card from "./Card";
import {
  ProfileImageForm,
  ProfileNameForm,
  ProfileDescriptionForm,
  ProfileEmailForm,
  ProfilePasswordForm,
  ProfileNotificationForm,
} from "./Forms";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Options = () => {
  const searchParams = useSearchParams();
  const menuOption = searchParams.get("menu");
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {}, [session, status]);

  if (status === "loading") {
    return <p>Ładowanie...</p>;
  }

  if (status !== "authenticated" || !session) {
    router.push("/");
    return null;
  }

  return (
    <div className="w-full col-span-9 p-16 grid grid-cols-2 gap-8">
      {/* PUBLIC FORMS */}
      {menuOption === "Public" || menuOption === null ? (
        <>
          <Card title="Zmień zdjęcie profilowe">
            <ProfileImageForm />
          </Card>
          <Card title="Zmień swoją nazwę">
            <ProfileNameForm defaultName={session.user?.name || ""} />
          </Card>
          <Card title="Opis profilu" className="col-span-2">
            <ProfileDescriptionForm
              defaultDescription={session.description || ""}
            />
          </Card>
        </>
      ) : null}

      {/* PRIVATE FORMS */}
      {menuOption === "Private" ? (
        <>
          <Card title="Zmień adres email">
            <ProfileEmailForm defaultEmail={session.user?.email || ""} />
          </Card>
          <Card title="Zmień hasło">
            <ProfilePasswordForm />
          </Card>
          <Card title="Powiadomienia">
            <ProfileNotificationForm
              defaultNotifications={session.notifications || false}
              defaultAds={session.ads || false}
            />
          </Card>
          {
            // ADMIN FORMS
            session.roles.includes("admin") ? (
              <Card title="Panel administratora">
                <div className="flex flex-col justify-between h-full">
                  <div />
                  <Link
                    className="w-full h-12 bg-red-500 text-white rounded-lg flex justify-center items-center text-2xl hover:bg-blue-500 duration-300"
                    href={"/account/adm"}
                  >
                    Przejdź na panel administatora
                  </Link>
                  <p className="text-white/50 italic">
                    Uwaga: Wchodząc na panel administratora bierzesz
                    odpowiedzialność za wszystkie wykonywane akcje
                  </p>
                </div>
              </Card>
            ) : null
          }
        </>
      ) : null}
    </div>
  );
};

export default Options;
