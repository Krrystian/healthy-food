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
import { useSearchParams } from "next/navigation";

const Options = () => {
  const searchParams = useSearchParams();
  const menuOption = searchParams.get("menu"); // Odbieranie parametru "menu" z URL

  return (
    <div className="w-full col-span-9 p-16 grid grid-cols-2 gap-8">
      {menuOption === "Public" || menuOption === null ? (
        <>
          <Card title="Zmień zdjęcie profilowe">
            <ProfileImageForm />
          </Card>
          <Card title="Zmień swoją nazwę">
            <ProfileNameForm />
          </Card>
          <Card title="Opis profilu" className="col-span-2">
            <ProfileDescriptionForm />
          </Card>
        </>
      ) : menuOption === "Private" ? (
        <>
          <Card title="Zmień adres email">
            <ProfileEmailForm />
          </Card>
          <Card title="Zmień hasło">
            <ProfilePasswordForm />
          </Card>
          <Card title="Powiadomienia">
            <ProfileNotificationForm />
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
