import React from "react";
import { auth } from "./auth";
import { SignInButton } from "./components/SignInOut/SignInButton";
import { SignOutButton } from "./components/SignInOut/SignOutButton";

export default async function Home() {
  let session = await auth();
  console.log(session);
  return (
    <main className="flex gap-4">
      Hello {session ? session.user?.name : "Guest"}
      <SignInButton />
      <SignOutButton />
    </main>
  );
}
