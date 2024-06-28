import React from "react";
import { auth } from "./auth";
import { SignInButton } from "./components/SignInOut/SignInButton";
import { SignOutButton } from "./components/SignInOut/SignOutButton";
import Link from "next/link";
import Navbar from "./components/Navbar/Navbar";

export default async function Home() {
  let session = await auth();
  return (
    <main className="flex flex-col gap-4 min-h-[200vh]">
      Hello {session ? session.user?.name : "Guest"}
      <SignInButton />
      <SignOutButton />
      <Link href="/register" prefetch={true}>
        Register
      </Link>
    </main>
  );
}
