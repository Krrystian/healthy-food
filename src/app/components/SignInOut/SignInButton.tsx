// import { signIn } from "../auth";
"use client";
import { cn } from "@/app/lib/cn";
import { animatePageOut } from "@/app/lib/pageTransition";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export function SignInButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  return (
    <Link
      href="#"
      prefetch={true}
      onClick={(e: any) => {
        e.preventDefault();
        if (pathname !== "/login*") {
          animatePageOut();
          setTimeout(() => {
            signIn();
          }, 1000);
        }
      }}
      className={cn(className)}
    >
      {children}
    </Link>
  );
}
