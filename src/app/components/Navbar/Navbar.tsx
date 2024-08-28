"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/cn";
import NavLink from "./NavLink";
import {
  BlogContent,
  DietaContent,
  KalkulatoryContent,
  KontoContent,
  PrzepisyContent,
} from "./NavLinkBody";
import { SignInButton } from "../SignInOut/SignInButton";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "@/app/lib/pageTransition";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [scrollDirection, setScrollDirection] = React.useState("up");
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > scrollProgress) {
      setScrollDirection("down");
    } else {
      setScrollDirection("up");
    }

    setScrollProgress(currentScrollPos);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    router.prefetch("/login");
    router.prefetch("/register");

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollProgress]);

  const loggedIn = session.status === "authenticated";
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    return null;
  }

  return (
    <div className="w-full flex justify-center">
      <nav
        className={cn(
          "fixed z-50 h-20 flex justify-center duration-300 transition-all text-[#023047] bg-transparent",
          scrollProgress > 100 && scrollDirection === "down"
            ? "translate-y-[-100%]"
            : "translate-y-0"
        )}
      >
        <motion.div
          className={cn(
            "h-full duration-300 transition-all bg-[#FFB703] relative w-[100vw] px-4",
            scrollProgress > 30 && "w-[50vw] rounded-b-xl px-2"
          )}
        >
          <div className="flex flex-row justify-between items-center h-full">
            <Image
              src="/logo.png"
              width={60}
              height={60}
              alt="logo"
              priority
              className="cursor-pointer"
              onClick={() => animatePageOut("/", router)}
            />
            <div className="flex flex-row items-center justify-center gap-1">
              <NavLink
                label="Kalkulatory"
                href="/calculator/bmi"
                prefetch={true}
                Content={KalkulatoryContent}
              />
              <NavLink
                label="Blog"
                href="/"
                prefetch={true}
                Content={BlogContent}
              />
              <NavLink
                label="Dieta"
                href="/"
                prefetch={true}
                Content={DietaContent}
              />
              <NavLink
                label="Przepisy"
                href="/"
                prefetch={true}
                Content={PrzepisyContent}
              />
              <NavLink label="Produkty" href="/" prefetch={true} />
            </div>
            <div className="flex flex-row gap-8">
              {loggedIn ? (
                <NavLink
                  label="Konto"
                  href="/"
                  prefetch={true}
                  Content={KontoContent}
                  account
                  underline={false}
                  className="px-8 border-2 rounded-xl border-black"
                />
              ) : (
                <SignInButton className="p-3 border-2 border-[#023047] rounded-md hover:bg-[#FB8500]/90 duration-300 transition-all text-xl font-medium">
                  Login
                </SignInButton>
              )}
            </div>
          </div>
        </motion.div>
      </nav>
    </div>
  );
};

export default Navbar;
