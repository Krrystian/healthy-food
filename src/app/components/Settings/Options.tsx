"use client";
import React from "react";
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

const Options = () => {
  const searchParams = useSearchParams();
  const menuOption = searchParams.get("menu");
  const session = useSession();
  const router = useRouter();
  if (session.status !== "authenticated" || !session.data) {
    router.push("/");
    return null;
  }
  return (
    <div className="w-full col-span-9 p-16 grid grid-cols-2 gap-8">
      {menuOption === "Public" || menuOption === null ? (
        <>
          <Card title="Zmień zdjęcie profilowe">
            <ProfileImageForm />
          </Card>
          <Card title="Zmień swoją nazwę">
            <ProfileNameForm defaultName={session.data.user.name || ""} />
          </Card>
          <Card title="Opis profilu" className="col-span-2">
            <ProfileDescriptionForm
              defaultDescription={session.data.user.description}
            />
          </Card>
        </>
      ) : menuOption === "Private" ? (
        <>
          <Card title="Zmień adres email">
            <ProfileEmailForm defaultEmail={session.data.user.email} />
          </Card>
          <Card title="Zmień hasło">
            <ProfilePasswordForm />
          </Card>
          <Card title="Powiadomienia">
            <ProfileNotificationForm
              defaultNotifications={session.data.notifications}
              defaultAds={session.data.ads}
            />
          </Card>
        </>
      ) : menuOption === "Help" ? (
        <>
          <Card title="Pomoc">
            {/* Formularze lub komponenty związane z pomocą */}
            <p>To jest sekcja pomocy.</p>
          </Card>
        </>
      ) : null}
    </div>
  );
};

export default Options;
