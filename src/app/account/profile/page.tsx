import BackgroundPattern from "@/app/components/BackgroundPattern";
import Menu from "@/app/components/Profile/Menu";
import Options from "@/app/components/Profile/Options";
import React from "react";

const Page = () => {
  return (
    <div className="w-screen min-h-screen xl:pt-[80px] relative xl:grid xl:grid-cols-12">
      <BackgroundPattern />
      <Menu />
      <Options />
    </div>
  );
};

export default Page;
