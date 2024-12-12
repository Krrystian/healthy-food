import React from "react";
import { Metadata } from "next";
import LoginForm from "../components/LoginRegister/LoginForm";
import BackgroundPattern from "../components/BackgroundPattern";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="relative h-screen bg-[#023047] w-screen">
      <BackgroundPattern className="z-10 md:hidden block" />
      <LoginForm />
    </div>
  );
}
