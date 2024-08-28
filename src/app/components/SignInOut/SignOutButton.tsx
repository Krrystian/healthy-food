"use client";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="relative group font-semibold text-red-500 py-1"
    >
      Wyloguj
      <div className="absolute bottom-0 left-0 w-0 duration-300 transition-all h-1 rounded-xl bg-[#219EBC] group-hover:w-full" />
    </button>
  );
}
