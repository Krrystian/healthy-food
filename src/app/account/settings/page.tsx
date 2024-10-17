import BackgroundPattern from "@/app/components/BackgroundPattern";
import Menu from "@/app/components/Settings/Menu";
import Options from "@/app/components/Settings/Options";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Konto",
};

export default function Page() {
  return (
    <div className="w-screen h-screen xl:pt-[80px] relative grid grid-cols-12">
      <BackgroundPattern />
      <Menu />
      <Options />
    </div>
  );
}
