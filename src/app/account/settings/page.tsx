import BackgroundPattern from "@/app/components/BackgroundPattern";
import Card from "@/app/components/Settings/Card";
import { ProfileImageForm } from "@/app/components/Settings/Forms";
import Menu from "@/app/components/Settings/Menu";
import React from "react";

export default function Page() {
  return (
    <div className="w-screen h-screen pt-[80px] relative grid grid-cols-12">
      <BackgroundPattern />
      <Menu />
      <div className="w-full col-span-9 p-16">
        <Card title="Change profile image">
          <ProfileImageForm />
        </Card>
      </div>
    </div>
  );
}
