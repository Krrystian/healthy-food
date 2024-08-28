import BackgroundPattern from "@/app/components/BackgroundPattern";
import Menu from "@/app/components/Settings/Menu";
import React from "react";

export default function Page() {
  return (
    <div className="w-screen h-screen pt-[80px] relative grid grid-cols-12">
      <BackgroundPattern />
      <Menu />
    </div>
  );
}
