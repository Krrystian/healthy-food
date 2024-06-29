// import { signIn } from "../auth";
"use client";
import { cn } from "@/app/lib/cn";
import { animatePageOut } from "@/app/lib/pageTransition";
import { signIn } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export function SignInButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <button
      onClick={() => {
        if (pathname !== "/login*") {
          animatePageOut();
          signIn();
        }
      }}
      className={cn(className)}
    >
      {children}
    </button>
  );
}
