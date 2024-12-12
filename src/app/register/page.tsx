import React from "react";
import { Metadata } from "next";
import RegisterForm from "../components/LoginRegister/RegisterForm";
import BackgroundPattern from "../components/BackgroundPattern";

export const metadata: Metadata = {
  title: "Register",
};

export default function Page() {
  return (
    <div className="relative h-screen bg-[#023047]">
      <BackgroundPattern className="z-10 md:hidden block" />
      <RegisterForm />
    </div>
  );
}
