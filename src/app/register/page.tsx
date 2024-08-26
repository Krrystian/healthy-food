import React from "react";
import { Metadata } from "next";
import RegisterForm from "../components/LoginRegister/RegisterForm";

export const metadata: Metadata = {
  title: "Register",
};

export default function Page() {
  return (
    <div className="relative h-screen bg-[#023047]">
      <RegisterForm />
    </div>
  );
}
