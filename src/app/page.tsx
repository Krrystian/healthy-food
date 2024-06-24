import React from "react";
import { auth } from "./auth";
import { SignInButton } from "./components/SignInOut/SignInButton";
import { SignOutButton } from "./components/SignInOut/SignOutButton";
import Link from "next/link";

export default async function Home() {
  let session = await auth();
  return (
    <main className="flex gap-4">
      Hello {session ? session.user?.name : "Guest"}
      <SignInButton />
      <SignOutButton />
      <Link href="/register" prefetch={true}>
        Register
      </Link>
    </main>
  );
}
