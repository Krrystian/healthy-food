import React from "react";
import { Metadata } from "next";
import LoginForm from "../components/LoginRegister/LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="relative h-screen bg-[#023047]">
      <LoginForm />
    </div>
  );
}
